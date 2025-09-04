import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { RequestService } from './request.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProducerService } from '../request/rabbitmq/producer.service';
import { Cache } from 'cache-manager';
import { Status } from '@prisma/client';

describe('RequestService', () => {
  let service: RequestService;
  let prisma: PrismaService;
  let producer: ProducerService;
  let cache: Cache;

  const mockCache = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  };

  const mockProducerService = {
    sendWithDelay: jest.fn(),
  };

  const mockPrismaService = {
    findMany: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    findUnique: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: ProducerService, useValue: mockProducerService },
        { provide: CACHE_MANAGER, useValue: mockCache },
      ],
    }).compile();

    service = module.get<RequestService>(RequestService);
    prisma = module.get<PrismaService>(PrismaService);
    producer = module.get<ProducerService>(ProducerService);
    cache = module.get<Cache>(CACHE_MANAGER);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('changeToNextStatus', () => {
    let update;
    const status: Status = {
      name: 'new',
      id: '1',
      nextStatusId: '2',
    };
    const dataFrom = { id: '1', text: 'request', status };
    beforeEach(() => {
      jest.spyOn(service, 'findOne').mockResolvedValue(dataFrom as any);
      update = jest.spyOn(service, 'update').mockResolvedValue(dataFrom as any);
    });
    it('should update status if next exist in current status', async () => {
      await service.changeToNextStatus(dataFrom.id);
      expect(update).toHaveBeenCalledTimes(1);
      expect(mockProducerService.sendWithDelay).toHaveBeenCalledTimes(1);
      expect(mockProducerService.sendWithDelay).toHaveBeenCalledWith(
        { id: dataFrom.id },
        5000,
      );
    });
    it('should update status if next exist in current status and call producer if new status have nextStatusId', async () => {
      await service.changeToNextStatus(dataFrom.id);
      expect(update).toHaveBeenCalledTimes(1);
      expect(mockProducerService.sendWithDelay).toHaveBeenCalledTimes(1);
      expect(mockProducerService.sendWithDelay).toHaveBeenCalledWith(
        { id: dataFrom.id },
        5000,
      );
    });
    it('should update status if next exist in current status and shouldn`t call producer if new status dont have nextStatusId', async () => {
      const updatedData = {
        id: '1',
        text: 'request',
        status: { ...status, nextStatusId: null },
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(dataFrom as any);
      const update = jest
        .spyOn(service, 'update')
        .mockResolvedValue(updatedData as any);
      await service.changeToNextStatus(dataFrom.id);
      expect(update).toHaveBeenCalledTimes(1);
      expect(mockProducerService.sendWithDelay).not.toHaveBeenCalled();
      expect(mockProducerService.sendWithDelay).not.toHaveBeenCalledWith(
        { id: dataFrom.id },
        5000,
      );
    });
    it('shouldn`t update status if next is null', async () => {
      const updatedData = {
        id: '1',
        text: 'request',
        status: { ...status, nextStatusId: null },
      };
      jest.spyOn(service, 'findOne').mockResolvedValue({
        ...dataFrom,
        status: { ...status, nextStatusId: null },
      } as any);
      const update = jest
        .spyOn(service, 'update')
        .mockResolvedValue(updatedData as any);
      await service.changeToNextStatus(dataFrom.id);
      expect(update).not.toHaveBeenCalled();
      expect(mockProducerService.sendWithDelay).not.toHaveBeenCalled();
      expect(mockProducerService.sendWithDelay).not.toHaveBeenCalledWith(
        { id: dataFrom.id },
        5000,
      );
    });
  });
});

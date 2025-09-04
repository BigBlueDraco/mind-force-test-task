import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Prisma, Request, Status } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { Cache } from 'cache-manager';
import { BasePrismaCrudService } from 'src/common/crud/base-crud-service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProducerService } from 'src/request/rabbitmq/producer.service';
@Injectable()
export class RequestService extends BasePrismaCrudService<
  Request,
  Partial<Prisma.RequestCreateInput>,
  Prisma.RequestUpdateInput,
  Prisma.RequestWhereUniqueInput,
  Prisma.RequestFindManyArgs,
  Prisma.RequestWhereInput,
  Prisma.RequestWhereUniqueInput,
  Prisma.RequestInclude,
  Request
> {
  private key = `requests`;

  constructor(
    prisma: PrismaService,
    private readonly producerService: ProducerService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    super(prisma, 'request', { status: true, type: true }, {});
  }
  async findMany(params?: Prisma.RequestFindManyArgs<DefaultArgs> | undefined) {
    const cached = await this.cacheManager.get(this.key);
    if (cached) {
      Logger.log('Cashed data: ', cached);
      return cached as any;
    }
    const res = super.findMany(params);
    await this.cacheManager.set(this.key, res);
    return res;
  }
  async update(
    where: Prisma.RequestWhereUniqueInput,
    data: Prisma.RequestUpdateInput,
    include?: Prisma.RequestInclude<DefaultArgs> | undefined,
  ): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    text: string;
    statusId: string;
    typeId: string;
  }> {
    await this.cacheManager.del(this.key);
    return super.update(where, data, include);
  }
  async create(
    data: Partial<Prisma.RequestCreateInput>,
    include?: Prisma.RequestInclude<DefaultArgs> | undefined,
  ): Promise<Request> {
    await this.cacheManager.del(this.key);
    const result = await super.create(data, include);
    this.producerService.sendWithDelay({ id: result.id }, 5000);
    return result;
  }
  async delete(
    where: Prisma.RequestWhereUniqueInput,
    include?: Prisma.RequestInclude<DefaultArgs> | undefined,
  ): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    text: string;
    statusId: string;
    typeId: string;
  }> {
    await this.cacheManager.del(this.key);
    return super.delete(where, include);
  }
  async changeToNextStatus(id: string) {
    try {
      const { status } = (await this.findOne(
        { id },
        { status: true },
      )) as Request & {
        status: Status;
      };
      if (status && status.nextStatusId) {
        const updatedRequest = (await super.update(
          { id },
          { status: { connect: { id: status.nextStatusId } } },
          { status: true },
        )) as any;
        Logger.log(
          'Status updated for request: ' +
            id +
            ' from: ' +
            status.name +
            ' to: ' +
            updatedRequest.status.name,
        );
        if (updatedRequest.status.nextStatusId) {
          this.producerService.sendWithDelay({ id }, 5000);
        }
      }
    } catch (err) {
      Logger.error(err);
      throw new Error('Request status changing error', err);
    }
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { BasePrismaCrudService } from 'src/common/crud/base-crud-service';
import { Prisma, Request, Status } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProducerService } from 'src/request/rabbitmq/producer.service';
import { DefaultArgs } from '@prisma/client/runtime/library';

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
  constructor(
    prisma: PrismaService,
    private readonly producerService: ProducerService,
  ) {
    super(prisma, 'request', { status: true, type: true }, {});
  }
  async create(
    data: Partial<Prisma.RequestCreateInput>,
    include?: Prisma.RequestInclude<DefaultArgs> | undefined,
  ): Promise<Request> {
    const result = await super.create(data, include);
    this.producerService.sendWithDelay({ id: result.id }, 5000);
    return result;
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

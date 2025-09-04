import { Injectable, Logger } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { BasePrismaCrudService } from 'src/common/crud/base-crud-service';
import { Prisma, Request, Status } from '@prisma/client';
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
  constructor(
    prisma: PrismaService,
    private readonly producerService: ProducerService,
  ) {
    super(prisma, 'request', { status: true, type: true }, {});
  }
  async changeToNextStatus(id: string) {
    const { status } = (await this.findOne(
      { id },
      { status: true },
    )) as Request & {
      status: Status;
    };
    if (status && status.nextStatusId) {
      await this.update({ id }, { status: { connect: { id } } });
      Logger.log('Status updated for request: ', id, ' status: ', status);
      if (status.nextStatusId) {
        this.producerService.sendWithDelay({ id }, 5000);
      }
    }
  }
}

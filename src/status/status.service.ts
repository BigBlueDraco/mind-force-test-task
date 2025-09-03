import { Injectable } from '@nestjs/common';
import { Prisma, Status } from '@prisma/client';
import { BasePrismaCrudService } from 'src/common/crud/base-crud-service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatusService extends BasePrismaCrudService<
  Status,
  Partial<Prisma.StatusCreateInput>,
  Prisma.StatusUpdateInput,
  Prisma.StatusWhereUniqueInput,
  Prisma.StatusFindManyArgs,
  Prisma.StatusWhereInput,
  Prisma.StatusWhereUniqueInput,
  Prisma.StatusInclude,
  Status
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'status');
  }
}

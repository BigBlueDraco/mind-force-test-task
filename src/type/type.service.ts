import { Injectable } from '@nestjs/common';
import { Prisma, Type } from '@prisma/client';
import { BasePrismaCrudService } from 'src/common/crud/base-crud-service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TypeService extends BasePrismaCrudService<
  Type,
  Partial<Prisma.TypeCreateInput>,
  Prisma.TypeUpdateInput,
  Prisma.TypeWhereUniqueInput,
  Prisma.TypeFindManyArgs,
  Prisma.TypeWhereInput,
  Prisma.TypeWhereUniqueInput,
  Prisma.TypeInclude,
  Type
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'type');
  }
}

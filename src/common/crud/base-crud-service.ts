import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Pagination, PaginationResult } from '../pagination/pagination.class';

@Injectable()
export class BasePrismaCrudService<
  ModelType,
  CreateDto,
  UpdateDto,
  FindUniqueWhere,
  FindManyArgs,
  FindFirstWhere,
  DeleteWhere,
  IncludeOptions,
  ResponseDto = ModelType,
> {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly recourse: string,
    protected readonly defaultInclude: IncludeOptions = {} as IncludeOptions,
    protected readonly defaultOmit: any = {} as any,
  ) {}

  async count(params?: FindManyArgs): Promise<number> {
    return this.prisma[this.recourse].count(params);
  }

  async findOne(
    where: FindUniqueWhere,
    include?: IncludeOptions,
  ): Promise<ResponseDto | null> {
    const result = await this.prisma[this.recourse].findUnique({
      where: where,
      include: include || this.defaultInclude,
      omit: this.defaultOmit,
    });
    return result ? this.mapSingleResponse(result) : null;
  }

  async findFirst(
    where: FindFirstWhere,
    include?: IncludeOptions,
  ): Promise<ResponseDto | null> {
    const result = await this.prisma[this.recourse].findFirst({
      where: where,
      include: include || this.defaultInclude,
      omit: this.defaultOmit,
    });
    return result ? this.mapSingleResponse(result) : null;
  }

  async findMany(params?: FindManyArgs): Promise<ResponseDto[]> {
    const results = await this.prisma[this.recourse].findMany(params);
    return this.mapManyResponse(results);
  }

  protected mapSingleResponse(data: ModelType): ResponseDto {
    return data as unknown as ResponseDto;
  }

  protected mapManyResponse(data: ModelType[]): ResponseDto[] {
    return data.map((item) => this.mapSingleResponse(item));
  }

  async getManyPaginated(
    queryArgs: FindManyArgs = {} as FindManyArgs,
    page = 1,
    limit = 10,
    include?: IncludeOptions,
  ): Promise<PaginationResult<ResponseDto>> {
    const parsedLimit = Number(limit);
    const parsedPage = Number(page);

    const total = await this.count(queryArgs);

    const result = await this.findMany({
      ...queryArgs,
      take: parsedLimit,
      skip: parsedLimit * (parsedPage - 1),
      include: { ...this.defaultInclude, ...include },
    });
    const pag = new Pagination<ResponseDto>(
      result,
      total,
      parsedPage,
      parsedLimit,
    );
    return JSON.parse(JSON.stringify(pag)) as PaginationResult<ResponseDto>;
  }

  async create(
    data: CreateDto,
    include?: IncludeOptions,
  ): Promise<ResponseDto> {
    const result = await this.prisma[this.recourse].create({
      data,
      include: include || this.defaultInclude,
      omit: this.defaultOmit,
    });
    return this.mapSingleResponse(result);
  }

  async update(
    where: FindUniqueWhere,
    data: UpdateDto,
    include?: IncludeOptions,
  ): Promise<ResponseDto> {
    const result = await this.prisma[this.recourse].update({
      where,
      data,
      include: include || this.defaultInclude,
      omit: this.defaultOmit,
    });
    return this.mapSingleResponse(result);
  }

  async delete(
    where: DeleteWhere,
    include?: IncludeOptions,
  ): Promise<ResponseDto> {
    const result = await this.prisma[this.recourse].delete({
      where,
      include: include || this.defaultInclude,
      omit: this.defaultOmit,
    });
    return this.mapSingleResponse(result);
  }
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { SearchParams } from '../types/search-query.type';

export class SearchParamsDto<T> implements SearchParams<T> {
  @ApiPropertyOptional({ description: 'Page number', default: 1 })
  @IsOptional()
  page: number = 1;

  @ApiPropertyOptional({ description: 'Number of items per page', default: 10 })
  @IsOptional()
  limit: number = 10;

  @ApiPropertyOptional({ description: 'Field to sort by' })
  @IsOptional()
  @IsString()
  sort: keyof T = 'id' as keyof T;

  @ApiPropertyOptional({
    description: 'Sorting order',
    enum: ['ASC', 'DESC'],
    default: 'ASC',
  })
  @IsOptional()
  @IsString()
  order: 'ASC' | 'DESC' = 'ASC';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}

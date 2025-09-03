import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetadata } from '../pagination.class';

export class PaginationMetadataDto implements PaginationMetadata {
  @ApiProperty({ description: 'Total of items', minimum: 0, example: 10 })
  total: number;
  @ApiProperty({
    description: 'Last page of pagination',
    minimum: 0,
    example: 2,
  })
  lastPage: number;
  @ApiProperty({
    description: 'Current page of pagination',
    minimum: 0,
    example: 1,
  })
  currentPage: number;
  @ApiProperty({
    description: 'Count of items per page',
    minimum: 0,
    example: 5,
  })
  perPage: number;
  @ApiProperty({ nullable: true, description: 'Previous page', example: null })
  prev: number | null;
  @ApiProperty({ nullable: true, description: 'Next page', example: 2 })
  next: number | null;
}

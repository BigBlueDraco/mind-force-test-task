import { PickType } from '@nestjs/mapped-types';
import { StatusDto } from './status.dto';
import { CreateStatusDto } from './create-status.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateStatusDto implements Partial<CreateStatusDto> {
  @ApiPropertyOptional({
    description: 'Name of the status',
    example: 'Pending Approval',
  })
  @IsOptional()
  @IsString()
  name?: string;
  @ApiPropertyOptional({
    description: 'ID of the next status in the flow',
    example: 'a3d9b7f6-1b23-4e91-9a7f-52c84b5d7890',
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  nextStatusId?: string;
}

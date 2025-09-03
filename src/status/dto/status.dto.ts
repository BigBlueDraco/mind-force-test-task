import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Status } from '@prisma/client';

export class StatusDto implements Status {
  @ApiProperty({
    description: 'Unique identifier of the status',
    example: 'c4d4a5d2-8e3b-4c0f-aef2-56afc789abcd',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'ID of the next status in the flow',
    example: 'a3d9b7f6-1b23-4e91-9a7f-52c84b5d7890',
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  nextStatusId: string | null;

  @ApiProperty({
    description: 'ID of the previous status in the flow',
    example: 'e1c8a7f4-9b12-4a67-b1f3-37d64a8f1234',
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  prevStatusId: string | null;

  @ApiProperty({
    description: 'Name of the status',
    example: 'Pending Approval',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Next status object',
    type: () => StatusDto,
    required: false,
    nullable: true,
  })
  @ValidateNested()
  @Type(() => StatusDto)
  @IsOptional()
  next?: StatusDto | null;

  @ApiProperty({
    description: 'Previous status object',
    type: () => StatusDto,
    required: false,
    nullable: true,
  })
  @ValidateNested()
  @Type(() => StatusDto)
  @IsOptional()
  prev?: StatusDto | null;
}

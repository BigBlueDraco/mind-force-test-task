import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString } from 'class-validator';
import { Type } from '@prisma/client';

export class TypeDto implements Type {
  @ApiProperty({
    description: 'Unique identifier of the type',
    example: 'd2f3a4c5-b6e7-4f89-9c01-23456789abcd',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Name of the type',
    example: 'Request',
  })
  @IsString()
  name: string;
}

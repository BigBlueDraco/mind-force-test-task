import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsDate, IsEnum, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { Request } from '@prisma/client';

export class RequestDto implements Request {
  @ApiProperty({
    description: 'Unique identifier of the request',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsUUID()
  statusId: string;
  @ApiProperty({
    description: 'Unique identifier of the request',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsUUID()
  typeId: string;
  @ApiProperty({
    description: 'Unique identifier of the request',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Date when the request was created',
    example: '2025-09-03T12:34:56.789Z',
  })
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the request was last updated',
    example: '2025-09-03T15:45:12.123Z',
  })
  @IsDate()
  @Type(() => Date)
  updatedAt: Date;

  @ApiProperty({
    description: 'Request text content',
    example: 'Please approve my vacation request.',
  })
  @IsString()
  @IsNotEmpty()
  text: string;
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTypeDto } from './dto/create-type.dto';
import { TypeDto } from './dto/type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { TypeService } from './type.service';

@Controller('type')
@ApiTags('Types')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all types' })
  @ApiResponse({
    status: 200,
    description: 'List of all types',
    type: [TypeDto],
  })
  async findAll(): Promise<TypeDto[]> {
    return await this.typeService.findMany();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get type by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the type' })
  @ApiResponse({
    status: 200,
    description: 'The found type',
    type: TypeDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Type not found',
  })
  async findOne(@Param('id') id: string): Promise<TypeDto | null> {
    return await this.typeService.findOne({ id });
  }

  @Post('')
  @ApiOperation({ summary: 'Create a new type' })
  @ApiResponse({
    status: 201,
    description: 'The type has been created',
    type: TypeDto,
  })
  async create(@Body() body: CreateTypeDto): Promise<TypeDto> {
    return await this.typeService.create(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a type by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the type' })
  @ApiResponse({
    status: 200,
    description: 'The updated type',
    type: TypeDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Type not found',
  })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateTypeDto,
  ): Promise<TypeDto> {
    return await this.typeService.update({ id }, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a type by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the type' })
  @ApiResponse({
    status: 200,
    description: 'The deleted type',
    type: TypeDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Type not found',
  })
  async delete(@Param('id') id: string): Promise<TypeDto> {
    return await this.typeService.delete({ id });
  }
}

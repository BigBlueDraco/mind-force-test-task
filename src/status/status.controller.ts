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
import { Prisma } from '@prisma/client';
import { CreateStatusDto } from './dto/create-status.dto';
import { StatusDto } from './dto/status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { StatusService } from './status.service';

@Controller('status')
@ApiTags('Statuses')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all statuses' })
  @ApiResponse({
    status: 200,
    description: 'List of all statuses',
    type: [StatusDto],
  })
  async findAll(): Promise<StatusDto[]> {
    return await this.statusService.findMany();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get status by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the status' })
  @ApiResponse({
    status: 200,
    description: 'The found status',
    type: StatusDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Status not found',
  })
  async findOne(@Param('id') id: string): Promise<StatusDto | null> {
    return await this.statusService.findOne({ id });
  }

  @Post('')
  @ApiOperation({ summary: 'Create a new status' })
  @ApiResponse({
    status: 201,
    description: 'The status has been created',
    type: StatusDto,
  })
  async create(@Body() body: CreateStatusDto): Promise<StatusDto> {
    const { nextStatusId, ...rest } = body;
    const data: Prisma.StatusCreateInput = {
      next: nextStatusId ? { connect: { id: nextStatusId } } : undefined,
      ...rest,
    };
    return await this.statusService.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a status by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the status' })
  @ApiResponse({
    status: 200,
    description: 'The updated status',
    type: StatusDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Status not found',
  })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateStatusDto,
  ): Promise<StatusDto> {
    const { nextStatusId, ...rest } = body;
    let data: Prisma.StatusUpdateInput = {
      ...rest,
    };
    if (nextStatusId) {
      data = { ...data, next: { connect: { id: nextStatusId } } };
    }
    return await this.statusService.update({ id }, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a status by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the status' })
  @ApiResponse({
    status: 200,
    description: 'The deleted status',
    type: StatusDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Status not found',
  })
  async delete(@Param('id') id: string): Promise<StatusDto> {
    return await this.statusService.delete({ id });
  }
}

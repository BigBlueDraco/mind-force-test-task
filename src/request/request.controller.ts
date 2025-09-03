import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { RequestDto } from './dto/request.dto';

@ApiTags('Requests')
@Controller('requests')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all requests' })
  @ApiResponse({
    status: 200,
    description: 'List of requests',
    type: [RequestDto],
  })
  async findAll(): Promise<RequestDto[]> {
    return await this.requestService.findMany();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get request by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the request' })
  @ApiResponse({
    status: 200,
    description: 'The found request',
    type: RequestDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Request not found',
  })
  async findOne(@Param('id') id: string): Promise<RequestDto | null> {
    return await this.requestService.findOne({ id });
  }

  @Post('')
  @ApiOperation({ summary: 'Create a new request' })
  @ApiResponse({
    status: 201,
    description: 'The request has been created',
    type: RequestDto,
  })
  async create(@Body() body: CreateRequestDto): Promise<RequestDto> {
    return await this.requestService.create(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a request by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the request' })
  @ApiResponse({
    status: 200,
    description: 'The updated request',
    type: RequestDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Request not found',
  })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateRequestDto,
  ): Promise<RequestDto> {
    return await this.requestService.update({ id }, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a request by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the request' })
  @ApiResponse({
    status: 200,
    description: 'The deleted request',
    type: RequestDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Request not found',
  })
  async delete(@Param('id') id: string): Promise<RequestDto> {
    return await this.requestService.delete({ id });
  }
}

import { PickType } from '@nestjs/swagger';
import { RequestDto } from './request.dto';

export class CreateRequestDto extends PickType(RequestDto, ['text']) {}

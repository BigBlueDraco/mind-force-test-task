import { PickType } from '@nestjs/swagger';
import { TypeDto } from './type.dto';

export class CreateTypeDto extends PickType(TypeDto, ['name']) {}

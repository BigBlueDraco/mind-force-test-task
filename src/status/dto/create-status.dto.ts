import { PickType } from '@nestjs/swagger';
import { StatusDto } from './status.dto';

export class CreateStatusDto extends PickType(StatusDto, [
  'name',
  'nextStatusId',
  'prevStatusId',
]) {}

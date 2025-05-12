import { PartialType } from '@nestjs/mapped-types';
import { CreateVideojuegoDto } from './create-videojuego.dto';

export class UpdateVideojuegoDto extends PartialType(CreateVideojuegoDto) {}

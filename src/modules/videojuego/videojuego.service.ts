import { Injectable } from '@nestjs/common';
import { CreateVideojuegoDto } from './dto/create-videojuego.dto';
import { UpdateVideojuegoDto } from './dto/update-videojuego.dto';

@Injectable()
export class VideojuegoService {
  create(createVideojuegoDto: CreateVideojuegoDto) {
    return 'This action adds a new videojuego';
  }

  findAll() {
    return `This action returns all videojuego`;
  }

  findOne(id: number) {
    return `This action returns a #${id} videojuego`;
  }

  update(id: number, updateVideojuegoDto: UpdateVideojuegoDto) {
    return `This action updates a #${id} videojuego`;
  }

  remove(id: number) {
    return `This action removes a #${id} videojuego`;
  }
}

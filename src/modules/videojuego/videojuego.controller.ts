import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VideojuegoService } from './videojuego.service';
import { CreateVideojuegoDto } from './dto/create-videojuego.dto';
import { UpdateVideojuegoDto } from './dto/update-videojuego.dto';

@Controller('videojuego')
export class VideojuegoController {
  constructor(private readonly videojuegoService: VideojuegoService) {}

  @Post()
  create(@Body() createVideojuegoDto: CreateVideojuegoDto) {
    return this.videojuegoService.create(createVideojuegoDto);
  }

  @Get()
  findAll() {
    return this.videojuegoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videojuegoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideojuegoDto: UpdateVideojuegoDto) {
    return this.videojuegoService.update(+id, updateVideojuegoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videojuegoService.remove(+id);
  }
}

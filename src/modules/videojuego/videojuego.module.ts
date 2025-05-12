import { Module } from '@nestjs/common';
import { VideojuegoService } from './videojuego.service';
import { VideojuegoController } from './videojuego.controller';

@Module({
  controllers: [VideojuegoController],
  providers: [VideojuegoService],
})
export class VideojuegoModule {}

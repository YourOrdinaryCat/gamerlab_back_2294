import { Test, TestingModule } from '@nestjs/testing';
import { VideojuegoController } from './videojuego.controller';
import { VideojuegoService } from './videojuego.service';

describe('VideojuegoController', () => {
  let controller: VideojuegoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideojuegoController],
      providers: [VideojuegoService],
    }).compile();

    controller = module.get<VideojuegoController>(VideojuegoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

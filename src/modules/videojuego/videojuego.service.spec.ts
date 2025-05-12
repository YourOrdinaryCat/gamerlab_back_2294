import { Test, TestingModule } from '@nestjs/testing';
import { VideojuegoService } from './videojuego.service';

describe('VideojuegoService', () => {
  let service: VideojuegoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideojuegoService],
    }).compile();

    service = module.get<VideojuegoService>(VideojuegoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

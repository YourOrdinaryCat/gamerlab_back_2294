import { ApiProperty } from '@nestjs/swagger';

export class EvaluacionRealizadaDto {
  @ApiProperty({
    description: 'ID del videojuego evaluado',
    example: '123',
  })
  videojuegoId: string;

  @ApiProperty({
    description: 'Nombre del videojuego evaluado',
    example: 'El Viaje de Valiente',
  })
  nombreVideojuego: string;

  @ApiProperty({
    description: 'Comentarios realizados por el jurado para esta evaluación',
    required: false,
    example: 'Muy buen desarrollo.',
  })
  comentarios?: string;

  @ApiProperty({
    description: 'Códigos de los NRCs asociados al videojuego a través de su equipo y estudiantes',
    type: [Number],
    example: [1001, 1002],
  })
  codigosNrc: number[];
}
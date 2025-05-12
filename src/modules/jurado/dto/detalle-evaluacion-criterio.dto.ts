import { ApiProperty } from '@nestjs/swagger';

export class DetalleCriterioEvaluadoDto {
  @ApiProperty({
    description: 'Nombre del criterio evaluado',
    example: 'Interfaz de Usuario',
  })
  nombreCriterio: string;

  @ApiProperty({
    description: 'Valoración otorgada para este criterio',
    example: 4,
  })
  valoracion: number;

}
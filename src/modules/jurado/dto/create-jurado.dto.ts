import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateJuradoDto {
  @ApiProperty({
    description: 'Nombre completo del jurado',
    example: '',
  })
  @IsString({ message: 'El nombre completo debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre completo no puede estar vacío' })
  nombre_completo: string;

  @ApiProperty({
    description: 'Correo electrónico institucional del jurado',
    example: '',
  })
  @IsEmail({}, { message: 'El correo electrónico debe tener un formato válido' })
  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })
  email: string;
}
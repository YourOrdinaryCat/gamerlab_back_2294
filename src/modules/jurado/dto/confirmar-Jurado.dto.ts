import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class ConfirmarJuradoDto {
  @ApiProperty({
    description: 'El token de confirmación recibido por correo electrónico.',
    example: '',
  })
  @IsString({ message: 'El token debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El token no puede estar vacío.' })
  token: string;

  @ApiProperty({
    description: 'La nueva contraseña para el jurado. Debe tener al menos 8 caracteres.',
    example: '',
    minLength: 8,
  })
  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })

  nueva_contrasena: string;

}
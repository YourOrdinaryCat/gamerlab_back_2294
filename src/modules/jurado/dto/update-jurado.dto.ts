import { PartialType } from '@nestjs/swagger';
import { CreateJuradoDto } from './create-jurado.dto';
import { IsEmail, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateJuradoDto extends PartialType(CreateJuradoDto) {

    @ApiPropertyOptional({
        description: 'Nuevo nombre completo del jurado (opcional)',
        example: 'Juan Alberto Pérez',
    })
    @IsOptional()
    @IsString({ message: 'El nombre completo debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre completo no puede estar vacío si se proporciona' })
    nombre_completo?: string;

    @ApiPropertyOptional({
        description: 'Nuevo correo electrónico del jurado (opcional)',
        example: 'juan.nuevo@email.com',
    })
    @IsOptional()
    @IsEmail({}, { message: 'El correo electrónico debe tener un formato válido' })
    @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío si se proporciona' })
    email?: string;

}
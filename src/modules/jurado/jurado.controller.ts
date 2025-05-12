import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { JuradoService } from './jurado.service';
import { CreateJuradoDto } from './dto/create-jurado.dto';
import { ConfirmarJuradoDto } from './dto/confirmar-Jurado.dto';
import { EvaluacionRealizadaDto } from './dto/evaluacion-realizada.dto';
import { DetalleCriterioEvaluadoDto } from './dto/detalle-evaluacion-criterio.dto';
import { UpdateJuradoDto } from './dto/update-jurado.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Jurado')
@Controller('jurado')
export class JuradoController {
  constructor(private readonly juradoService: JuradoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo jurado (requiere rol Admin)' })
  @ApiBody({ type: CreateJuradoDto })
  @ApiResponse({ status: 201, description: 'El jurado ha sido creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
  @ApiResponse({ status: 409, description: 'El correo electrónico ya existe.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Rol no autorizado.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  create(@Body() createJuradoDto: CreateJuradoDto) {
    return this.juradoService.create(createJuradoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener lista de todos los jurados' })
  @ApiResponse({ status: 200, description: 'Lista de jurados obtenida exitosamente.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  findAll() {
    return this.juradoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener jurado por ID' })
  @ApiParam({ name: 'id', description: 'ID numérico del jurado', type: Number })
  @ApiResponse({ status: 200, description: 'Jurado encontrado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Jurado no encontrado.' })
  @ApiResponse({ status: 400, description: 'ID inválido (no es un número).' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
     const jurado = await this.juradoService.findOne(id);
     if (!jurado) {
       throw new NotFoundException(`Jurado con ID "${id}" no encontrado.`);
     }
     return jurado;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar jurado por ID' })
  @ApiParam({ name: 'id', description: 'ID numérico del jurado a actualizar', type: Number })
  @ApiBody({ type: UpdateJuradoDto })
  @ApiResponse({ status: 200, description: 'Jurado actualizado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Jurado no encontrado.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos (ID o cuerpo de la solicitud).' })
  @ApiResponse({ status: 409, description: 'Conflicto (ej. email duplicado).' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJuradoDto: UpdateJuradoDto,
  ) {
    return this.juradoService.update(id, updateJuradoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un jurado por ID' })
  @ApiParam({ name: 'id', description: 'ID numérico del jurado a eliminar', type: Number })
  @ApiResponse({ status: 204, description: 'Jurado eliminado (marcado) exitosamente.' })
  @ApiResponse({ status: 404, description: 'Jurado no encontrado.' })
  @ApiResponse({ status: 400, description: 'ID inválido (no es un número).' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.juradoService.remove(id);
  }
  
  @Patch('confirmar-invitacion')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Confirmar invitación de jurado y establecer contraseña inicial' })
  @ApiBody({ type: ConfirmarJuradoDto })
  @ApiResponse({ status: 200, description: 'Cuenta de jurado confirmada y contraseña establecida.'})
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos (ej. token o contraseña).' })
  @ApiResponse({ status: 404, description: 'Token inválido o jurado no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor.' })
  async confirmarYEstablecerContrasena(@Body() confirmarJuradoDto: ConfirmarJuradoDto) {
    return this.juradoService.confirmarInvitacionYEstablecerContrasena(
      confirmarJuradoDto,
    );
  }
  @Get(':id/evaluaciones')
    @ApiOperation({ summary: 'Obtener evaluaciones realizadas por un jurado específico, incluyendo nombre del videojuego' })
    @ApiResponse({
      status: 200,
      description: 'Lista de evaluaciones realizadas por el jurado.',
      type: [EvaluacionRealizadaDto],
    })
    @ApiResponse({ status: 403, description: 'Acceso denegado.' })
    @ApiResponse({ status: 404, description: 'Jurado no encontrado.' })
    @ApiParam({ name: 'id', description: 'ID del Jurado', type: String })
    async findEvaluacionesRealizadas(
      @Param('id') juradoId: string,
    ): Promise<EvaluacionRealizadaDto[]> {
      return this.juradoService.findEvaluacionesRealizadas(juradoId);
    }
  @Get(':juradoId/evaluaciones/:videojuegoId')
  @ApiOperation({
    summary: 'Obtener el detalle de la calificación (criterios y valoraciones) de un videojuego específico por un jurado específico.',
  })
  @ApiResponse({
    status: 200,
    description: 'Detalle de la calificación por criterios.',
    type: [DetalleCriterioEvaluadoDto],
  })
  @ApiResponse({ status: 403, description: 'Acceso denegado.' })
  @ApiResponse({ status: 404, description: 'Jurado, videojuego o evaluación no encontrados.' })
  @ApiParam({ name: 'juradoId', description: 'ID del Jurado', type: String })
  @ApiParam({ name: 'videojuegoId', description: 'ID del Videojuego', type: String })
  async findDetalleEvaluacionVideojuego(
    @Param('juradoId') juradoId: string,
    @Param('videojuegoId') videojuegoId: string,
  ): Promise<DetalleCriterioEvaluadoDto[]> {
    return this.juradoService.findDetalleEvaluacionVideojuego(Number(juradoId), Number(videojuegoId));
  }
}
import { Module } from '@nestjs/common';
import { EquipoModule } from './modules/equipo/equipo.module';
import { VideojuegoModule } from './modules/videojuego/videojuego.module';
import { EstudianteModule } from './modules/estudiante/estudiante.module';
import { PrismaModule } from './prisma/prisma.module';
import { JuradoModule } from './modules/jurado/jurado.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './common/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    EquipoModule,
    VideojuegoModule,
    EstudianteModule,
    JuradoModule,
    MailModule
  ],
  providers: [],
})
export class AppModule {}
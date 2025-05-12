import { Module } from '@nestjs/common';
import { JuradoService } from './jurado.service';
import { JuradoController } from './jurado.controller';
import { MailModule } from '../../common/mail.module';

@Module({
  imports: [MailModule],
  controllers: [JuradoController],
  providers: [JuradoService],
})
export class JuradoModule {}
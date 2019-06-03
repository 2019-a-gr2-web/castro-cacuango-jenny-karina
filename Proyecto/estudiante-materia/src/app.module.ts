import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteModule } from './estudiantes/estudiantes.module';
import { MateriasModule } from './materias/materias.module';

@Module({
  imports: [EstudianteModule,MateriasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

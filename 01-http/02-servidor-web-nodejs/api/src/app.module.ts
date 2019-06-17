import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TragosModule} from "./tragos/tragos.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import {TragosEntity} from "./tragos/tragos.entity";

@Module({
  imports: [TragosModule,
      TypeOrmModule.forRoot({
          name: 'default', //nombre de la cadena de conexión por defecto de TYPEORM
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'karina',
          database: 'test',
          entities: [TragosEntity],
          synchronize: true,
          insecureAuth : true
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

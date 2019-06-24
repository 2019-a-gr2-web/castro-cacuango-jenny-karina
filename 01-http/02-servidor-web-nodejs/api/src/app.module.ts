import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TragosModule} from "./tragos/tragos.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import {TragosEntity} from "./tragos/tragos.entity";
import {DistribuidorModule} from "./distribuidor/distribuidor.module";
import {FiestaModule} from "./fiesta/fiesta.module";
import {DistribuidorEntity} from "./distribuidor/distribuidor.entity";
import {FiestaEntity} from "./fiesta/fiesta.entity";

@Module({
  imports: [TragosModule, DistribuidorModule, FiestaModule,
      TypeOrmModule.forRoot({
          name: 'default', //nombre de la cadena de conexión por defecto de TYPEORM
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'karina',
          database: 'test',
          entities: [
              TragosEntity,
              DistribuidorEntity,
              FiestaEntity],
          synchronize: true,
          insecureAuth : true,
          dropSchema: false,
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

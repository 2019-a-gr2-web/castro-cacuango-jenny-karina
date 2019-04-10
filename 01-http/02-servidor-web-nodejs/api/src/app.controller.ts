import {Controller, Get, HttpCode, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() //Metodo HTTP
  getHello(): string {
    return this.appService.getHello();
  }
@Post() // Metodo http

@HttpCode(200)
  postHello(){
    return 'Hola mundo en post';
}
}
/*
@nombreDecorador
class usuario {
  atributoPublico;
  private atributoPrivado;
  protected atributoProtegido;
  constructor(@Parametro() atributoPublico,
              @otroParametro() atributoPrivado,
              @otroOtroParametro() atributoProtegido){
    this.atributoPublico = atributoPublico;
    this.atributoPrivado = atributoPrivado;
    this.atributoProtegido = atributoProtegido;
  }

  @metodoA()
  public metodoPublico(){}
    @metodoB()
  private metodoPrivado(){}
  protected metodoProtegido(){}

}
*/
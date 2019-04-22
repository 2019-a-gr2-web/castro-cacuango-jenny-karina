import {Controller, Get, Headers, Response, Post, Body, HttpCode, Put, Query, Delete, Header} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/calculadora')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hola')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/suma')
  @HttpCode(200)
  sumar(@Headers() headers, @Response() suma) {

      if(headers.numero1 && headers.numero2){
          const numeroUno = Number(headers.numero1);
          const numeroDos = Number(headers.numero2);
          //console.log(headers);
          const respuesta = numeroUno + numeroDos;
          suma.status(200).send({'El valor de la suma es: ': `${respuesta}`});
      }else{
          suma.status(400).send({mensaje: 'Error, parámetros erróneos', error: 400});
      }
  }

  @Post('/resta')
  @HttpCode(201)
  restar(@Body() body, @Response() resta) {
      if(body.numero1 && body.numero2){
          const numeroUno = Number(body.numero1);
          const numeroDos = Number(body.numero2);
          //console.log(headers);
          const respuesta = numeroUno - numeroDos;
          resta.status(201).send({'El valor de la resta es: ': `${respuesta}`});
      }else{
          resta.status(400).send({mensaje: 'Error, parámetros erróneos', error: 400});
      }
  }

  @Put('/multiplicacion')
  @HttpCode(202)
  multiplicar(@Query() query, @Response() mult) {
      if(query.numero1 && query.numero2){
          const numeroUno = Number(query.numero1);
          const numeroDos = Number(query.numero2);
          //console.log(query);
          const respuesta = numeroUno * numeroDos;
          return mult.status(202).send({'El valor de la multiplicación es: ': `${respuesta}`});
      }else{
          return mult.status(400).send({mensaje: 'Error, parámetros erróneos', error: 400});
      }
  }

  @Delete('/division')
  @HttpCode(203)
  dividir(@Body() body, @Headers() headers, @Response() div) {
      if(body.numero1 && headers.numero2){
          const numeroUno = Number(body.numero1);
          const numeroDos = Number(headers.numero2);
          //console.log(body, headers);
          if(numeroDos !=0){
              const respuesta = numeroUno / numeroDos;
              div.status(203).send({'El valor de la división es: ': `${respuesta}`});
          }else{
              div.send({mensaje:'No existe división para CERO'});
          }
      }else{
          return div.status(400).send({mensaje: 'Error, parámetros erróneos', error: 400});
      }
  }
}

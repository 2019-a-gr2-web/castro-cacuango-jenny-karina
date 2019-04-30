import {Controller, Get, Headers, Response, Post, Body, HttpCode, Put, Query, Delete, Header, Request} from '@nestjs/common';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';
import {async} from "rxjs/internal/scheduler/async";

@Controller('/calculadora')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hola')
  getHello(): string {
    return this.appService.getHello();
  }

    @Get('/suma')
    @HttpCode(200)
    sumar(@Headers() headers, @Response() response, @Request() request) {



        if(headers.numero1 && headers.numero2) {

            const numeroUno = Number(headers.numero1);
            const numeroDos = Number(headers.numero2);

            const resultado = numeroUno + numeroDos;


            const cookieSeguras = request.signedCookies;
            console.log(cookieSeguras.nombre);
            console.log(cookieSeguras.valor);

            console.log(cookieSeguras);
            console.log(!cookieSeguras);



            if(cookieSeguras.nombre && cookieSeguras.valor ){
                const intento= cookieSeguras.valor - resultado;

                if(intento<=0){

                    response
                        .cookie('valor', 100, {signed:true})
                        .status(200)
                        .send(
                            {NombreUsuario: `${cookieSeguras.nombre}`,
                                Resultado: `${resultado}`,
                                Mensaje: "Se terminaron sus puntos"})
                }else{
                    response
                        .cookie('valor', intento, {signed:true})
                        .status(200)
                        .send({
                            NombreUsuario:  `${cookieSeguras.nombre}`,
                            Resultado:  `${resultado}`,
                            ValorActual : `${intento}`})

                }


            }
            else{

                if (!cookieSeguras.nombre){
                    response.cookie( 'nombre', 'Jenny', {signed:true});
                }
                if (!cookieSeguras.valor) {
                    response.cookie('valor', 100, {signed: true})
                }
                response.send('Creado');

            }
        }else {
            response.status(400).send({mensaje: 'Error, Parámetros inválidos', error: 400});
        }
    }





    @Post('/resta')
    @HttpCode(201)
    restar(@Body() body, @Response() response, @Request() request) {
        const cookieSegura = request.signedCookies;
        const cookies = request.cookies;

        const esquemaValidacion= Joi.object().keys({
            nombre : Joi.string().required()
        });

        const objetoValidacion ={
            nombre: cookies.userName
        };
        const respuesta = Joi.validate(objetoValidacion, esquemaValidacion);

        if(body.numero1 && body.numero2){

            const numeroUno = Number(body.numero1);
            const numeroDos = Number(body.numero2);

            const resultado = numeroUno - numeroDos;

            const cookieSeguras =request.signedCookies.nombre;

            if(cookieSeguras){
                console.log('Cookie segura', cookieSeguras);
            }else{
                console.log('No es valida esta cookie');
            }

            if(!cookieSegura.userName){
                response.cookie('nombre', 'Jenny', {signed:true});
            }
            if(!cookieSegura.valor){
                response.cookie('valor', 100, {signed:true})
            }

            const intento= cookieSegura.valor - resultado;
            if(intento<=0){
                response.cookie('valor', 100, {signed:true})
                response.status(201).send({NombreUsuario: `${cookieSeguras}`,
                    Resultado: `${resultado}`,
                    Mensaje: "Se terminaron sus puntos"})
            }else{
                response.cookie('valor', intento, {signed:true})
                response.status(201).send({
                    'NombreUsuario: ': `${cookieSeguras}`, 'Resultado: ': `${resultado}`})
                //console.log(cookieSeguras);
            }

        }else {
            response.status(400).send({mensaje: 'Error, Parámetros inválidos', error: 400});
        }


    }

    @Get('/multiplicacion')
    @HttpCode(202)
    multiplicar(@Query() query, @Response() response, @Request() request) {

        const cookieSegura = request.signedCookies;
        const cookies = request.cookies;

        const esquemaValidacion= Joi.object().keys({
            nombre : Joi.string().required()
        });

        const objetoValidacion ={
            nombre: cookies.userName
        };
        const respuesta = Joi.validate(objetoValidacion, esquemaValidacion);

        if(query.numero1 && query.numero2){

            const numeroUno = Number(query.numero1);
            const numeroDos = Number(query.numero2);

            const resultado = numeroUno * numeroDos;

            const cookieSeguras =request.signedCookies.nombre;

            if(cookieSeguras){
                console.log('Cookie segura', cookieSeguras);
            }else{
                console.log('No es valida esta cookie');
            }

            if(!cookieSegura.userName){
                response.cookie('nombre', 'Jenny', {signed:true});
            }
            if(!cookieSegura.valor){
                response.cookie('valor', 100, {signed:true})
            }

            const intento= cookieSegura.valor - resultado;
            if(intento<=0){
                response.cookie('valor', 100, {signed:true})
                response.status(203).send({NombreUsuario: `${cookieSeguras}`,
                    Resultado: `${resultado}`,
                    Mensaje: "Se terminaron sus puntos"})
            }else{
                response.cookie('valor', intento, {signed:true})
                response.status(203).send({
                    'NombreUsuario: ': `${cookieSeguras}`, 'Resultado: ': `${resultado}`})
                //console.log(cookieSeguras);
            }

        }else {
            response.status(400).send({mensaje: 'Error, Parámetros inválidos', error: 400});
        }


    }

    @Delete('/division')
    @HttpCode(203)
    dividir(@Body() body, @Headers() headers, @Response() response, @Request() request) {

        const cookieSegura = request.signedCookies;
        const cookies = request.cookies;

        const esquemaValidacion= Joi.object().keys({
            nombre : Joi.string().required()
        });

        const objetoValidacion ={
            nombre: cookies.userName
        };
        const respuesta = Joi.validate(objetoValidacion, esquemaValidacion);

        if(body.numero1 && headers.numero2){

            const numeroUno = Number(body.numero1);
            const numeroDos = Number(headers.numero2);

            if(numeroDos !=0){
                const resultado = numeroUno / numeroDos;
                const cookieSeguras =request.signedCookies.nombre;

                if(cookieSeguras){
                    console.log('Cookie segura', cookieSeguras);
                }else{
                    console.log('No es valida esta cookie');
                }

                if(!cookieSegura.userName){
                    response.cookie('nombre', 'Jenny', {signed:true});
                }
                if(!cookieSegura.valor){
                    response.cookie('valor', 100, {signed:true})
                }

                const intento= cookieSegura.valor - resultado;
                if(intento<=0){
                    response.cookie('valor', 100, {signed:true})
                    response.status(203).send({NombreUsuario: `${cookieSeguras}`,
                        Resultado: `${resultado}`,
                        Mensaje: "Se terminaron sus puntos"})
                }else{
                    response.cookie('valor', intento, {signed:true})
                    response.status(203).send({
                        'NombreUsuario: ': `${cookieSeguras}`, 'Resultado: ': `${resultado}`})
                    //console.log(cookieSeguras);
                }


            }else{
                response.send({Mensaje:'No existe división para CERO'});
            }

        }else {
            response.status(400).send({mensaje: 'Error, Parámetros inválidos', error: 400});
        }

    }



}



import {Controller, Delete, Get, Headers, HttpCode, Param, Post, Put, Query, Body, Request, Response} from '@nestjs/common';
import { AppService } from './app.service';
import * as Joi from '@hapi/joi';



import {puts} from "util";
import {get} from "https";
import {isUndefined} from "../node_modules/@nestjs/common/utils/shared.utils";
//protocolo-ip-puerto
//http://192.168.1.10:3000/segmentoInicial
//http://192.168.1.10:3000/mascota/crear
//http://192.168.1.10:3000/mascota/borrar
//@Controller(segmentoInicial)
@Controller('/api')
export class AppController {

  constructor(private readonly appService: AppService) {}

//@Controller(segmentoAccion)
    @Get('/hello-world') // Metodo http

    helloWorld(){
        return 'hello-world';
    }

@Post('/hola-mundo') // Metodo http

  holaMundo(){
    return 'Hola-mundo';
  }

    @Delete('/salut-monde') // Metodo http

    deleteHello(){
        return 'salut-monde';
    }

    @Put('/ola-mundo')
    olaMundo(){
        return 'ola-mundo';
    }

    @Get('/adivina')

    adivina(@Headers() headers): string {
    console.log('Headers:', headers);
        const numeroRandomico = Math.round(Math.random()*10);
        const numeroCabecera = Number(headers.numero);
        if (numeroCabecera == numeroRandomico){
          return 'ok'
        }else{
          return ':('
        }
        // return 'ok';
        }

    //Parametros de consulta (QUERY)
        @Get('/consultar')
        consultar(@Query() queryParams){
            console.log(queryParams);
            if (queryParams.nombre){
                return `hola ${queryParams.nombre}`
            }
           // if(queryParams.nombre){
            // return 'hola' + queryParams
            //    return `hola ${queryParams.nombre}`
        else{
            return 'hola extraño'
        }
    }

    //parametros de ruta
    @Get('/ciudad/:idCuidad')
    ciudad(@Param() parametrosRuta){
      switch (parametrosRuta.idCiudad.toLowerCase()){
          case 'quito':
              return 'Hola';
          case 'guayaquil':
              return 'Dame majagua'
          default:
              return "que mas"
      }
    }
    //parametros de cuerpo
    @Post('registroComida')
    registroComida(@Body() parametrosCuerpo, @Request() request){
      console.log(request.body);
      console.log(parametrosCuerpo);
        return 'ok'
    }

    @Post('registroComida1')
    registroComida1(@Body() parametrosCuerpo, @Response () response){
      if(parametrosCuerpo.nombre && parametrosCuerpo.cantidad){

          const cantidad = Number(parametrosCuerpo.cantidad);
          if(parametrosCuerpo.cantidad > 1){
              //enviar cabeceras de respuesta
              response.set('premio', 'guatita') ;

          }
          return response.send({mensaje: 'registro creado'})

      }else{
          return response.status(400).send({mensaje: 'error, no envia nombre o cantidad', error: 400})
      }
    }

    @Get('/semilla')
    semilla(@Request() request, @Response() response){
      console.log(request.cookies); //obtener cookies no seguras
      //crear cookie
        const cookies = request.cookies; //JSON
        const esquemaValidacionNumero= Joi.object().keys({
            numero : Joi.number().integer().required()
        });

        const objetoValidacion ={
            numero: cookies.numero
        };
        const resultado = Joi.validate(objetoValidacion, esquemaValidacionNumero);
        if (resultado.error){
            console.log('resultado: ', resultado);
        }else{
            console.log('numero valido');
        }

        const cookieSegura =request.signedCookies.fechaServidor; //obtiene cookies seguras
        if(cookieSegura){
            console.log('Cookie segura');
        }else{
            console.log('No es valida esta cookie');
        }

        if(cookies.micookie){
            const horaFechaServidor = new Date();
            const minutos = horaFechaServidor.getMinutes();
            horaFechaServidor.setMinutes(minutos+1);
            //devolver una nueva cookie con nueva fecha
            response.cookie('fechaServidor',  //nombre
                new Date().getTime(), //valor
                {
                    //OPCIONES
                    expires : new Date()
                });
            return response.send('ok');
        }else{
            return response.send(':(');
        }
          }

          //-------------------------------------------------------//
                                    // DEBER 02 //

    @Get('/setearNombre')
    cookieUsuario(@Query() queryParams, @Request() request, @Response() response){

      const cookie = request.cookies;
      const esquemaValidacion= Joi.object().keys({
            usuario : Joi.string().required()
        });

        const objetoValidacion ={
            usuario: queryParams.nombre
        };
        const validacion = Joi.validate(objetoValidacion, esquemaValidacion);
        if (validacion.error){
            response.status(400).send({mensaje: 'Error, Nombre de usuario no es válido', error: 400});
        }else{
            const resultados = Math.round(Math.random() *10);
            const user = queryParams.nombre
            response.cookie(user, resultados);
            response.status(200).send({'NombreUsuario: ': `${user}`, 'Resultado: ': `${resultados}` });;
        }
    }

    /*
    //datos primitivos
  //js -ts
  */

    /*
var nombre= 'JENNY'; //string
  var edad = 29; //nummber
  var sueldo = 1.20; //number
  var casado = false; //boolean
  var hijos = null; //null
  var alas = undefined; //undefied

//let
let nombre1= 'JENNY'; //string
let edad1 = 29; //nummber
let sueldo1 = 1.20; //number
let casado1 = false; //boolean
let hijos1 = null; //null
let alas1 = undefined;

  /*
  Segmento incial: /api
  1 Segmento accion : GET ''hello-world' ->'Hello world'
  2 Segmento accion : POST 'hola-mundo'
  3 Segmento accion : PUT '-----'
  4 Segmento accion : DELETE '-----'
     */

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

const json = [
    {"llave":"valor"}
]
;

let objeto:any = {
  propiedad: 'valor',
    propiedadDOs: 'valor2'
};

objeto.propiedad //valor
objeto.propiedadDOs //valor

//crear propiedades a un objeto

objeto.propiedadTres = 'valor3';
objeto['propiedadTres'] = 'VALOR 3';

//Eliminar propiedad
delete objeto.propiedadTres; //--> //destruir
objeto.propiedadTres = undefined;

//Deber para mañana
//crear una ruta con metodo y nombre (NOMBRE DE LA COOKIE) cualquiera
//guardar nombre del usuario en una cookie insegura
//en la calculadora devolver un objeto json
//nombre del usuario y resultado

//Deber para el martes 30
// cuando el usuario utilice la calculadora por primera vez el sistema va a guardar una cookie segura
//con valor de 100
//al ejecutar la calculaora el resultado restar del total de la cooki segura

//al llegar a cero arreglar al objeto json un mensaje 'se le terminaron sus puntos'
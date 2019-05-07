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
            console.log('numero valido ok');
        }

        const cookieSegura =request.signedCookies.fechaServidor; //obtiene cookies seguras con nombre fechaServidor
        if(cookieSegura){
            console.log('Cookie segura', cookieSegura);
        }else{
            console.log('No es valida esta cookie');
        }

        if(cookies.micookie){
            const horaFechaServidor = new Date();
            const minutos = horaFechaServidor.getMinutes();
            horaFechaServidor.setMinutes(minutos+1);
            //devolver una nueva cookie con nueva fecha
            //response.cookie('fechaServidor', new Date().getTime());
            response.cookie('fechaServidor',  //nombre
              new Date().getTime(), //valor
            {
            //OPCIONES
            //expires : horaFechaServidor
            signed:true
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
            const user = queryParams.nombre;
            response.cookie(user, resultados);
            response.status(200).send({'NombreUsuario: ': `${user}`, 'Resultado: ': `${resultados}` });
        }
    }


    @Get('inicio')//endpoint
    inicio(@Response() res){
      return res.render('inicio', {estaVivo:false});
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

/*
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

*/

//Funcion que no devuelve nada -->void
function holaMundo() {
    console.log('hola mundo');
}

const respuesraHolaMundo = holaMundo(); //undefined
console.log('resp hola mundo: ', respuesraHolaMundo);

//Función que devuelve parámetros
function  suma(a:number,b:number):number {
    return a+ b;
}

const respuestaSuma = suma(1,2); //valor=3
console.log('resp suma: ', respuestaSuma);



//CONDICIONALES EN JS
//truty ->true
//falsy ->false

if({}){ //truty
    console.log('verdadero')

}else {
    console.log('falso')

}

if(null){ //truty
    console.log('verdadero jaja')

}else {
    console.log('falso :(xDxD')

}

//OPERADORES DE ARREGLOS EN JS
const arreglo: any = [1, 'A', true, null, {}];



//1)imprimir todos los elementos
const arregloNumerosForEach = [1,2,3,4,5,6];
arregloNumerosForEach.forEach(function (valorActual, indice, arreglo) {
    console.log(`valorActual: ${valorActual}`);
    console.log(`indice: ${indice}`);
    console.log(`arreglo: ${arreglo}`);
});

const rForEach1 = arregloNumerosForEach.forEach(function (valorActal) {
    console.log(`arreglonuevo: ${valorActal}`);
});
console.log(`respuesta ForEach nuevo ${rForEach1}`);

const rForEach = arregloNumerosForEach.
    forEach(valorActal=>
    console.log(`arreglo: ${valorActal}`));

//console.log(`respuesta ForEach: ${rForEach}`); -->undefined

//2)sumen 2 a los pares y 1 a los impares

const arregloNumerosMap = [1,2,3,4,5,6];
const rMap = arregloNumerosMap.
    map( //Devolver el nuevo valor de ese elemento
    (valorActual)=>{
    const esPar = valorActual %2 ==0;
    if(esPar){
        const nuevoValor = valorActual +2;
        return nuevoValor;
    }else{
        const nuevoValor = valorActual +1;
        return nuevoValor;
    }
});
console.log(`RESPUESTA MAP: ${rMap}`); //Nuevo arreglo

//3)encontrar si hay el n°4

const arregloNumerosFind = [1,2,3,4,5,6];
const rFind = arregloNumerosFind.
    find(//condición para devolver ese elemento
    (valorActual)=>{
        return valorActual ==4;
    }
);
console.log(`Respuesta Find: ${rFind}`);

//4)filtrar menores a 5

const arregloNumerosFilter = [1,2,3,4,5,6];
const rFilter = arregloNumerosFilter.
    filter(//CONDICIÓN TRUE ->Agrega al arreglo
            //CONDICIÓN FALSE ->Se omite del arreglo
        (valorActual)=>{
        return valorActual < 5;
    }
);
console.log(`Respuesta Filter: ${rFilter}`);

//5)TODOS los valores son positivos?

const arregloNumerosEvery = [1,2,3,4,5,6];
const respuestaEvery = arregloNumerosEvery.
every(//si TODOS cumplen TRUE
    //si ALGUNO no cumple FALSE
    (valorActual)=>{
    return valorActual > 0
});
console.log(`respuesta every: ${respuestaEvery}`); //true

//6)ALGÚN valor es menor q 2

const arregloNumerosSome = [1,2,3,4,5,6];

// si alguno cumple la condicion --> TRUE
// si todos no cumplen -->False
const respuestaSome=arregloNumerosSome.some((valorActual)=>{
    return valorActual<2;
});
console.log(`respuesta Some ${respuestaSome}`);

//7)sumar todos los valores

const arregloNumeroReduce = [1,2,3,4, 5, 6];
const valorDondeEmpiezaCalculo = 0;
const respuestaReduce =arregloNumeroReduce.
reduce((acumulado, valorActual)=>{
        return acumulado+valorActual;
    },
    valorDondeEmpiezaCalculo
);
console.log(`Respuesta Reduce: ${respuestaReduce}`);  //21

//Ejercicio
// <4 --> 10% +5
//>=4 --> 15%+3

const arregloNuevo = [1,2,3,4,5,6];
const acumulado = 0;

const respuesta =arregloNuevo.reduce((acumulado, valorActual)=>{

        if (valorActual<4){
            return acumulado +valorActual*1.1 +5

        }else
            return acumulado +valorActual*1.15 +5
    },
    valorDondeEmpiezaCalculo
);
console.log(`Respuesta: ${respuesta}`);


//8)restar todos los valores de 100
const arregloNumerosCien = [1, 2, 3, 4, 5, 6];
const valorDondeEmpiezaCien = 100;

const respuestaCien = arregloNumerosCien.reduce(
    (acumulado, valorActual) => {
        return acumulado - valorActual;
    },
    valorDondeEmpiezaCien);
console.log(`Respuesta resta de 100: ${respuestaCien}`); // 79


//1.1)sumen 10 a todos
//2.1)filtrar mayores a 15
//3.1) si hay algun numero myor a 30

const arregloEjercicio = [1,2,3,4,5,6];
arregloEjercicio.map((valorActual)=>{
    return valorActual +10; //suma 10
}).filter((valorActual)=>{
    return valorActual >15;  //>15
}).some((valorActual)=>{
    return valorActual>30;  //30 some devuelve frue o false
});


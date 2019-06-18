import {Controller, Res, Get, Post, Body, HttpCode} from "@nestjs/common";
import {TragosService} from "./tragos.services";
import {trago} from "./interfaces/trago";

@Controller('/api/traguito')

export class TragosController{

    constructor(private readonly _tragosService: TragosService) {

    }

    @Get('lista')
    async listarTragos(@Res() res){
        const arreglosTragos = await this._tragosService.buscar();
        res.render('tragos/lista-tragos',
            {
                arreglosTragos: arreglosTragos
            })
    }

    @Get('crear')
    crear(@Res() res){
        res.render('tragos/crear-editar')
    }

    @Post('crear')
    async crearTragoPost(
        @Body() trago:trago,
        @Res()  res,
        // @Body('nombre') nombre:string,
        // @Body('tipo') tipo:string,
        // @Body('gradosAlcohol') gradosAlcohol:number,
        // @Body('fechaCaducidad') fechaCaducidad:Date,
        // @Body('precio') precio:number,


    ){
        trago.gradosAlcohol=Number(trago.gradosAlcohol);
        trago.precio=Number(trago.precio);
        trago.fechaCaducidad=new Date(trago.fechaCaducidad);

        try{
            const respuestaCrear = await  this._tragosService.crear(trago); //promesa
            console.log('RESPUESTA: ', respuestaCrear);
            //this._tragosService.crear(trago); //devuelve una promesa
            res.redirect('/api/traguito/lista');

        }catch (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje: 'ERROR', codigo:500})
        }


        // console.log('Trago: ',trago, typeof trago);
        // console.log('nombre: ',nombre, typeof nombre);
        // console.log('tipo: ',tipo, typeof tipo);
        // console.log('gradosAlcohol: ',gradosAlcohol, typeof gradosAlcohol);
        // console.log('fechaCaducidad: ',fechaCaducidad, typeof fechaCaducidad);
        // console.log('precio: ',precio, typeof precio);

    }

 }
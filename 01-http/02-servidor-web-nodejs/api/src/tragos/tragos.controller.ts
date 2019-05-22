import {Controller, Res, Get, Post, Body} from "@nestjs/common";
import {TragosService} from "./tragos.services";
import {trago} from "./interfaces/trago";

@Controller('/api/traguito')

export class TragosController{

    constructor(private readonly _tragosService: TragosService) {

    }

    @Get('lista')
    listarTragos(@Res() res){
        const arreglosTragos = this._tragosService.bddTragos;
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
    crearTragoPost(
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
        console.log(trago);

        this._tragosService.crear(trago);
        res.redirect('/api/traguito/lista');

        // console.log('Trago: ',trago, typeof trago);
        // console.log('nombre: ',nombre, typeof nombre);
        // console.log('tipo: ',tipo, typeof tipo);
        // console.log('gradosAlcohol: ',gradosAlcohol, typeof gradosAlcohol);
        // console.log('fechaCaducidad: ',fechaCaducidad, typeof fechaCaducidad);
        // console.log('precio: ',precio, typeof precio);

    }

 }
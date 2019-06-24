import {Controller, Res, Get, Post, Body, HttpCode, Query} from "@nestjs/common";
import {TragosService} from "./tragos.services";
import {trago} from "./interfaces/trago";
import {TragosCreateDto} from "./DTO/tragos.create.dto";
import {validate} from "class-validator";

@Controller('/api/traguito')

export class TragosController {

    editado:boolean =false;
    tragoEditarId: number = null;

    constructor(private readonly _tragosService: TragosService) { //Con esto se tiene todos los métodos de tragosService

    }

    @Get('lista')
    async listarTragos(@Res() res) {
        const arreglosTragos = await this._tragosService.buscar();
        res.render('tragos/lista-tragos',
            {
                arreglosTragos: arreglosTragos
            })
    }

    @Get('crear')
    async crearTrago(
        @Res() res,
        @Query('mensaje') mensaje:string,
        @Query('id') id?: number
    ) {

        let editar;
        var tragoAux: trago = {
            nombre: "",
            tipo: "Cerveza",
            gradosAlcohol: null,
            fechaCaducidad: null,
            precio: null
        };
        if (id) {
            this.editado = true;
            this.tragoEditarId = Number(id);
            editar = this.editado;


            let aux = await this._tragosService.buscarporId(id);


            tragoAux = aux[0];

            res.render('tragos/crear-editar',
                { mensaje, tragoAux, editar });
        } else {
            this.editado = false;
            editar = this.editado;
            res.render('tragos/crear-editar',
                { mensaje, tragoAux, editar });
        }

        // res.render(
        //     'tragos/crear-editar',{
        //         mensaje: mensaje
        //     }
        // )
    }
    @Post('crear')
    async crearTragoPost(
        @Body() trago: trago,
        @Res()  res,
        // @Body('nombre') nombre:string,
        // @Body('tipo') tipo:string,
        // @Body('gradosAlcohol') gradosAlcohol:number,
        // @Body('fechaCaducidad') fechaCaducidad:Date,
        // @Body('precio') precio:number,


    ) {
        trago.gradosAlcohol = Number(trago.gradosAlcohol);
        trago.precio = Number(trago.precio);
        trago.fechaCaducidad = trago.fechaCaducidad ? new Date(trago.fechaCaducidad) : undefined;

        let tragoAValidar = new TragosCreateDto();

        tragoAValidar.nombre = trago.nombre;
        tragoAValidar.tipo = trago.tipo;
        tragoAValidar.fechaCaducidad = trago.fechaCaducidad;
        tragoAValidar.precio = trago.precio;
        tragoAValidar.gradosAlcohol = trago.gradosAlcohol;

        try {

            const errores = await validate(tragoAValidar);
            console.log(errores);
            console.log(tragoAValidar);
            console.log(trago);
            if (errores.length > 0) {

                console.error(errores);
                res.redirect('/api/traguito/crear?mensaje=Tienes un error en el formulario');

            } else {

                if (!this.editado) {
                    const respuestaCrear = await this._tragosService.crear(trago); //promesa
                } else {
                    const respuestaEditar = await this._tragosService.editarTrago(this.tragoEditarId, trago);
                    this.tragoEditarId = null;
                }

                res.redirect('/api/traguito/lista')

                // const respuestaCrear = await this._tragosService
                //     .crear(trago); // Promesa
                //
                // console.log('RESPUESTA: ', respuestaCrear);
                //
                // res.redirect('/api/traguito/lista');
            }
        }
        catch (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500});
        }


        // console.log('Trago: ',trago, typeof trago);
        // console.log('nombre: ',nombre, typeof nombre);
        // console.log('tipo: ',tipo, typeof tipo);
        // console.log('gradosAlcohol: ',gradosAlcohol, typeof gradosAlcohol);
        // console.log('fechaCaducidad: ',fechaCaducidad, typeof fechaCaducidad);
        // console.log('precio: ',precio, typeof precio);

    }

    @Post('eliminarTrago')
    async borrarTraguito(
        @Body('id') id: number,
        @Res() res
    ) {

        //this._tragossService.eliminar(id);
        console.log(id);
        await this._tragosService.eliminarTrago(Number(id));
        res.redirect('/api/traguito/lista')

    }



}
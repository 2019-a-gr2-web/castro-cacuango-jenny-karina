import { Controller, Res, Get } from "@nestjs/common";
import {TragosService} from "./tragos.services";

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
}
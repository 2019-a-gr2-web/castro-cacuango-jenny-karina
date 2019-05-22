import {Module} from "@nestjs/common";
import {TragosController} from "./tragos.controller";
import {TragosService} from "./tragos.services";

@Module({
    imports:[TragosModule],  // Modulos
    controllers:[
        TragosController
    ], // Controladores
    providers:[
        TragosService
    ], // Servicios
    exports:[
        TragosService
    ] // Exportar Servicios
})
export class TragosModule {

}
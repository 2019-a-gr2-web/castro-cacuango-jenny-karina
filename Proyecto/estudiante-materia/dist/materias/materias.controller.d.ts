import { MateriaService } from "./materias.service";
import { Materia } from "../Interfaces/materia";
export declare class MateriasController {
    private readonly MateriaService;
    constructor(MateriaService: MateriaService);
    gestionarHijos(params: any, headers: any, request: any, response: any): any;
    busquedaHijos(params: any, headers: any, request: any, response: any): any;
    crearMateria(params: any, res: any, request: any): any;
    crearMateriaPost(materia: Materia, res: any, params: any, request: any): any;
    eliminarMateria(params: any, res: any, estudianteID: number, idMateria: number, request: any): any;
    buscarMaterias(params: any, res: any, request: any): any;
    buscarMateria(params: any, res: any, busquedaMaterias: string, request: any): any;
}

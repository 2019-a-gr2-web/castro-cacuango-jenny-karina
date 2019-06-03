import { Estudiante } from "../Interfaces/estudiante";
import { EstudianteService } from "./estudiantes.services";
export declare class EstudianteController {
    private readonly _estudianteService;
    constructor(_estudianteService: EstudianteService);
    inicioSesion(res: any): any;
    home(res: any, request: any): any;
    gestionarEstudiante(request: any, response: any): any;
    gestionarEstudianteLista(headers: any, request: any, response: any): any;
    gestion(res: any, request: any): any;
    crearEstudiante(res: any, request: any): any;
    loginCookie1(headers: any, request: any, response: any, nombre: string): any;
    crearEstudiantePost(estudiante: Estudiante, res: any, request: any): any;
    eliminarEstudiante(res: any, id: number, request: any): any;
    buscarEstudiante(res: any, busquedaEstudiantes: string, request: any): any;
    borrarCookie(headers: any, request: any, response: any, nombre: string): void;
}

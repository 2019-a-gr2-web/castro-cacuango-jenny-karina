import { Estudiante } from "../Interfaces/estudiante";
export declare class EstudianteService {
    arregloEstudiantes: Estudiante[];
    codigoEstudiante: number;
    constructor();
    crear(estudiante: Estudiante): Estudiante;
    eliminarPorId(id: number): Estudiante[];
    buscarPorNombre(nombre: string): Estudiante[];
}

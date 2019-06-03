import { Materia } from "../Interfaces/materia";
export declare class MateriaService {
    bddMaterias: Materia[];
    recnum: number;
    constructor();
    crearMateria(nuevaMateria: Materia): Materia;
    eliminarPorId(id: number): Materia[];
    buscarPorNombre(nombre: string, id: number): Materia[];
    buscarPorId(id: number): Materia[];
}

import { Injectable } from '@nestjs/common';
import {Materia} from "../Interfaces/materia";

@Injectable()
export class MateriaService {
    bddMaterias: Materia[]=[];
    recnum=1;
    constructor (){

    }
    crearMateria(nuevaMateria: Materia):Materia {
        nuevaMateria.id= this.recnum;
        this.recnum++;
        this.bddMaterias.push(nuevaMateria);
        return nuevaMateria;
    }
    
    eliminarPorId(id:number):Materia[]{
        const indice= this.bddMaterias.findIndex(
            (materia)=>{
                return materia.id===id;
            }
        );
        this.bddMaterias.splice(indice,1);
        return this.bddMaterias;
    }
    
    buscarPorNombre(nombre: string, id: number) {
        const resultado=this.bddMaterias.filter(
            (materia)=>{
                return materia.nombre.includes(nombre) && materia.estudianteID===id ;;
            }
        );
        return resultado;
    }

    buscarPorId(id: number) {
        const resultado=this.bddMaterias.filter(
            (materia)=>{
                return materia.estudianteID===id;
            }
        );
        return resultado;
    }
}

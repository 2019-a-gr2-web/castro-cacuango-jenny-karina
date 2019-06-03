import { Injectable } from '@nestjs/common';
import {Estudiante} from "../Interfaces/estudiante";

@Injectable()
export class EstudianteService {
    arregloEstudiantes: Estudiante[]=[];
    codigoEstudiante=1;
    constructor (){
    }

    crear(estudiante: Estudiante):Estudiante {
        estudiante.id= this.codigoEstudiante;
        this.codigoEstudiante++;
        this.arregloEstudiantes.push(estudiante);
        return estudiante;
    }

    eliminarPorId(id:number):Estudiante[]{
        const indice= this.arregloEstudiantes.findIndex(estudiante=> {return estudiante.id===id});
        this.arregloEstudiantes.splice(indice,1);
        return this.arregloEstudiantes;
    }

    buscarPorNombre(nombre: string) {
        const resultado=this.arregloEstudiantes.filter(estudiante=>{return estudiante.nombre.includes(nombre)});
        return resultado;
    }

}

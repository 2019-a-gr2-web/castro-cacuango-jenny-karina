import {Injectable} from "@nestjs/common";
import {trago} from "./interfaces/trago";

@Injectable()
export class TragosService {

    bddTragos: trago[] = [];
    recnum = 1;

    constructor(){
        const traguito:trago={
            nombre: 'Pilsener',
            gradosAlcohol:4.3,
            fechaCaducidad:new Date(2019,5,21),
            precio:1.75,
            tipo:'Cerveza'
        };
    }

    crear(nuevoTrago: trago):trago {
        nuevoTrago.id = this.recnum;
        this.recnum++;
        this.bddTragos.push(nuevoTrago);
        return nuevoTrago;
    }

    buscarPorId(id: number):trago {
        return this.bddTragos.find(
            (trago) => {
                return trago.id === id;
            }
        );
    }

    buscarPorNombre(nombre: string):trago {
        return this.bddTragos.find(
            (trago) => {
                return trago.nombre.toUpperCase().includes(nombre.toUpperCase());
            }
        );
    }

    eliminarPorId(id: number):trago[] {
        const indice = this.bddTragos.findIndex(
            (trago) => {
                return trago.id === id
            }
        );
        this.bddTragos.splice(indice,1);
        return this.bddTragos;
    }

    actualizar(tragoActualizado: trago, id:number):trago[] {

        const indice = this.bddTragos.findIndex(
            (trago) => {
                return trago.id === id
            }
        );
        tragoActualizado.id = this.bddTragos[indice].id;
        this.bddTragos[indice] = tragoActualizado;

        return this.bddTragos;
    }

}

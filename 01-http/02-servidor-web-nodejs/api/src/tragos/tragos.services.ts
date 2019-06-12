import {Injectable} from "@nestjs/common";
import {trago} from "./interfaces/trago";
import {TragosEntity} from "./tragos.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {error} from "util";

@Injectable()
export class TragosService {

    bddTragos: trago[] = [];
    recnum = 1;

    constructor(@InjectRepository(TragosEntity)
                private readonly _tragosRepository: Repository<TragosEntity>,){

        const traguito:trago={
            nombre: 'Pilsener',
            gradosAlcohol:4.3,
            fechaCaducidad:new Date(2019,5,21),
            precio:1.75,
            tipo:'Cerveza'
        };

        const objetoEntidad = this._tragosRepository.create(traguito); //ayuda a crear un objeto de esa entidad
        this._tragosRepository.save(objetoEntidad).then((datos)=>{
            console.log('Dato creado: ', datos)
        }
        ).catch((error)=>{
            console.log('Error: ', error);
        })
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

import {Injectable} from "@nestjs/common";
import {trago} from "./interfaces/trago";
import {TragosEntity} from "./tragos.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository} from "typeorm";
import {error, log} from "util";

@Injectable()
export class TragosService {

    bddTragos: trago[] = [];
    recnum = 1; //gestiona id de los tragos

    constructor(@InjectRepository(TragosEntity)
                private readonly _tragosRepository: Repository<TragosEntity>,){

        const traguito:trago={
            nombre: 'Pilsener',
            gradosAlcohol:4.3,
            fechaCaducidad:new Date(2019,5,21),
            precio:1.75,
            tipo:'Cerveza'
        };


        const objetoEntidad = this._tragosRepository.create(traguito);

        console.log('LINEA 1');
        this._tragosRepository
            .save(objetoEntidad) // Promesa
            .then(
                (datos)=>{
                    console.log('LINEA 2');
                    // console.log('Dato creado:', datos);
                }
            )
            .catch(
                (error)=>{
                    console.log('LINEA 3');
                    // console.error('Error:', error);
                }
            );
        console.log('LINEA 4');

        this.crear(traguito)
    }

    buscar(parametrosBusqueda?):Promise<trago[]>{
        return this._tragosRepository.find(parametrosBusqueda)
    }


    crear(nuevoTrago: trago):Promise<trago> {
        // nuevoTrago.id = this.recnum;
        // this.recnum++;
        // this.bddTragos.push(nuevoTrago);
        // return nuevoTrago;

        const objetoEntidad = this._tragosRepository
            .create(nuevoTrago);

        return this._tragosRepository.save(objetoEntidad);
    }

    buscarporId(id: number): Promise<trago[]> {

        return this._tragosRepository.find({ id: id })
    }

    // buscarPorId(id: number):trago {
    //     return this.bddTragos.find(
    //         (trago) => {
    //             return trago.id === id;
    //         }
    //     );
    // }

    editarTrago(idtragoOriginal: number, tragoEditado: trago) {
        return this._tragosRepository.update(idtragoOriginal,
            {
                nombre: tragoEditado.nombre,
                tipo: tragoEditado.tipo,
                gradosAlcohol: tragoEditado.gradosAlcohol,
                precio: tragoEditado.precio,
                fechaCaducidad: tragoEditado.fechaCaducidad });
    }

    eliminarTrago(id: number): Promise<DeleteResult> {
        return this._tragosRepository.delete(id);
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

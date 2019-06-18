import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('db_fiesta')
export class FiestaEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre: string;

    @OneToMany( type => FiestaEntity, fiesta => fiesta)
    fiestas: FiestaEntity[]

}
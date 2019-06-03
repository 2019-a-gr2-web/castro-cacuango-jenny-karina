export interface Materia{
    id?: number;
    nombre: string;
    codigo: string;
    descripcion: string;
    activo: boolean;
    fecha_Creacion: Date;
    numeroHorasPorSemana: number;
    estudianteID: number;

}
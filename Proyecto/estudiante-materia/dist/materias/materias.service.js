"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let MateriaService = class MateriaService {
    constructor() {
        this.bddMaterias = [];
        this.recnum = 1;
    }
    crearMateria(nuevaMateria) {
        nuevaMateria.id = this.recnum;
        this.recnum++;
        this.bddMaterias.push(nuevaMateria);
        return nuevaMateria;
    }
    eliminarPorId(id) {
        const indice = this.bddMaterias.findIndex((materia) => {
            return materia.id === id;
        });
        this.bddMaterias.splice(indice, 1);
        return this.bddMaterias;
    }
    buscarPorNombre(nombre, id) {
        const resultado = this.bddMaterias.filter((materia) => {
            return materia.nombre.includes(nombre) && materia.estudianteID === id;
            ;
        });
        return resultado;
    }
    buscarPorId(id) {
        const resultado = this.bddMaterias.filter((materia) => {
            return materia.estudianteID === id;
        });
        return resultado;
    }
};
MateriaService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], MateriaService);
exports.MateriaService = MateriaService;
//# sourceMappingURL=materias.service.js.map
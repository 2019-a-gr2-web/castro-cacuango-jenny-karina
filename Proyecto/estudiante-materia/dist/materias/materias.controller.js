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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const materias_service_1 = require("./materias.service");
let MateriasController = class MateriasController {
    constructor(MateriaService) {
        this.MateriaService = MateriaService;
    }
    gestionarHijos(params, headers, request, response) {
        id = Number(params.id);
        const cookieSeg = request.signedCookies;
        const arregloMaterias = this.MateriaService.buscarPorId(Number(id));
        if (cookieSeg.nombreUsuario) {
            return response.render('Materias/gestionarMateria', { id: id, arregloMaterias: arregloMaterias, nombre: cookieSeg.nombreUsuario });
        }
        else {
            return response.redirect('/examen/inicioSesion');
        }
    }
    busquedaHijos(params, headers, request, response) {
        id = Number(params.id);
        const cookieSeg = request.signedCookies;
        if (cookieSeg.nombreUsuario) {
            return response.render('Materias/gestionarMateria', { id: id, arregloMaterias: arregloMateriaBusqueda, nombre: cookieSeg.nombreUsuario });
        }
        else {
            return response.redirect('/examen/inicioSesion');
        }
    }
    crearMateria(params, res, request) {
        const cookieSeg = request.signedCookies;
        if (cookieSeg.nombreUsuario) {
            return res.render('Materias/crearMateria', {
                nombre: cookieSeg.nombreUsuario,
                id: id
            });
        }
        else {
            return res.redirect('/examen/inicioSesion');
        }
    }
    crearMateriaPost(materia, res, params, request) {
        const cookieSeg = request.signedCookies;
        materia.numeroHorasPorSemana = Number(materia.numeroHorasPorSemana);
        materia.codigo = String(materia.codigo);
        materia.descripcion = String(materia.descripcion);
        materia.estudianteID = Number(materia.estudianteID);
        materia.fecha_Creacion = new Date(materia.fecha_Creacion);
        this.MateriaService.crearMateria(materia);
        if (cookieSeg.nombreUsuario) {
            res.redirect('/examen/Estudiante/gestionarMaterias/' + id);
        }
        else {
            return res.redirect('/examen/inicioSesion');
        }
    }
    eliminarMateria(params, res, estudianteID, idMateria, request) {
        const cookieSeg = request.signedCookies;
        this.MateriaService.eliminarPorId(Number(idMateria));
        if (cookieSeg.nombreUsuario) {
            res.redirect('/examen/Estudiante/gestionarMaterias/' + estudianteID);
        }
        else {
            return res.redirect('/examen/inicioSesion');
        }
    }
    buscarMaterias(params, res, request) {
        const cookieSeg = request.signedCookies;
        if (cookieSeg.nombreUsuario) {
            return res.redirect('/examen/Estudiante/buscarMateria' + id);
        }
        else {
            return res.redirect('/examen/inicioSesion');
        }
    }
    buscarMateria(params, res, busquedaMaterias, request) {
        const cookieSeg = request.signedCookies;
        arregloMateriaBusqueda = this.MateriaService.buscarPorNombre(busquedaMaterias, id);
        if (busquedaMaterias != null) {
            if (cookieSeg.nombreUsuario) {
                res.redirect('/examen/Estudiante/busquedaMateria/' + id);
            }
            else {
                return res.redirect('/examen/inicioSesion');
            }
        }
        else {
            if (cookieSeg.nombreUsuario) {
                res.redirect('/examen/Estudiante/gestionarMaterias/' + id);
            }
            else {
                return res.redirect('/examen/inicioSesion');
            }
        }
    }
};
__decorate([
    common_1.Get('/gestionarMaterias/:id'),
    __param(0, common_1.Param()),
    __param(1, common_1.Headers()),
    __param(2, common_1.Request()),
    __param(3, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], MateriasController.prototype, "gestionarHijos", null);
__decorate([
    common_1.Get('/busquedaMateria/:id'),
    __param(0, common_1.Param()), __param(1, common_1.Headers()), __param(2, common_1.Request()), __param(3, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], MateriasController.prototype, "busquedaHijos", null);
__decorate([
    common_1.Get('/crearMateria/:id'),
    __param(0, common_1.Param()), __param(1, common_1.Res()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], MateriasController.prototype, "crearMateria", null);
__decorate([
    common_1.Post('/crearMateria'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, common_1.Param()),
    __param(3, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], MateriasController.prototype, "crearMateriaPost", null);
__decorate([
    common_1.Post('eliminarMaterias'),
    __param(0, common_1.Param()), __param(1, common_1.Res()), __param(2, common_1.Body('EstudianteIdMateria')),
    __param(3, common_1.Body('idMateria')), __param(4, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number, Number, Object]),
    __metadata("design:returntype", void 0)
], MateriasController.prototype, "eliminarMateria", null);
__decorate([
    common_1.Get('/buscarProd/:id'),
    __param(0, common_1.Param()), __param(1, common_1.Res()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], MateriasController.prototype, "buscarMaterias", null);
__decorate([
    common_1.Post('buscarMateria'),
    __param(0, common_1.Param()), __param(1, common_1.Res()),
    __param(2, common_1.Body('busquedaMaterias')), __param(3, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, Object]),
    __metadata("design:returntype", void 0)
], MateriasController.prototype, "buscarMateria", null);
MateriasController = __decorate([
    common_1.Controller('/examen/Estudiante'),
    __metadata("design:paramtypes", [materias_service_1.MateriaService])
], MateriasController);
exports.MateriasController = MateriasController;
let id;
let arregloMateriaBusqueda;
//# sourceMappingURL=materias.controller.js.map
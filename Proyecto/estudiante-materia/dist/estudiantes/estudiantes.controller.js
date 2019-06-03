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
const estudiantes_services_1 = require("./estudiantes.services");
let EstudianteController = class EstudianteController {
    constructor(_estudianteService) {
        this._estudianteService = _estudianteService;
    }
    inicioSesion(res) {
        return res.render('login');
    }
    home(res, request) {
        const cookieSeg = request.signedCookies;
        if (cookieSeg.nombreUsuario) {
            return res.render('home', { nombre: cookieSeg.nombreUsuario });
        }
        else {
            return res.redirect('/api/login');
        }
    }
    gestionarEstudiante(request, response) {
        const cookieSegura = request.signedCookies;
        const arregloEstudiante = this._estudianteService.arregloEstudiantes;
        if (cookieSegura.nombreUsuario) {
            return response.render('Estudiantes/gestionarEstudiante', { arregloEstudiante: arregloEstudiante, nombre: cookieSegura.nombreUsuario });
            console.log("Estoy seguro");
        }
        else {
            return response.redirect('/api/login');
            console.log("La cookie no vale");
        }
    }
    gestionarEstudianteLista(headers, request, response) {
        const cookieSeg = request.signedCookies;
        if (cookieSeg.nombreUsuario) {
            return response.render('Estudiantes/gestionarEstudiante', { arregloEstudiante: arregloEstudianteBusqueda, nombre: cookieSeg.nombreUsuario });
        }
        else {
            return response.redirect('/api/login');
        }
    }
    gestion(res, request) {
        const cookieSeg = request.signedCookies;
        if (cookieSeg.nombreUsuario) {
            res.redirect('/api/gestionarEstudiante');
        }
        else {
            return res.redirect('/api/login');
        }
    }
    crearEstudiante(res, request) {
        const cookieSeg = request.signedCookies;
        if (cookieSeg.nombreUsuario) {
            return res.render('Estudiantes/crearEstudiante', {
                nombre: cookieSeg.nombreUsuario
            });
        }
        else {
            return res.redirect('/api/login');
        }
    }
    loginCookie1(headers, request, response, nombre) {
        const cookieSeg = request.signedCookies;
        if (!cookieSeg.nombreUsuario) {
            response.cookie('nombreUsuario', nombre, { signed: true });
            cookieSeg.nombreUsuario = nombre;
        }
        if (cookieSeg.nombreUsuario) {
            response.redirect('/api/home');
        }
        else {
            return response.redirect('/api/login');
        }
    }
    crearEstudiantePost(estudiante, res, request) {
        const cookieSeg = request.signedCookies;
        estudiante.fechaNacimiento = new Date(estudiante.fechaNacimiento);
        estudiante.semestreActual = String(estudiante.semestreActual);
        estudiante.graduado = Boolean(estudiante.graduado);
        this._estudianteService.crear(estudiante);
        if (cookieSeg.nombreUsuario) {
            res.redirect('/api/gestionarEstudiante');
        }
        else {
            return res.redirect('/api/login');
        }
    }
    eliminarEstudiante(res, id, request) {
        const cookieSeg = request.signedCookies;
        this._estudianteService.eliminarPorId(Number(id));
        if (cookieSeg.nombreUsuario) {
            res.redirect('/api/gestionarEstudiante');
        }
        else {
            return res.redirect('/api/login');
        }
    }
    buscarEstudiante(res, busquedaEstudiantes, request) {
        const cookieSeg = request.signedCookies;
        arregloEstudianteBusqueda = this._estudianteService.buscarPorNombre(busquedaEstudiantes);
        if (busquedaEstudiantes != null) {
            if (cookieSeg.nombreUsuario) {
                res.redirect('/api/busquedaEstudiante');
            }
            else {
                return res.redirect('/api/login');
            }
        }
        else {
            if (cookieSeg.nombreUsuario) {
                res.redirect('/api/busquedaEstudiante');
            }
            else {
                return res.redirect('/api/login');
            }
        }
    }
    borrarCookie(headers, request, response, nombre) {
        response.clearCookie("nombreUsuario");
        response.redirect('/api/login');
    }
};
__decorate([
    common_1.Get('/login'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EstudianteController.prototype, "inicioSesion", null);
__decorate([
    common_1.Get('/home'),
    __param(0, common_1.Response()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EstudianteController.prototype, "home", null);
__decorate([
    common_1.Get('/gestionarEstudiante'),
    __param(0, common_1.Request()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EstudianteController.prototype, "gestionarEstudiante", null);
__decorate([
    common_1.Get('/busquedaEstudiante'),
    __param(0, common_1.Headers()),
    __param(1, common_1.Request()),
    __param(2, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], EstudianteController.prototype, "gestionarEstudianteLista", null);
__decorate([
    common_1.Get('/gestion'),
    __param(0, common_1.Response()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EstudianteController.prototype, "gestion", null);
__decorate([
    common_1.Get('/crearEstudiante'),
    __param(0, common_1.Res()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EstudianteController.prototype, "crearEstudiante", null);
__decorate([
    common_1.Post('/login'),
    __param(0, common_1.Headers()),
    __param(1, common_1.Request()),
    __param(2, common_1.Response()),
    __param(3, common_1.Body('nombre')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, String]),
    __metadata("design:returntype", void 0)
], EstudianteController.prototype, "loginCookie1", null);
__decorate([
    common_1.Post('/crearEstudiante'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], EstudianteController.prototype, "crearEstudiantePost", null);
__decorate([
    common_1.Post('eliminar'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body('id')),
    __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], EstudianteController.prototype, "eliminarEstudiante", null);
__decorate([
    common_1.Post('/buscarEstudiante'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body('busquedaEstudiantes')),
    __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], EstudianteController.prototype, "buscarEstudiante", null);
__decorate([
    common_1.Post('/borrarCookie'),
    __param(0, common_1.Headers()), __param(1, common_1.Request()), __param(2, common_1.Response()), __param(3, common_1.Body('nombre')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, String]),
    __metadata("design:returntype", void 0)
], EstudianteController.prototype, "borrarCookie", null);
EstudianteController = __decorate([
    common_1.Controller('/api'),
    __metadata("design:paramtypes", [estudiantes_services_1.EstudianteService])
], EstudianteController);
exports.EstudianteController = EstudianteController;
let arregloEstudianteBusqueda;
//# sourceMappingURL=estudiantes.controller.js.map
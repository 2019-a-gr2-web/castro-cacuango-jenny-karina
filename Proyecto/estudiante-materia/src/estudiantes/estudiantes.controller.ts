import {Controller, Get, Response, Request, Headers, Post, Body, Res} from '@nestjs/common';
import {Estudiante} from "../Interfaces/estudiante";
import {EstudianteService} from "./estudiantes.services";


@Controller('/api')
export class EstudianteController {
    constructor(private readonly _estudianteService: EstudianteService) {
    }
    
    @Get('/login')
    inicioSesion(@Response() res){return res.render('login')
    }

    @Get('/home')
    home(@Response() res,  @Request() request){
        const cookieSeg = request.signedCookies;
        if (cookieSeg.nombreUsuario) {
            return res.render('home',{nombre:cookieSeg.nombreUsuario})
        }
        else{
            return res.redirect('/api/login');
        }
    }

    @Get('/gestionarEstudiante')
    gestionarEstudiante(@Request() request, @Response() response) {
        const cookieSegura = request.signedCookies;
        const arregloEstudiante = this._estudianteService.arregloEstudiantes;
        if (cookieSegura.nombreUsuario) {
            return response.render('Estudiantes/gestionarEstudiante',
            {arregloEstudiante:arregloEstudiante,nombre:cookieSegura.nombreUsuario})
        } else {
            return response.redirect('/api/login');
        }
    }

    @Get('/busquedaEstudiante')
    gestionarEstudianteLista(
        @Headers() headers, 
        @Request() request, 
        @Response() response) {
        const cookieSeg = request.signedCookies;
        if (cookieSeg.nombreUsuario) {
            return response.render('Estudiantes/gestionarEstudiante',
            {arregloEstudiante:arregloEstudianteBusqueda,nombre:cookieSeg.nombreUsuario})
        }
        else{
            return response.redirect('/api/login');
        }

    }

 

    @Get('/gestion')
    gestion(@Response() res, @Request() request){
        const cookieSeg = request.signedCookies;
        if (cookieSeg.nombreUsuario) {
            res.redirect('/api/gestionarEstudiante')
        }
        else{
            return res.redirect('/api/login');
        }
    }

    

    @Get('/crearEstudiante')
    crearEstudiante( @Res() res,@Request() request){
        const cookieSeg = request.signedCookies;
        if (cookieSeg.nombreUsuario) {
            return res.render('Estudiantes/crearEstudiante',{
                nombre:cookieSeg.nombreUsuario
            })
        }
        else{
            return res.redirect('/api/login');
        }
    }

    @Post('/login')
    loginCookie1(
        @Headers() headers, 
        @Request() request, 
        @Response() response, 
        @Body('nombre') nombre: string) {
        const cookieSeg = request.signedCookies;
        if (!cookieSeg.nombreUsuario) {
            response.cookie('nombreUsuario', nombre,{signed: true});
            cookieSeg.nombreUsuario=nombre;
        }
        if (cookieSeg.nombreUsuario) {

            response.redirect('/api/home')
        }
        else{
            return response.redirect('/api/login');
        }
    }

    @Post('/crearEstudiante')
    crearEstudiantePost(
        @Body() estudiante:Estudiante,
        @Res() res,
        @Request() request
    ){
        const cookieSeg = request.signedCookies;
        estudiante.fechaNacimiento =  new Date(estudiante.fechaNacimiento);
        estudiante.semestreActual = String(estudiante.semestreActual)
        estudiante.graduado= Boolean(estudiante.graduado);
        this._estudianteService.crear(estudiante);
        if (cookieSeg.nombreUsuario) {
            res.redirect('/api/gestionarEstudiante');
        }
        else{
            return res.redirect('/api/login');
        }
    }


    @Post('eliminar')
    eliminarEstudiante(
        @Res() res,
        @Body('id') id: number,
        @Request() request) {
        const cookieSeg = request.signedCookies;
        this._estudianteService.eliminarPorId(Number(id));
        if (cookieSeg.nombreUsuario) {
            res.redirect('/api/gestionarEstudiante');
        }
        else{
            return res.redirect('/api/login');
        }
    }


    @Post('/buscarEstudiante')
    buscarEstudiante(
        @Res() res,
        @Body('busquedaEstudiantes') busquedaEstudiantes: string, 
        @Request() request) {
        const cookieSeg = request.signedCookies;
        arregloEstudianteBusqueda=this._estudianteService.buscarPorNombre(busquedaEstudiantes);
        if(busquedaEstudiantes!=null){
            if (cookieSeg.nombreUsuario) {
                res.redirect('/api/busquedaEstudiante');
            }
            else{
                return res.redirect('/api/login');
            }
        }else {
            if (cookieSeg.nombreUsuario) {
                res.redirect('/api/busquedaEstudiante');
            }
            else{
                return res.redirect('/api/login');
            }
        }
    }

    @Post('/borrarCookie')
    borrarCookie(@Headers() headers, @Request() request, @Response() response, @Body('nombre') nombre: string) {
        response.clearCookie("nombreUsuario");
        response.redirect('/api/login')
    }
}

let arregloEstudianteBusqueda:Estudiante[];
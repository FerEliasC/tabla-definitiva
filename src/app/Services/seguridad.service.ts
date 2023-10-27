import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { ResponseApi } from '../Interfaces/response-api';
//import { Login } from '../Interfaces/login';
//import { Usuario } from '../Interfaces/usuario';

import {
  CredencialesUsuarioDTO,
  RespuestaAutenticacionDTO,
} from '../Interfaces/tsSeguridad';
@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  private urlApi: string = environment.endpoint + 'Usuario/';

  constructor(private http: HttpClient) {}

  //Campo para acceder al token en el local storage
  private readonly zvLlaveToken = 'token';
  //Campo para acceder a la fecha de expiración del token
  private readonly zvLlaveExpiracion = 'token-expiracion';

  //Para loguearte en el software
  zfLogin(
    zCredenciales: CredencialesUsuarioDTO
  ): Observable<RespuestaAutenticacionDTO> {
    return this.http.post<RespuestaAutenticacionDTO>(
      `${this.urlApi}IniciarSesion`,
      zCredenciales
    );
  }

  //Guarda el token en el local storage
  zfGuardarToken(zRespuestaAutenticacionDTO: RespuestaAutenticacionDTO) {
    localStorage.setItem(this.zvLlaveToken, zRespuestaAutenticacionDTO.token);
    localStorage.setItem(
      this.zvLlaveExpiracion,
      zRespuestaAutenticacionDTO.fechaExpiracion!.toString()
    );
  }

  //Obtiene el valor de un campo especifíco
  zfObtenerCampoJwt(zCampo: string): string {
    const zvToken = localStorage.getItem(this.zvLlaveToken);
    if (!zvToken) {
      return '';
    }
    var zvDataToken = JSON.parse(window.atob(zvToken.split('.')[1]));
    return zvDataToken[zCampo];
  }

  //Obtiene el token del local storage
  zfObtenerToken() {
    return localStorage.getItem(this.zvLlaveToken);
  }
}

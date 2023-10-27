import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { ResponseApi } from '../Interfaces/response-api';
import { MenuRol } from '../Interfaces/menu-rol';

@Injectable({
  providedIn: 'root',
})
export class MenuRolService {
  private urlApi: string = environment.endpoint + 'RolMenu/';

  constructor(private http: HttpClient) {}

  lista(id: number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}Lista/${id}`);
  }

  eliminarrolmenu(id:number):Observable<ResponseApi>{
     return this.http.delete<ResponseApi>(`${this.urlApi}EliminarMenuRol/${id}`)
  }

  guardararolmenu(lista:Array<number>,id:number):Observable<ResponseApi>{
    console.log(lista);
    return this.http.post<ResponseApi>(`${this.urlApi}CrearListaMenuRol/${id}`, lista);
  }

  // guardar(request: MenuActividadUsuario): Observable<ResponseApi> {
  //   return this.http.post<ResponseApi>(`${this.urlApi}Guardar`, request);
  // }

  // eliminar(id: number): Observable<ResponseApi> {
  //   return this.http.delete<ResponseApi>(`${this.urlApi}Eliminar/${id}`);
  // }

  // listas(): Observable<ResponseApi> {
  //   return this.http.get<ResponseApi>(`${this.urlApi}Listas`);
  // }



  // guardaractividadpermisousuario(lista:Array<number>,idUsuario:number,idMenu:number):Observable<ResponseApi>{
  //   console.log(lista);
  //   return this.http.post<ResponseApi>(`${this.urlApi}GuardarPermisoUsuario/${idUsuario}/${idMenu}`, lista);
  // }
}

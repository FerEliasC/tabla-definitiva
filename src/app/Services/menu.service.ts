import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { ResponseApi } from '../Interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private urlApi: string = environment.endpoint + 'Menu/';

  constructor(private http: HttpClient) {}

  lista(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(
      `${this.urlApi}Lista`
    );
  }

  listas(indice: string): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}Listas?indice=${indice}`);
  }

  listarolmenu(correo: string): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(
      `${this.urlApi}Permiso?correo=${correo}`
    );
  }
}

import { Injectable } from '@angular/core';

import{HttpClient} from "@angular/common/http";
import{Observable} from 'rxjs';
import {environment} from 'src/enviroments/environment';
import { ResponseApi } from '../Interfaces/response-api';
import { Corporativo } from '../Interfaces/corporativo';

@Injectable({
  providedIn: 'root'
})
export class CorporativoService {

  private urlApi:string = environment.endpoint + "Corporativo/";


  constructor(private http:HttpClient) { }

lista():Observable<ResponseApi>{
  return this.http.get<ResponseApi>(`${this.urlApi}Lista`)
}

guardar(request:Corporativo):Observable<ResponseApi>{
  return this.http.post<ResponseApi>(`${this.urlApi}Guardar`,request)
}

editar(request:Corporativo):Observable<ResponseApi>{
  return this.http.put<ResponseApi>(`${this.urlApi}Editar`,request)
}

eliminar(id:number):Observable<ResponseApi>{
  return this.http.delete<ResponseApi>(`${this.urlApi}Eliminar/${id}`)
}
}

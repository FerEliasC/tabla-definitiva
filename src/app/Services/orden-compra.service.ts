import { Injectable } from '@angular/core';

import{HttpClient} from "@angular/common/http";
import{Observable} from 'rxjs';
import {environment} from 'src/enviroments/environment';
import { ResponseApi } from '../Interfaces/response-api';
import { OrdenCompra } from '../Interfaces/orden-compra';

@Injectable({
  providedIn: 'root'
})
export class OrdenCompraService {

  private urlApi:string = environment.endpoint + "OrdenCompraWS/";

  constructor(private http:HttpClient) { }

  obtenerOC(Orden:string):Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}ObtenerOC/${Orden}`)
  }
  ObtenerOC2(Orden:string,div:string):Observable<ResponseApi>{
    //return this.http.get<ResponseApi>(`${this.urlApi}ObtenerOCFechas/${Orden}`)
    return this.http.get<ResponseApi>(`${this.urlApi}ObtenerOC2/${Orden}/${div}`);
  }

}

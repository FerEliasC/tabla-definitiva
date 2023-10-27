import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
//import { Sesion } from '../Interfaces/sesion';
import { jsDocComment } from '@angular/compiler';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UtilidadService {
  constructor(private _snackBar: MatSnackBar) {}

  //Campo para acceder al token en el local storage
  private readonly zvLlaveToken = 'token';
  //Campo para acceder a la fecha de expiración del token
  private readonly zvLlaveExpiracion = 'token-expiracion';

  mostrarAlerta(mensaje: string, tipo: string) {
    this._snackBar.open(mensaje, tipo, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  guardarSesionUsuario(zCampo: string): string {
    //localStorage.setItem('usuario', JSON.stringify(usuarioSession));
    const zvToken = localStorage.getItem(this.zvLlaveToken);
    if (!zvToken) {
      return '';
    }
    var zvDataToken = JSON.parse(window.atob(zvToken.split('.')[1]));
    return zvDataToken[zCampo];
  }

  eliminarSesionUsuario() {
    localStorage.removeItem(this.zvLlaveToken);
    localStorage.removeItem(this.zvLlaveExpiracion);
  }
}

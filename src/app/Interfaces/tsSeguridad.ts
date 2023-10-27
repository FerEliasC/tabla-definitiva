import { AbstractControl, ValidatorFn } from '@angular/forms';

export interface CredencialesUsuarioDTO {
  //Correo electrónico de la cuenta
  email: string;
  //Contraseña de la cuenta
  password: string;
}

//Esta interfaz es para obtener el token y la fecha de expiración
export interface RespuestaAutenticacionDTO {
  //Llave que nos permite entrar a un archivo
  token: string;
  //Fecha en la que expira el token
  fechaExpiracion: Date;
}

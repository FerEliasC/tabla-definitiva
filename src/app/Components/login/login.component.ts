import { Component, OnInit } from '@angular/core';
import { SeguridadService } from 'src/app/Services/seguridad.service';

import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CredencialesUsuarioDTO} from'src/app/Interfaces/tsSeguridad';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ocultarPassword:boolean=true;
  mostrarLoading:boolean=false;

  constructor(private formBuilder: FormBuilder,private seguridadService: SeguridadService,
    private router: Router,
    private _utilidadServicio:UtilidadService) { }

    formularioLogin!: FormGroup;

  ngOnInit(): void {
    this.formularioLogin = this.formBuilder.group({
      Email: ['', {
        validators: [Validators.required, Validators.email]
      }],
      Password: ['', {
        validators: [Validators.required]
      }]
    })  
  }

  iniciarSesion(zCredenciales:CredencialesUsuarioDTO){
    console.log(zCredenciales);
    this.seguridadService.zfLogin(zCredenciales)
    .subscribe({
      next: (zRespuesta) => {
        console.log('RespuestaLogin');
        console.log(zRespuesta);
        this.seguridadService.zfGuardarToken(zRespuesta);
        this.router.navigate(["pages"])
      },
      error: () => {
        this._utilidadServicio.mostrarAlerta("Hubo un error","Opps!")
      }
    });
  }

}

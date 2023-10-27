import { Component, OnInit, Inject } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from 'src/app/Interfaces/rol';
import { Usuario } from 'src/app/Interfaces/usuario';
import { Empresa } from 'src/app/Interfaces/empresa';

import { RolService } from 'src/app/Services/rol.service';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { EmpresaService } from 'src/app/Services/empresa.service';

import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css'],
})
export class ModalUsuarioComponent implements OnInit {
  formularioUsuario: FormGroup;
  additionalSelectionCount: number = 0; // Declaración e inicialización de la variable
  additionalSelectionLabel!: string;
  nombreCompletoControl = new FormControl();
  ocultarPassword: boolean = true;
  tituloAccion: string = 'Agregar';
  botonAccion: string = 'Guardar';
  listaRoles: Rol[] = [];
  listaEmpresas: Empresa[] = [];

  constructor(
    private modalActual: MatDialogRef<ModalUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public datosUsuario: Usuario,
    private fb: FormBuilder,
    private _rolServicio: RolService,
    private _usuarioServicio: UsuarioService,
    private _utilidadServicio: UtilidadService,
    private _empresaServicio: EmpresaService
  ) {
    this.formularioUsuario = this.fb.group({
      idUsuario: [''],
      nombreCompleto: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      rfc: [''],
      correo: ['', Validators.required],
      idRol: [''],
      password: ['', Validators.required],
      esActivo: ['1', Validators.required],
      idEmpresa: [''],
      noEmpresas: [[]],
    });

    if (this.datosUsuario != null) {
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
    }

    this._rolServicio.lista().subscribe({
      next: (data) => {
        if (data.status) this.listaRoles = data.value;
      },
      error: (e) => {},
    });
  }

  ngOnInit(): void {
    this.obtenerEmpresas();
    if (this.datosUsuario != null) {
      //this.nombreCompletoControl.setValue(this.datosUsuario.nombreCompleto);
      this.formularioUsuario.patchValue({
        idUsuario:this.datosUsuario.idUsuario,
        nombreCompleto: this.datosUsuario.nombreCompleto,
        nombreUsuario: this.datosUsuario.nombreUsuario,
        correo: this.datosUsuario.correo,
        password: this.datosUsuario.password,
        rfc: this.datosUsuario.rfc,
        esActivo: this.datosUsuario.esActivo.toString(),
        idRol: this.datosUsuario.idRol,
        idEmpresa: this.datosUsuario.idEmpresa,
        noEmpresas: this.datosUsuario.noEmpresas,
      });
    }
  }

  obtenerEmpresas() {
    this._empresaServicio.lista().subscribe({
      next: (data) => {
        if (data.status) this.listaEmpresas = data.value;
        //  console.log("prueba: "+ this.listaMenus)
      },
      error: (e) => {},
    });
  }

  guardarEditar_Usuario() {
    const _usuario: Usuario = {
      id: this.datosUsuario == null ? 0 : this.datosUsuario.id,
      idUsuario: this.formularioUsuario.value.idUsuario,
      nombreCompleto: this.formularioUsuario.value.nombreCompleto,
      nombreUsuario: this.formularioUsuario.value.nombreUsuario,
      rfc: this.formularioUsuario.value.rfc,
      correo: this.formularioUsuario.value.correo,
      idRol: this.formularioUsuario.value.idRol,
      rolDescripcion: '',
      password: this.formularioUsuario.value.password,
      esActivo: parseInt(this.formularioUsuario.value.esActivo),
      idEmpresa: Number( this.formularioUsuario.value.idEmpresa),
      empresaDescripcion: '',
      noEmpresas: this.formularioUsuario.value.noEmpresas
    };

    if (this.datosUsuario == null) {
      console.log(_usuario);
      this._usuarioServicio.guardar(_usuario).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.mostrarAlerta(
              'El usuario fue registrado',
              'Exito'
            );
            this.modalActual.close('true');
          } else
            this._utilidadServicio.mostrarAlerta(
              'No se pudo registrar el usuario',
              'Error'
            );
        },
        error: (e) => {},
      });
    } else {
      this._usuarioServicio.editar(_usuario).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.mostrarAlerta(
              'El usuario fue editado',
              'Exito'
            );
            this.modalActual.close('true');
          } else
            this._utilidadServicio.mostrarAlerta(
              'No se pudo editar el usuario',
              'Error'
            );
        },
        error: (e) => {},
      });
    }
  }
}

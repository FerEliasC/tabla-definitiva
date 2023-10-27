import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Rol } from 'src/app/Interfaces/rol';

import { RolService } from 'src/app/Services/rol.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';


@Component({
  selector: 'app-modal-rol',
  templateUrl: './modal-rol.component.html',
  styleUrls: ['./modal-rol.component.css']
})
export class ModalRolComponent implements OnInit {
  formularioRol: FormGroup;
  ocultarPassword: boolean = true;
  tituloAccion: string = 'Agregar';
  botonAccion: string = 'Guardar';

  constructor(
    private modalActual: MatDialogRef<ModalRolComponent>,
    @Inject(MAT_DIALOG_DATA) public datosRol: Rol,
    private fb: FormBuilder,
    private _rolServicio: RolService,
    private _utilidadServicio: UtilidadService
  ) {
    this.formularioRol = this.fb.group({
      nombre: ['', Validators.required],
    });

    if (this.datosRol != null) {
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
    }
  }

  ngOnInit(): void {
    console.log(this.datosRol);
    if (this.datosRol != null) {
      this.formularioRol.patchValue({
        nombre: this.datosRol.nombre,
      });
    }
  }

  guardarEditar_Rol() {
    const _rol: Rol = {
      id: this.datosRol == null ? 0 : this.datosRol.id,
      nombre: this.formularioRol.value.nombre,
    };

    if (this.datosRol == null) {
      this._rolServicio.guardar(_rol).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.mostrarAlerta(
              'El rol fue registrado',
              'Exito'
            );
            this.modalActual.close('true');
          } else
            this._utilidadServicio.mostrarAlerta(
              'No se pudo registrar el rol',
              'Error'
            );
        },
        error: (e) => {},
      });
    } else {
      this._rolServicio.editar(_rol).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.mostrarAlerta(
              'El rol fue editado',
              'Exito'
            );
            this.modalActual.close('true');
          } else
            this._utilidadServicio.mostrarAlerta(
              'No se pudo editar el rol',
              'Error'
            );
        },
        error: (e) => {},
      });
    }
  }



}

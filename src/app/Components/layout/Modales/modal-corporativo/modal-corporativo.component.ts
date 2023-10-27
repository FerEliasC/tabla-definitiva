import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Corporativo } from 'src/app/Interfaces/corporativo';

import { CorporativoService } from 'src/app/Services/corporativo.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';

@Component({
  selector: 'app-modal-corporativo',
  templateUrl: './modal-corporativo.component.html',
  styleUrls: ['./modal-corporativo.component.css'],
})
export class ModalCorporativoComponent implements OnInit {
  formularioCorporativo: FormGroup;
  ocultarPassword: boolean = true;
  tituloAccion: string = 'Agregar';
  botonAccion: string = 'Guardar';

  constructor(
    private modalActual: MatDialogRef<ModalCorporativoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosCorporativo: Corporativo,
    private fb: FormBuilder,
    private _corporativoServicio: CorporativoService,
    private _utilidadServicio: UtilidadService
  ) {
    this.formularioCorporativo = this.fb.group({
      Nombre: ['', Validators.required],
      Estatus: ['1',],
    });

    if (this.datosCorporativo != null) {
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
    }
  }

  ngOnInit(): void {
    console.log(this.datosCorporativo);
    if (this.datosCorporativo != null) {
      this.formularioCorporativo.patchValue({
        Nombre: this.datosCorporativo.nombre,
        Estatus: this.datosCorporativo.estatus.toString(),
      });
    }
  }

  guardarEditar_Corporativo() {
    const _corporativo: Corporativo = {
      id: this.datosCorporativo == null ? 0 : this.datosCorporativo.id,
      nombre: this.formularioCorporativo.value.Nombre,
      estatus: parseInt(this.formularioCorporativo.value.Estatus),
    };

    if (this.datosCorporativo == null) {
      this._corporativoServicio.guardar(_corporativo).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.mostrarAlerta(
              'El corporativo fue registrado',
              'Exito'
            );
            this.modalActual.close('true');
          } else
            this._utilidadServicio.mostrarAlerta(
              'No se pudo registrar el corporativo',
              'Error'
            );
        },
        error: (e) => {},
      });
    } else {
      this._corporativoServicio.editar(_corporativo).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.mostrarAlerta(
              'El corporativo fue editado',
              'Exito'
            );
            this.modalActual.close('true');
          } else
            this._utilidadServicio.mostrarAlerta(
              'No se pudo editar el corporativo',
              'Error'
            );
        },
        error: (e) => {},
      });
    }
  }
}

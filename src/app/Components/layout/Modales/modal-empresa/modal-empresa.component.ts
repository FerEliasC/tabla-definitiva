import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Empresa } from 'src/app/Interfaces/empresa';

import { EmpresaService } from 'src/app/Services/empresa.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';

import { Corporativo } from 'src/app/Interfaces/corporativo';
import { CorporativoService } from 'src/app/Services/corporativo.service';

@Component({
  selector: 'app-modal-empresa',
  templateUrl: './modal-empresa.component.html',
  styleUrls: ['./modal-empresa.component.css'],
})
export class ModalEmpresaComponent implements OnInit {
  formularioEmpresa: FormGroup;
  ocultarPassword: boolean = true;
  tituloAccion: string = 'Agregar';
  botonAccion: string = 'Guardar';
  listaCorporativos: Corporativo[] = [];

  constructor(
    private modalActual: MatDialogRef<ModalEmpresaComponent>,
    @Inject(MAT_DIALOG_DATA) public datosEmpresa: Empresa,
    private fb: FormBuilder,
    private _empresaServicio: EmpresaService,
    private _corporativoServicio: CorporativoService,
    private _utilidadServicio: UtilidadService
  ) {
    this.formularioEmpresa = this.fb.group({
      anio: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      rfc: ['', Validators.required],
      pais: ['', Validators.required],
      estado: ['', Validators.required],
      cp: ['', Validators.required],
      colonia: ['', Validators.required],
      municipio: ['', Validators.required],
      localidad: ['', Validators.required],
      direccion: ['', Validators.required],
      noExt: ['', Validators.required],
      noInt: [''],
      referencia: [''],
      telefono: [''],
      telefonoVenta: [''],
      email: [''],
      estatus: ['1', Validators.required],
      idCorporativo: ['', Validators.required],
      corporativoDescripcion: [''],
    });

    if (this.datosEmpresa != null) {
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
    }

    this._corporativoServicio.lista().subscribe({
      next: (data) => {
        if (data.status) this.listaCorporativos = data.value;
      },
      error: (e) => {},
    });
  }

  ngOnInit(): void {
    console.log(this.datosEmpresa);
    if (this.datosEmpresa != null) {
      this.formularioEmpresa.patchValue({
        anio: this.datosEmpresa.anio,
        nombre: this.datosEmpresa.nombre,
        descripcion: this.datosEmpresa.descripcion,
        rfc: this.datosEmpresa.rfc,
        pais: this.datosEmpresa.pais,
        estado: this.datosEmpresa.estado,
        cp: this.datosEmpresa.cp,
        colonia: this.datosEmpresa.colonia,
        municipio: this.datosEmpresa.municipio,
        localidad: this.datosEmpresa.localidad,
        direccion: this.datosEmpresa.direccion,
        noExt: this.datosEmpresa.noExt,
        noInt: this.datosEmpresa.noInt,
        referencia: this.datosEmpresa.referencia,
        telefono: this.datosEmpresa.telefono,
        telefonoVenta: this.datosEmpresa.telefonoVenta,
        email: this.datosEmpresa.email,
        estatus: this.datosEmpresa.estatus.toString(),
        idCorporativo: this.datosEmpresa.idCorporativo,
      });
    }
  }

  guardarEditar_Empresa() {
    const _empresa: Empresa = {
      id: this.datosEmpresa == null ? 0 : this.datosEmpresa.id,
      anio: this.formularioEmpresa.value.anio,
      nombre: this.formularioEmpresa.value.nombre,
      descripcion: this.formularioEmpresa.value.descripcion,
      rfc: this.formularioEmpresa.value.rfc,
      pais: this.formularioEmpresa.value.pais,
      estado: this.formularioEmpresa.value.estado,
      cp: this.formularioEmpresa.value.cp,
      colonia: this.formularioEmpresa.value.colonia,
      municipio: this.formularioEmpresa.value.municipio,
      localidad: this.formularioEmpresa.value.localidad,
      direccion: this.formularioEmpresa.value.direccion,
      noExt: this.formularioEmpresa.value.noExt,
      noInt: this.formularioEmpresa.value.noInt,
      referencia: this.formularioEmpresa.value.referencia,
      telefono: this.formularioEmpresa.value.telefono,
      telefonoVenta: this.formularioEmpresa.value.telefonoVenta,
      email: this.formularioEmpresa.value.email,
      estatus: this.formularioEmpresa.value.estatus,
      idCorporativo: this.formularioEmpresa.value.idCorporativo,
      corporativoDescripcion: '',
    };

    if (this.datosEmpresa == null) {
      console.log(_empresa);
      this._empresaServicio.guardar(_empresa).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.mostrarAlerta(
              'La empresa fue registrada',
              'Exito'
            );
            this.modalActual.close('true');
          } else
            this._utilidadServicio.mostrarAlerta(
              'No se pudo registrar la empresa',
              'Error'
            );
        },
        error: (e) => {},
      });
    } else {
      this._empresaServicio.editar(_empresa).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.mostrarAlerta(
              'La Empresa fue editada',
              'Exito'
            );
            this.modalActual.close('true');
          } else
            this._utilidadServicio.mostrarAlerta(
              'No se pudo editar la Empresa',
              'Error'
            );
        },
        error: (e) => {},
      });
    }
  }
}

import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalEmpresaComponent } from '../../Modales/modal-empresa/modal-empresa.component';
import { Empresa } from 'src/app/Interfaces/empresa';
import { EmpresaService } from 'src/app/Services/empresa.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
})
export class EmpresaComponent implements OnInit, AfterViewInit {
  columnasTabla: string[] = [
    'anio',
    'nombre',
    'descripcion',
    'rfc',
    'acciones',
  ];

  dataInicio: Empresa[] = [];
  dataListaEmpresas = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _empresaServicio: EmpresaService,
    private _utilidadServicio: UtilidadService
  ) {}

  obtenerEmpresa() {
    this._empresaServicio.lista().subscribe({
      next: (data) => {
        if (data.status) this.dataListaEmpresas.data = data.value;
        else
          this._utilidadServicio.mostrarAlerta(
            'No se encontraron datos',
            'Oops!'
          );
      },
      error: (e) => {
        console.log;
      },
    });
  }

  ngOnInit(): void {
    this.obtenerEmpresa();
  }

  ngAfterViewInit(): void {
    this.dataListaEmpresas.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaEmpresas.filter = filterValue.trim().toLocaleLowerCase();
  }

  nuevoEmpresa() {
    this.dialog
      .open(ModalEmpresaComponent, {
        disableClose: true,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado == 'true') this.obtenerEmpresa();
      });
  }

  editarEmpresa(empresa:Empresa) {
    this.dialog
      .open(ModalEmpresaComponent, {
        disableClose: true,
        data: empresa,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado == 'true') this.obtenerEmpresa();
      });
  }
}

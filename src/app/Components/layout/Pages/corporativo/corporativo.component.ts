import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalCorporativoComponent } from '../../Modales/modal-corporativo/modal-corporativo.component';
import { Corporativo } from 'src/app/Interfaces/corporativo';
import { CorporativoService } from 'src/app/Services/corporativo.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-corporativo',
  templateUrl: './corporativo.component.html',
  styleUrls: ['./corporativo.component.css']
})
export class CorporativoComponent implements OnInit, AfterViewInit {
  columnasTabla: string[] = ['nombre', 'estado', 'acciones'];

  dataInicio: Corporativo[] = [];
  dataListaCorporativos = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _corporativoServicio: CorporativoService,
    private _utilidadServicio: UtilidadService
  ) {}

  obtenerCorporativos() {
    this._corporativoServicio.lista().subscribe({
      next: (data) => {
        if (data.status) this.dataListaCorporativos.data = data.value;
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
    this.obtenerCorporativos();
  }

  ngAfterViewInit(): void {
    this.dataListaCorporativos.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaCorporativos.filter = filterValue.trim().toLocaleLowerCase();
  }

  nuevoCorporativo() {
    this.dialog
      .open(ModalCorporativoComponent, {
        disableClose: true,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado == 'true') this.obtenerCorporativos();
      });
  }

  editarCorporativo(corporativo: Corporativo) {
    console.log(corporativo);
    this.dialog
      .open(ModalCorporativoComponent, {
        disableClose: true,
        data: corporativo,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado == 'true') this.obtenerCorporativos();
      });
  }

  eliminarCorporativo(corporativo: Corporativo) {
    Swal.fire({
      title: '¿Desea eliminar el corporativo?',
      text: corporativo.nombre,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._corporativoServicio.eliminar(corporativo.id).subscribe({
          next: (data) => {
            if (data.status) {
              this._utilidadServicio.mostrarAlerta(
                'El corporativo fue eliminado',
                'Listo!'
              );
              this.obtenerCorporativos();
            } else
              this._utilidadServicio.mostrarAlerta(
                'No se pudo eliminar el corporativo',
                'Error'
              );
          },
          error: (e) => {},
        });
      }
    });
  }
}
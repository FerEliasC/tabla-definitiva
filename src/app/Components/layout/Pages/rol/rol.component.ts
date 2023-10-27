import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalRolComponent } from '../../Modales/modal-rol/modal-rol.component';
import { Rol } from 'src/app/Interfaces/rol';
import { RolService } from 'src/app/Services/rol.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2';
import { ViewportScroller } from '@angular/common';

import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css'],
})
export class RolComponent implements OnInit, AfterViewInit {
  columnasTabla: string[] = ['Id', 'nombre', 'acciones'];

  dataInicio: Rol[] = [];
  dataListaRol = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _rolServicio: RolService,
    private _utilidadServicio: UtilidadService,
    private router: Router,
  ) {}

  obtenerRoles() {
    this._rolServicio.lista().subscribe({
      next: (data) => {
        if (data.status) this.dataListaRol.data = data.value;
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
    this.obtenerRoles();
  }

  AgregarActividad(rol: Rol) {

    this.router.navigate(['pages/menu_rol'],{queryParams:{rol:rol.id}});
  }

  ngAfterViewInit(): void {
    this.dataListaRol.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaRol.filter = filterValue.trim().toLocaleLowerCase();
  }

  nuevoRol() {
    this.dialog
      .open(ModalRolComponent, {
        disableClose: true,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado == 'true') this.obtenerRoles();
      });
  }

  editarRol(rol: Rol) {
    this.dialog
      .open(ModalRolComponent, {
        disableClose: true,
        data: rol,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado == 'true') this.obtenerRoles();
      });
  }

  eliminarRol(rol: Rol) {
    Swal.fire({
      title: '¿Desea eliminar el rol',
      text: rol.nombre,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._rolServicio.eliminar(rol.id).subscribe({
          next: (data) => {
            if (data.status) {
              this._utilidadServicio.mostrarAlerta(
                'El rol fue eliminado',
                'Listo!'
              );
              this.obtenerRoles();
            } else
              this._utilidadServicio.mostrarAlerta(
                'No se pudo eliminar el rol',
                'Error'
              );
          },
          error: (e) => {},
        });
      }
    });
  }
}

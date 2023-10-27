import { Component, OnInit, AfterViewInit, ViewChild, inject } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalUsuarioComponent } from '../../Modales/modal-usuario/modal-usuario.component';
import { Usuario } from 'src/app/Interfaces/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2';
import { ViewportScroller } from '@angular/common';
//import { MenuUsuario } from 'src/app/Interfaces/menu-usuario';
import { MatSelectChange } from '@angular/material/select';

//import { MenuService } from 'src/app/Services/menu.service';
//import { Menu } from 'src/app/Interfaces/menu';
import { elements } from 'chart.js';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit, AfterViewInit {
  columnasTabla: string[] = [
    'nombreCompleto',
    'rfc',
    'empresa',
    'estado',
    'acciones',
  ];
  dataInicio: Usuario[] = [];
  dataListaUsuarios = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  // listaMenusProcesos: Menu[] = [];
  // listaMenusCatalogos: Menu[] = [];
  // listaMenusConfiguracion: Menu[] = [];

  constructor(
    private dialog: MatDialog,
    private _usuarioServicio: UsuarioService,
    private _utilidadServicio: UtilidadService,
    //private _menuServicio: MenuService,
    private router: Router, 
    private activatedRoute:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
    // this.obtenerMenuUsuarioProcesos();
    // this.obtenerMenuUsuarioCatalogos();
    // this.obtenerMenuUsuarioConfiguracion();
  }

  obtenerUsuarios() {
    this._usuarioServicio.lista().subscribe({
      next: (data) => {
        console.log(data);
        if (data.status) this.dataListaUsuarios.data = data.value;
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

  // AgregarActividad(usuario: Usuario) {

  //   this.router.navigate(['pages/permiso_actividad_usuario'],{queryParams:{usuario:usuario.idUsuario}});
  // }

  // obtenerMenuUsuarioProcesos() {
  //   this._menuServicio.listas('1').subscribe({
  //     next: (data) => {
  //       if (data.status) this.listaMenusProcesos = data.value;
  //       //  console.log("prueba: "+ this.listaMenus)
  //     },
  //     error: (e) => {},
  //   });
  // }

  // obtenerMenuUsuarioCatalogos() {
  //   this._menuServicio.listas('2').subscribe({
  //     next: (data) => {
  //       if (data.status) this.listaMenusCatalogos = data.value;
  //       //  console.log("prueba: "+ this.listaMenus)
  //     },
  //     error: (e) => {},
  //   });
  // }

  // obtenerMenuUsuarioConfiguracion() {
  //   this._menuServicio.listas('3').subscribe({
  //     next: (data) => {
  //       if (data.status) this.listaMenusConfiguracion = data.value;
  //       //  console.log("prueba: "+ this.listaMenus)
  //     },
  //     error: (e) => {},
  //   });
  // }

  ngAfterViewInit(): void {
    this.dataListaUsuarios.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaUsuarios.filter = filterValue.trim().toLocaleLowerCase();
  }

  nuevoUsuario() {
    this.dialog
      .open(ModalUsuarioComponent, {
        disableClose: true,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado == 'true') this.obtenerUsuarios();
      });
  }

  editarUsuario(usuario: Usuario) {
    this.dialog
      .open(ModalUsuarioComponent, {
        disableClose: true,
        data: usuario,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado == 'true') this.obtenerUsuarios();
      });
  }

  eliminarUsuario(usuario: Usuario) {
    // Swal.fire({
    //   title: '¿Desea eliminar el usuario?',
    //   text: usuario.nombreCompleto,
    //   icon: 'warning',
    //   confirmButtonColor: '#3085d6',
    //   confirmButtonText: 'Si, eliminar',
    //   showCancelButton: true,
    //   cancelButtonColor: '#d33',
    //   cancelButtonText: 'No, volver',
    // }).then((resultado) => {
    //   if (resultado.isConfirmed) {
    //     this._usuarioServicio.eliminar(usuario.idUsuario).subscribe({
    //       next: (data) => {
    //         if (data.status) {
    //           this._utilidadServicio.mostrarAlerta(
    //             'El usuario fue eliminado',
    //             'Listo!'
    //           );
    //           this.obtenerUsuarios();
    //         } else
    //           this._utilidadServicio.mostrarAlerta(
    //             'No se pudo eliminar el usuario',
    //             'Error'
    //           );
    //       },
    //       error: (e) => {},
    //     });
    //   }
    // });
  }

  // EliminarPermisoUsuario(id: number) {
  //   this._usuarioServicio.eliminarpermisousuario(id).subscribe({
  //     next: (data) => {
  //       if (data.status) {
  //         // this._utilidadServicio.mostrarAlerta(
  //         //   'El usuario fue eliminado',
  //         //   'Listo!'
  //         // );
  //       } //else
  //       //   this._utilidadServicio.mostrarAlerta(
  //       //     'No se pudo eliminar el permiso del usuario',
  //       //     'Error'
  //       //   );
  //     },
  //     error: (e) => {},
  //   });
  // }

  // AgregarPermisoUsuario(seleccion: number[], id: number) {
  //   console.log('seleccions' + seleccion);
  //   this._usuarioServicio.guardarpermisousuario(seleccion, id).subscribe({
  //     next: (data) => {
  //       if (data.status) {
  //         //this.obtenerUsuarios();
  //         //this.obtenerMenuUsuario();
  //       } //else
  //       // this._utilidadServicio.mostrarAlerta(
  //       //   'No se pudo crear el permiso del usuario',
  //       //   'Error'
  //       // );
  //     },
  //     error: (e) => {},
  //   });
  // }

  // //Esta función es para que al momento de seleccionar un permiso de un usuario
  // //asignarle o quitarle un permiso por medio de los checkbox
  // zfSeleccionChangeUsuarioPermiso(usuario: MenuUsuario, seleccion: number[]) {
  //   this.EliminarPermisoUsuario(usuario.idUsuario);
  //   this.AgregarPermisoUsuario(seleccion, usuario.idUsuario);
  //   //const seleccionados = this.listaMenus.filter(menu => this.listaMenus.includes(menu));
  // }
}

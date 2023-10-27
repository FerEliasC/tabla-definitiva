import { Component, OnInit, AfterViewInit, ViewChild, inject } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { UsuarioService } from 'src/app/Services/usuario.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';

import { MenuService } from 'src/app/Services/menu.service';

//import { MenuActividadUsuario } from 'src/app/Interfaces/menu-actividad-usuario';

//import { MenuActividadUsuarioService } from 'src/app/Services/menu-actividad-usuario.service';
//import { Actividades } from 'src/app/Interfaces/actividades';
import { ActivatedRoute } from '@angular/router';

import { Rol } from 'src/app/Interfaces/rol';
import { MenuRolService } from 'src/app/Services/menu-rol.service';
import { Menu } from 'src/app/Interfaces/menu';
import { MenuRol } from 'src/app/Interfaces/menu-rol';

@Component({
  selector: 'app-menu-rol',
  templateUrl: './menu-rol.component.html',
  styleUrls: ['./menu-rol.component.css']
})
export class MenuRolComponent implements OnInit, AfterViewInit  {
  columnasTabla: string[] = [
    'nombre',
    'permisos',
  ];
  menus!: Menu[];
  dataMenu = new MatTableDataSource(this.menus);
  dataInicio:Rol[]=[];
  dataListaMenu = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  idRol!:number;
  listaMenusProcesos: Menu[] = [];
  listaMenusCatalogos: Menu[] = [];
  listaMenusConfiguracion: Menu[] = [];

  constructor(
    private _utilidadServicio: UtilidadService,
    private _menurolServicio:MenuRolService,
    private route:ActivatedRoute,
    private _menuServicio: MenuService
  ) {}

  ngOnInit(): void {
    this.idRol=this.route.snapshot.queryParams['rol'];
    this.obtenerRol(Number(this.idRol));
    this.obtenerMenu();
    this.obtenerMenuUsuarioProcesos();
    this.obtenerMenuUsuarioCatalogos();
    this.obtenerMenuUsuarioConfiguracion();
  }

  obtenerMenu() {
    this._menuServicio.lista().subscribe({
      next: (data) => {
        console.log(data);
        if (data.status) this.dataMenu.data = data.value;
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

  obtenerRol(idRol:number) {
    this._menurolServicio.lista(idRol).subscribe({
      next: (data) => {
        console.log(data);
        if (data.status) this.dataListaMenu.data = data.value;
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

  obtenerMenuUsuarioProcesos() {
    this._menuServicio.listas('1').subscribe({
      next: (data) => {
        if (data.status) this.listaMenusProcesos = data.value;
        //  console.log("prueba: "+ this.listaMenus)
      },
      error: (e) => {},
    });
  }

  obtenerMenuUsuarioCatalogos() {
    this._menuServicio.listas('2').subscribe({
      next: (data) => {
        if (data.status) this.listaMenusCatalogos = data.value;
        //  console.log("prueba: "+ this.listaMenus)
      },
      error: (e) => {},
    });
  }

  obtenerMenuUsuarioConfiguracion() {
    this._menuServicio.listas('3').subscribe({
      next: (data) => {
        if (data.status) this.listaMenusConfiguracion = data.value;
        //  console.log("prueba: "+ this.listaMenus)
      },
      error: (e) => {},
    });
  }

  ngAfterViewInit(): void {
    this.dataListaMenu.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaMenu.filter = filterValue.trim().toLocaleLowerCase();
  }

  zfSeleccionChangeMenuRol(rol: Rol, seleccion: number[]) {
    //console.log(rol.id); 
    this.EliminarMenuRol(rol.id);
    this.AgregarMenuRol(seleccion,rol.id);
    console.log(seleccion,rol.id); 
   }

   EliminarMenuRol(id: number) {
    this._menurolServicio.eliminarrolmenu(id).subscribe({
      next: (data) => {
        if (data.status) {
        } 
      },
      error: (e) => {},
    });
 }

 AgregarMenuRol(seleccion: number[], id: number) {
  this._menurolServicio.guardararolmenu(seleccion, id).subscribe({
    next: (data) => {
      if (data.status) {
      }
    },
    error: (e) => {},
  });
}

}

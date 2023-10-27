import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
//import { Menu } from 'src/app/Interfaces/menu';

import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { SeguridadService } from 'src/app/Services/seguridad.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  correoUsuario: string = '';
  constructor(
    private router: Router,
    //private _menuServicio: MenuService,
    private _utilidadServicio: UtilidadService,
    private _seguridadServicio:SeguridadService
  ) {}

  ngOnInit(): void {

     const usuario = this._seguridadServicio.zfObtenerCampoJwt('email');
     console.log(usuario);

     if (usuario != null) {
       this.correoUsuario = usuario;
    //   this.rolUsuario = usuario.rolDescripcion;
    //   this.idUsuario = usuario.idUsuario;
    //   console.log(this.idUsuario);


    //   this._menuServicio.lista(usuario.idUsuario).subscribe({
    //     next: (data) => {
    //       if (data.status) {
    //         const menusAgrupados = data.value.reduce(
    //           (result: { [key: string]: any[] }, item: any) => {
    //             const indice = item.indice;

    //             if (!result[indice]) {
    //               result[indice] = [];
    //             }

    //             result[indice].push(item);

    //             return result;
    //           },
    //           {}
    //         );

    //         // Ahora tienes los elementos agrupados en menusAgrupados, puedes asignarlos a diferentes listas según el índice
    //         this.listaMenusProcesos = menusAgrupados[1] || [];
    //         this.listaMenusCatalogos = menusAgrupados[2] || [];
    //         this.listaMenusConfiguracion = menusAgrupados[3] || [];

    //         // Puedes continuar con más listas según tus necesidades
    //       }
    //     },
    //     error: () => {
    //       // Maneja el error si es necesario
    //     },
    //   });
     }
  }

  cerrarSesion() {
    this._utilidadServicio.eliminarSesionUsuario();
    this.router.navigate(['login']);
  }

}

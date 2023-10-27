import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { OrdenCompra } from 'src/app/Interfaces/orden-compra';
import { OrdenCompraService } from 'src/app/Services/orden-compra.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';

@Component({
  selector: 'app-orden-compra',
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.css'],
})

export class OrdenCompraComponent implements OnInit, AfterViewInit {
  noLinea : string = "";
  ordenCompra:string="";
  division:string="";
  columnasTabla1: string[] = [
    'seleccionar',
    'numeroOrdenCompra',
    'proveedor',
    'fecha',
    'total',
    'estatusOrdenCompra',
  ];
  dataInicio: OrdenCompra[] = [];
  dataListaOrdenCompra = new MatTableDataSource(this.dataInicio);

  columnasTabla2: string[] = [
    'seleccionar',
    'noLinea',
    'descripcion',
    'cantidad',
    'unidad',
    'costoUnitario',
    'costoTotal',
  ];
  dataInicio2: OrdenCompra[] = [];
  dataListaOrdenCompraDetalle = new MatTableDataSource(this.dataInicio2);

  columnasTabla3: string[] = [
    'noLinea',
    'cantidad',
    'descripcion',
    'unidadMedida',
    'precioUnitario',
    'importe',
  ];
  dataInicio3: OrdenCompra[] = [];
  dataListaOrdenCompraentradasDetalle = new MatTableDataSource(
    this.dataInicio3
  );

  columnasTabla4: string[] = ['noEntrada','fecha','total','moneda','referencia'];
  dataInicio4: OrdenCompra[] = [];
  dataListaOrdenCompraentradasDetalleGeneral = new MatTableDataSource(
    this.dataInicio4
  );

  /*Traer los dato por ng for*/

  // Tabla 2 = detalle orden de compra
  // Tabla 3 =  entradas
  // tabla 4 = entradas por  línea
  // Tabla 5 = detalle enntradas por linea

  mostrarContenido = false;
  mostrarContenido2 = false;
  mostrarContenido3 = false;
  mostrarContenido4 = false;
  mostrarTabla2: boolean = false;
  mostrarTabla3: boolean = false;
  mostrarTabla4: boolean = false;
  mostrarTabla5: boolean = false

  /*
  toggleContenido() {
    this.mostrarContenido = !this.mostrarContenido;
    this.mostrarContenido = true;
  }

  toggleContenido2(noLinea: string) {
    this.mostrarContenido2 = true;
    this.noLinea = noLinea;
  }

  toggleContenido3(noEntrada: string) {
    this.mostrarContenido4 = true;
  }
 */

toggleTabla2() {
  this.mostrarTabla2 = !this.mostrarTabla2;
}

toggleTabla3() {
  this.mostrarTabla3 = !this.mostrarTabla3;
}

toggleTabla4() {
  this.mostrarTabla4 = !this.mostrarTabla4;
  this.mostrarTabla3 = !this.mostrarTabla3;
  this.mostrarTabla5 = false;
}

toggleBotonEntradas() {
  this.mostrarTabla3 = !this.mostrarTabla3;
  this.mostrarTabla4 = !this.mostrarTabla4;
}

toggleTabla5() {
  this.mostrarTabla5 = !this.mostrarTabla5;
}

ocultarTablas() {
  this.mostrarTabla2 = false;
  this.mostrarTabla3 = false;
  this.mostrarTabla4 = false;
  this.mostrarTabla5 = false;
}

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private _ordencompraServicio: OrdenCompraService,
    private _utilidadServicio: UtilidadService
  ) {}

  obtenerOrdenCompra(ordencompra: string,division:string) {
    this.ordenCompra=ordencompra;
    this.division=division;
    this._ordencompraServicio.ObtenerOC2(ordencompra,division).subscribe({
      next: (data) => {
        if (data.status) {
          // Asignar los datos del cabecero//
          this.dataListaOrdenCompra.data = data.value;

          this.dataListaOrdenCompra.data.forEach((element) => {
            element.selected = false;
          });

          // Llenar la informacion del detalle//
          this.dataListaOrdenCompraDetalle.data = [];
          for (let i = 0; i < data.value.length; i++) {
            const element = data.value[i];
            this.dataListaOrdenCompraDetalle.data.push(
              ...element.detallesOrdenConfimada
            );
          }

          this.dataListaOrdenCompraDetalle.data.forEach((element) => {
            element.selected = false;
          });

          // Llenar la informacion por linea//
          // this.dataListaOrdenCompraentradasDetalle.data = [];
          // for (let i = 0; i < data.value.length; i++) {
          //   const element = data.value[i];
          //   this.dataListaOrdenCompraentradasDetalle.data.push(
          //     ...element.entradasDetalle
          //   );
          // }

          // this.dataListaOrdenCompraentradasDetalleGeneral.data = [];
          // for (let i = 0; i < data.value.length; i++) {
          //   const element = data.value[i];
          //   for (let j = 0; j < element.entradasAgrupadas.length; j++) {
          //     const entrada = element.entradasAgrupadas[j];
          //     entrada.nombreRecortado = entrada.noEntrada.slice(0, -4);
          //     this.dataListaOrdenCompraentradasDetalleGeneral.data.push(
          //       entrada
          //     );
          //     console.log(this.dataListaOrdenCompraentradasDetalleGeneral.data);
          //   }
          // }

        } else {
          // Recargar la página
          location.reload();

          // Ocultar las dos tablas
          this.dataListaOrdenCompra.data = [];
          this.dataListaOrdenCompraDetalle.data = [];
          this.dataListaOrdenCompraentradasDetalle.data = [];

          this.mostrarContenido = false;
          this.mostrarContenido2 = false;

          this._utilidadServicio.mostrarAlerta(
            'No se encontraron datos',
            'Oops!'
          );
        }
      },
      error: (e) => {
        console.error(e);
      },
    });
  }
/* #region Main */
  // obtenerOrdenCompraFecha() {
  //   this._ordencompraServicio.obtenerOCFechas('1', '1').subscribe({
  //     next: (data) => {
  //       //console.log(data);
  //       if (data.status) {
  //         // Asignar los datos a la propiedad dataListaOrdenCompra.data
  //         this.dataListaOrdenCompra.data = data.value;

  //         // Establecer element.selected en false para cada elemento
  //         this.dataListaOrdenCompra.data.forEach((element) => {
  //           element.selected = false;
  //         });

  //       } else {
  //         // Recargar la página
  //         // location.reload();

  //         // // Ocultar las dos tablas
  //         // this.dataListaOrdenCompra.data = [];
  //         // this.dataListaOrdenCompraDetalle.data = [];
  //         // this.dataListaOrdenCompraentradasDetalle.data = [];

  //         // this.mostrarContenido = false;
  //         // this.mostrarContenido2 = false;

  //         this._utilidadServicio.mostrarAlerta(
  //           'No se encontraron datos',
  //           'Oops!'
  //         );
  //       }
  //     },
  //     error: (e) => {
  //       console.error(e);
  //     },
  //   });
  // }
  // obtenerOrdenCompraFecha2(idOrdenCompra: number) {
  //   this._ordencompraServicio.obtenerOCFechas('1', '1').subscribe({
  //     next: (data) => {
  //       //console.log(data);
  //       if (data.status) {
  //         // Asignar los datos a la propiedad dataListaOrdenCompra.data
  //         // Llenar dataListaOrdenCompraDetalle con detalles de órdenes confirmadas
  //         this.dataListaOrdenCompraDetalle.data = [];
  //         for (let i = 0; i < data.value.length; i++) {
  //           const element = data.value[i];
  //           if (element.id === idOrdenCompra) {
  //             this.dataListaOrdenCompraDetalle.data.push(
  //               ...element.detallesOrdenConfimada
  //             );
  //           }
  //         }

  //       } else {

  //         this._utilidadServicio.mostrarAlerta(
  //           'No se encontraron datos',
  //           'Oops!'
  //         );
  //       }
  //     },
  //     error: (e) => {
  //       console.error(e);
  //     },
  //   });
  // }
  /* #endregion */

  // obtenerOrdenCompraFecha3(idOrdenCompra: number) {
  //   this._ordencompraServicio.ObtenerOC2(ordencompra,division).subscribe({
  //     next: (data) => {
  //       //console.log(data);
  //       if (data.status) {
  //         this.dataListaOrdenCompraentradasDetalle.data = [];
  //         for (let i = 0; i < data.value.length; i++) {
  //           const element = data.value[i];
  //           if (
  //             typeof element.entradasDetalle === 'undefined' ||
  //             !element.entradasDetalle
  //           ) {
  //             element.entradasDetalle = [];
  //           }
  //           for (
  //             let index = 0;
  //             index < element.entradasDetalle.length;
  //             index++
  //           ) {
  //             const element2 = element.entradasDetalle[index];
  //             if (element2.idOrdenCompraDetalle === idOrdenCompra) {
  //               this.dataListaOrdenCompraentradasDetalle.data.push(element2);
  //             }
  //           }
  //         }
  //       } else {
  //         this._utilidadServicio.mostrarAlerta(
  //           'No se encontraron datos',
  //           'Oops!'
  //         );
  //       }
  //     },
  //     error: (e) => {
  //       console.error(e);
  //     },
  //   });
  // }

  obtenerOrdenCompraFecha4(noEntrada: string) {
    this._ordencompraServicio.ObtenerOC2(this.ordenCompra,this.division).subscribe({
      next: (data) => {
        if (data.status) {
          // Asignar los datos a la propiedad dataListaOrdenCompra.data
          // Llenar dataListaOrdenCompraDetalle con detalles de órdenes confirmadas
          this.dataListaOrdenCompraentradasDetalle.data = [];
          for (let i = 0; i < data.value.length; i++) {
            const element = data.value[i];
            if (
              typeof element.entradasDetalle === 'undefined' ||
              !element.entradasDetalle
            ) {
              element.entradasDetalle = [];
            }
            for (
              let index = 0;
              index < element.entradasDetalle.length;
              index++
            ) {
              const element2 = element.entradasDetalle[index];
              if (element2.noEntrada === noEntrada) {
                this.dataListaOrdenCompraentradasDetalle.data.push(element2);
              }
            }
          }
        } else {
          this._utilidadServicio.mostrarAlerta(
            'No se encontraron datos',
            'Oops!'
          );
        }
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  obtenerOrdenCompragGeneral() {
    this.mostrarContenido3 = !this.mostrarContenido3;
    this.mostrarContenido4 = false;

    this._ordencompraServicio.ObtenerOC2(this.ordenCompra,this.division).subscribe({
      next: (data) => {
        //console.log(data);
        if (data.status) {

          this.dataListaOrdenCompraentradasDetalleGeneral.data = [];
          for (let i = 0; i < data.value.length; i++) {
            const element = data.value[i];
            for (let j = 0; j < element.entradasAgrupadas.length; j++) {
              const entrada = element.entradasAgrupadas[j];
              
              for (let k = 0; k < entrada.listaDetalles.length; k++) {
                const element2 = entrada.listaDetalles[k];
                if (element2.noLinea === this.noLinea) {
                  element2.nombreNormal = entrada.noEntrada;
                  element2.nombreRecortado = element2.noEntrada.slice(0, -4);
                  this.dataListaOrdenCompraentradasDetalleGeneral.data.push(
                    element2
                  );
                }
              }
            }
          }

        } else {
          // Recargar la página
          location.reload();

          // Ocultar las dos tablas
          this.dataListaOrdenCompra.data = [];
          this.dataListaOrdenCompraDetalle.data = [];
          this.dataListaOrdenCompraentradasDetalle.data = [];

          this.mostrarContenido = false;
          this.mostrarContenido2 = false;

          this._utilidadServicio.mostrarAlerta(
            'No se encontraron datos',
            'Oops!'
          );
        }
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  obtenerOrdenCompraLinea() {
    //this.mostrarContenido4 = true;
    this.mostrarContenido3 = false;
  }

  seleccionarOpcion(event: any){
    this.mostrarContenido4 = true;
    this.dataListaOrdenCompraentradasDetalle.data = [];
    //console.log(event);

    this._ordencompraServicio.ObtenerOC2(this.ordenCompra,this.division).subscribe({
      next: (data) => {
        //console.log(data);
        if (data.status) {
          // Asignar los datos a la propiedad dataListaOrdenCompra.data
          // Llenar dataListaOrdenCompraDetalle con detalles de órdenes confirmadas
          this.dataListaOrdenCompraentradasDetalle.data = [];
          for (let i = 0; i < data.value.length; i++) {
            const element = data.value[i];
            if (
              typeof element.entradasDetalle === 'undefined' ||
              !element.entradasDetalle
            ) {
              element.entradasDetalle = [];
            }
            for (
              let index = 0;
              index < element.entradasDetalle.length;
              index++
            ) {
              const element2 = element.entradasDetalle[index];
              if (element2.noLinea === event) {
                this.dataListaOrdenCompraentradasDetalle.data.push(element2);
              }
            }
          }
        } else {
          this._utilidadServicio.mostrarAlerta(
            'No se encontraron datos',
            'Oops!'
          );
        }
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  ngOnInit(): void {
    //this.obtenerOrdenCompra();
    //this.obtenerOrdenCompraFecha()
  }

  ngAfterViewInit(): void {
    this.dataListaOrdenCompra.paginator = this.paginacionTabla;
  }
}

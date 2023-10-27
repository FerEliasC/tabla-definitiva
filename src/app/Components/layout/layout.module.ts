import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { UsuarioComponent } from './Pages/usuario/usuario.component';
import { SharedModule } from 'src/app/Reutilizable/shared/shared.module';
import { ModalUsuarioComponent } from './Modales/modal-usuario/modal-usuario.component';
import { ModalCorporativoComponent } from './Modales/modal-corporativo/modal-corporativo.component';
import { CorporativoComponent } from './Pages/corporativo/corporativo.component';
import { RolComponent } from './Pages/rol/rol.component';
import { ModalRolComponent } from './Modales/modal-rol/modal-rol.component';
import { ListadoGenericoComponent } from './Pages/listado-generico/listado-generico.component';
import { EmpresaComponent } from './Pages/empresa/empresa.component';
import { ModalEmpresaComponent } from './Modales/modal-empresa/modal-empresa.component';
import { MenuRolComponent } from './Pages/menu-rol/menu-rol.component';
import { OrdenCompraComponent } from './Pages/orden-compra/orden-compra.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';


@NgModule({
  declarations: [
    UsuarioComponent,
    ModalUsuarioComponent,
    ModalCorporativoComponent,
    CorporativoComponent,
    RolComponent,
    ModalRolComponent,
    ListadoGenericoComponent,
    EmpresaComponent,
    ModalEmpresaComponent,
    MenuRolComponent,
    OrdenCompraComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    MatMomentDateModule 
  ]
})
export class LayoutModule { }

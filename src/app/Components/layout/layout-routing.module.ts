import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { CorporativoComponent } from './Pages/corporativo/corporativo.component';
import { EmpresaComponent } from './Pages/empresa/empresa.component';
import { UsuarioComponent } from './Pages/usuario/usuario.component';
import { RolComponent } from './Pages/rol/rol.component';
import { MenuRolComponent } from './Pages/menu-rol/menu-rol.component';
import { OrdenCompraComponent } from './Pages/orden-compra/orden-compra.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // { path: 'dashboard', component: DashBoardComponent },
      // { path: 'venta', component: VentaComponent },
      // { path: 'reportes', component: ReporteComponent },
      { path: 'corporativos', component: CorporativoComponent },
      { path: 'empresas', component: EmpresaComponent },
      { path: 'usuarios', component: UsuarioComponent },
      // { path: 'paises', component: PaisComponent },
      // { path: 'estados', component: EstadoComponent },
      // { path: 'municipios', component: MunicipioComponent },
      // { path: 'colonias', component: ColoniaComponent },
      // { path: 'localidades', component: LocalidadComponent },
      // { path: 'permisos', component: PermisosComponent },
      { path: 'roles', component: RolComponent },
      {path: 'menu_rol',component:MenuRolComponent},
      {path:'orden-compra',component:OrdenCompraComponent}
      // { path: 'permiso_usuarios', component: MenuUsuarioComponent },
      // {path: 'permiso_actividad_usuario',component:MenuActividadUsuarioComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}

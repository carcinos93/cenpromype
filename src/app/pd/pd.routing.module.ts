import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogosComponent } from './components/catalogos/catalogos.component';
import { InicioComponent } from '../pd/components/inicio/inicio.component';
import { RolComponent } from './components/usuarios/rol/rol.component';
import { TraductorComponent } from './components/traductor/traductor.component';
import { UsuarioComponent } from './components/usuarios/usuario/usuario.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InformesComponent } from './components/informes/informes.component';
import { IndicadoresComponent } from './components/tb/indicadores/indicadores.component';
import {ProductosComponent} from "./components/tb/productos/productos.component";
import {DocumentosServicioComponent} from "./components/tb/documentos-servicio/documentos-servicio.component";
import {DocumentosComponent} from "./components/tb/documentos/documentos.component";
import { MenuComponent } from './components/inicio/menu/menu.component';
import { PortalComponent } from './components/portal/portal.component';




const routes: Routes = [
  {
    path:'', component: InicioComponent,
    children: [
      { path: 'catalogos/:catalogo', component: CatalogosComponent },
      { path:'usuarios/rol', component: RolComponent },
      { path: 'usuarios/usuario', component: UsuarioComponent },
      { path: 'informe', component: InformesComponent },
      { path: 'dashboard/:nombre', component: DashboardComponent },
      { path: 'tb/indicadores', component: IndicadoresComponent },
      { path: 'tb/productos', component: ProductosComponent },
      { path: 'tb/documentos', component: DocumentosComponent },
      { path: 'traductor', component: TraductorComponent },
      { path: 'tb/documento-servicio', component: DocumentosServicioComponent },
      { path: 'tb/menu', component: MenuComponent },
      { path: 'portal/usuarios', component: PortalComponent }
    ]
  }
 ,
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdRoutingModule { }

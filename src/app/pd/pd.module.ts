import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../core/shared.module';

import { PdRoutingModule } from '../pd/pd.routing.module';

import { DialogService } from 'primeng/dynamicdialog';
import { FormBuildComponent } from '../core/components/form-build/form-build.component';
import { CatalogosComponent } from './components/catalogos/catalogos.component';
import { InicioComponent } from './components/inicio/inicio.component';

import { FooterComponent } from './components/inicio/footer/footer.component';
import { HeaderComponent } from './components/inicio/header/header.component';
import { RolComponent } from './components/usuarios/rol/rol.component';
import { UsuarioComponent } from './components/usuarios/usuario/usuario.component';
import { TraductorComponent } from './components/traductor/traductor.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InformesComponent } from './components/informes/informes.component';
import { IndicadoresComponent } from './components/tb/indicadores/indicadores.component';
import { ProductosComponent } from './components/tb/productos/productos.component';
import { DocumentosServicioComponent } from './components/tb/documentos-servicio/documentos-servicio.component';
import { DocumentosComponent } from './components/tb/documentos/documentos.component';
import { MenuComponent } from './components/inicio/menu/menu.component';





@NgModule({
  declarations: [

    FormBuildComponent,
    CatalogosComponent,
    InicioComponent,
   HeaderComponent,
   FooterComponent,
   RolComponent,
   UsuarioComponent,
  // ControlFormComponent,
   TraductorComponent,
   DashboardComponent,
   InformesComponent,
   IndicadoresComponent,
   ProductosComponent,
   DocumentosServicioComponent,
   DocumentosComponent,
   MenuComponent
  ],
  imports: [
    CommonModule,
    //PrimeNgModule,
   // MaterialModule,
    SharedModule,
    PdRoutingModule
  ], entryComponents: [
  ],
  providers: [DialogService]
})
export class PdModule { }

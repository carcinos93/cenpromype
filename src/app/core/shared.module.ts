import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DecimalPipe, UpperCasePipe, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MaterialModule } from './libraries/material.module';
import { PrimeNgModule } from './libraries/primeng.module';
import { EncabezadoPipePipe } from './shared/pipes/encabezado-pipe.pipe';
import { EstadoPipePipe } from './shared/pipes/estado-pipe.pipe';
import { UrlPipe } from './shared/pipes/url.pipe';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { ControlFormComponent } from './components/control-form/control-form.component';
import { ReactiveFormsModule,  FormsModule, } from '@angular/forms';
import { BaseGridComponent } from './components/base-grid/base-grid.component';
import { ImagenPipe } from './shared/pipes/imagen.pipe';
import { SanitizerHTMLPipe } from './shared/pipes/sanitizer-html.pipe';
import {ConfirmationService} from "primeng/api";
import { GridDetailComponent } from './components/grid-detail/grid-detail.component';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [ EncabezadoPipePipe, EstadoPipePipe, UrlPipe, FormDialogComponent, ControlFormComponent, BaseGridComponent, ImagenPipe, SanitizerHTMLPipe, GridDetailComponent ],
  schemas: [
     CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeNgModule,
    MaterialModule,
    TranslateModule /*.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],


    }, isolate: false})*/
  ],  providers: [ EncabezadoPipePipe, EstadoPipePipe, ImagenPipe, UrlPipe, UpperCasePipe, DecimalPipe, DatePipe, ConfirmationService  ]
  , exports: [ FormsModule,ReactiveFormsModule,TranslateModule, EncabezadoPipePipe, EstadoPipePipe, ImagenPipe, UrlPipe,
    BaseGridComponent ,FormDialogComponent,GridDetailComponent,ControlFormComponent, PrimeNgModule, MaterialModule  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
     ngModule: SharedModule,
      providers: []
    }
  }
 }

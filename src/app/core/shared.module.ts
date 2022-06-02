import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { FileUploaderComponent } from './shared/controls/file-uploader/file-uploader.component';
import { FileVisorComponent } from './shared/controls/file-visor/file-visor.component';
import { AppConfig } from './services/appConfig';

const appInitializerFn = (appConfig: AppConfig) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [ EncabezadoPipePipe, EstadoPipePipe, UrlPipe,FileUploaderComponent, FormDialogComponent, ControlFormComponent, BaseGridComponent, ImagenPipe, SanitizerHTMLPipe, GridDetailComponent, FileVisorComponent ],
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
  ],  providers: [ EncabezadoPipePipe, EstadoPipePipe, ImagenPipe, UrlPipe, UpperCasePipe, DecimalPipe,SanitizerHTMLPipe, DatePipe, ConfirmationService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfig]
    }  ]
  , exports: [ FormsModule,ReactiveFormsModule,TranslateModule, EncabezadoPipePipe,SanitizerHTMLPipe, EstadoPipePipe, ImagenPipe, UrlPipe,
    BaseGridComponent ,FormDialogComponent, FileVisorComponent,FileUploaderComponent,GridDetailComponent,ControlFormComponent, PrimeNgModule, MaterialModule  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    }
  }
 }

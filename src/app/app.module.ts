import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MaterialModule } from './core/libraries/material.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from './core/shared.module';
import { CoreModule } from './core/core.module';
import { PrimeNgModule } from './core/libraries/primeng.module';
import { PdModule } from './pd/pd.module';
import {EncabezadoPipePipe} from "./core/shared/pipes/encabezado-pipe.pipe";
import {EstadoPipePipe} from "./core/shared/pipes/estado-pipe.pipe";
import {ImagenPipe} from "./core/shared/pipes/imagen.pipe";
import {UrlPipe} from "./core/shared/pipes/url.pipe";
import {UpperCasePipe} from "@angular/common";
import { LoginInterceptorService } from './core/interceptors/login-interceptor.service';
import { AppConfig } from './core/services/appConfig';

export function createTranslateLoader(http: HttpClient, appConfig: AppConfig) {
  return new TranslateHttpLoader(http,'./assets/i18n/', `.json?${appConfig.config.versions.i18n}`);
}

@NgModule({
  declarations: [
    AppComponent,
    //...core_componentes
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient, AppConfig]
      },
    }),
    SharedModule.forRoot(),
    CoreModule,
    PdModule

  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptorService, multi: true }
  ]
})
export class AppModule { }

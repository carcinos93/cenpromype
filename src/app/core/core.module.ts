import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module';
import { BaseComponent } from './components/base/base.component';
import { LoginComponent } from './components/login/login.component';
import { CoreRoutingModule } from './core.routing.module';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';



@NgModule({
  declarations: [
    BaseComponent,
    LoginComponent,
    SkeletonLoaderComponent
  ],
  imports: [
    CommonModule,
    //MaterialModule,
    //PrimeNgModule,
    SharedModule,
    CoreRoutingModule
  ],
  exports: [  ],
  providers: []
})
export class CoreModule {
  
}



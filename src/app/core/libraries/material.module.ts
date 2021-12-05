import {   NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper'; 
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
const MODULOS = [ MatButtonModule, MatSelectModule, MatFormFieldModule, MatSnackBarModule, MatStepperModule, CKEditorModule, MatSlideToggleModule ];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MODULOS
  ],
  exports: [
    ...MODULOS
  ]
})

export class MaterialModule {
   

  


 }

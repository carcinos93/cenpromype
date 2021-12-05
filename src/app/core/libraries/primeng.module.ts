import {   NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataViewModule} from 'primeng/dataview';
import {TableModule} from 'primeng/table';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {DialogModule} from 'primeng/dialog';
import {InputNumberModule} from 'primeng/inputnumber';
import { InputTextareaModule } from "primeng/inputtextarea";
import {PasswordModule} from 'primeng/password';
import {CarouselModule} from 'primeng/carousel';
import { CheckboxModule } from 'primeng/checkbox';
import {ImageModule} from 'primeng/image';
import {DragDropModule} from 'primeng/dragdrop';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ToolbarModule} from "primeng/toolbar";
import {RippleModule} from "primeng/ripple";
import {TreeModule} from 'primeng/tree';
import {TabViewModule} from 'primeng/tabview';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {PanelModule} from 'primeng/panel';
//import {EditorModule} from 'primeng/editor';
const MODULOS = [ DataViewModule, TableModule, DynamicDialogModule, InputTextModule, DropdownModule,CalendarModule, DialogModule,
  InputNumberModule, InputTextareaModule, PasswordModule, CarouselModule, CheckboxModule, ImageModule,
  DragDropModule,
  RippleModule,
  TreeModule,
  PanelModule,
  ToggleButtonModule,
  ConfirmDialogModule, ProgressSpinnerModule,
  TabViewModule,
  ToolbarModule];


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

export class PrimeNgModule {





 }

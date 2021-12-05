import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CRUDServiceService } from '../../services/crudservice.service';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styles: [
    '.mat-step-label { color: black !important}'
  ]
})
export class FormDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('controlKey') llavePrimaria: ElementRef | undefined;
  @Input() set formularioVisible(value: boolean) {
    this._formularioVisible = value;
  }
  
  @Input() encabezado: string = ''
  @Input() modo: string = 'nuevo';
  @Input() dialog: boolean = true;
  @Input() set dato(value: any) {
    this.primarykey.value = value[this._config.primaryKey.column];
    this.primarykey.name = value[this._config.primaryKey.key];
    this.datoSeleccionado = value;
    if (value != {}) {
      this._formularioVisible = true;
    }
  };

  _formularioVisible: boolean = false;
  @Input() set config(value: any) {
    this.controles = value.controls || [];
    this._config = value;
    this.multi = value.multi || false;
    this.forms = value.forms || [];
    if (this.multi) {
        this.forms.forEach(( v: any, i: number ) => {
            let m = `_formulario${i}`;
            this.formGroups[m] = new FormGroup({});
        });
    }
    
  };

  datoSeleccionado:any = {};
  _config: any ={ controls: [], primaryKey: { column: '', key: '' } };
  enviarHabilitado: boolean = true;
  primarykey: any = { value: '', name: '' };
  multi: boolean = false;
  controles: any = [];
  forms:any[] = [];
  formulario: FormGroup;
  formGroups: any;
  constructor(private crudService: CRUDServiceService) { 
      this.formulario = new FormGroup({});
      this.formGroups = {};
  }
  ngAfterViewInit(): void {
    //this.controles = this.config.controls || [];
  }


  ngOnInit(): void {

  }

  enviarFormulario() { 
    this.enviarHabilitado = false;
    /*let values = {};
    for (let v in this.formGroups) {
        let r = this.formGroups[v];
        values = { ...r.value, ...values };
    }*/

    let ruta = this.modo == 'nuevo' ? this._config.insertRoute :  this._config.updateRoute;
   let sus;
   if (this.modo == 'editar') {
    sus = this.crudService.update(this.llavePrimaria?.nativeElement.value,ruta, this.formulario.value);
   } else {
    sus = this.crudService.create( this.formulario.value, ruta);
   }
    sus.subscribe((data: any) => {
      if (data.success) {
        alert(data.message);
        this.formularioVisible = false

      } else {
       alert(data.message);
      }
   }, (err: any) => {
     this.enviarHabilitado = true;
     alert("Servicio no disponible");
   }, () => {
     this.enviarHabilitado = true;
   } );
  
   }
}

import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { DropdownForm } from 'src/app/pd/models/form.model';
import { CRUDServiceService } from '../../services/crudservice.service';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { inputBase } from '../../../pd/models/form.model';
declare var $: any;
declare module '@ckeditor/ckeditor5-build-classic' { // or other CKEditor 5 build.
  const ClassicEditorBuild: any;
}
@Component({
  selector: 'app-control-form',
  templateUrl: './control-form.component.html',
  styles: [
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class ControlFormComponent implements OnInit {
  //@Input() control: any = {};
  // @Input() set datoSeleccionado(o: any) { }
  control: any = {};
  datoSeleccionado: any = {};
 
    

  
  @Input() group: string = '';
  @Input() set config(o: any) {
    this.datoSeleccionado = o.data;
    this.control = o.control;
    
    if (o.modo != undefined) {
      if (o.modo == "nuevo") {
          this.cargarDatosDefault();
      }
  }

  }
  public Editor:any  = ClassicEditorBuild;

  dropDownList = {} as any;
  form: FormGroupDirective;
  constructor(private crudService: CRUDServiceService, parent: FormGroupDirective) {
    this.form = parent;
   }
  ngOnInit(): void {
    /*** control tipo detalle no se incluye en las validaciones  */
    if (this.control.controlType == 'detail') {
      return;
    }
    if (this.control.controlType == 'dropdown') {
      this.dropDownList[this.control.key] = [];
      if ((this.control as DropdownForm).dataSource == '') {
        this.dropDownList[this.control.key] = (this.control as DropdownForm).items;      
      } else {
        this.cargarDropdown( (this.control as DropdownForm).dataSource, this.control.key );
      }
    }
      if (this.form != null) {
        let valor = this.control.value;
        if (this.datoSeleccionado && this.datoSeleccionado != {}) {
              valor = this.datoSeleccionado[this.control.value];
        }

        /*if (!this.datoSeleccionado[  this.control.key ] && this.control.controlType == "checkbox") {
          this.datoSeleccionado[  this.control.key ] = this.control.falseValue;
        }*/
        let validators = this.control.validators as [];
        let validatorArr = [];
        for (let v in validators) {
            let validator = validators[v] as any;
            let nombre: string = validator.name;
            if ((Validators as any)[nombre] != undefined ) {
              if ( validator.params.length == 0  ) {
                validatorArr.push( (Validators as any)[nombre]);
              } else {
                validatorArr.push( (Validators as any)[nombre](...validator.params) );
              }
            }
        }
        
        console.log(validatorArr);

        //this.form.form.addControl(this.control.key ,this.control.required ? new FormControl(this.datoSeleccionado[this.control.objectKey] || '', Validators.required ) : new FormControl(valor || ''));
        this.form.form.addControl(this.control.key ,new FormControl(this.datoSeleccionado[this.control.objectKey] || '', validatorArr  ))
        if ((this.control.controlType == 'file')  ) {
          this.form.form.addControl( this.control.key + '_file', this.control.required ? new FormControl(null, Validators.required ) : new FormControl(null)  );
        }
      }
  }
  
  cargarDatosDefault() {
    const k = this.control as inputBase<any>;
    if (k.defaultValue != undefined || k.defaultValue != null) {
      this.datoSeleccionado[ k.objectKey ] = k.defaultValue;
      return;
    } 
    if (k.controlType == "checkbox" && !k.defaultValue  ) {
      this.datoSeleccionado[ k.objectKey ] = this.control.trueValue;
    }
  }

  cargarDropdown( d: string, k: string) {
    this.crudService.getAll( d, {} ).subscribe((data) => {
        let arr: any[] = [];
        arr.push( { id: null, descripcion: "-------" } );
        arr.push(...data);
      this.dropDownList[k] = arr;
    });
  }

  onFileChange(event: any, control: any, i: any)   {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      let v: any = {};
      v[ control ] = file;

      this.form.form.patchValue( v );
     /* let reader = new FileReader();
      reader.addEventListener("load", function () { // Setting up base64 URL on image
       $(`#${ i }`).attr("src", reader.result) ;
    }, false);
    reader.readAsDataURL(file);*/
    }

  }

  toggleChange(event: any) {
      this.datoSeleccionado[this.control.objectKey] = event.checked ? this.control.trueValue : this.control.falseValue;
  }

}

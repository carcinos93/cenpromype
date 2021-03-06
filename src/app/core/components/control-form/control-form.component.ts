import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { DropdownForm, EditorForm } from 'src/app/pd/models/form.model';
import { CRUDServiceService } from '../../services/crudservice.service';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { inputBase } from '../../../pd/models/form.model';
import { TranslateService } from '@ngx-translate/core';
import { CustomValidators } from '../../shared/validators/customValidators';
import * as JSZip from 'jszip';
import { AppConfig } from '../../services/appConfig';

declare var $: any;
declare module '@ckeditor/ckeditor5-build-classic' { // or other CKEditor 5 build.
  const ClassicEditorBuild: any;
}
@Component({
  selector: 'app-control-form',
  templateUrl: './control-form.component.html',
  styles: [
    '.image-upload  input[type="file"] {  visibility: hidden; width: 0; height:0 }'
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
  @ViewChild('inputFile') inputFile: ElementRef | undefined;
  @ViewChild('cargaArchivo') cargaArchivo: ElementRef | undefined;
  control: any = {};
  mensajesControl:  any = {};
  archivoNombre: string = '';
  archivoEditor: string = '';
  mensajeValidacion : { [s: string] : string } = { required : "El campo es requerido", maxLength : "Maximo de caracteres permitido son {0}" }
  datoSeleccionado: any = {};
 
  erroresValidacion: any[] = []; 

  archivoStatus: "loading" | "loaded" | "no" = "no" ;
  @Input() group: string = '';
  @Input() set config(o: any) {
    this.datoSeleccionado = o.data;
    this.control = o.control;
    for (var i in this.mensajesControl) {
      this.mensajesControl[i] = "";
    }
    this.archivoStatus = "no";
    this.archivoNombre = this.archivoEditor = "";
    if (o.modo != undefined) {
      if (o.modo == "nuevo") {
          this.cargarDatosDefault();
      }
  }

  }
  public Editor:any  = ClassicEditorBuild;

  dropDownList = {} as any;
  form: FormGroupDirective;
  constructor(private crudService: CRUDServiceService, parent: FormGroupDirective, private translate: TranslateService,
    public appConfig: AppConfig) {
    this.form = parent;
    (async () => {
        let i = await this.translate.get('validaciones').toPromise();
        this.mensajeValidacion = i;
    })();

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
        let validators = this.generacionValidaciones(this.control.validators as []);
        //this.generacionValidaciones(validators);
        

        //this.form.form.addControl(this.control.key ,this.control.required ? new FormControl(this.datoSeleccionado[this.control.objectKey] || '', Validators.required ) : new FormControl(valor || ''));
        this.form.form.addControl(this.control.key ,new FormControl(this.datoSeleccionado[this.control.objectKey] || '', validators  ))
        if ((this.control.controlType == 'file' || this.control.controlType == 'editor' )  ) {
          this.form.form.addControl( this.control.key + '_file', new FormControl(null)  );
        }

        /*if (this.control.controlType == 'editor') {
            
        }*/
      }
  }
  onclose(event: any) {
    console.log(this.datoSeleccionado);
  }
  generacionValidaciones(validators: any[]) {
    let validatorArr = [];
    for (let v in validators) {
        let validator = validators[v] as any;
        let nombre: string = validator.name;
        this.erroresValidacion.push( { validacion: nombre } );
            let vF = (Validators as any)[nombre];
            let cF = (CustomValidators as any)[nombre];
            
            let parametros: [] = validator.params ?? [];
            parametros.forEach((e, i) => {
              let msj = this.mensajeValidacion[ nombre ] || "";
              if (msj != "") {
                this.mensajeValidacion[ nombre ] = msj.replace(`{${ i }}`, v);
                }
            });

        let eF = vF ?? cF;

        if (eF)  {
          if ( parametros.length == 0  ) {
            validatorArr.push( eF);
          } else {
            validatorArr.push( eF(...validator.params) );
          }
        }

    }
    return validatorArr;
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

    if (this.inputFile != undefined) {
      this.inputFile.nativeElement.value = '';
    }

    for (var i in this.mensajesControl) {
      this.mensajesControl[i] = "";
    }

    this.archivoNombre = this.archivoEditor = "";
  }

  /**
   * 
   * @param d Origen de datos ( servicio web )
   * @param k Nombre del control
   */
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
      this.archivoNombre = file.name;
      this.form.form.controls[control].markAsDirty();
      this.form.form.patchValue( v );
     /* let reader = new FileReader();
      reader.addEventListener("load", function () { // Setting up base64 URL on image
       $(`#${ i }`).attr("src", reader.result) ;
    }, false);
    reader.readAsDataURL(file);*/
    }

  }

  archivoCarga(event: any, control: EditorForm) {
    this.archivoStatus = "loading";
    if (event.target.files.length > 0) {
      let file = event.target.files[0] as File;
      this.archivoEditor = file.name;
      let totalSize = file.size / 1000000.0; //convertir a megas
      if (totalSize<=control.maxLoadSizeMb) {
           let reader = new FileReader();
           reader.addEventListener("load", () => { // Setting up base64 URL on image
           this.datoSeleccionado[control.objectKey] = reader.result ?? "";
           this.form.form.controls[control.key].markAsDirty();
           this.archivoStatus = "loaded";
           if (this.cargaArchivo != undefined) { 
              this.cargaArchivo.nativeElement.value = '';
     
           }
           /*let zip: JSZip = new (JSZip as any)();
           zip.file(file.name, reader.result ?? "");
            zip.generateAsync({ type: "blob", compression: "DEFLATE" }).then((content) => {
            });*/

          }, false);
          reader.readAsText(file);
        } else {
          let v: any = {};
          v[ control.key + "_file" ] = file;
          this.datoSeleccionado[control.objectKey] = "";
          this.form.form.controls[control.key + "_file"].markAsDirty();
          this.form.form.patchValue( v );

          this.archivoStatus = "loaded";
          this.mensajesControl[control.key] = "* El tama??o del archivo podr??a causar problemas de rendimiento en navegador, se proceder?? solo a cargar el archivo ";
          if (this.cargaArchivo != undefined) { 
            this.cargaArchivo.nativeElement.value = '';
         }
        }
      }
      
  }

  /**
   * Funcion para el control toggle o checkbox
   * @param event 
   */
  toggleChange(event: any, control: string) {
      this.form.form.controls[control].markAsDirty();
      this.datoSeleccionado[this.control.objectKey] = event.checked ? this.control.trueValue : this.control.falseValue;
  }

  /**
   * 
   * @param nombre Nombre del control para verificar si es valido
   * @returns 
   */
  controlVerificacion(nombre: string): boolean {
    if (! this.form.form.controls[nombre] ) {
      return false;
    }
    return this.form.form.controls[nombre].invalid &&  (this.form.form.controls[nombre].dirty
      ||  this.form.form.controls[nombre].touched);
  }

  /**
   * Funcion retorna si el control es valido
   * @param nombre Nombre del control
   * @param validacion Nombre de la validacion
   * @returns 
   */
  controlValido(nombre: string, validacion: string) {

    /*if (this.form.form.controls[nombre].errors?.[validacion]) {
        return false;
    } else {
      return true;
    }*/
      return this.form.form.controls[nombre].errors?.[validacion] || true;
  }

  /**
   * Funcion que retorna el mensaje de validacion.
   * @param nombre Nombre del control
   * @param validacion Nombre de la validacion
   * @returns 
   */
  controlValidacionMensaje(nombre: string, validacion: string) {
    //return this.form.form.controls[nombre].errors?.[validacion];
    if  (this.controlValido( nombre, validacion )) {
      return this.mensajeValidacion[ validacion ] || "";
    } else {
      return "";

    }

  }

}

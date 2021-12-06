import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { map } from 'rxjs/operators';
import { configFormBuild } from 'src/app/pd/models/form.model';
import { CRUDServiceService } from '../../services/crudservice.service';
import { inputBase, DropdownForm, command } from '../../../pd/models/form.model';
import {MatSnackBar} from "@angular/material/snack-bar";

import {PipeManagerService} from "../../services/pipe-manager.service";
import {ConfirmationService} from 'primeng/api';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-base-grid',
  templateUrl: './base-grid.component.html',
  styles: [
  ]
})
export class BaseGridComponent implements OnInit, AfterViewInit {
  @ViewChild('controlKey') llavePrimaria: ElementRef | undefined;
  @ViewChild('form') formularioElemento: ElementRef | undefined;
  @Output() OnEdit = new EventEmitter();
  @Output() OnNew = new EventEmitter();
  @Output() OnLoadData = new EventEmitter();
  @Input() isDetail: boolean = false;
  @Input() bodyTemplate: TemplateRef<HTMLElement> = null as any;
  @Input() titulo: string = '';
  _config :  configFormBuild = { multi: false ,dataTable: { columns: [] }, controls: [], commands: [], primaryKey: { column: '', key: ''  }, botonesEstado: {}} as any;
  @Input() set config(o: any) {
    if (o != undefined && o != null) {
      this._config = o;

      this.botonesEstado = this._config.botonesEstado || {};
      this.controles = this._config.controls || [];
  

      if (this._config.multi) {
          this.formularios = this._config.controls;
      } else { 
        this.formularios.push( {  "titulo": "", controls: this._config.controls || [] } );
      }
  
      this.formularios.forEach(( v: any, i: number ) => {
          let m = `_formulario${i}`;
          this.formGroups[m] = new FormGroup({});
      });
  
      this.commandos = this._config.commands || [];
      this.columnas = this._config.dataTable.columns || [];
      this.filtros = this._config.filters || [];
      this.columnas.forEach((v, i) => {
        if (v.filter != null ) {
            if (v.filter.type == "dropdown") {
              this.cargarDropdown(  v.filter.dataSource, v.columna, v.filter.params );
            }
        }
      });
    }
   

  }


  controles: any[] = [];
  commandos: command[] = [];
  filtros: any = [];
  columnas: any[] = [];
  _keyValue: any = {};
  @Input() set keyValue(o: any) {
      if (o.value != null) {
        this._keyValue = o;
        this.lastTableFilters[o.column] = { value: o.value, col: o.column, op: 'eq' };
        this.filtrosAplicados[o.column] = o.value;
        this.recargarDatos();
      } else {
        this.datos = [];
      }
  }
  //formularioConfig: configFormBuild = { dataTable: { columns: [] }, controls: [],   } as any;
  datos: any[] = [];
  _mostrarFormulario: boolean = false;
  datoSeleccionado: any = {};
  //formulario: FormGroup;
  enviarHabilitado: boolean = true;
  primarykey: any = { value: '', name: '' };
  modo: string = 'nuevo';
  dropDownList = {} as any;
  cargando: boolean = false;
  filtrosAplicados: any = {};
  mensajeConfirmacion: string = '';
  botonesEstado: any = {
    nuevo: true,
    borrar: true,
    editar: true,
    recargar: true
  };

  formGroups: any = {};
  formularios: any[] = [];
  botonEstado(boton: string) {
    return this.botonesEstado[ boton ] ?? true;
  }
  tabViewIndex: number = 0;
  
  
  set mostrarFormulario(o: boolean) {
    this.cambioVisible( o );
    if (!o) {
      this.limpiarFormularios();
    }
    this._mostrarFormulario  = o;
  }
  get mostrarFormulario() {
    return this._mostrarFormulario;
  }


  get hayFiltrosAplicados() {
    return this.filtrosAplicados != {};
  }
  private lastTableLazyLoadEvent: LazyLoadEvent;
  private lastTableFilters: any =   {};
  constructor(public crudService: CRUDServiceService,public pipeManager: PipeManagerService, private snack: MatSnackBar,
             private dialogService: ConfirmationService,
              private translateService: TranslateService
  ) {
    // this.formulario = new FormGroup({});
     this.lastTableLazyLoadEvent = {} as any;

      //this.pipeManager.setup();
   

    
   }
  
   

  ngAfterViewInit(): void {
    //this.formularioConfig = this.config;
    //this.construirFormulario();
    this.translateService.get('mensajes.confirmar_borrar').subscribe( (s: string) => {
        this.mensajeConfirmacion = s;
    } ) ;
  }


  cargarDropdown( d: string, k: string, params: { col: string, value: string, op: string } [] =  []) {
    let p: any = {};
    /*for (const key in params) {
        //let valorFiltro = this.filtrosAplicados[key];
        if (! new RegExp("\\[([A-Z0-9_-]*)\\]", "g").test(params[key].value)  ) {

        }

    */
    this.crudService.getAll( d, { cfilter : p } ).subscribe((data: any[]) => {
        let arr: any[] = [];
        arr.push( { id: "0", descripcion: "-------" } );
        arr.push(...data);
        this.dropDownList[k] = arr
    });
  }
  totalRecord: number = 0;
  ngOnInit(): void {
    //this.formularioConfig = this.config;
  }
  OnPage(data: any) {

  }
  filtrar( valor: string, columna: string, op: string ) {
    if (valor != "0" && valor != "") {
      this.lastTableFilters[columna] = { value: valor, col: columna, op: op };
    } else {
      delete this.lastTableFilters[columna];
    }
    this.cargaTabla(this.lastTableLazyLoadEvent );
  }

  ordenar( event: any ) {
    console.log(event);
  }  

  cargaTabla(event: any) {
    console.log(event);
    if (this._config == undefined) {
      return;
    }
    if (this.isDetail && this._keyValue?.value == null || undefined)
    {
      return;
    }
      this.lastTableLazyLoadEvent = event;
      let dataRoute = "";
      if (typeof this._config.dataRoute == "object" ) {
        dataRoute = this._config.dataRoute.url;
        //this.lastTableFilters[ this.config.dataRoute ]
    } else 
    {
      dataRoute = this._config.dataRoute;
    }
      event.cfilter = this.lastTableFilters;
      this.cargando = true;
 
      this.OnLoadData.emit( event );

      this.crudService.getAll(dataRoute, event).pipe( map( (res: any) => {
          let d = res.data || [];
          d.forEach( (v:any, i: number) => {
              this.columnas.forEach((c: any ) => {
                  if (c.pipes != null) {
                      d[i][c.columna + '_formated'] = this.transformarDato( d[i][c.columna], c.pipes );
                  }
              });
          } );
          res.data = d;
          return res;
      } )  ).subscribe((res: any) => {
       // let arr = data.slice( event.first , (event.first??0) + (event.rows??0 ));;

      this.datos = res.data || [];
      this.totalRecord = res.total;
      this.cargando = false;
        /*this.datos = data;
        this.totalRecord = data.length;*/
     }, (error) => {   
       this.snack.open("Fallo al recuperar datos","", { verticalPosition: "bottom", duration: 4000, panelClass: ['mat-toolbar', 'bg-warning', 'text-light'] });
       this.cargando = false;
       console.log(error);
     });


  }

 // nuevo() { this.OnNew.emit(null); }
 /* editar(dato: any) {
     this.OnEdit.emit(dato);
   }*/

   editar(data: any): void {
    const __id = this.idRandom();
    this.datoSeleccionado = {...data, __id : __id};
    this.modo= 'editar';
    this.mostrarFormulario = true;
    this.primarykey.value = data[this._config.primaryKey.column];
    this.primarykey.name = data[this._config.primaryKey.key];
    this.tabViewIndex = 0;
    //this.formulario?.abrirFormulario( this.config );
    //this.formulario?.abrirFormulario( this.formBuilder( 'edit', data ).config );
   // this.editRecord(FormularioIndicadorComponent,  data , "Editar registro" );
    /*let datos = { data:data, modo: 'actualizar' };
    this.dialogService.open( FormularioIndicadorComponent,{ header: "Editar registro", width: "70%", data: datos } );*/
  }

  nuevo(): void {
    const __id = this.idRandom();
    this.datoSeleccionado = { __id:  __id };
    this.modo= 'nuevo';
    this.mostrarFormulario = true;
    this.OnNew.emit( { dato: this.datoSeleccionado, formulario: null  } );
    this.tabViewIndex = 0;
    //this.formulario?.abrirFormulario( this.config);

    //this.formulario?.abrirFormulario( this.formBuilder( 'new', null ).config );
    /*let datos = { data: {}, modo: 'guardar' };
      this.dialogService.open( FormularioIndicadorComponent,{ header: "Nuevo registro", width: "70%", data: datos } );*/
      //this.newRecord( FormularioIndicadorComponent, {}, "Nuevo registro" );

  }
  borrar(data: any): void {

    this.dialogService.confirm({
      message: this.mensajeConfirmacion ,
      accept: () => {
        this.crudService.delete( data[this._config.primaryKey.column],  this._config.updateRoute ).subscribe((data: any) => {
          if (data.success) {
            this.snack.open(data.message,"", { verticalPosition: "bottom", duration: 4000, panelClass: ['mat-toolbar', 'bg-success', 'text-light'] });
            this.recargarDatos();
          } else {
            this.snack.open(data.message,"", { verticalPosition: "bottom", duration: 4000, panelClass: ['mat-toolbar', 'bg-warning', 'text-light'] });
          }
        }, (err: any) => {
          this.snack.open("Servicio no disponible","", { verticalPosition: "bottom", duration: 4000, panelClass: ['mat-toolbar', 'bg-error', 'text-light'] });
        }, () => {
        } );
      }
    });
  }
  

  idRandom() {
     return (Math.random() * 65815 + Math.random() + 2697257 + (new Date().getMilliseconds())).toFixed(0);
  }

  enviar(data: any) {

  }
  transformarDato( valor: any, pipes: any = null ) {
     if (pipes == null){
       return valor;
     }
     if (Array.isArray( pipes  )) {
       let valorRetorno = valor;
       (pipes as any[]).forEach((v, i) => {
         if (typeof v['pipe'] == "string") {
           let pipe = this.pipeManager.pipeKey(v['pipe']);
           let parametros = v['parametros'] || [];
           let p = [];
           for (let o in parametros) {
             p.push(parametros[o]);
           }
           valorRetorno = pipe.transform( valorRetorno, ...p );
         } else if (typeof v['pipe'] == "function"  ) {
           valorRetorno = v['pipe'](valorRetorno);
         }
       });
       return valorRetorno;
     }

     return valor;


  }
  /*construirFormulario( ) {
    //this._config =this.config;
    //this.config = config;
    if (this.datoSeleccionado && this.config.primaryKey) {
    this.primarykey = { value: this.datoSeleccionado[this.config.primaryKey.column], name: this.config.primaryKey.key };
  }
    let controles: any = {};
    this._config.controls.forEach((v, i) => {
      let valor = v.value;
        if (this.datoSeleccionado && this.datoSeleccionado != {}) {

          valor = this.datoSeleccionado[v.objectKey];
        }
        //console.log(v.objectJson);
      //let valor = v.objectJson != null  ? v.objectJson[v.key] : v.value;
       controles[v.key] = v.required ?  new FormControl(this.datoSeleccionado[v.objectKey] || '', Validators.required ) : new FormControl(valor || '');
    });

    this.formulario = new FormGroup(  controles );

    //this._mostrarFormulario = true;
  }*/

 recargarDatos() {
   this.cargaTabla( this.lastTableLazyLoadEvent);
 }

 cambioVisible(v: any) {    
 }
/**
 * Función que retorna los datos de los formularios
 * @returns object
 */
datosFormularios() {
   let values = {};
    for (let v in this.formGroups) {
        let r = this.formGroups[v];
        values = { ...r.value, ...values };
    }
    return values;
}
/**
 * Función limpia todos los formularios
 */
limpiarFormularios() {
  for (let f in this.formGroups) {
      let formulario: FormGroup = this.formGroups[f];
      formulario.reset();
  }
}

validarFormularios() {
    let valido = true;
  for (let f in this.formGroups) {
    let formulario: FormGroup = this.formGroups[f];
    if (formulario.invalid) {
        formulario.markAllAsTouched();
        valido = false;
    }
}
  return valido;
}

  enviarFormulario() {
    //console.log(this.formulario.value);
    //return;
    if (!this.validarFormularios()) {
      return;
  }
  
    const __id = this.datoSeleccionado['__id'];
      let ruta = this.modo == 'nuevo' ? this._config.insertRoute :  this._config.updateRoute;
     let sus;

     const formData = new FormData();
     if (this.isDetail) {
      formData.append( this._keyValue.key, this._keyValue.value  );
     }

     const datoFormulario: any = this.datosFormularios();

     if (__id != undefined) {
       formData.append( '__id', __id);
     }

     
    

    this.enviarHabilitado = false;

     /**TODO */
     for ( let i in datoFormulario ) {
       formData.append( i, datoFormulario[i] );
     }

     if (this.modo == 'editar') {
      sus = this.crudService.update(this.llavePrimaria?.nativeElement.value,ruta, formData);
     } else {
      sus = this.crudService.create( formData, ruta);
     }
      sus.subscribe((resp: any) => {
        if (resp.success) {
          //this.formularioElemento?.nativeElement.reset();
          this.snack.open(resp.message,"", { verticalPosition: "bottom", duration: 4000, panelClass: ['mat-toolbar', 'bg-success', 'text-light'] });
          this.mostrarFormulario = false
            
          this.recargarDatos();
          //this.OnSubmit.emit(this.data);
        } else {
          this.snack.open(resp.message,"", { verticalPosition: "bottom", duration: 4000, panelClass: ['mat-toolbar', 'bg-warning', 'text-light'] });
        }
     }, (err: any) => {
       this.enviarHabilitado = true;
        this.snack.open("Servicio no disponible","", { verticalPosition: "bottom", duration: 4000, panelClass: ['mat-toolbar', 'bg-error', 'text-light'] });
     }, () => {
       this.enviarHabilitado = true;
       this.limpiarFormularios();
     } );

  }

}


export interface configBaseGrid {
  ruta: string;
  tabla: string;
  columnas: any[];
  botones: string[];

}

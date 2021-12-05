import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { map } from 'rxjs/operators';
import { command, configFormBuild } from 'src/app/pd/models/form.model';
import { CRUDServiceService } from '../../services/crudservice.service';
import { PipeManagerService } from '../../services/pipe-manager.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
@Component({
  selector: 'app-grid-detail',
  templateUrl: './grid-detail.component.html',
  styles: [
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GridDetailComponent),
    multi: true
}]
})
export class GridDetailComponent implements OnInit, ControlValueAccessor  {
  @ViewChild('controlKey') llavePrimaria: ElementRef | undefined;
  @ViewChild('form') formularioElemento: ElementRef | undefined;
  @Output() OnEdit = new EventEmitter();
  @Output() OnNew = new EventEmitter();
  @Input() titulo: string = '';
  @Input() config: configFormBuild = { dataTable: { columns: [] }, controls: [], commands: [], primaryKey: { column: '', key: ''  }, botonesEstado: {}} as any;
  controles: any = [];
  commandos: command[] = [];
  filtros: any = [];
  columnas: any[] = [];
  _keyValue: any;
  @Input() set keyValue(o: any) {
      this._keyValue = o;
      this.lastTableFilters[o.foreignkey] = { value: o.value, col: o.foreignkey, op: 'eq' };
      this.lazyLoad = true;
      //this.filtrosAplicados[value.key] = value.value;
  }
  //formularioConfig: configFormBuild = { dataTable: { columns: [] }, controls: [],   } as any;
  datos: any[] = [];
  mostrarFormulario: boolean = false;
  datoSeleccionado: any = {};
  formulario: FormGroup;
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
  lazyLoad: boolean = false;
  botonEstado(boton: string) {
    return this.botonesEstado[ boton ] ?? true;
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
     this.formulario = new FormGroup({});
     this.lastTableLazyLoadEvent = {} as any;

      //this.pipeManager.setup();
   }

  val: any;
 /**
  * Invoked when the model has been changed
  */
  onChange: (_: any) => void = (_: any) => {};

  /**
   * Invoked when the model has been touched
   */
  onTouched: () => void = () => {};
  set value(val: any){  // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
    this.val = val
    this.onChange(val);
    //this.onTouched(val);
    //this.onTouch(val)
    }
    
  updateChanges() {
    this.onChange(this.val);
  }
  writeValue(obj: any): void {
    this.val = obj;
    this.updateChanges();
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  

  
  ngAfterViewInit(): void {
    //this.formularioConfig = this.config;
    //this.construirFormulario();
    this.botonesEstado = this.config.botonesEstado || {};
    this.controles = this.config.controls || [];

    this.commandos = this.config.commands || [];
    this.columnas = this.config.dataTable.columns || [];
    this.filtros = this.config.filters || [];
    this.columnas.forEach((v, i) => {
      if (v.filter != null ) {
          if (v.filter.type == "dropdown") {
            this.cargarDropdown(  v.filter.dataSource, v.columna, v.filter.params );
          }
      }
    });
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
  cargaTabla(event: any) {
      this.lastTableLazyLoadEvent = event;
      let dataRoute = "";
      if (typeof this.config.dataRoute == "object" ) {
        dataRoute = this.config.dataRoute.url;
        //this.lastTableFilters[ this.config.dataRoute ]
    } else 
    {
      dataRoute = this.config.dataRoute;
    }
      event.cfilter = this.lastTableFilters;
      this.cargando = true;
 
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
     });


  }

 // nuevo() { this.OnNew.emit(null); }
 /* editar(dato: any) {
     this.OnEdit.emit(dato);
   }*/

   editar(data: any): void {
    this.datoSeleccionado = {...data};
    this.mostrarFormulario = true;
    this.modo= 'editar';
    this.primarykey.value = data[this.config.primaryKey.column];
    this.primarykey.name = data[this.config.primaryKey.key];
    //this.formulario?.abrirFormulario( this.config );
    //this.formulario?.abrirFormulario( this.formBuilder( 'edit', data ).config );
   // this.editRecord(FormularioIndicadorComponent,  data , "Editar registro" );
    /*let datos = { data:data, modo: 'actualizar' };
    this.dialogService.open( FormularioIndicadorComponent,{ header: "Editar registro", width: "70%", data: datos } );*/
  }

  borrar(data: any): void {
    this.dialogService.confirm({
      message: this.mensajeConfirmacion ,
      accept: () => {
        this.crudService.delete( data[this.config.primaryKey.column],  this.config.updateRoute ).subscribe((data: any) => {
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
    })
  }
  nuevo(): void {
    this.datoSeleccionado = {};
    this.mostrarFormulario = true;
    this.modo= 'nuevo';
    this.OnNew.emit( { dato: this.datoSeleccionado, formulario: this.formulario  } );
    //this.formulario?.abrirFormulario( this.config);

    //this.formulario?.abrirFormulario( this.formBuilder( 'new', null ).config );
    /*let datos = { data: {}, modo: 'guardar' };
      this.dialogService.open( FormularioIndicadorComponent,{ header: "Nuevo registro", width: "70%", data: datos } );*/
      //this.newRecord( FormularioIndicadorComponent, {}, "Nuevo registro" );

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


 recargarDatos() {
   this.cargaTabla( this.lastTableLazyLoadEvent);
 }

 cambioVisible(v: any) {
    
 }
  enviarFormulario() {
    this.enviarHabilitado = false;

    if ( this.modo == 'nuevo' ) {
      this.datos.push( this.formulario.value );
       this.value = this.datos;
       console.log(this.datos);
    
    }
    return;
      let ruta = this.modo == 'nuevo' ? this.config.insertRoute :  this.config.updateRoute;
     let sus;
     if (this.modo == 'editar') {
      sus = this.crudService.update(this.llavePrimaria?.nativeElement.value,ruta, this.formulario.value);
     } else {

       const formData = new FormData();
       for ( let i in this.formulario.value ) {
         formData.append( i, this.formulario.value[i] );
       }

      sus = this.crudService.create( formData, ruta);

     }
      sus.subscribe((data: any) => {
        if (data.success) {
          this.formularioElemento?.nativeElement.reset();
          this.snack.open(data.message,"", { verticalPosition: "bottom", duration: 4000, panelClass: ['mat-toolbar', 'bg-success', 'text-light'] });
          this.mostrarFormulario = false

          this.recargarDatos();
          //this.OnSubmit.emit(this.data);
        } else {
          this.snack.open(data.message,"", { verticalPosition: "bottom", duration: 4000, panelClass: ['mat-toolbar', 'bg-warning', 'text-light'] });
        }
     }, (err: any) => {
       this.enviarHabilitado = true;
        this.snack.open("Servicio no disponible","", { verticalPosition: "bottom", duration: 4000, panelClass: ['mat-toolbar', 'bg-error', 'text-light'] });
     }, () => {
       this.enviarHabilitado = true;
     } );

  }
}

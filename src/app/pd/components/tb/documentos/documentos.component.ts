import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CheckBoxForm, DetailForm, DropdownForm, EditorForm, TextboxForm } from "../../../models/form.model";
import { CRUDServiceService } from '../../../../core/services/crudservice.service';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styles: [ 

  ]
})
export class DocumentosComponent implements OnInit, AfterViewInit {

  config: any = { controls: [], primaryKey: { column: '', key: '' } };
  mostrarFormulario: boolean = false;
  frameCargando: boolean = false;
  urlFrame: string = "";
  @ViewChild('iframe') frame : ElementRef | undefined;
  constructor(private crudService: CRUDServiceService) { 
  }
  ngAfterViewInit(): void {
    (this.frame?.nativeElement as any)['onload'] = this.iframeCarga.bind(this);

  }

  ngOnInit(): void {
    this.config = this.encabezado();
    
  }
  grupoDetalle() {
    return {
      insertRoute: 'TB/documento-grupo',
      updateRoute: 'TB/documento-grupo',
      dataRoute: 'TB/documento-grupo',
      botonesEstado: { 'borrar': false },
      primaryKey: { column: 'ID', key: 'id' },
      multi: false,
      dataTable: {
        columns: [
          { 'columna': 'NOMBRE_GRUPO', 'nombre': 'tb.documento_grupo.grupo' },
          { 'columna': 'ESTATUS', 'nombre': 'tb.documento_grupo.estatus' },
        ]
      },
      controls: [
        new DropdownForm({ objectKey: 'CODIGO_GRUPO', key: "CODIGO_GRUPO", label: "tb.documento_grupo.grupo", required: true, order: 1 }, { dataSource: 'listas/grupos' }),
        new CheckBoxForm({ objectKey: 'ESTATUS', key: "ESTATUS", label: "tb.documento_grupo.estatus", required: true, order: 1 }, { trueValue: 1, falseValue: 0 }),
      ]
    };
  }
  servicioDetalle() {
    return {
      insertRoute: 'TB/documento-servicio',
      updateRoute: 'TB/documento-servicio',
      dataRoute: 'TB/documento-servicio',
      botonesEstado: { 'borrar': false },
      primaryKey: { column: 'ID', key: 'id' },
      multi: false,
      dataTable: {
        columns: [
          { 'columna': 'NOMBRE_SERVICIO', 'nombre': 'tb.servicios.servicio' },
          { 'columna': 'ESTATUS', 'nombre': 'tb.servicios.estatus' },
        ]
      },
      controls: [
        new DropdownForm({ objectKey: 'CODIGO_SERVICIO', key: "CODIGO_SERVICIO", label: "tb.servicios.servicio", required: true, order: 1 }, { dataSource: 'listas/servicios' }),
        new CheckBoxForm({ objectKey: 'ESTATUS', key: "ESTATUS", label: "tb.servicios.estatus", required: true, order: 1 }, { trueValue: 1, falseValue: 0 }),
      ]
    };
  }

  palabrasDetalle() {
    return {
      insertRoute: 'TB/documento-palabra',
      updateRoute: 'TB/documento-palabra',
      dataRoute: 'TB/documento-palabra',
      primaryKey: { column: 'ID', key: 'id' },
      botonesEstado: { 'borrar': false },
      multi: false,
      dataTable: {
        columns: [
          { 'columna': 'PALABRA_CLAVE', 'nombre': 'tb.palabra_clave.palabra' },
          { 'columna': 'ESTATUS', 'nombre': 'tb.palabra_clave.estatus' },
        ]
      },
      controls: [
        new DropdownForm({ objectKey: 'ID_CLAVE', key: "ID_CLAVE", label: "tb.palabra_clave.palabra", required: true, order: 1 }, { dataSource: 'listas/palabras' }),
        new CheckBoxForm({ objectKey: 'ESTATUS', key: "ESTATUS", label: "tb.palabra_clave.estatus", required: true, order: 1 }, { trueValue: 1, falseValue: 0 }),
      ]
    };
  }

   pdfCommando(event: any, datoSeleccionado: any) {
      this.crudService.create( { CODIGO_DOCUMENTO: datoSeleccionado.CODIGO_DOCUMENTO }, "generar-pdf" )
      .subscribe((data) => {
          
      }, (err) => console.log(err));
      
  }
  visorComando(data: any) {
    this.mostrarFormulario = true; 
    this.frameCargando = true; 
    let url = this.crudService.getBaseUrl();
    this.urlFrame = `${url}/vistas/documento/${data.CODIGO_DOCUMENTO}?v=${ new Date().toISOString() }`;
    
  }

  iframeCarga() {
    console.log("cargando");
     this.frameCargando = false;
  }
  encabezado() {
    return {
      insertRoute: 'TB/documento',
      updateRoute: 'TB/documento',
      dataRoute: 'TB/documento',
      recuperarRoute: 'TB/documento',
      selectedMode: "single",
      allowSelection: true,
      commands: [ { name: 'pdf', event: this.pdfCommando.bind(this) } ],
      primaryKey: { column: 'CODIGO_DOCUMENTO', key: 'codigo_documento' },
      botonesEstado: { 'borrar': false },
      multi: true,
      dataTable: {
        columns: [
          { 'columna': 'NOMBRE_PRODUCTO', 'nombre': 'tb.documento.producto', filter: { type: 'dropdown', dataSource: 'listas/productos', field: 'TB_DOCUMENTOS.CODIGO_PRODUCTO' } },
          { 'columna': 'DESCRIPCION_DOCUMENTO', 'nombre': 'tb.documento.descripcion' },
          { 'columna': 'ESTATUS', 'nombre': 'tb.documento.estatus' },
          { 'columna': 'ACCESO', 'nombre': 'tb.documento.acceso', labelValues: { "00": "no paga", "05": "nivel 1", "10": "nivel 2" } }
        ]
      },
      controls: [{
        titulo: "General", controls: [
          new DropdownForm({ objectKey: 'CODIGO_PRODUCTO', key: "codigo_producto", label: "tb.documento.producto", required: true, order: 1 }, { dataSource: 'listas/productos' }),
          new TextboxForm({ objectKey: 'DESCRIPCION_DOCUMENTO', key: "descripcion", label: "tb.documento.descripcion", required: true, order: 4 }, { isTextArea: true }),
          new CheckBoxForm({ objectKey: 'ESTATUS', key: "estatus", label: "tb.documento.estatus", required: true, order: 1 }, { trueValue: "ACTIVO", falseValue: "INACTIVO" }),
          new DropdownForm({ objectKey: 'ACCESO', key: "acceso", label: "tb.documento.acceso", required: true, order: 4 },
            {
              items: [
                { descripcion: "------", id: null },
                { descripcion: "no paga", id: "00" },
                { descripcion: "nivel 1", id: "05" },
                { descripcion: "nivel 2", id: "10" }
              ]
            }),

          new EditorForm({ objectKey: 'CONTENIDO', key: "contenido", label: "tb.documento.contenido", required: true, order: 1 }, { style: "height: 600px", command: { name: "visor", event: this.visorComando.bind(this) } })
        ]
      }, {
        titulo: "Palabras claves", controls: [
          new DetailForm({ key: "palabras", "label": "tb.documento.palabras", order: 5, config: this.palabrasDetalle(), llavesForeas: { key: 'CODIGO_DOCUMENTO', column: 'CODIGO_DOCUMENTO' } })
        ]
      },
      {
        titulo: "Servicios", controls: [
          new DetailForm({ key: "servicios", "label": "tb.documento.servicios", order: 5, config: this.servicioDetalle(), llavesForeas: { key: 'CODIGO_DOCUMENTO', column: 'CODIGO_DOCUMENTO' } })
        ]
      }, {
        titulo: "Grupos", controls: [
          new DetailForm({ key: "grupos", "label": "tb.documento.grupos", order: 5, config: this.grupoDetalle(), llavesForeas: { key: 'CODIGO_DOCUMENTO', column: 'CODIGO_DOCUMENTO' } })
        ]
      }
      ]
    };
  }
}

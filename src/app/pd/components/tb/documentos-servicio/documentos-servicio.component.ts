import { Component, OnInit } from '@angular/core';
import {DropdownForm, TextboxForm} from "../../../models/form.model";

@Component({
  selector: 'app-documentos-servicio',
  templateUrl: './documentos-servicio.component.html',
  styles: [
  ]
})
export class DocumentosServicioComponent implements OnInit {

  config: any = { controls: [], primaryKey: { column: '', key: '' } };

  constructor() {}
  ngOnInit(): void {
    this.config = this.encabezado();
  }
  encabezado() {
    return {
      insertRoute: 'TB/documento-servicio',
      updateRoute: 'TB/documento-servicio',
      dataRoute: 'TB/documento-servicio',
      primaryKey: { column: 'CODIGO_TB_INDICADORES', key:'codigo_tb_indicadores' },
      multi: false,
      dataTable: {
        columns: [
         // { 'columna': 'NOMBRE_PRODUCTO', 'nombre': 'tb.documento_servicio.producto', filter: { type: 'dropdown', dataSource: 'listas/productos', field: 'TB_DOCUMENTOS_X_SERVICIO.CODIGO_PRODUCTO'  } },
          { 'columna': 'NOMBRE_SERVICIO', 'nombre': 'tb.documento_servicio.servicio', filter: { type: 'dropdown', dataSource: 'listas/servicios', field: 'TB_DOCUMENTOS_X_SERVICIO.CODIGO_SERVICIO'  } },
         // { 'columna': 'NOMBRE_GRUPO', 'nombre': 'tb.documento_servicio.grupo', filter: { type: 'dropdown', dataSource: 'listas/grupos', field: 'TB_DOCUMENTOS_X_SERVICIO.CODIGO_GRUPO'  } },
          { 'columna': 'DESCRIPCION_DOCUMENTO', 'nombre': 'tb.documento_servicio.documento', filter: { type: 'dropdown', dataSource: 'listas/documentos', field: 'TB_DOCUMENTOS_X_SERVICIO.CODIGO_DOCUMENTO'  } }
        ]
      },
      controls: [
        //new DropdownForm ({ objectKey: 'CODIGO_PRODUCTO' ,key: "codigo_producto",label: "tb.documento_servicio.producto",required: true,order: 1}, { dataSource: 'listas/productos' }),
        new DropdownForm ({ objectKey: 'CODIGO_SERVICIO' ,key: "codigo_pais",label: "tb.documento_servicio.servicio",required: true,order: 1}, { dataSource: 'listas/servicios' }),
        //new DropdownForm ({ objectKey: 'CODIGO_GRUPO' ,key: "codigo_indicador",label: "tb.documento_servicio.grupo",required: true,order: 1}, { dataSource: 'listas/grupos' }),
        new DropdownForm ({ objectKey: 'CODIGO_DOCUMENTO' ,key: "codigo_indicador",label: "tb.documento_servicio.documento",required: true,order: 1}, { dataSource: 'listas/documentos' }),

      ]
    };
  }
}

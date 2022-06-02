import { Component, OnInit } from '@angular/core';
import { CheckBoxForm, DetailForm, DropdownForm, TextboxForm } from 'src/app/pd/models/form.model';
import { HiddenForm } from '../../../models/form.model';

@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styles: [
  ]
})
export class FormularioRegistroComponent implements OnInit {
  config: any = { controls: [], primaryKey: { column: '', key: '' } };
  constructor() { }

  ngOnInit(): void {
    this.config = this.encabezado();
  }
  
  onchangeTipo(event: any, data: any) {
    data['ORIGEN'] = "{}";
  }
  preguntas() {
    return {
      insertRoute: 'TB/producto-sector',
      updateRoute: 'TB/producto-sector',
      dataRoute: 'TB/producto-sector',
      botonesEstado: { 'borrar': true },
      primaryKey: { column: 'ID', key:'id' },
      dataTable: {
        columns: [
          { 'columna': 'SECTOR_ECONOMICO', 'nombre': 'tb.producto.nombre' },
          { 'columna': 'ESTATUS', 'nombre': 'tb.producto.estatus' },
        ]
      },
      controls: [
        new DropdownForm ({ objectKey: 'CODIGO_SECTOR' ,key: "CODIGO_SECTOR",label: "tb.producto.sector",required: true,order: 1}, { dataSource: 'listas/sectores' }),
        new CheckBoxForm ({ objectKey: 'ESTATUS' ,key: "ESTATUS",label: "tb.producto.estatus",required: true,order: 1}, { trueValue: 1, falseValue: 0 })
      ]
    };
  }
  encabezado() {
    return {
      insertRoute: 'catalogos/formulario',
      updateRoute: 'catalogos/formulario',
      dataRoute: 'catalogos/formulario',
      primaryKey: { column: 'ID', key:'id' },
      botonesEstado: { 'borrar': true },
      multi: true,
      dataTable: {
        columns: [
          { 'columna': 'TITULO', 'nombre': 'tb.producto.nombre' }
        ]
      },
      controls: [ 
        {
          titulo: "Formulario", controls: []
        },
        { titulo: "Preguntas", controls: [
          new DetailForm({key: "sectores", "label": "tb.producto.sector", order: 5, config: this.preguntas(), llavesForeas: { key: 'CODIGO_PRODUCTO', column: 'TB_PRODUCTOS_X_SECTORES.CODIGO_PRODUCTO' } })
        ] },
        {   
          titulo: 'Preguntas', mustBeCreated: true, controls: [
          new TextboxForm ({ objectKey: 'TITULO' ,key: "nombre",label: "tb.producto.nombre",required: true,order: 4}, { isTextArea: true }),
          new CheckBoxForm ({ objectKey: 'ACTIVO' ,key: "activo",label: "tb.producto.estatus",required: true,order: 1}, { trueValue: 1, falseValue: 0 }),
          new DropdownForm ({ objectKey: 'TIPO' ,key: "tipo",label: "tb.producto.acceso",required: true,order: 4, onchange: this.onchangeTipo.bind(this)  },
          { items: [
                { descripcion: "------", id: null },
                { descripcion: "texto", id: "text" },
                { descripcion: "select", id: "lista" },
                { descripcion: "date", id: "fecha" }
              ]
            }),
          new CheckBoxForm ({ objectKey: 'REQUERIDO' ,key: "requerido",label: "tb.producto.estatus",required: true,order: 1}, { trueValue: 1, falseValue: 0 }),
          new HiddenForm ({ objectKey: 'ORIGEN' ,key: "origen",label: "tb.producto.estatus",required: false,order: 1}),
          ],

         }]
    
        

      
    };
  }

}

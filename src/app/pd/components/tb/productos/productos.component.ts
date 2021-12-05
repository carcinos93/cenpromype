import { Component, OnInit } from '@angular/core';
import {CheckBoxForm, DetailForm, DropdownForm, FileForm, TextboxForm} from "../../../models/form.model";

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: [
  ]
})
export class ProductosComponent implements OnInit {
  config: any = { controls: [], primaryKey: { column: '', key: '' } };
  constructor() { }

  ngOnInit(): void {
    this.config = this.encabezado();
  }

  detalleSector() {
    return {
      insertRoute: 'TB/producto-sector',
      updateRoute: 'TB/producto-sector',
      dataRoute: 'TB/producto-sector',
      botonesEstado: { 'borrar': false },
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
      insertRoute: 'TB/producto',
      updateRoute: 'TB/producto',
      dataRoute: 'TB/producto',
      primaryKey: { column: 'CODIGO_PRODUCTO', key:'codigo_producto' },
      botonesEstado: { 'borrar': false },
      multi: true,
      dataTable: {
        columns: [
          { 'columna': 'NOMBRE_PRODUCTO', 'nombre': 'tb.producto.nombre' },
          { 'columna': 'LOGO', 'nombre': 'tb.producto.logo' },
          { 'columna': 'ESTATUS', 'nombre': 'tb.producto.estatus' },
          { 'columna': 'ACCESO', 'nombre': 'tb.producto.acceso', labelValues: { "00" : "no paga", "05" : "nivel 1", "10" : "nivel 2" } }
        ]
      },
      controls: [ { titulo: "General", controls: [ new TextboxForm ({ objectKey: 'NOMBRE_PRODUCTO' ,key: "nombre",label: "tb.producto.nombre",required: true,order: 4}),
      new FileForm ({ objectKey: 'LOGO' ,key: "logo",label: "tb.producto.logo",required: true,order: 1}, { accept: "image/*" }),
      new CheckBoxForm ({ objectKey: 'ESTATUS' ,key: "estatus",label: "tb.producto.estatus",required: true,order: 1}, { trueValue: "ACTIVO", falseValue: "INACTIVO" }),
      new DropdownForm ({ objectKey: 'ACCESO' ,key: "acceso",label: "tb.producto.acceso",required: true,order: 4},
        { items: [
            { descripcion: "------", id: null },
            { descripcion: "no paga", id: "00" },
            { descripcion: "nivel 1", id: "05" },
            { descripcion: "nivel 2", id: "10" }
          ]
        })] },
        { titulo: "Sectores", controls: [
          new DetailForm({key: "sectores", "label": "tb.producto.sector", order: 5, config: this.detalleSector(), llavesForeas: { key: 'CODIGO_PRODUCTO', column: 'TB_PRODUCTOS_X_SECTORES.CODIGO_PRODUCTO' } })
        ] }

      ]
    };
  }
}

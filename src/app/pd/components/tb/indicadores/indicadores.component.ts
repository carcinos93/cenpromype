import { Component, OnInit } from '@angular/core';
import { DropdownForm, TextboxForm } from 'src/app/pd/models/form.model';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styles: [
  ]
})
export class IndicadoresComponent implements OnInit {

  config: any = { controls: [], primaryKey: { column: '', key: '' } };

  constructor() {}
  ngOnInit(): void {
      this.config = this.encabezado();
  }
  encabezado() {
    return {
      insertRoute: 'TB/indicador',
      updateRoute: 'TB/indicador',
      dataRoute: 'TB/indicador',
      primaryKey: { column: 'CODIGO_TB_INDICADORES', key:'codigo_tb_indicadores' },
      multi: false,
      dataTable: {
        columns: [
          { 'columna': 'FUENTE_INFORMACION', 'nombre': 'tb.indicador.fuente', filter: { type: 'dropdown', dataSource: 'listas/fuente-informacion', field: 'TB_INDICADORES.CODIGO_FUENTE'  } },
          { 'columna': 'ANIO', 'nombre': 'tb.indicador.anio', filter: { type:"textbox", field: "TB_INDICADORES.ANIO" } },
          { 'columna': 'NOMBRE_PAIS', 'nombre': 'tb.indicador.pais', filter: { type: 'dropdown', dataSource: 'listas/paises', field: 'TB_INDICADORES.CODIGO_PAIS'  } },
          { 'columna': 'NOMBRE_INDICADOR', 'nombre': 'tb.indicador.indicador', filter: { type: 'dropdown', dataSource: 'listas/indicadores', field: 'TB_INDICADORES.CODIGO_INDICADOR',
              params:  [{ "value" : '[FUENTE_INFORMACION]', "col" : ""}]   } },
          { 'columna': 'VALOR1', 'nombre': 'tb.indicador.valor1' },
          { 'columna': 'VALOR2', 'nombre': 'tb.indicador.valor2' },
        ]
      },
      controls: [
        new DropdownForm ({ objectKey: 'CODIGO_FUENTE' ,key: "codigo_fuente",label: "tb.indicador.fuente",required: true,order: 1}, { dataSource: 'listas/fuente-informacion' }),
        new TextboxForm ({ objectKey: 'ANIO' ,key: "anio",label: "tb.indicador.anio",required: true,order: 4}),
        new DropdownForm ({ objectKey: 'CODIGO_PAIS' ,key: "codigo_pais",label: "tb.indicador.pais",required: true,order: 1}, { dataSource: 'listas/paises' }),
        new DropdownForm ({ objectKey: 'CODIGO_INDICADOR' ,key: "codigo_indicador",label: "tb.indicador.indicador",required: true,order: 1}, { dataSource: 'listas/indicadores' }),
        new TextboxForm ({ objectKey: 'VALOR1' ,key: "valor1",label: "tb.indicador.valor1",required: true,order: 4}),
        new TextboxForm ({ objectKey: 'VALOR2' ,key: "valor2",label: "tb.indicador.valor2",required: true,order: 4})
      ]
    };
  }
}

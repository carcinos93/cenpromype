import { Component, OnInit } from '@angular/core';
import { TextboxForm, TextNumberForm, FileForm, EditorForm } from '../../models/form.model';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styles: [
  ]
})
export class InformesComponent implements OnInit {

  constructor() { }
  encabezadoInforme_config: any = { controls: [], primaryKey: { column: '', key: '' } };
  ngOnInit(): void {
      //this.encabezadoInforme_config = this.encabezadoInforme();
  }
  encabezadoInforme_() {
    return {
      insertRoute: 'catalogos/paises',
      updateRoute: 'catalogos/paises',
      dataRoute: 'catalogos/paises',
      primaryKey: { column: 'CODIGO_INFORME', key:'codigo_informe' },
      multi: true,
      forms: [
        { "title" : "Formulario1", controls: [
          new TextboxForm ({ objectKey: 'TITULO' ,key: "nombre",label: "subida_informes.informe.titulo",required: true,order: 1}), 
          new TextboxForm ({ objectKey: 'DESCRIPCION1' ,key: "descripcion1",label: "subida_informes.informe.descripcion",required: true,order: 4}, { isTextArea: true }),
          new FileForm ({ objectKey: 'IMAGEN' ,key: "imagen",label: "subida_informes.informe.imagen",required: true,order: 5}, { accept: "image/*" })
        ] },
        {"title": "Formulario2", controls: [
          new EditorForm ({ objectKey: 'DESCRIPCION2' ,key: "descripcion2",label: "subida_informes.informe.descripcion",required: true,order: 4}, { style: { height: "320px" } }),
        ]}
      ],
      controls: [ 
        new TextboxForm ({ objectKey: 'TITULO' ,key: "nombre",label: "subida_informes.informe.titulo",required: true,order: 1}), 
        new TextboxForm ({ objectKey: 'DESCRIPCION' ,key: "descripcion",label: "subida_informes.informe.descripcion",required: true,order: 4}, { isTextArea: true }),
        new FileForm ({ objectKey: 'IMAGEN' ,key: "imagen",label: "subida_informes.informe.imagen",required: true,order: 5}, { accept: "image/*" })
      ]
    };
  }
}

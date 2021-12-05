import { Component, OnInit } from '@angular/core';
import { CheckBoxForm, configFormBuild, TextboxForm } from 'src/app/pd/models/form.model';
import { DropdownForm } from '../../../models/form.model';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styles: [
  ]
})
export class RolComponent implements OnInit {
  gridConfig: any = {};
  constructor() {
     this.gridConfig = this.formBuilder();
   }

  ngOnInit(): void {
  }
  nuevoRegistro(event: any) {
      event.dato.ESTADO = 1;
  }
  private formBuilder() {
    let config: configFormBuild;
    const formulario: any = {
          config: {
            dataTable: {
              columns: [
               { 'columna': 'NOMBRE_ROL', 'nombre': 'usuarios.rol.nombre' },
                { 'columna': 'ESTADO', 'nombre': 'usuarios.rol.estado' }
              ]
            },
            insertRoute: 'usuarios/rol',
            updateRoute: 'usuarios/rol',
            dataRoute: 'usuarios/rol',
            primaryKey: { column: 'CODIGO_ROL', key:'codigo_rol' },
            controls: [
              new TextboxForm ({ objectKey: 'NOMBRE_ROL' ,key: "nombre",label: "usuarios.rol.nombre",required: true,order: 1}),
              new CheckBoxForm ({ objectKey: 'ESTADO' ,key: "estatus",label: "usuarios.rol.estado",required: true,order: 1, defaultValue: 1}, { trueValue: 1, falseValue: 0 })
            ]
          }


     }
    //this.columnas = catalogos[this.catalogo].config.columnas;
    return formulario.config;
  }

}

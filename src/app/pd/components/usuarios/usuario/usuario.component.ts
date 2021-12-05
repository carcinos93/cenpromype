import { Component, OnInit } from '@angular/core';
import { CheckBoxForm, configFormBuild, DetailForm, DropdownForm, TextboxForm } from 'src/app/pd/models/form.model';
import { EstadoPipePipe } from '../../../../core/shared/pipes/estado-pipe.pipe';
import { PasswordForm } from '../../../models/form.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {
  gridConfig: any = {};
  constructor() { }

  ngOnInit(): void {
    this.gridConfig = this.formBuilder();
  }

  usuarioRolDetalle() {
    return {
      insertRoute: 'usuarios/usuario-rol',
      updateRoute: 'usuarios/usuario-rol',
      dataRoute: 'usuarios/usuario-rol',
      primaryKey: { column: 'ID', key: 'id' },
      botonesEstado: { borrar: true },
      multi: false,
      dataTable: {
        columns: [
          { 'columna': 'NOMBRE_ROL', 'nombre': 'usuarios.rol.nombre' },
          //{ 'columna': 'ESTATUS', 'nombre': 'tb.documento.estatus' },
        ]
      },
      controls: [
        new DropdownForm({ objectKey: 'CODIGO_ROL', key: "CODIGO_ROL", label: "usuarios.rol.nombre", required: true, order: 1 }, { dataSource: 'listas/roles' }),
      ]
    };
  }

  private formBuilder() {

    return  {
            dataTable: {
              columns: [ 
               { 'columna': 'NOMBRE_USUARIO', 'nombre': 'usuarios.usuario.nombre' },
               { 'columna': 'CORREO_ELECTRONICO', 'nombre': 'usuarios.usuario.correo' },
                { 'columna': 'ESTADO', 'nombre': 'usuarios.usuario.estado' }
              ]
            },
            insertRoute: 'usuarios/usuario',
            updateRoute: 'usuarios/usuario',
            dataRoute: 'usuarios/usuario',
            botonesEstado: {'borrar' : false},
            primaryKey: { column: 'CODIGO_USUARIO', key:'codigo_usuario' },
            multi: true,
            controls: [  
              { titulo: "General",  controls: [ 
              new TextboxForm ({ objectKey: 'NOMBRE_USUARIO' ,key: "nombre",label: "usuarios.usuario.nombre",required: true,order: 1}),
              new TextboxForm ({ objectKey: 'CORREO_ELECTRONICO' ,key: "correo",label: "usuarios.usuario.correo",required: true,order: 2}),
              new PasswordForm ({ objectKey: 'CONTRASENIA' ,key: "password",label: "usuarios.usuario.password",required: true,order: 2}),
              new CheckBoxForm({ objectKey: 'ESTADO', key: "estado", label: "usuarios.usuario.estado", required: true, order: 1 }, { trueValue: 1, falseValue: 0 })
            ]},  {
              titulo: "Roles", controls: [
                new DetailForm({ key: "usuarioRol", "label": "usuarios.usuario.roles", order: 5, config: this.usuarioRolDetalle(), llavesForeas: { key: 'CODIGO_USUARIO', column: 'CODIGO_USUARIO' } })
              ]
            }

          ]
          };
     
  }

}

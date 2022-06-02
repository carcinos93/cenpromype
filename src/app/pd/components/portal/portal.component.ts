import { Component, OnInit } from '@angular/core';
import { CRUDServiceService } from '../../../core/services/crudservice.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styles: [
  ]
})
export class PortalComponent implements OnInit {
  
  config: any = { controls: [], primaryKey: { column: '', key: '' } };
  configDescargas: any = { controls: [], primaryKey: { column: '', key: '' } };
  listaFormularios = [];
  formularioSeleccionado = [1];
  dialogo = false;
  idusuario = 0;
  formularios: any[] = [];
  constructor(private cs: CRUDServiceService) {
  
  }

  generarReporte(event: any) {
      //Se ordenan los ids ya que el registro del usuario tiene especificado los formularios que ha llenado para su registro
      let ids = ((this.formularioSeleccionado ?? []).sort( (a, b) => a - b )).join(",");
      let url =  `${this.cs.getBaseUrl()}/vistas/reporte/registro/${ids}`;
      window.open(url, "_blank");


  }
  cargarListas() {
      this.cs.getAll("listas/formularios", {}).subscribe((result) => {
          this.listaFormularios = result;
      });
  }
  descargasConf() {
      this.configDescargas = {
        dataRoute: 'portal/usuario-descargas',
        botonesEstado: { 'borrar': false, "editar": false, "nuevo": false  },
        primaryKey: { column: 'ID', key:'id' },
        dataTable: {
          columns: [
            { 'columna': 'ID', 'nombre': 'portal.descargas.id' },
            { 'columna': 'DOCUMENTO', 'nombre': 'portal.descargas.documento' },
            { 'columna': 'FECHA_CREACION', 'nombre': 'portal.descargas.fecha_creacion', 'pipes' : [{ 'pipe' : 'date', 'parametros': ["dd/MM/yyyy"] }] },
          ]
        },
        controls: [] //Esta formulario es solo vista
      };
  }

  ngOnInit(): void {
    this.descargasConf();
    this.cargarListas();
    this.config = {
      dataRoute: 'portal/usuarios',
      botonesEstado: { 'borrar': false, "editar": false, "nuevo": false  },
      primaryKey: { column: 'ID', key:'id' },
      dataTable: {
        columns: [
          { 'columna': 'ID', 'nombre': 'portal.usuarios.id' },
          { 'columna': 'NOMBRES', 'nombre': 'portal.usuarios.nombres' },
          { 'columna': 'APELLIDOS', 'nombre': 'portal.usuarios.apellidos' },
          { 'columna': 'CORREO', 'nombre': 'portal.usuarios.correo' },
          { 'columna': 'PAIS', 'nombre': 'portal.usuarios.pais' },
          { 'columna': 'FECHA_CREACION', 'nombre': 'portal.usuarios.fecha_creacion', 'pipes' : [{ 'pipe' : 'date', 'parametros': ["dd/MM/yyyy"] }] },
        ]
      },
      controls: [] //Esta formulario es solo vista
    };
  }

  dbClick(data: any) {
    this.formularios = [];
      this.idusuario = data.ID;
        this.cs.get( data.ID, "portal/respuestas" ).subscribe((data: any) => {
          if (data.respuestas) {
            let formularios: any = {};
            data.respuestas.forEach((v: any, i: number) => {
                if (!formularios[ v.ID_FORMULARIO ]) {
                    formularios[ v.ID_FORMULARIO ] = [];
                }
                if (typeof v.RESPUESTA.value == "string") {
                  v['valorDesc'] = v.RESPUESTA.value;
                }
                else if (typeof v.RESPUESTA.value.desc == "string") {
                  v['valorDesc'] = v.RESPUESTA.value.desc;
                } 
                else if ( Array.isArray( v.RESPUESTA.value ) ) {
                  v['valorDesc'] =   v.RESPUESTA.value.map(( v1: any ) => {
                      return v1['desc'];
                  }).join(", ");
                  
                }

                formularios[ v.ID_FORMULARIO ].push( v );
            });
            let j = 1;
            for (var i in formularios) {
              this.formularios.push( { id: `formulario ${j++}`, respuestas: formularios[i] });
            }
            this.dialogo = true;
          }
        });
      
  }

}

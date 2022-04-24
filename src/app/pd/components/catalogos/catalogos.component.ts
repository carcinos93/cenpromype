import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { BaseComponent } from 'src/app/core/components/base/base.component';
import { FormBuildComponent } from 'src/app/core/components/form-build/form-build.component';
import { CRUDServiceService } from 'src/app/core/services/crudservice.service';
import {
  configFormBuild,
  TextboxForm,
  TextNumberForm,
  DropdownForm,
  CheckBoxForm,
  FileForm
} from '../../models/form.model';
import { EstadoPipePipe } from '../../../core/shared/pipes/estado-pipe.pipe';
import { TranslatePipe } from '@ngx-translate/core';
import { Validators } from '@angular/forms';
import { AppConfig } from '../../../core/services/appConfig';
import { FileUploader } from '../../models/form.model';

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styles: [
  ]
})
export class CatalogosComponent extends BaseComponent implements OnInit {

  catalogo: string = '';
  columnas: string[] = [];
  gridConfig: any = {};

  constructor(private cruds: CRUDServiceService, public dialogService: DialogService,
    private activatedRoute: ActivatedRoute, private appconfig: AppConfig) {
    super(dialogService);
    this.catalogo = this.activatedRoute.snapshot.paramMap.get('catalogo') as string;
    //let columnas = this.columnasGrid(this.catalogo);
    //this.gridConfig = { columnas:  columnas , botones: [], ruta: 'catalogos/paises', tabla: this.catalogo };
    this.gridConfig = this.formBuilder();
  }
  /*private columnasGrid( catalogo: string ) {
      const catalogos: any = {
        paises: {
          columnas: ,
        }
      }
      return catalogos[catalogo].columnas;
  }*/
  private formBuilder() {
    let config: configFormBuild;
    const catalogos: any = {
        pais :  {
          config: {
            dataTable: {
              columns: [
                { 'columna' : 'NOMBRE_PAIS', 'nombre' : 'catalogos.pais.nombre_pais'  },
                { 'columna' : 'CODIGO_DIVISA', 'nombre' : 'catalogos.pais.codigo_divisa' },
                { 'columna' : 'SUPERFICIE', 'nombre' : 'catalogos.pais.superficie', pipes: [
                  { pipe: 'decimal', parametros: { digitalInfo: '1.0-0' } }, { pipe: (valor: any) => { return `${valor} km.` } }
                  ] },
                { 'columna' : 'ISO2', 'nombre' : 'catalogos.pais.iso2' },
                { 'columna' : 'ISO3', 'nombre' : 'catalogos.pais.iso3' }
               ]
            },
            insertRoute: 'catalogos/paises',
            updateRoute: 'catalogos/paises',
            dataRoute: 'catalogos/paises',
            primaryKey: { column: 'CODIGO_PAIS', key:'codigo_pais' },
            controls: [
              new TextboxForm ({ objectKey: 'NOMBRE_PAIS' ,key: "nombre",label: "catalogos.pais.nombre_pais" ,order: 1  }),
              new TextNumberForm ({ objectKey: 'SUPERFICIE' ,key: "superficie",label: "catalogos.pais.superficie",required: true,order: 2}, { minFractionDigits: 0 }),
              new TextboxForm ({ objectKey: 'CODIGO_DIVISA' ,key: "codigo_divisa",label: "catalogos.pais.codigo_divisa",required: true,order: 3}),
              new TextboxForm ({ objectKey: 'ISO2' ,key: "iso2",label: "catalogos.pais.iso2",validators: [ {name: "required"}, {"name": "equalLength", params: [ 2 ]  } ],order: 4}),
              new TextboxForm ({ objectKey: 'ISO3' ,key: "iso3",label: "catalogos.pais.iso3",validators: [ {name: "required"}, {"name": "equalLength", params: [ 3 ]  } ],order: 5}),
            ]
          }
        },
        "grupo-indicador": {
          config: {
            dataTable: {
              columns: [
                { 'columna': 'NOMBRE_GRUPO_IND', 'nombre': 'catalogos.grupo_indicador.nombre' }
              ]
            },
            insertRoute: 'catalogos/grupo-indicador',
            updateRoute: 'catalogos/grupo-indicador',
            dataRoute: 'catalogos/grupo-indicador',
            primaryKey: { column: 'CODIGO_GRUPO_IND', key:'codigo_grupo' },
            controls: [
              new TextboxForm ({ objectKey: 'NOMBRE_GRUPO_IND' ,key: "nombre",label: "catalogos.grupo_indicador.nombre",required: true,order: 1})
            ]
          }
        },
        "fuentes-informacion": {
          config: {
            dataTable: {
              columns: [
                { 'columna': 'FUENTE_INFORMACION', 'nombre': 'catalogos.fuente_informacion.fuente_informacion' }
              ]
            },
            insertRoute: 'catalogos/fuente-informacion',
            updateRoute: 'catalogos/fuente-informacion',
            dataRoute: 'catalogos/fuente-informacion',
            primaryKey: { column: 'CODIGO_FUENTE', key:'codigo_fuente' },
            controls: [
              new TextboxForm ({ objectKey: 'FUENTE_INFORMACION' ,key: "fuente_informacion",label: "catalogos.fuente_informacion.fuente_informacion",required: true,order: 1})
            ]
          }
        },
        departamentos: {
          config: {
            dataTable: {
              columns: [
                { 'columna': 'NOMBRE_DEPARTAMENTO', 'nombre': 'catalogos.departamento.nombre' },
                { 'columna': 'NOMBRE_PAIS', 'nombre': 'catalogos.departamento.pais', filter: { type: 'dropdown', dataSource: 'listas/paises', field: 'CAT_DEPARTAMENTOS.CODIGO_PAIS'  } }
              ]
            },
            insertRoute: 'catalogos/departamentos',
            updateRoute: 'catalogos/departamentos',
            dataRoute: 'catalogos/departamentos',
            primaryKey: { column: 'CODIGO_DEPARTAMENTO', key:'codigo_departamento' },
            controls: [
              new TextboxForm ({ objectKey: 'NOMBRE_DEPARTAMENTO' ,key: "nombre",label: "catalogos.departamento.nombre",required: true,order: 1, validators: [ { name: 'required' } ]}, { isTextArea: true }),
              new DropdownForm ({ objectKey: 'CODIGO_PAIS' ,key: "codigo_pais",label: "catalogos.departamento.pais",required: true,order: 1, validators: [ { name: 'required' } ]}, { dataSource: 'listas/paises' })
            ]
          }
        },
        "actividades-economicas": {
          config: {
            dataTable: {
              columns: [
                { 'columna': 'ACTIVIDAD_ECONOMICA', 'nombre': 'catalogos.actividades_economicas.actividad' }
              ]
            },
            insertRoute: 'catalogos/actividades-economicas',
            updateRoute: 'catalogos/actividades-economicas',
            dataRoute: 'catalogos/actividades-economicas',
            primaryKey: { column: 'CODIGO_ACTIVIDAD', key:'codigo_actividad' },
            controls: [
              new TextboxForm ({ objectKey: 'ACTIVIDAD_ECONOMICA' ,key: "actividad_economica",label: "catalogos.actividades_economicas.actividad",required: true,order: 1})
            ]
          }
        },
        "tipo-empresa": {
          config: {
            dataTable: {
              columns: [
                { 'columna': 'TIPO_EMPRESA', 'nombre': 'catalogos.tipo_empresa.tipo_empresa' }
              ]
            },
            insertRoute: 'catalogos/tipo-empresa',
            updateRoute: 'catalogos/tipo-empresa',
            dataRoute: 'catalogos/tipo-empresa',
            primaryKey: { column: 'CODIGO_TIPO_EMPRESA', key:'codigo_tipo_empresa' },
            controls: [
              new TextboxForm ({ objectKey: 'TIPO_EMPRESA' ,key: "tipo_empresa",label: "catalogos.tipo_empresa.tipo_empresa",required: true,order: 1})
            ]
          }
        },
        "sector-economico": {
          config: {
            dataTable: {
              columns: [
                { 'columna': 'SECTOR_ECONOMICO', 'nombre': 'catalogos.sector_economico.sector_economico' },
                { 'columna': 'DESCRIPCION', 'nombre': 'catalogos.sector_economico.descripcion' },
                { 'columna': 'IDENTIFICADOR', 'nombre': 'catalogos.sector_economico.identificador' },
                { 'columna': 'LOGO', 'nombre': 'catalogos.sector_economico.logo', 'pipes': [{ 'pipe' : 'imagen', 'parametros': { p: { "style": "width:100px;height:auto", "src": `${this.appconfig.config.rutaPortal}/[value]`  } } }]  },
               // { 'columna': 'BANNER', 'nombre': 'catalogos.sector_economico.banner', 'pipes': [{ 'pipe' : 'imagen', 'parametros': { p: { "style": "width:100px;height:auto", "src": `${this.appconfig.config.rutaPortal}/[value]`  } } }]  },
                { 'columna': 'ESTATUS', 'nombre': 'catalogos.sector_economico.estatus' },
                { 'columna': 'ACCESO', 'nombre': 'catalogos.sector_economico.acceso' },
              ]
            },
            insertRoute: 'catalogos/sector-economico',
            updateRoute: 'catalogos/sector-economico',
            dataRoute: 'catalogos/sector-economico',
            botonesEstado: { borrar: false },
            primaryKey: { column: 'CODIGO_SECTOR', key:'codigo_sector' },
            controls: [
              new TextboxForm ({ objectKey: 'SECTOR_ECONOMICO' ,key: "sector_economico",label: "catalogos.sector_economico.sector_economico",required: true,order: 1}),
              new TextboxForm ({ objectKey: 'DESCRIPCION' ,key: "descripcion",label: "catalogos.sector_economico.descripcion",required: true,order: 1}),
              new TextboxForm ({ objectKey: 'IDENTIFICADOR' ,key: "identificador",label: "catalogos.sector_economico.identificador",required: true,order: 1}),
              new FileForm ({ objectKey: 'LOGO' ,key: "logo",label: "catalogos.sector_economico.logo",required: true,order: 1}, { accept: "image/*" }),
              new FileUploader ({ objectKey: 'BANNER' ,key: "banner",label: "catalogos.sector_economico.banner",required: true,order: 1}, { accept: "image/*", multiple: true }),
              new CheckBoxForm ({ objectKey: 'ESTATUS' ,key: "estatus",label: "catalogos.sector_economico.estatus",required: true,order: 1}, { trueValue: "ACTIVO", falseValue: "INACTIVO" }),
              //new TextboxForm ({ objectKey: 'ESTATUS' ,key: "estatus",label: "catalogos.sector_economico.estatus",required: true,order: 1}),
              new DropdownForm ({ objectKey: 'ACCESO' ,key: "acceso",label: "catalogos.sector_economico.acceso",required: true,order: 4},
                { items: [
                    { descripcion: "no paga", id: "00" },
                    { descripcion: "nivel 1", id: "05" },
                    { descripcion: "nivel 2", id: "10" }
                  ]})
            ]
          }
        },
        "region": {
          config: {
            dataTable: {
              columns: [
                { 'columna': 'NOMBRE_REGION', 'nombre': 'catalogos.region.nombre_region' }
              ]
            },
            insertRoute: 'catalogos/region',
            updateRoute: 'catalogos/region',
            dataRoute: 'catalogos/region',
            primaryKey: { column: 'CODIGO_REGION', key:'codigo_region' },
            controls: [
              new TextboxForm ({ objectKey: 'NOMBRE_REGION' ,key: "nombre_region",label: "catalogos.region.nombre_region",required: true,order: 1})
            ]
          }
        },
        "indicadores": {
          config: {
            dataTable: {
              columns: [
                { 'columna': 'NOMBRE_INDICADOR', 'nombre': 'catalogos.indicadores.nombre' },
                { 'columna': 'UNIDAD_MEDIDA', 'nombre': 'catalogos.indicadores.unidad' },
                { 'columna': 'GRUPO_IND', 'nombre': 'catalogos.indicadores.grupo_indicador' },
                { 'columna': 'ETIQUETA1', 'nombre': 'catalogos.indicadores.etiqueta1' },
                { 'columna': 'ETIQUETA2', 'nombre': 'catalogos.indicadores.etiqueta2' }
              ]
            },
            insertRoute: 'catalogos/indicador',
            updateRoute: 'catalogos/indicador',
            dataRoute: 'catalogos/indicador',
            primaryKey: { column: 'CODIGO_INDICADOR', key:'codigo_indicador' },
            controls: [
              new TextboxForm ({ objectKey: 'NOMBRE_INDICADOR' ,key: "nombre",label: "catalogos.indicadores.nombre",required: true,order: 1}),
              new TextboxForm ({ objectKey: 'UNIDAD_MEDIDA' ,key: "unidad",label: "catalogos.indicadores.unidad",required: false,order: 2}),
              new DropdownForm ({ objectKey: 'CODIGO_GRUPO_IND' ,key: "grupo_ind",label: "catalogos.indicadores.grupo_indicador",required: true,order: 1}, { dataSource: 'listas/grupo-indicadores' }),
              new TextboxForm ({ objectKey: 'ETIQUETA1' ,key: "etiqueta1",label: "catalogos.indicadores.etiqueta1",required: false,order: 2}),
              new TextboxForm ({ objectKey: 'ETIQUETA2' ,key: "etiqueta2",label: "catalogos.indicadores.etiqueta2",required: false,order: 2}),
            ]
          }
        },
      "servicios": {
        config: {
          dataTable: {
            columns: [
              { 'columna': 'NOMBRE_SERVICIO', 'nombre': 'catalogos.servicios.nombre' },
              { 'columna': 'DESCRIPCION', 'nombre': 'catalogos.servicios.descripcion' },
              { 'columna': 'LOGO', 'nombre': 'catalogos.servicios.logo', 'pipes': [{ 'pipe' : 'imagen', 'parametros': { p: { "style": "height:75px;width:auto", "src": `${this.appconfig.config.rutaPortal}/[value]`  } } }]  },
              { 'columna': 'ESTATUS', 'nombre': 'catalogos.servicios.estatus' },
              { 'columna': 'ACCESO', 'nombre': 'catalogos.servicios.acceso' }
            ]
          },
          insertRoute: 'catalogos/servicio',
          updateRoute: 'catalogos/servicio',
          dataRoute: 'catalogos/servicio',
          primaryKey: { column: 'CODIGO_SERVICIO', key:'codigo_servicio' },
          controls: [
            new TextboxForm ({ objectKey: 'NOMBRE_SERVICIO' ,key: "nombre",label: "catalogos.servicios.nombre",required: true,order: 1}),
            new TextboxForm ({ objectKey: 'DESCRIPCION' ,key: "descripcion",label: "catalogos.servicios.descripcion",required: false,order: 2}, { isTextArea: true }),
            new FileForm ({ objectKey: 'LOGO' ,key: "logo",label: "tb.producto.logo",required: true,order: 1}, { accept: "image/*" }),
            new CheckBoxForm ({ objectKey: 'ESTATUS' ,key: "estatus",label: "tb.producto.estatus",required: true,order: 1}, { trueValue: "ACTIVO", falseValue: "INACTIVO" }),
            //new TextboxForm ({ objectKey: 'ESTATUS' ,key: "estatus",label: "tb.producto.estatus",required: true,order: 1}),
            new DropdownForm ({ objectKey: 'ACCESO' ,key: "acceso",label: "tb.producto.acceso",required: true,order: 4},
              { items: [
                  { descripcion: "no paga", id: "00" },
                  { descripcion: "nivel 1", id: "05" },
                  { descripcion: "nivel 2", id: "10" }
                ]})
          ]
        }
      }

     }
    //this.columnas = catalogos[this.catalogo].config.columnas;
    return catalogos[this.catalogo].config;
  }

  ngOnInit(): void {

  }

}


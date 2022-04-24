import { Component, OnInit } from '@angular/core';
import { TreeDragDropService, TreeNode, TreeNodeDragEvent } from 'primeng/api';
import { CheckBoxForm, DropdownForm, TextboxForm } from 'src/app/pd/models/form.model';
import { CRUDServiceService } from '../../../../core/services/crudservice.service';
import {MessageService} from 'primeng/api';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ],
  providers: [ TreeDragDropService, MessageService]
})
export class MenuComponent implements OnInit {
  
  configFormularioMenu: any = { controls: [], primaryKey: { column: '', key: '' } };
  mostrarFormulario: boolean = false;
  datoSeleccionado = {};
  constructor(private crudService: CRUDServiceService) {
    this.configFormularioMenu = this.formularioMenu();
   }
  menuPrincipal: cenpromype.MiNodo  [] = [];
  menuRoles: cenpromype.MiNodo  [] = [];
  menuSeleccionado: cenpromype.MiNodo[] = [];
  menuRolesSeleccionados: cenpromype.MiNodo[] = [];
  menuRolesQuitados: cenpromype.MiNodo[] = [];
  rolSeleccionado: number = 0;
  rolesLista: any[] = [];
  ngOnInit(): void {
      this.cargarDatos();
      this.crudService.getAll('listas/roles', {}).subscribe((data) => {
          this.rolesLista.push( { id: 0, descripcion: "Seleccionar" });
          this.rolesLista.push(...data);
      });
      
  }

  seleccionarNodo(event: any) {
    if (event.originalEvent.detail == 2) {
      const id = event.node.id;
      this.crudService.get(id,  'TB/menu' ).subscribe((data) => {
        this.datoSeleccionado = data;
        this.mostrarFormulario = true;
        
      });
    }
    
  }

  cargarDatos() {
    this.crudService.getAll("TB/menu", {}).subscribe((data) => {
      this.menuPrincipal = data;
      this.menuRoles = data;
  });

  }

  soltarNodo(event: any) {
      let dragNode = event.dragNode;
      let dropNode = event.dropNode;
      if (!dragNode.is_group && dropNode.is_group) {
          event.accept();
          this.crudService.update( dragNode.id, "TB/menu/menu-padre", { MENU_PADRE: dropNode.id } ).subscribe((data) => {
              console.log(data);
          })
      }
  }


  /**** FUNCIONES DE LA VISTA MENU X ROL ****/
  cambioRol(valor: any) {
   
    this.crudService.getAll(`TB/menu/roles/${valor}`, {} ).subscribe((data: cenpromype.MenuRol[]) => {
        this.menuSeleccionado = [];
        this.menuRoles.forEach((v: cenpromype.MiNodo) => {
            if (v.children != undefined) {
              let children = v.children as cenpromype.MiNodo[];
                  let seleccionados = children.filter((m) => {
                    return data.filter(( n ) => n.CODIGO_MENU == m.id ).length > 0
                });
                  if (seleccionados.length > 0) {
                      (seleccionados[0] as any).parent['partialSelected'] = true;
                  }
                  this.menuSeleccionado.push( ...seleccionados );
            }
        });   
    });
  }
  
  seleccionarNodoRoles(event: any){
      const n = event.node as cenpromype.MiNodo;
      this.menuRolesSeleccionados.push( n);
  }

  quitarNodoRoles(event: any){
    const n = event.node as cenpromype.MiNodo;
    this.menuRolesQuitados.push( n);
}

  guardarCambios() {
      
      let seleccionados =  this.menuRolesSeleccionados.map( v => v.id );
      let quitados = this.menuRolesQuitados.map( v =>  v.id );


      let datos = new FormData();

      datos.append("seleccionados", JSON.stringify(seleccionados));
      datos.append("quitados", JSON.stringify(quitados));

      this.crudService.create( datos,`TB/menu/roles/${ this.rolSeleccionado }` ).subscribe((resp) => {
          if (resp.success) {
            this.menuRolesQuitados = [];
            this.menuRolesSeleccionados = [];
            this.rolSeleccionado = 0;
            this.cargarDatos();
            alert("Menu actualizado");
          }
      }, (error) => console.log(error));
      
  }
  formularioMenu() {
    return {
      insertRoute: 'TB/documento',
      updateRoute: 'TB/documento',
     // dataRoute: 'TB/documento',
      primaryKey: { column: 'CODIGO_MENU', key:'codigo_menu' },
     // botonesEstado: { 'borrar': false },
      multi: false,
     /* dataTable: {
        columns: [
          { 'columna': 'DESCRIPCION', 'nombre': 'tb.documento.nombre', filter: { type: 'dropdown', dataSource: 'listas/productos', field: 'TB_DOCUMENTOS.CODIGO_PRODUCTO'  } },
          { 'columna': 'ETIQUETA', 'nombre': 'tb.documento.descripcion' },
          { 'columna': 'ESTATUS', 'nombre': 'tb.documento.estatus' },
          { 'columna': 'ACCESO', 'nombre': 'tb.documento.acceso', labelValues: { "00" : "no paga", "05" : "nivel 1", "10" : "nivel 2" } }
        ]
      },*/
      controls: [
        new TextboxForm ({ objectKey: 'DESCRIPCION' ,key: "descripcion",label: "tb.menu.etiqueta",required: true,order: 4}, { isTextArea: true }),      
        new TextboxForm ({ objectKey: 'ETIQUETA' ,key: "etiqueta",label: "tb.menu.etiqueta",required: true,order: 4}),
        new TextboxForm ({ objectKey: 'URL' ,key: "url",label: "tb.menu.url",required: true,order: 4})
      ]
    };
  }

}

declare module cenpromype {
  export interface MiNodo extends TreeNode
  {
    id: number;
  }
  
  export interface MenuRol {
    CODIGO_ROL: number;
    CODIGO_MENU: number;
    FECHA_ADICION: string;
    USUARIO_ADICION: string;
    FECHA_MODIFICACION?: any;
    USUARIO_MODIFICACION?: any;
    ID: number;
  }
}


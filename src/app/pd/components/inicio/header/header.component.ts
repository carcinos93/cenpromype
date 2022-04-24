import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import menu_json from '../../../../shared/menu';
import { CRUDServiceService } from '../../../../core/services/crudservice.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    ':host {  display:block }'
  ]
})
export class HeaderComponent  implements OnInit {
  idiomas: string[] = [];
  menuCargado = false;
  urlActual: string = ''
  menu: { MENU: string, SUBMENU:  { nombre: string, url: string }[]  }[]   = [] as any;
  //menu: { MENU: string, SUBMENU:  { nombre: string, url: string }[]  }[]   = [] as any;
  constructor(private translate: TranslateService, private route: Router, private crudService: CRUDServiceService) {

    this.translate.setDefaultLang("es");

      //this.menu = menu_json.property;
    this.crudService.getAll("usuarios/menuUsuario", {}).subscribe((data: []) => {
         this.menu = data.map((v, i) => {
              return { 
                MENU: v['ETIQUETA'], SUBMENU: (v['SUBMENU'] as []).map((v1) => { 
                  return { nombre: v1['ETIQUETA'], 'url': v1['URL'] };
                })};
        });    
    }, (error) =>  console.log(error), () => this.menuCargado = true );

    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.urlActual = event.url; 
      }
    });
   }
  ngOnInit(): void {
    
  }
  urlActiva(url: string) {
    if (url == undefined) return false ;

    return this.urlActual.includes(url);
  }
  menuClick(url: string) {
      
      this.route.navigateByUrl('/pd/', { skipLocationChange: true }).then(() => {
        this.route.navigate([`/pd/${url}`],  { fragment: 'tabla-datos' });
         // enlace.parentElement?.classList.add("active");
      });
     // this.route.navigateByUrl(url);
  }
  onChangeIdioma(value: any) {
    this.translate.use(value);
  }

}

export interface Menu {

}


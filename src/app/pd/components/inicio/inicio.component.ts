import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '../../../core/services/local-storage.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: [ './styles.scss' ]
})
export class InicioComponent implements OnInit {

  title = 'cenpromype';
  items: any[] = [];
  idiomaSeleccionado: string = 'es';
  constructor( private translateService: TranslateService, private snack: MatSnackBar, public localStorage: LocalStorageService,
    private router: Router) {
      let idioma = this.localStorage.getItem("cenpromype_idioma") || "es";
      this.idiomaSeleccionado = idioma;
      this.translateService.use(idioma);
      
  }
  ngOnInit(): void {
    (async() => {
      let s = await this.translateService.get("botones.cerrar_sesion").toPromise();
        this.items = [{ label: s, icon: 'pi pi-power-off', command: () => {
            this.cerrarSesion();
    }}];
    } )();

      /*this.translateService.get("botones.cerrar_sesion").subscribe((data) => {
          
      });*/
      
    
  }

  onChangeIdioma(idioma: string,) {
      this.localStorage.setItem( "cenpromype_idioma", idioma );
      this.translateService.use(idioma);

     let mensaje = this.translateService.get("mensajes.cambio_idioma").subscribe((mensaje) => {
        this.snack.open(mensaje,"", { verticalPosition: "top", duration: 2000 });
     });

  }

  cerrarSesion() {
    this.localStorage.logout();
    this.router.navigateByUrl('/');
  }
}

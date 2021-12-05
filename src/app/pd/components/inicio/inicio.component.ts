import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '../../../core/services/local-storage.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: [
  ]
})
export class InicioComponent implements OnInit {

  title = 'cenpromype';
  constructor( private translateService: TranslateService, private snack: MatSnackBar, private localStorage: LocalStorageService,
    private router: Router) {

  }
  ngOnInit(): void {
      
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

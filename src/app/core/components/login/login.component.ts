import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../services/local-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { CRUDServiceService } from '../../services/crudservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [ '.login-contenedor {  background-color: #12549d }',
  ' h3 { color: #12549d; }'
  ]
})
export class LoginComponent implements OnInit {
  usuario: string = '';
  password: string = '';
  formulario: FormGroup;
  
  constructor(private router: Router, private http: HttpClient,
    private ls: LocalStorageService, private translate: TranslateService,
    private crudService: CRUDServiceService) { 
     this.translate.setDefaultLang("es");
    this.formulario = new FormGroup({});
    if (this.ls.isAuthenticated()) {
        this.redireccionar();
    }

  }

  ngOnInit(): void {
   // document.body.style.backgroundColor = "";
   this.formulario = new FormGroup( {
    "usuario": new FormControl( '', [ Validators.required ] ),
    "password": new FormControl( '', Validators.required)
  });

  }
  enviarFormulario() {
      if (!this.formulario.invalid) {
          this.crudService.create(  { usuario: this.usuario, password: this.password }, "login" ).subscribe((data: any) => {
            if (data.success) {
              this.ls.login({ "token" : data.token, username: this.usuario });
             } else {
               this.translate.get(data.message).subscribe((data: any) => {
                  alert(data);
               });
             }
          }, (error) => console.log(error), () => { 
            this.redireccionar();
          });
           
      }

  }
  login() {

    //document.body.style.backgroundColor = "white";

  }

  redireccionar() {
    this.router.navigateByUrl('/pd/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/pd/inicio`]);
    });

      //window.location.reload();
  }

  controlVerificacion(nombre: string): boolean {
    return this.formulario.controls[nombre].invalid &&  (this.formulario.controls[nombre].dirty
      ||  this.formulario.controls[nombre].touched);
  }

  controlValido(nombre: string, validacion: string) {
    return this.formulario.controls[nombre].errors?.[validacion] || true;
  }

  
}

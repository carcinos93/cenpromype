import { Component, OnInit, ViewChild } from '@angular/core';
import { TraductorService } from '../../../core/services/traductor.service';

@Component({
  selector: 'app-traductor',
  templateUrl: './traductor.component.html',
  styles: [
  ]
})
export class TraductorComponent implements OnInit {
  resultado: any = {};
  json: string = '';
  constructor(private traductor: TraductorService) { }

  ngOnInit(): void {
      
  }

  traducir() {
    let objeto = JSON.parse(this.json );
    this.resultado = objeto;
    
    this.recorrerObjeto( objeto, 0 );
   
  
  // this.resultado = objeto;
  }

sleep(time: number) {
    return new Promise( (r) => setTimeout(r, time));
}
recorrerObjeto(objeto: any, nivel: number) {
    for (const key in objeto) {
      if ( typeof objeto[key] == "string" ) {
          let valor =  (objeto[key] as string).toLocaleLowerCase();
           if (valor != "") {
              this.traductor.traducir([ valor ], "en").subscribe((data: string[]) => {
                if (data.length>0) {
                  objeto[key] = data[0];
                }
              }, (err) => console.log(err));
           }
    
         /*;*/
      } else {
        objeto[key] = this.recorrerObjeto( objeto[key], nivel + 1 );
      }
    }
    if (nivel> 0) {
      return objeto;
    } else {
      return null;
    }
  }

}

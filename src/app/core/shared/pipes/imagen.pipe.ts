import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  constructor(private dom: DomSanitizer) {}
  transform(value: string, propiedades: any = {} ) {
    let prop = "";
    for (var i in propiedades) {
        prop = `${ prop } ${ i } = '${ propiedades[i] }'`;
    }
    let html = `<img ${prop} />`.replace( '[value]', value);
    console.log(html);
    return html;
    //return this.dom.bypassSecurityTrustHtml(  html );
  }

}

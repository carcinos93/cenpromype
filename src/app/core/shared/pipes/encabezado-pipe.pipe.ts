import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'encabezadoPipe'
})
export class EncabezadoPipePipe implements PipeTransform {

  constructor() {}
  transform(value: string) {
    let llave = `formularios.${ value }`;
    return  llave;

  }

}

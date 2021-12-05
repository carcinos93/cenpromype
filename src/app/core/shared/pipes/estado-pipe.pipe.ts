import {  Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'estadoPipe'
})
export class EstadoPipePipe implements PipeTransform {
  transform(value: number): string {
    return (value == 1 ? "activo" :  "inactivo");
  } 

}

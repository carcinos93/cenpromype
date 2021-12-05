import { Injectable } from '@angular/core';
import {ImagenPipe} from "../shared/pipes/imagen.pipe";
import {UrlPipe} from "../shared/pipes/url.pipe";
import {TranslatePipe} from "@ngx-translate/core";
import {DatePipe, DecimalPipe, UpperCasePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class PipeManagerService {

  private pipes: any = {};
  constructor(public  imagenPipe: ImagenPipe,
              public urlpipe: UrlPipe,
              public upperCasePipe: UpperCasePipe,
              public decimalPipe: DecimalPipe,
              public dateTimePipe: DatePipe
  )
  {
  this.setup();
   // this.pipes['translate'] = this.translatePipe;

  }
  public setup() {
    this.pipes['imagen'] = this.imagenPipe;
    this.pipes['url'] = this.urlpipe;
    this.pipes['uppercase'] = this.upperCasePipe;
    this.pipes['decimal'] = this.decimalPipe;
    this.pipes['date'] = this.dateTimePipe;
  }
  public pipeKey(key: string) {
    return this.pipes[key] || { transform: (...p: any)=> { return p[0]; } };
  }



}

import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'sanitizerHTML'
})
export class SanitizerHTMLPipe implements PipeTransform {
  constructor(private dom: DomSanitizer) {
  }
  transform(value: any) {
    if (value == null) {
      return "";
    }
    return this.dom.bypassSecurityTrustHtml(  value  );
  }
}

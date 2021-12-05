import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { configFormBuild } from 'src/app/pd/models/form.model';
import { CRUDServiceService } from '../../services/crudservice.service';

@Component({
  selector: 'app-form-build',
  templateUrl: './form-build.component.html',
  styles: [
  ]
})
export class FormBuildComponent implements OnInit {

  @Input() config: configFormBuild = { dataTable: { columns: [] }, controls: [], primaryKey: { column: '', key: ''  }  } as any;

 // @ViewChild('controlKey') control: ElementRef | undefined;

  @Output() OnSubmit = new EventEmitter(); 
  @Input() mostrarFormulario: boolean = false;
  @Input() modo: string = 'nuevo';
  @Input() dato: any = {};
  enviarHabilitado: boolean = true;
  //_config: configFormBuild = { dataTable: { columns: [] }, controls: [], primaryKey: { column: '', key: ''  } } as any;
  constructor(private crudService: CRUDServiceService ) {
    

   }
   ngOnInit(): void {

  }
 /* ngOnChanges(changes: SimpleChanges): void {
    if (changes['config'] != undefined) {
      if (changes['config'].previousValue != changes['config'].currentValue && changes['config'].currentValue != null)
      {
        this._config = changes['config'].currentValue;
        console.log(this._config);
      }
    } 
  }*/


}

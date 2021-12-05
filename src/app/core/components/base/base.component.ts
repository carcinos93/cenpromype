import { Component, OnInit, Type } from '@angular/core';

import { DialogService } from 'primeng/dynamicdialog';
import { CRUDServiceService } from '../../services/crudservice.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styles: [
  ]
})
export class BaseComponent implements OnInit {
  
  constructor(public dialogService: DialogService) { }
  
  ngOnInit(): void {
  }
  public OnInsert(data: any) {
    console.log('insertando data ', data);
  }
  public OnUpdate(data: any) {
    console.log('actualizando data ', data);
  }
  public newRecord( c: Type<any>,data: any,  header: string  ) {
    this.OpenDialog( c, data, 'nuevo', header );
  }
  public editRecord(  c: Type<any>,data: any,  header: string  ) {
    this.OpenDialog( c, data, 'actualizar', header );
  }
  private OpenDialog(c: Type<any>,data: any, modo: string, header: string ){ 
    let datos = { data: data, modo: modo };
      this.dialogService.open( c ,{ header: header, width: "70%", data: datos } );
  }

}

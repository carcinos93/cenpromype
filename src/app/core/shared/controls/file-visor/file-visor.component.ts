import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-visor',
  templateUrl: './file-visor.component.html',
  styles: [
  ]
})
export class FileVisorComponent implements OnInit {
  
  _url: string = '';
  isImage: boolean = false
  fileName: string = '';
  validFile: boolean = false;
  @Input() fullUrl: string = '';
  @Input() set url(value: string) { 
      this.fileName = '';
      this.validFile = false;
      this._url = value;
      this.isImage  = false;
      if ((value ?? "").length > 0) {
          //extraer el nombre de archivo  
          var arr = value.split("\\").length == 1 ? value.split("/") : value.split("\\");
          if (arr.length > 0) {
              var nombreArchivo = arr[ arr.length - 1 ];
              this.fileName = nombreArchivo;
              //extraer la extension
              arr = nombreArchivo.split(".");

              if (arr.length >= 1) {
                this.validFile = true;
                var extension = arr[1];

                var extensionesImagen = ["png", "jpg", "jpeg", "tiff", "bmp"];
                if (extensionesImagen.join(",").includes(extension)) {
                  this.isImage = true;
                }
              }
          }
          
          
      }
  }
  constructor() { }

  ngOnInit(): void {
  }

}

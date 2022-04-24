import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CRUDServiceService } from '../../../services/crudservice.service';
import { AppConfig } from '../../../services/appConfig';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styles: [
    '.selectedImage { border:5px solid #ff4940 }' 
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: FileUploaderComponent
    }
  ]
})
export class FileUploaderComponent implements ControlValueAccessor, OnInit   {

  @Input() multiple = false;
  @Input() accept = "image/*";
  uploadedFiles: any[] = [];
  file: string = "";
  filesArr: [] = [];
  mostrarModal: boolean = false;
  imagenes: { full_path: string, relative_path: string, file: string }[] = [];
  onChange = (file: string) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;
  selected: any =  {};
  constructor(public crud: CRUDServiceService, public appconfig: AppConfig) { }
  ngOnInit(): void {
    this.crud.getAll("archivos-lista", {}).subscribe((data) => {
      this.imagenes = data;
    });
  }
  
  retornar(event: any) {

      let tmp = this.imagenes.filter((v, i) => {
          return this.selected[i];
      }).map((v, i) => {
        return v.relative_path;
      });
      console.log(tmp);
      var files = (tmp ?? []).join(",");
      this.markAsTouched();
      this.writeValue(files);
      this.onChange(this.file);
      this.mostrarModal = false;
  }

  onUpload(event: any) {
    let respuesta = event.originalEvent;
    if (respuesta.statusText == "OK") {
      var body = respuesta.body;
      var files =  (body.archivos ?? []).join(",");
      this.markAsTouched();
      this.writeValue( files );
      this.onChange(this.file)
      this.mostrarModal = false;
    }
  }

  seleccionarImagen(index: number) {
    if (!this.selected[index]) {
        this.selected[index] = true;
    } else {
      delete this.selected[index];
    }

    console.log(this.selected);

  }

  onSend(event: any) {
   // console.log('send');
   // console.log(event);
  }

  onCargarArchivos(e: any) {
    this.mostrarModal = true;
  }

  writeValue(file: string) {
    this.file = file;
    
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

 
}

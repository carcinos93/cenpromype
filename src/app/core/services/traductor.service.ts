import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const baseUrl = 'http://localhost:10224/cenpromype_ws/api/traducir';

@Injectable({
  providedIn: 'root'
})
export class TraductorService {
  constructor(private http: HttpClient) { 
  }
  traducir(palabras: string[], idioma: string) {
    return this.http.post<itranslations>(baseUrl, {
      "palabras" :  palabras,
      "idioma": idioma
  }).pipe( map(  (data ) => {
        let datos: string[] = [];
        data.translations.forEach((v, i) => {
            datos.push( v.translation );
        });

        return datos;
      }));
  }
}
export interface itranslations
{
  translations: { translation: string } []
}
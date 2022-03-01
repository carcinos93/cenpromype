import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from './appConfig';
//const this.baseUrl = '/~oqmdev/cenpromype_ws';
//const this.baseApi = '/~oqmdev/cenpromype_ws/api';

//const this.baseUrl = '/cenpromype_ws';
//const this.baseApi = '/cenpromype_ws/api'




@Injectable({
  providedIn: 'root'
})
export class CRUDServiceService {

  baseUrl = '/ws';
  baseApi = '/ws/api';

  constructor(private http: HttpClient, private appConfig: AppConfig) { 
       this.baseUrl = appConfig.config.baseUrl;
       this.baseApi = appConfig.config.baseApi;
  }
  getBaseUrl() {
    return this.baseUrl;
  }
  getAll(route: string, l: any): Observable<any> {
    let filterArray= [];
    let sort = l.multiSortMeta ?? [];
    if (l.cfilter != null && l.cfilter != {}){
      for (let v in l.cfilter) {
          filterArray.push( l.cfilter[v] );
      }
    }
    //return this.http.get( './assets/dummy.json');
    return this.http.get(`${this.baseApi}/${route}`, { params: { first:  l.first || null ,rows:  l.rows || null, filters: JSON.stringify( filterArray ), sorts: JSON.stringify( sort ) }});
  }

  get(id: number, route: string): Observable<any> {
    return this.http.get(`${this.baseApi}/${route}/${id}`);
  }
  


  create(data: any, route: string, multimedia: boolean = false): Observable<any> {
    var headers = new HttpHeaders();
    if (multimedia ) {
     // headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
    }
    return this.http.post(`${this.baseApi}/${route} `, data, { headers: headers  });
  }

  update(id: any,route: string, data: any): Observable<any> {
    return this.http.post(`${this.baseApi}/${route}/${id}?_method=PUT`, data);
  }

  delete(id: number, route: string): Observable<any> {
    return this.http.post(`${this.baseApi}/${route}/${id}`, {  '_method' : 'DELETE'});
  }
}

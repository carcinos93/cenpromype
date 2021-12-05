import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//const baseUrl = '/~oqmdev/cenpromype_ws/api';
const baseUrl = '/cenpromype_ws/api';
//const baseUrl = '/ws/api';

@Injectable({
  providedIn: 'root'
})
export class CRUDServiceService {

  constructor(private http: HttpClient) { }

  getAll(route: string, l: any): Observable<any> {
    let filterArray= [];
    let sort = l.multiSortMeta ?? [];
    if (l.cfilter != null && l.cfilter != {}){
      for (let v in l.cfilter) {
          filterArray.push( l.cfilter[v] );
      }
    }
    //return this.http.get( './assets/dummy.json');
    return this.http.get(`${baseUrl}/${route}`, { params: { first:  l.first || null ,rows:  l.rows || null, filters: JSON.stringify( filterArray ), sorts: JSON.stringify( sort ) }});
  }

  get(id: number, route: string): Observable<any> {
    return this.http.get(`${baseUrl}/${route}/${id}`);
  }

  create(data: any, route: string, multimedia: boolean = false): Observable<any> {
    var headers = new HttpHeaders();
    if (multimedia ) {
     // headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
    }
    return this.http.post(`${baseUrl}/${route} `, data, { headers: headers  });
  }

  update(id: any,route: string, data: any): Observable<any> {
    return this.http.post(`${baseUrl}/${route}/${id}?_method=PUT`, data);
  }

  delete(id: number, route: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${route}/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppConfig {
  private _config: Config = {} as any;
  constructor(private http: HttpClient) { 
  }

  get config(): Config {
      return this._config;
  }
  
  public loadAppConfig(): any {
    const envFile = environment.production ? 'prod' : 'dev';
    var f = new Date().toISOString();
    return this.http.get(`./assets/config/config-${envFile}.json?v${f}`)
    .toPromise()
    .then( (data: any) => { 
      this._config = data;
    });

  }

  
}

export interface Config
{
  rutaPortal: string,
  baseApi: string,
  baseUrl: string,
  versions: { i18n: string }
}


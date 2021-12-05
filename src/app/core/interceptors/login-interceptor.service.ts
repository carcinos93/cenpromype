import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import { LocalStorageService } from './local-storage.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginInterceptorService implements HttpInterceptor {

  constructor(private ls: LocalStorageService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;
    /*-const skipIntercept = req.headers.has('skip');

      if (skipIntercept) {
        request = request.clone({
        headers: request.headers.delete('skip')
      });

      return next.handle(request);
    }
    */


    const token = this.ls.getCurrentToken();
    if (this.ls.isAuthenticated()) {
      request = req.clone( {
        setHeaders: {
          'X-Authorization' : `${ token }`
        }
      } );
    }
    
    return next.handle(request).pipe( catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && this.ls.isAuthenticated() ) {
          this.ls.logout();
          this.router.navigateByUrl('/');
      } else if (err.status === 401 && !this.ls.isAuthenticated() ) {
        this.router.navigateByUrl('/');
      }
      return throwError( err );
    }) );
  }
}

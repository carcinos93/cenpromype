import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private localStorageService;
  private currentSession: any = null;
  constructor() { 
    this.localStorageService = localStorage;
    this.loadSessionData();
  }

  loadSessionData(): any {
    var sessionStr = this.getItem('currentUser');
    this.currentSession = (sessionStr) ? JSON.parse(sessionStr) : null;
  }
  getCurrentSession(): any {
    return this.currentSession;
  }

  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  };

  getCurrentUsername(): string {
    var session = this.getCurrentSession();
    return (session && session.username) ? session.username : null;
  };


  login(session: any): void {
    this.setItem('currentUser', JSON.stringify(session));
    this.loadSessionData();
  }

  logout(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  getItem(name: string) {
    return this.localStorageService.getItem(name);
  }

  setItem(name: string, value: any) {
    this.localStorageService.setItem(name, value);
  }

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  };
  


}

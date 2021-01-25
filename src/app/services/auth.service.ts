import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import {User} from '../model/user';

/**
 * @AlexWirthAAU
 * Stellt sämtliche Methoden zur Verfügung, die Infos über den User geben.
 * Unter anderem wird der jwt verwendet um festzustellen ob der User eingeloggt ist. Ist der Token abgelaufen wird der user ausgeloggt.
 * Der User kann dann über getUser aufgerufen werden. 
 */


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;
  apiURL: string;
  changeMail: boolean;
  changePw: boolean;

  constructor(public httpClient: HttpClient, public router: Router) {
    this.apiURL = "https://hashyourcash.herokuapp.com";
  }

  login(email: string, password: string) {
    let userInput = {
      "email": email,
      "password": password,
    }
    return this.httpClient.post<{token: string}>(this.apiURL + '/login', userInput);
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User | null {
    if (this.loggedIn()) {
      return this.user;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('access_token');
    this.user = null;
    this.router.navigate(['/login']);
  }

  public loggedIn(): boolean {
    let tokeninfo = this.getDecodedAccessToken(localStorage.getItem('access_token'));
    var currentTime = +new Date / 1000;
    if (tokeninfo && currentTime >= tokeninfo.exp) {
      this.logout();
      return false;
    } else if (tokeninfo && currentTime < tokeninfo.exp) {
      return true;
    }
    return localStorage.getItem('access_token') !== null;
  }

  public tokenValidity(token): boolean {
    let tokeninfo = this.getDecodedAccessToken(token);
    var currentTime = +new Date / 1000;
    if(tokeninfo && currentTime >= tokeninfo.exp) {
      return false;
    } else if (tokeninfo && currentTime < tokeninfo.exp) {
      return true;
    }

    return token === null;
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch (Error){
        return null;
    }
  }
}

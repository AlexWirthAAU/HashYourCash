import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Payment} from '../model/payment';

@Injectable({
  providedIn: 'root'
})
/* @AlexWirthAAU
    Service zum Abhandeln aller API-calls.
*/


export class ApiService {

  apiURL: string;

  constructor(private httpClient: HttpClient) { 
    this.apiURL = "https://hashyourcash.herokuapp.com";
  }

  public getUserData() {
    return this.httpClient.get<any[]>(this.apiURL + '/user', { headers: new HttpHeaders({'Authorization': localStorage.getItem('access_token')})})
  }

  public register(userData) {
    return this.httpClient.post<{token: string}>(this.apiURL + '/register', userData)
  }

  public getAllEmails() {
    return this.httpClient.get<any[]>(this.apiURL + '/user/emails')
  }

  public forgotpwRequest(email) {
    return this.httpClient.post<any>(this.apiURL + '/forgotpw/request', email)
  }

  public resetpw(userData) {
    return this.httpClient.post<any>(this.apiURL + '/forgotpw/reset', userData)
  }

  public addPayment(payment: Payment){
    return this.httpClient.post<any>(this.apiURL + '/', payment);
  }
  public getPayments(userID, walletID): Observable<Payment[]>{
    const payments: Payment[] = [
      {
        type: 'in',
        amount: 100,
        description: '',
        comment: '',
        pe_id: 1,
        w_id: walletID,
        c_id: 1,
        entry_date: new Date('2012-01-05'),
      },
      {
        type: 'out',
        amount: 400,
        description: '',
        comment: '',
        pe_id: 1,
        w_id: walletID,
        c_id: 1,
        entry_date: new Date('2012-01-03'),
      },
      {
        type: 'in',
        amount: 20,
        description: '',
        comment: '',
        pe_id: 1,
        w_id: walletID,
        c_id: 1,
        entry_date: new Date('2012-01-01'),
      },
      {
        type: 'out',
        amount: 10,
        description: '',
        comment: '',
        pe_id: 1,
        w_id: walletID,
        c_id: 1,
        entry_date: new Date('2012-01-03'),
      },
      {
        type: 'in',
        amount: 900,
        description: '',
        comment: '',
        pe_id: 1,
        w_id: walletID,
        c_id: 1,
        entry_date: new Date('2012-01-05'),
      },
      {
        type: 'out',
        amount: 100,
        description: '',
        comment: '',
        pe_id: 1,
        w_id: walletID,
        c_id: 1,
        entry_date: new Date('2012-01-05'),
      },
    ];
    return of(payments);
  }
}

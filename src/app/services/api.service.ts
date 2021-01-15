import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Payment} from '../model/payment';
import {map} from 'rxjs/operators';

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
    return this.httpClient.get<any[]>(this.apiURL + '/user',
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('access_token')
        })
      });
  }

  public register(userData) {
    return this.httpClient.post<{ token: string }>(this.apiURL + '/register', userData);
  }

  public getAllEmails() {
    return this.httpClient.get<any[]>(this.apiURL + '/user/emails');
  }

  public forgotpwRequest(email) {
    return this.httpClient.post<any>(this.apiURL + '/forgotpw/request', email);
  }

  public resetpw(userData) {
    return this.httpClient.post<any>(this.apiURL + '/forgotpw/reset', userData);
  }

  public addPayment(payment: Payment) {
    return this.httpClient.post<any>(this.apiURL + '/payments', payment,
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('access_token')
        })
      });
  }

  public getPayments(userID, walletID): Observable<Payment[]> {
    return this.httpClient.get<Payment[]>(this.apiURL + '/payments/' + walletID,
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('access_token')
        })
      });
  }

  public deletePayment(paymentId): Observable<boolean> {
    return this.httpClient.delete<any>(this.apiURL + '/payments/' + paymentId,
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('access_token')
        })
      }).pipe(
      map(res => res.statusCode === 200)
    );
  }

  public createW(userData) {
    return this.httpClient.post<any>(this.apiURL + '/wallets', userData,
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('access_token')
        })
      });
  }

  public showW() {
    return this.httpClient.get<any[]>(this.apiURL + '/wallets',
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('access_token')
        })
      });
  }

  public deleteW(walletID) {
    return this.httpClient.delete<any>(this.apiURL + `/wallets/${walletID}`, { headers: new HttpHeaders({'Authorization': localStorage.getItem('access_token')})})
  }
}

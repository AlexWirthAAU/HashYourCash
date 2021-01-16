import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Payment} from '../model/payment';
import {map} from 'rxjs/operators';
import {User} from '../model/user';
import {Wallet} from '../model/wallet';

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

  public getUserData(): Observable<User> {
    return this.httpClient.get<User>(this.apiURL + '/user',
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

  public createW(userData: Wallet) {
    return this.httpClient.post<Wallet>(this.apiURL + '/wallets', userData,
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('access_token')
        })
      });
  }

  public showW(): Observable<Wallet[]> {
    return this.httpClient.get<Wallet[]>(this.apiURL + '/wallets',
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('access_token')
        })
      });
  }

  public getPaymentsByDate(period, walletId) {
    return this.httpClient.post<any>(this.apiURL + '/payments/period/' + walletId, period,
    {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('access_token')
      })
    });
  }

  public getInAndOuts(period, walletId) {
    return this.httpClient.post<any>(this.apiURL + '/payments/periodInOut/' + walletId, period,
    {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('access_token')
      })
    });
  }

  public getAllCategories() {
    return this.httpClient.get<any>(this.apiURL + '/categories',
    {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('access_token')
      })
    });
  }

  public deleteW(walletID): Observable<boolean> {
    return this.httpClient.delete<any>(this.apiURL + '/wallets/' + walletID,
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('access_token')
        })
      }).pipe(
      map(res => res.statusCode === 200)
    );
  }
  public editW(walletData: Wallet, walletID: number) {
    return this.httpClient.put<Wallet>(this.apiURL + '/wallets/' + walletID, walletData,
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('access_token')
        })
      });
  }
}

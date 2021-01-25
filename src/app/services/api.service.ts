import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Payment} from '../model/payment';
import {map} from 'rxjs/operators';
import {User} from '../model/user';
import {InitialP, Wallet} from '../model/wallet';
import {Category} from '../model/category';
import {Password} from '../model/options';

@Injectable({
  providedIn: 'root'
})
/* @AlexWirthAAU
    Service zum Abhandeln aller API-calls.
*/


export class ApiService {

  constructor(private httpClient: HttpClient) {
    //this.apiURL = 'http://localhost:3000';
    this.apiURL = "https://hashyourcash.herokuapp.com";
  }

  apiURL: string;

  private static mapPayment(data: any): Payment{
    const payment: Payment = data;
    if (data.name !== undefined
      && data.color !== undefined
      && data.icon !== undefined){
      payment.category = {
        c_id: data.c_id,
        name: data.name,
        limit: data.limit,
        color: data.color,
        icon: data.icon,
        u_id: data.u_id,
      };
    }
    return payment;
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
    return this.httpClient.get<any[]>(this.apiURL + '/payments/' + walletID,
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('access_token')
        })
      }).pipe( // @Alex diesen abschnitt in get payments by date und get in and outs einbauen
        map(data => {
          const payments: Payment[] = [];
          for (const item of data){
            payments.push(ApiService.mapPayment(item));
          }
          return payments;
        }),
    );
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
    console.log(walletId)
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

  public getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.apiURL + '/categories',
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

  public initialP(firstP: InitialP, walletID: number) {
    return this.httpClient.post<InitialP>(this.apiURL + '/wallets/'+ walletID, firstP,
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('access_token')
        })
      });
  }

  public changeMail(mailData) {
    return this.httpClient.post<any>(this.apiURL + '/options/mail', mailData,
    {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('access_token')
      })
    });
  }

  public changePw(pass: Password) {
    return this.httpClient.post<Password>(this.apiURL + '/options/password', pass,
    {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('access_token')
      })
    });
  }

}

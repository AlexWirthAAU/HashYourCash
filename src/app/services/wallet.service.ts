import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  walletId: Observable<number>;
  private currentWallet = new Subject<number>();


  constructor() {
    this.walletId = this.currentWallet.asObservable();
   }
   getWalletId(data){
     this.currentWallet.next(data)
   }
}

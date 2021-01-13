import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  walletId: Observable<number>;
  walletData: Observable<any>;
  private currentWalletData = new Subject<any>();
  private currentWallet = new Subject<number>();


  constructor() {
    this.walletId = this.currentWallet.asObservable();
    this.walletData = this.currentWalletData.asObservable();
   }
   getWalletId(data){
     this.currentWallet.next(data)
   }
   getWalletData(data){
     this.currentWalletData.next(data)
   }
}

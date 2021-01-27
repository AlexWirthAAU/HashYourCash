import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

/* @Zoë
Service um mit den spezifischen Walletdaten (insbesondere Wallet Id) 
in anderen Komponenten arbeiten zu können
*/

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  walletId: Observable<number>;
  walletData: Observable<any>;
  wallet: any;
  private currentWalletData = new Subject<any>();
  private currentWallet = new Subject<number>();


  constructor() {
    this.walletId = this.currentWallet.asObservable();
    this.walletData = this.currentWalletData.asObservable();
  }

  getWalletId(data) {
    this.currentWallet.next(data);
  }

  getWalletData(data) {
    this.currentWalletData.next(data);
  }

  setWallet(wallet) {
    this.wallet = wallet;
  }

  getWallet() {
    return this.wallet;
  }

  emptyWallet() {
    this.wallet = null;
  }

  updateWalletAmount(amount: number) {
    if (this.wallet !== null) {
      this.wallet.amount = amount;
    }
  }
}

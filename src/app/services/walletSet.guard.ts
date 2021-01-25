import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { WalletService } from './wallet.service';

@Injectable({providedIn:'root'})
/**
 * @AlexWirthAAU
 * Klassen, die CanActivate implemtieren können im app-routing verwendet werden um Bedingungen zu checken.
 * In diesem Fall wird überprüft ob eine Wallet gewählt wurde. Die Statistiken dürfen nur aufgerufen werden, wenn eine Wallet gewählt wurde.
 */
export class WalletSetGuard implements CanActivate{
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
       if(this.walletService.getWallet() != null){
           return true;
       }
    
       this.router.navigate(['/wallets'],{queryParams:{returnUrl:state.url}});
       return false;
       
    }
    constructor(private router: Router, private walletService: WalletService){}
  
}
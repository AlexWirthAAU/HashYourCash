import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { WalletService } from './wallet.service';

@Injectable({providedIn:'root'})
/*
class is responsible for checking auth access
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
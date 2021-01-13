import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({providedIn:'root'})
/*
class is responsible for checking auth access
*/
export class AuthGuard implements CanActivate{
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
       if(this.auth.loggedIn()){
           return true;
       }
    
       this.router.navigate(['/wallets'],{queryParams:{returnUrl:state.url}});
       return false;
       
    }
    constructor(private router: Router, private auth:AuthService){}
  
}
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({providedIn: 'root'})

/**
 * @AlexWirthAAU
 * Klassen, die CanActivate implemtieren können im app-routing verwendet werden um Bedingungen zu checken.
 * In diesem Fall wird überprüft ob der Nutzer eingeloggt ist. Gewisse Routen dürfen nur aufgerufen werden, wenn der User eingeloggt ist.
 */

export class AuthGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.loggedIn()) {
      return true;
    }

    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;

  }

  constructor(private router: Router, private auth: AuthService) {
  }

}

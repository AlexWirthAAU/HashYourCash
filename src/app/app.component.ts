import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from './services/api.service';
import {AuthService} from './services/auth.service';
import {WalletService} from './services/wallet.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {faChartPie, faExchangeAlt, faMoneyBillWave, faWallet, faUser} from '@fortawesome/free-solid-svg-icons';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HashYourCash';
  showMenu = true;
  contentClass: string;
  modalReference: any;
  faWallet = faWallet;
  faMoneyBillWave = faMoneyBillWave;
  faConverter = faExchangeAlt;
  faChartPie = faChartPie;
  faUser = faUser;
  walletName: any;
  walletAmount: any;

  constructor(
    public auth: AuthService,
    public api: ApiService,
    public router: Router,
    public modalService: NgbModal,
    public walletService: WalletService
  ) {
    this.loadUserData();
    this.contentClass = 'content-area-85';
    this.walletService.walletData.subscribe((currentData) => {
      this.walletName = currentData.name;
      this.walletAmount = currentData.amount;
    });
    console.log(this.router.url);
  }

  resetWData() {
    this.walletName = null;
    this.walletAmount = null;
  }

  loadUserData() {

    this.api.getUserData()
      .pipe(
        catchError(err => {console.error(err); return throwError(err); }),
        tap(data => this.auth.setUser(data)),
      )
      .subscribe(
    );
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    if (this.showMenu === true) {
      this.contentClass = 'content-area-85';
    } else {
      this.contentClass = 'content-area-100';
    }
  }

  openUserMenuModal(content) {
    this.modalReference = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false
    }).result.then((result) => {

    }, (reason) => {

    });
  }


  changeMail(){
    this.auth.changeMail = true;
    this.auth.changePw = false;
    this.router.navigateByUrl('/options');
  }

  changePw(){
    this.auth.changeMail = false;
    this.auth.changePw = true;
    this.router.navigateByUrl('/options');
  }
}

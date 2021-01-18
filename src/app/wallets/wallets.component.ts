import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {AuthService} from '../services/auth.service';
import {WalletService} from '../services/wallet.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {faHome, faCarSide} from '@fortawesome/free-solid-svg-icons';
import {Wallet, InitialP} from '../model/wallet';
import {Payment} from '../model/payment';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css'],
})
export class WalletsComponent implements OnInit {

  closeResult: string;
  faHome = faHome;
  faCarSide = faCarSide;
  home: string;
  profileForm: any;
  allWallets: Wallet[];
  errorMessageW: string;
  userWallet: any;
  currentWallet: number;
  allPayments: Payment[];
  initiated: boolean;

  

  walletData = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    amount: new FormControl('', Validators.required)
  });

  editWalletData = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    amount: new FormControl('')
  });

  constructor(public auth: AuthService,
              public api: ApiService,
              public router: Router,
              private modalService: NgbModal,
              public walletService: WalletService
  ){}

  ngOnInit(): void {
    this.showWallets();
  }

  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  saveWalletId(elem): void {
    this.currentWallet = elem.w_id;
    this.walletService.getWalletId(this.currentWallet);
    this.walletService.setWallet(elem);
  }

  saveWallet(elem): void {
    this.userWallet = elem;
    this.walletService.getWalletData(this.userWallet);
  }

  gotoWallet(elem): void{
    this.router.navigateByUrl('/wallets/' + elem.w_id);
  }

  showWallets(): void {
    this.api.showW().subscribe(
      response => {
        this.allWallets = response;
        //console.log(response)
        if (this.allWallets.length === 0) {
          this.errorMessageW = 'Es wurden noch keine Wallets erstellt.';
        } else {
          this.errorMessageW = null;
        }
      }, // success path
      error => {
        console.error(error);
      } // error path
    );
  }
  firstPayment(elem):void {
    //this.checkP(elem);
    if(elem.is_initiated === false){
    const initialP: InitialP = {
      type: "in",
      amount: elem.amount,
      description: "Initialbetrag",
      comment: "Mit diesem Betrag wurde das Wallet gestartet",
      w_id: elem.w_id,
      entry_date: new Date(),
      is_initiated: true
    } 
    
    this.api.initialP(initialP, elem.w_id).subscribe(
      response => {
        this.router.navigateByUrl('/wallets/' + elem.w_id);
      }, //success path
      error => {
        console.error(error);
      } //error path
    );
  } else {
    this.router.navigateByUrl('/wallets/' + elem.w_id);
  }
}

  checkP(elem): void {
    this.api.getPayments(this.auth.getUser()?.u_id, elem.w_id).subscribe(
      response => {
        this.allPayments = response;
        this.firstPayment(elem);
        //console.log(response)
        //this.firstPayment(elem);
      },
    error => {
      console.error(error);
    }) 
    }
test(elem){
  console.log(elem);
}
  createWallet() {
    if (this.walletData.value.name !== '' && this.walletData.value.amount !== '') {
      this.api.createW(this.walletData.value).subscribe(
        response => {
          this.modalService.dismissAll();
          this.showWallets();
          this.walletData.reset();
        }, //success path
        error => {
          console.error(error);
        } //error path
      );
    }
  }

  editWallet() {
    if (this.editWalletData.value.name === '' || this.editWalletData.value.name === null) {
      this.editWalletData.value.name = this.userWallet.name;
    }
    if (this.editWalletData.value.description === '' || this.editWalletData.value.description === null) {
      this.editWalletData.value.description = this.userWallet.description;
    }
    if (this.editWalletData.value.amount === '' || this.editWalletData.value.amount === null) {
      this.editWalletData.value.amount = this.userWallet.amount;
    }
    this.api.editW(this.editWalletData.value, this.userWallet.w_id).subscribe(
      response => {
        this.modalService.dismissAll();
        this.showWallets();
        this.editWalletData.reset();
      }, //success path
      error => {
        console.error(error);
      } //error path
    );
  }

  deleteWallet(elem) {
    this.api.deleteW(elem.w_id).subscribe(
      response => {
        this.router.navigate(['/wallets']);
        this.showWallets();
      }, //success path
      error => {
        console.error(error);
      } //error path
    );
  }
}


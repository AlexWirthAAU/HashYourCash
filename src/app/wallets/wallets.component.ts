import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {AuthService} from '../services/auth.service';
import {WalletService} from '../services/wallet.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Wallet, InitialP} from '../model/wallet';
import {Payment} from '../model/payment';
import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

/* @Zoë
Komponente um Wallets zu erstellen, initialisieren, 
löschen und zu bearbeiten
*/

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css'],
})
export class WalletsComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  closeResult: string;
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
              public walletService: WalletService,
              private _snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.showWallets();
  }

  //Popup wenn Wallet geändert wurde
  editSnackBar() {
    this._snackBar.open(this.editWalletData.value.name + ' wurde geändert', '', {
      duration: 1500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    this.walletService.emptyWallet();
  }
//Popup wenn Wallet erstellt wurde
  createSnackBar() {
    this._snackBar.open(this.walletData.value.name + ' wurde erstellt', '', {
      duration: 1500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  //Popup wenn Wallet gelöscht wurde
  deleteSnackBar(){
    this._snackBar.open( this.userWallet.name + ' wurde gelöscht', '', {
      duration: 1500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    this.walletService.emptyWallet();
  }

  //öffnet Modal Popup
  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  //speichert Wallet Id für wallet service
  saveWalletId(elem): void {
    this.currentWallet = elem.w_id;
    this.walletService.getWalletId(this.currentWallet);
    this.walletService.setWallet(elem);
  }

  //speichert Walletdaten für wallet service
  saveWallet(elem): void {
    this.userWallet = elem;
    this.walletService.getWalletData(this.userWallet);
  }

//Funktion um alle Wallets für den Account anzuzeigen
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

  //Funktion um das Wallet mit der ersten Zahlung zu initialisieren 
  firstPayment(elem):void {
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

//Funktion um Wallet zu erstellen
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

//Funktion um Wallet zu bearbeiten
  editWallet() {
    if (this.editWalletData.value.name === '' || this.editWalletData.value.name === null) {
      //wenn keine Angabe in Name setze Namen auf aktuellen Namen
      this.editWalletData.value.name = this.userWallet.name;
    }
    if (this.editWalletData.value.description === '' || this.editWalletData.value.description === null) {
      //wenn keine Angabe in Beschreibung setze Beschreibung auf aktuelle Beschreibung
      this.editWalletData.value.description = this.userWallet.description;
    }
    if (this.editWalletData.value.amount === '' || this.editWalletData.value.amount === null) {
      //wenn keine Angabe in Betrag setze Betrag auf alten Betrag
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

  //Funktion um Wallet zu löschen
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


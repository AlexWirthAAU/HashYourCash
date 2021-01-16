import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import {WalletService} from '../services/wallet.service'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faHome, faCarSide} from '@fortawesome/free-solid-svg-icons';

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
  allWallets: any;
  errorMessageW: string;
  userWallet: any;
  currentWallet: number;

  walletData = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    amount: new FormControl('', Validators.required)
  })

  editWalletData = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    amount: new FormControl('')
  })

  constructor(public auth: AuthService, public api: ApiService, public router: Router, private modalService: NgbModal, public walletService: WalletService) {
    //this.showWallets()
   }

  ngOnInit(): void {
    this.showWallets()
  }
  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }
saveWalletId(elem):void{
  this.currentWallet = elem.w_id;
  this.walletService.getWalletId(this.currentWallet);
  this.walletService.setWallet(elem);
}

saveWallet(elem):void{
  this.userWallet = elem;
  this.walletService.getWalletData(this.userWallet);
}

reload(){
  window.location.reload();
}

  showWallets():void{
    this.api.showW().subscribe(
      response => {
        this.allWallets = response;
        if(this.allWallets.length === 0) {
          this.errorMessageW = "Es wurden noch keine Wallets erstellt."
        } else {
          this.errorMessageW = null;
        }
      }, //success path
      error => {
        console.error(error)
      } //error path
    );
    }
  //@Zoë currently when submitting nav link also deactivated
  createWallet(){
  if (this.walletData.value.name !== "" && this.walletData.value.amount !== "") {
    this.api.createW(this.walletData.value).subscribe(
      response => {
        this.modalService.dismissAll();
        this.showWallets();
        this.walletData.reset();
      }, //success path
      error => {
        console.error(error)
      } //error path
    );
  }}
  editWallet(){
    if (this.editWalletData.value.name === "" || this.editWalletData.value.name === null){
      this.editWalletData.value.name = this.userWallet.name;
    }
    if (this.editWalletData.value.description === "" || this.editWalletData.value.description === null){
      this.editWalletData.value.description = this.userWallet.description
    }
    if (this.editWalletData.value.amount === "" || this.editWalletData.value.amount === null){
      this.editWalletData.value.amount = this.userWallet.amount
    }
      this.api.editW(this.editWalletData.value, this.userWallet.w_id).subscribe(
        response => {
          this.modalService.dismissAll();
          this.showWallets();
          this.editWalletData.reset();
        }, //success path
        error => {
          console.error(error)
        } //error path
      );
    }
  deleteWallet(elem){
    this.api.deleteW(elem.w_id).subscribe(
      response => {
        this.router.navigate(['/wallets'])
        this.showWallets();
      }, //success path
      error => {
        console.error(error)
      } //error path
    )}

    show(){
      console.log(this.userWallet)
    }
}


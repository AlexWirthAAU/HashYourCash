import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HashYourCash';
  showMenu: boolean = true;
  contentClass: string;
  modalReference: any;
  faWallet = faWallet;

  constructor(public auth: AuthService, public api: ApiService, public router: Router, public modalService: NgbModal) {
    this.loadUserData();
    this.contentClass = "content-area-85";
  }

  loadUserData() {
    
    this.api.getUserData().subscribe(
      data => {
        this.auth.setUser(data);
      }, //success path
      error => {
        console.log(error);
      } //error path
    )
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    if (this.showMenu == true) {
      this.contentClass = "content-area-85";
    } else {
      this.contentClass = "content-area-100";
    }
  }

  openUserMenuModal(content) {
    //DEMO
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false }).result.then((result) => {

    }, (reason) => {

    });
  }
}

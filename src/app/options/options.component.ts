import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {AuthService} from '../services/auth.service';
import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {Password} from '../model/options';

/* @Zoë
Komponente um UserMail, und User PW zu ändern, und sich auszuloggen
*/

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  mailData:any;
  pwData: any;
  userEmails: any[];
  emailTaken: string = null;
  emailErr: string = null;
  emailWrong: string;
  currentUser: any;
  pwErr:string;
  pwWrong:string;
  hide:boolean = true;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    public auth: AuthService,
    public api: ApiService,
    public router: Router,
    private _snackBar: MatSnackBar,) { 

      this.mailData = new FormGroup({
        oldMail: new FormControl('', Validators.required),
        newMail: new FormControl('', Validators.required),
        newMail_confirm: new FormControl('', Validators.required),
    })

    this.pwData = new FormGroup({
      oldPw: new FormControl('', Validators.required),
      newPw: new FormControl('', Validators.required),
      newPw_confirm: new FormControl('', Validators.required),
  })
  }
  ngOnInit(): void {
    this.getAllEmails();
  }
 
  //Footer Popup wenn Mail erfolgreich geändert wurde
  editMailSnackBar() {
    this._snackBar.open('Email wurde geändert', '', {
      duration: 1500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
//Footer Popup wenn PW erfolgreich geändert wurde
  editPwSnackBar(){
    this._snackBar.open('Passwort wurde geändert', '', {
      duration: 1500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

//Funktion für Änderung Mail
changeMail(){
  this.emailErr = null;
  this.currentUser = this.auth.getUser();
  //check ob aktuelle Mail gleich der eingegebenen alten Mail ist
  if (this.currentUser.email === this.mailData.value.oldMail) {
    this.emailWrong = null;
    if (this.mailData.value.newMail !== this.mailData.value.newMail_confirm) {
      //check ob beide neuen Mails übereinstimmen
      this.emailErr = "Emails stimmen nicht überein!" 
    } else {
      if(this.mailData.value.newMail !== "" && this.mailData.value.newMail_confirm !== ""){
        //check ob keins der neuen Felder leer ist
      if (this.checkEmail()) {
        //check ob die neue Mail bereits in der DB existiert
        this.api.changeMail(this.mailData.value).subscribe(
          response => {
            this.currentUser.email = this.mailData.value.newMail
            this.auth.setUser(this.currentUser);
            this.router.navigate(['/wallets'])
            this.editMailSnackBar();
          }, //success path
          error => {
            console.error(error)
          } //error path
        );
      }}
    } 
  } else {
    this.emailWrong = "Diese Mail entspricht nicht der Benutzermail."
  }
}

//Passwort ändern
changePw(){
  this.currentUser = this.auth.getUser();
  if(this.pwData.value.newPw != "" && this.pwData.value.newPw_confirm != ""){
    //check ob keins der Felder für das neue PW leer ist
    if(this.pwData.value.newPw === this.pwData.value.newPw_confirm){
      //check ob beide neuen Pws übereinstimmen
      const changeP: Password = {
        oldPw: this.pwData.value.oldPw,
        newPw: this.pwData.value.newPw,
        currentPw: this.currentUser.u_password,
        email: this.currentUser.email
      } 
      this.api.changePw(changeP).subscribe(
        response => {
          this.currentUser.u_password = response.pw;
          this.auth.setUser(this.currentUser);
          this.router.navigate(['/wallets'])
          this.editPwSnackBar();
        }, //success path
        error => {
          console.log(error);
          this.pwWrong = "Passwort stimmt nicht mit dem aktuellen Passwort überein"
        } //error path
      );
    } else {
      this.pwErr = "Passwörter stimmen nicht überein!"
    }
  }
}


getAllEmails() {
  this.userEmails = [];
  this.api.getAllEmails().subscribe(
    emails => {
      this.userEmails = emails;
    }, //success path
    error => {
      console.log(error);
    }, //error path
  );
}

checkEmail() {
  let resultArr = this.userEmails.filter(x => x && x.email && x.email === this.mailData.value.newMail);
  if (resultArr.length > 0) {
    this.emailTaken = "E-Mail Adresse ist schon vergeben."
    return false;
  } else {
    this.emailTaken = null;
    return true;
  }
}
}
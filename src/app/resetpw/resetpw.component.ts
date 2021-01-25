import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

/**
 * @AlexWirthAAU
 * Der Token wird als Parameter in der URL mitgeliefert (aus der E-Mail aufrufbar).
 * Token wird verifiziert (30 Minuten gültig).
 * Wenn Token gültig, kann PW an Server gesendet werden wo es gespeichert wird. (Vorher wieder PW Validation bzgl. Sicherheit)
 */

@Component({
  selector: 'app-resetpw',
  templateUrl: './resetpw.component.html',
  styleUrls: ['./resetpw.component.css']
})
export class ResetpwComponent implements OnInit {

  formData: any;
  formValidation: boolean = false;
  isVerified: boolean = false;
  resetToken: string;
  passwordErr: string = null;
  tokenError: string = null;
  hide:boolean = true;


  constructor(public router: Router, public api: ApiService, public auth: AuthService, public route: ActivatedRoute) {

    if(this.auth.loggedIn()) {
      this.router.navigate(['/'])
    }

    this.route.params.subscribe(
      params => {
        this.resetToken = params.token;
        this.verifyToken();
      }
    )

    this.formData = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      confirm_password: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  verifyToken(): void {
    if(this.auth.tokenValidity(this.resetToken)){
      this.isVerified = true;
    }
  }

  submitForm(): void {
    this.formValidation = true;
    if(this.formData.value.password != "" && this.formData.value.confirm_password != "") {
      if(this.formData.value.password === this.formData.value.confirm_password) {
        let userData = {
          password: this.formData.value.password,
          token: this.resetToken,
        }
        this.api.resetpw(userData).subscribe(
          data => {
            this.router.navigate(['/'])
          }, //success path
          error => {
            console.log(error)
            if(error.error.message === "Token not found") {
              this.tokenError = "Dein Link ist abgelaufen. Fordere hier einen neuen an:"
            } else if (error.error.message === "TOKEN ERROR") {
              this.tokenError = "Dein Link ist abgelaufen. Fordere hier einen neuen an:"
            }
          } //error path
        )

      } else {
        this.passwordErr = "Passwörter stimmen nicht überein."
      }
    }
  }

}

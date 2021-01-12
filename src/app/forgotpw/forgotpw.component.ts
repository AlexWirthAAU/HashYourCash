import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgotpw',
  templateUrl: './forgotpw.component.html',
  styleUrls: ['./forgotpw.component.css']
})
export class ForgotpwComponent implements OnInit {

  formData: any;
  formValidation: boolean = false;
  message: string = null;
  errorMessage: string = null;
  logo: string = "assets/images/Logo_Banner_integrate.png";

  constructor(public api: ApiService, public router: Router, public auth: AuthService) {

    if(this.auth.loggedIn()) {
      this.router.navigate(['/'])
    }

    this.formData = new FormGroup({
      email: new FormControl('', Validators.required),
    })
   }

  ngOnInit(): void {
  }

  submitForm() {
    this.formValidation = true;
    if (this.formData.value.email != "") {
      this.api.forgotpwRequest(this.formData.value).subscribe(
        data => {
          this.message = "Du bekommst demnächst eine E-Mail mit den nächsten Schritten."
        }, //success path
        error => {
          console.log(error);
          if(error.error.message === "EMAIL NOT FOUND") {
            this.errorMessage = "Diese E-Mail existiert nicht."
          }
        } //error path
      )
    }
  }

}

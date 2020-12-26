import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

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

  constructor(public router: Router, public api: ApiService, public auth: AuthService, public route: ActivatedRoute) {

    this.route.params.subscribe(
      params => {
        this.resetToken = params.token;
        this.verifyToken();
      }
    )

    this.formData = new FormGroup({
      password: new FormControl('', Validators.required),
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
            console.log(data);
            this.router.navigate(['/'])
          }, //success path
          error => {
            console.error(error.message)
          } //error path
        )

      } else {
        this.passwordErr = "Passwörter stimmen nicht überein."
      }
    }
  }

}

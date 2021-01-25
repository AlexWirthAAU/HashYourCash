import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formData: any;
  formValidation: boolean = false;
  userEmails: any;
  passwordErr: string = null;
  emailErr: string = null;
  logo: string = 'assets/images/logo.png';
  hide:boolean = true;


  constructor(public api: ApiService, public router: Router) {
    this.formData = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      confirm_password: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.getAllEmails();
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

  submitForm() {
    this.emailErr = null;
    this.passwordErr = null;
    this.formValidation = true;
    if (this.formData.value.first_name !== "" && this.formData.value.last_name !== "" && this.formData.value.email !== "" && this.formData.value.password !== "" && this.formData.value.confirm_password !== "") {
      if (this.formData.value.password === this.formData.value.confirm_password) {
        if (this.checkEmail()) {
          this.api.register(this.formData.value).subscribe(
            response => {
              console.log("Successfully registered")
              this.router.navigate(['/'])
            }, //success path
            error => {
              console.error(error)
            } //error path
          );
        }
      } else {
        this.passwordErr = "Passwörter stimmen nicht überein!"
        console.log(this.passwordErr)
      }
    }
    
  }

  checkEmail() {
    let resultArr = this.userEmails.filter(x => x && x.email && x.email === this.formData.value.email);
    if (resultArr.length > 0) {
      this.emailErr = "E-Mail Adresse ist schon vergeben."
      return false;
    } else {
      this.emailErr = null;
      return true;
    }

  }




}

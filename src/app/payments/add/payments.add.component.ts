import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-payments-add',
  templateUrl: './payments.add.component.html',
  styleUrls: ['./payments.add.component.css']
})
export class PaymentsAddComponent{
paymentForm: any;
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router){
    this.paymentForm = this.fb.group({
      type: [''],
      amount: ['', Validators.required],
      description: [''],
      comment: [''],
      period: [1], //  TODO implement!
      wallet: [1], // TODO implement!
      category: [1], // TODO implement!
    });
  }

  onSubmit() {
    const payment = {
      type: this.paymentForm.value.type,
      amount: this.paymentForm.value.amount,
      description: this.paymentForm.value.description,
      comment: this.paymentForm.value.comment,
      pe_id: this.paymentForm.value.period,
      w_id: this.paymentForm.value.wallet,
      c_id: this.paymentForm.value.category,
      entry_date: new Date(),
    };
    this.api.addPayment(payment).subscribe(
      response => {
        this.router.navigateByUrl('/payments');
      },
      error => {
        console.error(error);
      }
    );
  }
}

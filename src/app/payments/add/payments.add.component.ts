import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {Payment} from '../../model/payment';
import {tap} from 'rxjs/operators';
import {Category} from '../../model/category';
import {WalletService} from '../../services/wallet.service';

@Component({
  selector: 'app-payments-add',
  templateUrl: './payments.add.component.html',
  styleUrls: ['./payments.add.component.css']
})
export class PaymentsAddComponent implements OnInit{
  paymentForm: any;
  categories: Category[];
  walletId: number;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    public route: ActivatedRoute,
    public walletService: WalletService
  ){
    this.route.params.subscribe(
      params => {
        this.walletId = params.wallet;
      }
    );
    this.paymentForm = this.fb.group({
      type: ['', Validators.required],
      amount: ['', Validators.required],
      description: [''],
      comment: [''],
      period: [1], //  TODO implement!
      category: [''],
    });
  }

  onSubmit() {
    const payment: Payment = {
      type: this.paymentForm.value.type,
      amount: this.paymentForm.value.amount,
      description: this.paymentForm.value.description,
      comment: this.paymentForm.value.comment,
      pe_id: this.paymentForm.value.period,
      w_id: this.walletId,
      c_id: this.paymentForm.value.category,
      entry_date: new Date(),
    };

    this.api.addPayment(payment).subscribe(
      response => {
        this.walletService.updateWalletAmount(response.newWalletAmount);
        this.router.navigateByUrl('/wallets/' + this.walletId);
      },
      error => {
        console.error(error);
      }
    );
  }

  ngOnInit(): void {
    this.api.getAllCategories()
      .pipe(
        tap(categories => this.categories = categories),
      )
      .subscribe();
  }
}

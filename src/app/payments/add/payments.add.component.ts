import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {Payment} from '../../model/payment';
import {tap} from 'rxjs/operators';
import {Category} from '../../model/category';
import {WalletService} from '../../services/wallet.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

// Zahlung hinzufügen Formular

@Component({
  selector: 'app-payments-add',
  templateUrl: './payments.add.component.html',
  styleUrls: ['./payments.add.component.css']
})
export class PaymentsAddComponent implements OnInit{
  amountPattern = /^\d+(\.\d{0,2})?$/; // positive Zahl mit max. zwei Nachkommastellen
  paymentForm: any;
  categories: Category[];
  walletId: number;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    public route: ActivatedRoute,
    public walletService: WalletService,
    private snackBar: MatSnackBar
  ){
    this.route.params.subscribe(
      params => {
        this.walletId = params.wallet;
      }
    );
    this.paymentForm = this.fb.group({
      type: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern(this.amountPattern)]],
      description: [''],
      comment: [''],
      period: [1],
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

    if (this.paymentForm.value.type === 'in') {
      payment.c_id = 0;
    }

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

  typeChange(type) {
    if (type === 'in') {
      this.paymentForm.get('category').clearValidators();
      this.paymentForm.get('category').updateValueAndValidity();
    } else {
      this.paymentForm.get('category').setValidators([Validators.required]);
      this.paymentForm.get('category').updateValueAndValidity();
    }
  }
  goBack(){
    this.router.navigateByUrl('wallets/' + this.walletId);
  }

  createSnackBar() {
    this.snackBar.open('Zahlung wurde gespeichert', '', {
      duration: 1500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}

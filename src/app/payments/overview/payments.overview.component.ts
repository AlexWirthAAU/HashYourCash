import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {MatTableDataSource} from '@angular/material/table';
import {Payment} from '../../model/payment';
import {AuthService} from '../../services/auth.service';
import {switchMap, tap} from 'rxjs/operators';

// Liste der Zahlungen je Wallet

@Component({
  selector: 'app-payments-overview',
  templateUrl: './payments.overview.component.html',
  styleUrls: ['./payments.overview.component.css']
})
export class PaymentsOverviewComponent implements OnInit {
  walletId: number;

  dataSource = new MatTableDataSource<Payment>();
  displayedColumns: string[];

  constructor(private api: ApiService, private router: Router, public auth: AuthService, public route: ActivatedRoute) {
    this.route.params.subscribe(
      params => {
        this.walletId = params.wallet;
      }
    );
    this.displayedColumns = [
      'type',
      'amount',
      'category',
      'description',
      'comment'
    ];
  }

  public goToAdd() {
    this.router.navigateByUrl('wallets/' + this.walletId + '/add');
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {

    /*
    this.api.getPayments(
      this.auth.getUser()?.u_id,
      this.walletId
    )
      .pipe(
        tap(payments => this.dataSource.data = payments),
        )
      .subscribe();
      */
     this.api.getPayments(
       this.auth.getUser()?.u_id,
       this.walletId).subscribe(data => {
         this.dataSource.data = data;
       },
       error => {
        this.router.navigate(['/wallets']);
       });
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {ApiService} from '../../services/api.service';
import {MatTableDataSource} from '@angular/material/table';
import {Payment} from '../../model/payment';
import {AuthService} from '../../services/auth.service';
import {switchMap, tap} from 'rxjs/operators';


@Component({
  selector: 'app-payments-overview',
  templateUrl: './payments.overview.component.html',
})
export class PaymentsOverviewComponent implements OnInit {
  faPlus = faPlus;

  userId: number;
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
      'description',
      'comment'
    ];
  }

  public fabAddClick() {
    this.router.navigateByUrl('payments/add');
  }

  ngOnInit(): void {

    this.api.getUserData()
      .pipe(
        tap(user => this.userId = user.u_id),
        switchMap(user => this.api.getPayments(user.u_id, this.walletId)),
        tap(payments => this.dataSource.data = payments)
        )
      .subscribe();

  }
}

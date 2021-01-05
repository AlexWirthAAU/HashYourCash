import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {ApiService} from '../../services/api.service';
import {MatTableDataSource} from '@angular/material/table';
import {Payment} from '../../model/payment';

@Component({
  selector: 'app-payments-overview',
  templateUrl: './payments.overview.component.html',
})
export class PaymentsOverviewComponent implements OnInit {
  faPlus = faPlus;

  dataSource = new MatTableDataSource<Payment>();
  displayedColumns: string[];

  constructor(private api: ApiService, private router: Router) {
    this.displayedColumns = [
      'type',
      'amount',
    ];
  }

  public fabAddClick() {
    this.router.navigateByUrl('payments/add');
  }

  ngOnInit(): void {
    this.api.getPayments(1, 1).subscribe(payments => {
      this.dataSource.data = payments;
    });
  }
}

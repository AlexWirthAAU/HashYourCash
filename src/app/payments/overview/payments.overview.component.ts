import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-payments-overview',
  templateUrl: './payments.overview.component.html',
})
export class PaymentsOverviewComponent{
  faPlus = faPlus;

  constructor(private router: Router){}

  public fabAddClick(){
    this.router.navigateByUrl('payments/add');
  }
}

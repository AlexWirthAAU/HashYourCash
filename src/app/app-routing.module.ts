import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotpwComponent } from './forgotpw/forgotpw.component';
import { RegisterComponent } from './register/register.component';
import { ResetpwComponent } from './resetpw/resetpw.component';
import {PaymentsOverviewComponent} from './payments/overview/payments.overview.component';
import {PaymentsAddComponent} from './payments/add/payments.add.component';
import { WalletsComponent } from './wallets/wallets.component';


const routes: Routes = [
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent
  },
  {
    path: 'forgotpw',
    pathMatch: 'full',
    component: ForgotpwComponent
  },
  {
    path: 'resetpw/:token',
    pathMatch: 'full',
    component: ResetpwComponent
  },
  {
    path: 'payments/add',
    component: PaymentsAddComponent,
  },
  {
    path: 'payments',
    component: PaymentsOverviewComponent,
  },
  {
    path: 'wallets',
    pathMatch: 'full',
    component: WalletsComponent
  }

  // add my converter Path

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

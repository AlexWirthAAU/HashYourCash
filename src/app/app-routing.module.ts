import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConverterComponent } from './converter/converter.component';

import { ForgotpwComponent } from './forgotpw/forgotpw.component';
import { RegisterComponent } from './register/register.component';
import { ResetpwComponent } from './resetpw/resetpw.component';
import {PaymentsOverviewComponent} from './payments/overview/payments.overview.component';
import {PaymentsAddComponent} from './payments/add/payments.add.component';
import { AuthGuard } from './services/auth.guard';
import { StatisticsComponent } from './statistics/statistics.component';
import { WalletsComponent } from './wallets/wallets.component';
import { WalletSetGuard } from './services/walletSet.guard';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/wallets',
  },
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
    canActivate: [AuthGuard, WalletSetGuard]
  },
  {
    path: 'payments',
    component: PaymentsOverviewComponent,
    canActivate: [AuthGuard, WalletSetGuard]
  },
  {
    path: 'wallets',
    pathMatch: 'full',
    component: WalletsComponent,
  },
  {
    path: 'statistics',
    pathMatch: 'full',
    component: StatisticsComponent,
    canActivate: [AuthGuard, WalletSetGuard]
  },
  {
    path: 'converter',
    pathMatch: 'full',
    component: ConverterComponent,
    canActivate: [AuthGuard]
  }



  // add my converter Path

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

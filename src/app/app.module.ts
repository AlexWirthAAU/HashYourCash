import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotpwComponent } from './forgotpw/forgotpw.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ResetpwComponent } from './resetpw/resetpw.component';
import {PaymentsOverviewComponent} from './payments/overview/payments.overview.component';
import {PaymentsAddComponent} from './payments/add/payments.add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConverterComponent } from './converter/converter.component';
import { TickersComponent } from './converter/tickers/tickers.component';
import { WalletsComponent } from './wallets/wallets.component';
import {MaterialModule} from './material.module';
import { StatisticsComponent } from './statistics/statistics.component';
import { CurrencyTickerstComponent } from './converter/currency-tickerst/currency-tickerst.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgotpwComponent,
    ResetpwComponent,
    PaymentsOverviewComponent,
    PaymentsAddComponent,
    ConverterComponent,
    TickersComponent,
    WalletsComponent,
    StatisticsComponent,
    CurrencyTickerstComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

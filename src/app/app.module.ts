import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculationService } from './calculation.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PoolComponent } from './pool/pool.component';
import { LoanComponent } from './loan/loan.component';
import { AddLoanComponent } from './add-loan/add-loan.component';

@NgModule({
  declarations: [
    AppComponent,
    PoolComponent,
    LoanComponent,
    AddLoanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [CalculationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

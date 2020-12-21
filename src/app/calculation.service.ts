import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Loan } from './model/loan';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {
  loanList: Loan[] = [];
  pool:Loan=new Loan();
  poolSubject = new Subject<any>(); 

  addLoan(loan: Loan) {
    loan.totalMonthlyPayment = (loan.balance) * (loan.rate / 1200) / (1 - Math.pow((1 + loan.rate / 1200), (-loan.term)));
    let remBalance = loan.balance;
    for (let i = 0; i < loan.term; i++) {
      let interest = remBalance * loan.rate / 1200;
      let principal_payment = loan.totalMonthlyPayment - interest;
      remBalance = remBalance - principal_payment;
      loan.remBalanceList.push(remBalance);
      loan.principalPaymentList.push(principal_payment);
      loan.interests.push(interest);
      loan.months.push(i+1);
      if(!this.pool.remBalanceList||!this.pool.interests||!this.pool.principalPaymentList){
        this.pool.remBalanceList=[];
        this.pool.interests=[];
        this.pool.principalPaymentList=[];
      }
      if (loan.term > this.pool.term) {
        this.pool.term = loan.term;
      }
      this.pool.balance += loan.balance;
      if(!this.pool.remBalanceList[i]){
        this.pool.remBalanceList.push(loan.remBalanceList[i]);
        this.pool.interests.push(loan.interests[i]);
        this.pool.principalPaymentList.push(loan.principalPaymentList[i]);

      }else{
      this.pool.remBalanceList[i] += loan.remBalanceList[i];
      this.pool.principalPaymentList[i] += loan.principalPaymentList[i];
      this.pool.interests[i] += loan.interests[i];
      }
    }
    this.loanList.push(loan);
    this.poolSubject.next(this.pool);

  }
}

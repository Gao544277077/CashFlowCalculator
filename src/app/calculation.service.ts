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
    }
    this.loanList.push(loan);

    for (let i = 0; i < this.loanList.length; i++) {
      if(i===0){
        this.pool.remBalanceList=[];
        this.pool.interests=[];
        this.pool.principalPaymentList=[];
      }
      if (this.loanList[i].term > this.pool.term) {
        this.pool.term = this.loanList[i].term;
      }
      this.pool.balance += this.loanList[i].balance;
      for (let j = 0; j < this.loanList[i].term; j++) {
        if(!this.pool.remBalanceList[j]){
          this.pool.remBalanceList.push(this.loanList[i].remBalanceList[j]);
          this.pool.interests.push(this.loanList[i].interests[j]);
          this.pool.principalPaymentList.push(this.loanList[i].principalPaymentList[j]);

        }else{
        this.pool.remBalanceList[j] += this.loanList[i].remBalanceList[j];
        this.pool.principalPaymentList[j] += this.loanList[i].principalPaymentList[j];
        this.pool.interests[j] += this.loanList[i].interests[j];
        }
        }
      }
      this.poolSubject.next(this.pool);

  }
}

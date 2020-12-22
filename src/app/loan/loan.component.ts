import { Component, OnInit } from '@angular/core';
import { CalculationService } from '../calculation.service';
import { Loan } from '../model/loan';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  loanList: Loan[];
  pool: Loan;

  constructor(private calculation:CalculationService){
  }

  ngOnInit(): void {
    this.loanList=this.calculation.loanList;
    this.pool=this.calculation.pool;
  }

}

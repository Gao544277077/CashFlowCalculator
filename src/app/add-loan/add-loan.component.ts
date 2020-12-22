import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CalculationService } from '../calculation.service';
import { Loan } from '../model/loan';

@Component({
  selector: 'app-add-loan',
  templateUrl: './add-loan.component.html',
  styleUrls: ['./add-loan.component.scss']
})
export class AddLoanComponent implements OnInit {

  activeForm:boolean=false;
  loanForm = new FormGroup({
    balance: new FormControl("", [Validators.required, Validators.min(1),Validators.pattern("^\\$?(([1-9](\\d*|\\d{0,2}(,\\d{3})*))|0)(\\.\\d{1,2})?$")]),
    rate:new FormControl("", [Validators.required,Validators.min(1),Validators.max(30)]),
    term:new FormControl("", [Validators.required,Validators.min(1),Validators.max(200),Validators.pattern("[0-9]+")]),
  });
  constructor(private calculation:CalculationService){
  }

  ngOnInit(): void {
  }

  addNewLoan(){
    this.activeForm=true;
  }
  updateLoan(){
    let loan=new Loan();
    loan.balance=this.loanForm.get('balance').value;
    loan.rate=this.loanForm.get('rate').value;
    loan.term=this.loanForm.get('term').value;
    loan.id="Loan"+this.calculation.loanList.length;
    this.calculation.addLoan(loan);
    this.calculation.loanList;
    this.activeForm=false;
  }
}

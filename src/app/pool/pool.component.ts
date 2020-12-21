import { Component, OnInit } from '@angular/core';
import { CalculationService } from '../calculation.service';
import { Loan } from '../model/loan';

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss']
})
export class PoolComponent implements OnInit {
  pool:Loan;

  constructor(private calculation:CalculationService) { 
 
  }

   ngOnInit() {
    this.calculation.poolSubject.subscribe(data=>this.pool=data);
  }


}

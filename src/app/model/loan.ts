export class Loan{
    id:string;
    balance: number;
    term:number;
    rate:number;
    months:number[]=[];
    totalMonthlyPayment:number;
    remBalanceList:number[]=[];
    interests:number[]=[];
    principalPaymentList:number[]=[];
}
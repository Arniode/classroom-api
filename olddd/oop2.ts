//INHERITANCE
//parent class
class BankAccount {
    protected balance:number;
    public owner:string;
    
        constructor(initialBalance:number,owner:string){
            this.balance=initialBalance;
            this.owner=owner;
        
        }
        public getbalance():number{
            return this.balance;
        }
        public deposit(amount:number):void{
            this.balance+=amount;
            console.log(`Deposited ${amount}.balance: ${this.balance}`);
        
        }

}
//child class1:extends means "inherits from"//
class SavingsAccount extends BankAccount{
    private interestRate:number;
    constructor(initialBalance:number,owner:string,interestRate:number){
        super(initialBalance,owner);
        this.interestRate=interestRate;
    }

    public applyInterest():void{
        const interest=this.getbalance()*this.interestRate;
        this.deposit(interest);
        console.log(`Interest of ${interest} applied. New balance: ${this.getbalance()}`);
    }
}
    class currentAccount extends BankAccount{
        private overdraftLimit:number;
        constructor(initialBalance:number,owner:string,overdraftLimit:number){
            super(initialBalance,owner);
            this.overdraftLimit=overdraftLimit;
        }
  
  public withdraw(amount:number):void{
    if(amount>=this.balance+this.overdraftLimit){
        return console.log(" Transaction denied.");
    }
    this.balance-=amount;
    console.log(`Withdrew ${amount}. New balance: ${this.balance}`);
  }
}
  const savings=new SavingsAccount(1000,"Alice",0.05);
  const current=new currentAccount(500,"Bob",200);
  savings.deposit(200);
  savings.applyInterest();
  current.withdraw(600);
  current.withdraw(200);

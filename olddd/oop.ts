//ENCAPSULATION
class BankUser {
    private accountNumber: string;
    private balance: number;
    public accountOwner: string;

    constructor(accountNumber:string,balance:number,accountOwner:string){
        this.accountNumber=accountNumber;
        this.balance=balance;
        this.accountOwner=accountOwner;
    }
   public deposit(amount:number):void{
    if(amount<10.00){
    console.log("Ammount cant be less than ten naira")
    return;
}
 this.balance+=amount;
        console.log(`Deposited ${amount}.New balance is ${this.balance}`);
   }
       
    public withdraw(amount:number):void{
        if (amount> this.balance){
            console.log("insufficient funds");
            return;
        }
        this.balance-=amount;
        console.log(`Withdrew ${amount}.New balance is ${this.balance}`); 
       }
       public getbalance():number{
        return this.balance
       };

}
const account1=new BankUser("0987654321",800000000000000,"Toluwanimi")
const account2=new BankUser("1234567890",83736,"LOL")

account1.deposit(809900)
account2.withdraw(9000000000)

console.log(account1.getbalance());
console.log(account2.getbalance());
console.log(account1.deposit(30900));
console.log(account2.withdraw(9000000000));



class Student{
    private grade: number;
    public name: string;

    constructor(grade:number,name:string){
        this.grade=grade;
        this.name=name;
    }
    public promote():void{
        this.grade++;
        console.log(`${this.name} has been promoted to grade ${this.grade}`);
    }
      public getgrade():number{
        return this.grade
      }
    }
    const student1=new Student(5,"Toluwanimi");
    const  student2=new Student(3,"LOL");

student1.promote();
student2.promote();
student1.getgrade();
student2.getgrade();



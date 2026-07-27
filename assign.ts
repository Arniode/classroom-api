class employee{
    private salary:number;
    public name:string;
    public role:string;

    constructor(salary:number,name:string,role:string){
        this.salary=salary
        this.name=name;
        this.role=role
    }
    public getsalary():number{
        return this.salary;
    }
    public applyRaise(percentage:number):void{
        this.salary=this.salary+(this.salary*percentage/100);
        console.log(`New Salary: ${this.salary}`);
    }
}
    class manager extends employee{
        private teamsize:number;
        constructor(salary:number,name:string,role:string,teamsize:number){
            super(salary,name,role);
            this.teamsize=teamsize;
        }
        public getTeaminfo():void{
            console.log( `Manager ${this.name} manages a team of ${this.teamsize} members.`);    
    }
}

const employee1=new employee(300000,"MR GOOHU","cleaner");
const manager1=new manager(500000,"MS GOOHU","Manager",10);
employee1.applyRaise(20);
console.log(employee1.getsalary());
console.log(manager1.getsalary());
manager1.getTeaminfo();
 
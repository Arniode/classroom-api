class vehicle{
    public  brand:string;
    public speed:number;
    constructor(brand:string,speed:number){
        this.brand=brand;
        this.speed=speed;
    }
    public describe(){
        console.log(`This vehicle is a ${this.brand} moving at ${this.speed}Km/h`);
    }
}
    class car extends vehicle{
        private numberOfDoors:number;
        constructor(brand:string,speed:number,numberOfDoors:number){
            super(brand,speed);
            this.numberOfDoors=numberOfDoors;
        }
        public override describe(): void {
            console.log(`This car is a ${this.brand} with ${this.numberOfDoors} doors moving at ${this.speed}km/h`)
        }
    }
        class motorcycle extends vehicle{
            private hasSideCar:boolean;
            constructor(brand:string,speed:number,hasSidecar:boolean){
                super(brand,speed)
                this.hasSideCar=hasSidecar
            }
            public override describe(): void {
                console.log(`This motorcycle is a ${this.brand}. has Side car :${this.hasSideCar}`)
            }
        }
        const vehcile1 =new vehicle("Mercedes Benz",100);
        const car1= new car("Rolls Royce",600,7)
        const motorcycle5=new motorcycle("Toyota",40,false)
    
        vehcile1.describe();
        car1.describe();
        motorcycle5.describe();

    
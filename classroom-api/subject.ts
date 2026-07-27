export class Subject{
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    getDetails(): string {
        return this.name;
    }
}

import { Subject } from './subject';
import { Grade } from './types';

let lastId = 0;

export class Student {
    public name: string;
    readonly id: number;
    private grades: Grade[];

    constructor(name: string) {
        this.name = name;
        this.id = lastId + 1;
        lastId += 1;
        this.grades = [];
    }

    addGrade(subject: Subject, value: number): void {
        for (const grade of this.grades) {
            if (grade.subject.name === subject.name) {
                grade.value = value;
                return;
            }
        }
        this.grades.push({ subject, value });
    }

    addGrades(...newGrades: Grade[]): void {
        for (const grade of newGrades) {
            this.addGrade(grade.subject, grade.value);
        }
    }

    removeGrade(removeGrade: number): void {
        this.grades = this.grades.filter(grade => grade.value !== removeGrade);
    }

    getAverageGrade(): number {
        if (this.grades.length === 0) return 0;

        const sum = this.grades.reduce(
            (acc: number, current: Grade) => acc + current.value,
            0
        );

        return sum / this.grades.length;
    }

    logAllGrades(): void {
        console.log(`ALL OF ${this.name}'s Grades:`);
        if (this.grades.length === 0) {
            console.log("No value");
            return;
        }
        this.grades.forEach((grade) => {
            console.log(`${grade.subject.name} : ${grade.value}`);
        });
    }

    [Symbol.for('nodejs.util.inspect.custom')]() {
        return `Student: ${this.name} (ID: ${this.id})`;
    }
}
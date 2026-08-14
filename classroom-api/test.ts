class Subject {
    public name: string;

    constructor(name: string) {
        this.name = name;
        
    }

    getDetails(): string {
        return this.name;
    }
}


interface Grade {
    subject: Subject;
    value: number;
}

let lastId = 0;

 class Student {
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
        for(const grade of newGrades){
            this.addGrade(grade.subject,grade.value)
        }
    }

    removeGrade(subject: Subject): void {
        this.grades = this.grades.filter(grade => grade.subject.name !== subject.name);
    }

    getAverageGrade(): number {
        if (this.grades.length === 0) return 0;

        const sum = this.grades.reduce(
            (acc: number, current: Grade) => { return acc + current.value},
            0,
        );

        return sum / this.grades.length;
    }

    logAllGrades(): void {
        console.log(`ALL OF ${this.name}'s Grades:`)
        if (this.grades.length === 0) {
            console.log("No value")
        return;
            }
        this.grades.forEach((grade) => {
            console.log(`${grade.subject.name} :${grade.value}`)
        });
    }

    [Symbol.for('nodejs.util.inspect.custom')]() {
        return `Student: ${this.name}, ID:${this.id}`;
    }

}   


class Classroom {
    public className: string;
    private students: Student[];

    getStudents(): Student[] {
  return this.students;
}

    constructor(className: string) {
        this.className = className;
        this.students = [];
    }

    addStudent(student: Student): void {
        for(const alreadyaddedstudent of this.students ) {
            if (alreadyaddedstudent.id === student.id){
                return;
            }
        }
        this.students.push(student);
    }

    addStudents(...newStudents: Student[]): void {
        for(const student of newStudents){
            this.addStudent(student)
        }
    }

    removeStudents(studentsToRemove: Student[]): void {
        const idsToRemove = new Set(studentsToRemove.map(s => s.id));
        this.students = this.students.filter(student => !idsToRemove.has(student.id));
    }


    getPassingStudents(passingGrade: number): Student[] {
        return this.students.filter((student: Student) => {
            const average = student.getAverageGrade();
            return average >= passingGrade;
        });
    }

    getclassAverage(): number {
        if (this.students.length === 0) return 0;
    
        const sum = this.students.reduce(
            (acc: number, current: Student) => { return acc + current.getAverageGrade()},
            0,
        );

        return sum / this.students.length;
    }     
}

const math = new Subject("Mathematics");
const eng = new Subject("English");
const phy = new Subject("Physics");
const sci = new Subject("Science");


const typescript101 = new Classroom("Typescript 101");
const alice = new Student("Alice"); 


alice.addGrade(math, 80);
alice.addGrade(math, 80);
alice.addGrade(eng, 90);
alice.addGrade(phy, 85);
alice.addGrades(
    { subject: math, value: 83 },
    { subject: eng, value: 89 }
);
alice.removeGrade(math);
alice.logAllGrades();

const bob = new Student("Bob"); 
bob.addGrade(math, 55);
bob.addGrade(eng, 60);
bob.addGrade(phy ,55);
bob.addGrade(sci, 63 )
bob.removeGrade(sci)
bob.logAllGrades()

typescript101.addStudent(alice);
typescript101.addStudent(bob);
//typescript101.addStudents(alice,bob);
  

const avg = typescript101.getclassAverage();
console.log("Typescript 101 Average:", avg);


const passingStudents = typescript101.getPassingStudents(70);
console.log("Typescript 101 passing students:");
for (const student of passingStudents ) {
    console.log("\t", student);
}
//passingStudents. forEach((student) => {
//     console.log(student.name)
// })
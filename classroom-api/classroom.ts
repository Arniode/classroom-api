import { Student } from './student';

export class Classroom {
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
        for (const alreadyaddedstudent of this.students) {
            if (alreadyaddedstudent.id === student.id) {
                return;
            }
        }
        this.students.push(student);
    }

    addStudents(...newStudents: Student[]): void {
        for (const student of newStudents) {
            this.addStudent(student);
        }
    }

   removeStudent(removeStudent: Student[]): void {
         this.students= this.students.filter(student => removeStudent!== removeStudent )
    
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
            (acc: number, current: Student) => acc + current.getAverageGrade(),
            0
        );

        return sum / this.students.length;
    }
}
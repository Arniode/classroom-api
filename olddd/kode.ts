//    const myProfile = {
//     name: "Tolu",
//     age: 60,
//     school: "ABUAD",
//     company: "MONO",
//     isIntern: true
// };

// const student = [
//     {name: "Ope", id: 101, grades: [80,90,90]},
//     {name:"Toda", id: 102, grades: [90,76,89]},
//     {name:"kola", id:103,  grades: [60,87,76]}
// ];

// const names= student.map((student) => {
//     return student.name;
// });
// console.log("Names:" ,names)

// const passing= student.filter((student) => {
//     return student.grades[0] >= 70;
// });
// console.log("passingStudents:" ,passing)

// student.forEach((student) => {
//     console.log(student.name);
// });

interface Subject {
    name: string,
    grades: number[]
};

class Students {
    public name: string;
    readonly id: number;
    private subjects: Subject[]
      
    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
        this.subjects = [];
    }

    addSubject(subjectName: string): void {
        this.subjects.push({
            name: subjectName, grades:[]
        });
    }

    addGradeToSubject(subjectName: string, grade: number): void {
        const subject= this.subjects.find((subject) => {
            return subject.name === subjectName
        });
        if (!subject) return 
        subject.grades.push(grade)
    }

    getSubjectAverage(subjectName: string): number {
        const subject = this.subjects.find((subject) => {
            return subject.name == subjectName;
    })
    if (!subject) return 0;
    if (subject.grades.length === 0) return 0

    const sum =subject.grades.reduce((acc,cur) => {
        return acc + cur
    },0);

        return sum / subject.grades.length ;
    }
   
    

}

class Classroom {
    public className: string;
    private students: Students[];

    constructor(className: string) {
        this.className = className;
        this.students = [];
}
}
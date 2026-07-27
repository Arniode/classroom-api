import { Subject } from './subject';
import { Student } from './student';
import { Classroom } from './classroom';

const math = new Subject("Mathematics");
const eng = new Subject("English");
const phy = new Subject("Physics");
const sci = new Subject("Science");

const typescript101 = new Classroom("Typescript 101");

const alice = new Student("Alice");
alice.addGrade(math, 80);
alice.addGrade(eng, 90);
alice.addGrade(phy, 85);
alice.addGrades(
    { subject: math, value: 83 },
    { subject: eng, value: 89 }
);

const bob = new Student("Bob");
bob.addGrade(math, 55);
bob.addGrade(eng, 60);
bob.addGrade(phy, 55);
bob.addGrade(sci, 63);

typescript101.addStudent(alice);
typescript101.addStudent(bob);

console.log("Class Average:", typescript101.getclassAverage());
console.log("Passing Students:", typescript101.getPassingStudents(70));
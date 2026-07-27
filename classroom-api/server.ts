import express, {type Express,type Request, type Response } from 'express';
import { Classroom } from './classroom';
import { Student } from './student'
import jwt from 'jsonwebtoken';

const app: Express = express();
const PORT = 3000;
const JWT_SECRET = 'classroom_secret_key_123@';

app.use(express.json());

const myClassroom = new Classroom("TypeScript 101")

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World');
});

app.post('/students', (req: Request, res: Response) => {
  const {name} = req.body;
  if (!name) {
    res.status(400).json({error: "No name"});
   return;
}
   const newStudent = new Student(name)
   myClassroom.addStudent(newStudent)
   res.status(200).json(newStudent) 
});

app.get('/students', (req: Request, res:Response ) => {
  const students = myClassroom.getStudents()
  res.status(200).json(students)
})

app.post('/login', (req: Request, res:Response ) => {
  const {id} = req.body
  if(!id) {
    res.status(400).json({error: "ID required"})
    return;
  }
  const students = myClassroom.getStudents();
  const student = students.find((student) => student.id === Number(id));

  if (!student) {
    res.status(404).json({ error: "Student not found" });
    return;
  }

  const token = jwt.sign({studentId: student.id},JWT_SECRET)
  res.status(200).json({message:"Successfuly Logged in.", token:token})
})



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


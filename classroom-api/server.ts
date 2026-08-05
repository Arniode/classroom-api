import express, {type Express,type Request, type Response, type NextFunction } from 'express';
import { Classroom } from './classroom';
import { Student } from './student'
import jwt from 'jsonwebtoken';
import {connectDB  } from "./Db";
import { StudentModel } from './Mongoose-pratice';
await connectDB();

const app: Express = express();
const PORT = 3000;
const JWT_SECRET = 'classroom_secret_key_123@';

app.use(express.json());

const myClassroom = new Classroom("TypeScript 101")

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World');
});

app.post('/students',async (req: Request, res: Response) => {
  const {name} = req.body;
  if (!name) {
    res.status(400).json({error: "No name"});
   return;
}
   const newStudent = await StudentModel.create({name})
   res.status(200).json(newStudent) 
});

app.get('/students', async (req: Request, res:Response ) => {
  const students =  await StudentModel.find();
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

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }
  
  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
}

app.get('/students/:id', authenticateToken, async (req: Request, res: Response) => {
    const { id } = req.params;

    const student = await StudentModel.findById(id);

    if (!student) {
        res.status(404).json({ error: "Student not found" });
        return;
    }

    res.status(200).json(student);
});


app.patch('/students/:id', authenticateToken, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    const student = await StudentModel.findByIdAndUpdate(id,
        { name },
        { new: true }
    );

    if (!student) {
        res.status(404).json({ error: "Student not found" });
        return;
    }

    res.status(200).json(student);
});

app.delete('/students/:id', authenticateToken, async (req: Request, res: Response) => {
    const { id } = req.params;

    const student = await StudentModel.findByIdAndDelete(id);

    if (!student) {
        res.status(404).json({ error: "Student not found" });
        return;
    }

    res.status(200).json({ message: "Student deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

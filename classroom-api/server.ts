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
  try{
      const {name, password} = req.body;

      if (!name||!password) {
      res.status(400).json({error: "Name and password are required"});
      return;
    }   
      const newStudent = await StudentModel.create({name, password})
       res.status(201).json(newStudent) 
    } catch (error) {
     res.status(500).json({error: "Failed to create student"});
    }
});

app.get('/students', async (req: Request, res:Response ) => {
  const students =  await StudentModel.find();
  res.status(200).json(students)
})

app.post('/login',async (req: Request, res:Response ) => {
  try{
  const {id, password} = req.body
  if(!id|| !password){ 
    res.status(400).json({error: "ID and password required"})
    return;
  }

  const student = await StudentModel.findOne({_id:id, password:password});

  if (!student) {
    res.status(404).json({ error: "Invalid ID or password" });
    return;
  }

  const token = jwt.sign({studentId: student._id},JWT_SECRET)
  res.status(200).json({message:"Successfuly Logged in.", token:token});

} catch (error: any) {
    res.status(500).json({ error: "Invalid ID format or server error" });
  }
});

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

app.get('/students/:id', authenticateToken, async  (req: Request, res: Response) => {
    const { id } = req.params;

    const student = await StudentModel.findById(id).select("-__v");

    if (!student) {
        res.status(404).json({ error: "Student not found" });
        return;
    }

    res.status(200).json(student);
});

 app.get('/students/search', authenticateToken,async(req:Request, res: Response) => {
 try{
  const {name} = req.query;
  if (!name) {
    res.status(400).json({error:`Name query parameter is required`});
    return;
  }
  const students = await StudentModel.find(
    {name: name})
  }catch (error){
    res.status(500).json({error:error.message});
  }
 })

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

//so supervisor said that he can't write remark for everyday so I should get a generic standard remark that he can write  for everyday 
import express, {type Express, type Request, type Response, type NextFunction } from 'express';
import redisClient, { connectRedis } from './cache';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { connectDB } from './Db';
import { StudentModel } from './Mongoose-practice';
await connectDB();
await connectRedis();


const app: Express = express();
const PORT = 3000;
const JWT_SECRET = 'classroom_secret_key_123@';

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World');
});

// MIDDLEWARE
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

// CREATE STUDENT NOW REQUIRES PASSWORD
app.post('/students', async (req: Request, res: Response) => {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            res.status(400).json({ error: "Name and password are required" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = await StudentModel.create({ name, password: hashedPassword });
        const { password: _, ...studentWithoutPassword } = newStudent.toObject();

        await redisClient.del('students');

        res.status(201).json(studentWithoutPassword);

    } catch (error) {
        res.status(500).json({ error: "Failed to create student" });
    }
});

// GET ALL STUDENTS
app.get('/students', async (req: Request, res: Response) => {
    try {
        const cached = await redisClient.get('students');

        if (cached) {
            console.log('Serving from cache');
            res.status(200).json(JSON.parse(cached));
            return;
        }

        const students = await StudentModel.find().select("-password");

        await redisClient.setEx('students', 60, JSON.stringify(students));

        console.log('Returning from MongoDB');
        res.status(200).json(students);

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch students" });
    }
});

// GET PASSING STUDENTS
app.get('/students/passing',authenticateToken, async (req: Request, res: Response) => {
    try{
        const { mingrade } = req.query;

        if(!mingrade){
            res.status(400).json({error:"mingrade query parameter is required"});
            return;
        }

        const students = await StudentModel.find().select("-password");
        const passingStudents = students.filter(student => {
            if(student.grades.length === 0) return false;
            const average = student.grades.reduce((acc, grade) => acc + grade.value, 0) / student.grades.length;
            return average >= Number(mingrade);
        });

        res.status(200).json(passingStudents);
    }catch(error){
        res.status(500).json({error:"Failed to fetch passing students"});
    }
});

// SEARCH STUDENTS BY NAME
app.get('/students/search', authenticateToken, async (req: Request, res: Response) => {
    try {
        const { name } = req.query;

        if (!name) {
            res.status(400).json({ error: "Name query parameter is required" });
            return;
        }

        const students = await StudentModel.find({
            name: { $regex: String(name), $options: 'i' }
        }).select("-password");

        res.status(200).json(students);

    } catch (error) {
        res.status(500).json({ error: "Failed to search students" });
    }
});

//  GET ONE STUDENT BY ID
app.get('/students/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const student = await StudentModel.findById(id).select("-password");

        if (!student) {
            res.status(404).json({ error: "Student not found" });
            return;
        }

        res.status(200).json(student);

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch student" });
    }
});

// LOGIN
app.post('/login', async (req: Request, res: Response) => {
    try {
        const { id, password } = req.body;

        if (!id || !password) {
            res.status(400).json({ error: "ID and password required" });
            return;
        }

        const student = await StudentModel.findById(id);

        if (!student) {
            res.status(404).json({ error: "Student not found" });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, student.password);

        if (!passwordMatch) {
            res.status(401).json({ error: "Invalid password" });
            return;
        }

        const token = jwt.sign({ studentId: student._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "Successfully logged in.", token });

    } catch (error) {
        res.status(500).json({ error: "Invalid ID format or server error" });
    }
});

// UPDATE STUDENT
app.patch('/students/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const student = await StudentModel.findByIdAndUpdate(
            id,
            { name },
            { returnDocument: 'after' }
        ).select("-password");

        if (!student) {
            res.status(404).json({ error: "Student not found" });
            return;
        }

        await redisClient.del('students');

        res.status(200).json(student);

    } catch (error) {
        res.status(500).json({ error: "Failed to update student" });
    }
});

//  DELETE STUDENT
app.delete('/students/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const student = await StudentModel.findByIdAndDelete(id);

        if (!student) {
            res.status(404).json({ error: "Student not found" });
            return;
        }

        await redisClient.del('students');

        res.status(200).json({ message: "Student deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: "Failed to delete student" });
    }
});
// ADD GRADE TO STUDENT
app.patch('/students/:id/grades', authenticateToken, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { subject, value } = req.body;

        if (!subject || value === undefined) {
            res.status(400).json({ error: "Subject and value are required" });
            return;
        }

        const student = await StudentModel.findById(id);

        if (!student) {
            res.status(404).json({ error: "Student not found" });
            return;
        }

        const existingGradeIndex = student.grades.findIndex(grade => grade.subject === subject);

        if (existingGradeIndex !== -1) {
            student.grades[existingGradeIndex].value = value;
        } else {
            student.grades.push({ subject, value });
        }

        await student.save();

        await redisClient.del('students');

        const { password: _, ...studentWithoutPassword } = student.toObject();
        res.status(200).json(studentWithoutPassword);

    } catch (error) {
        res.status(500).json({ error: "Failed to add grade" });
    }

});

//Get all grades for a student
app.get('/students/:id/grades',authenticateToken,async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const student = await StudentModel.findById(id).select("-password");

        if(!student){
            res.status(404).json({error:"Student not found"});
            return;
        } else {
            res.status(200).json(student.grades);
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch student grades" });
    }
});

// DELETE GRADE FOR A STUDENT
app.delete('/students/:id/grades/:subject', authenticateToken, async (req: Request, res: Response) => {
    try {
        const { id, subject } = req.params as { id: string; subject: string };

        const student = await StudentModel.findById(id);

        if (!student) {
            res.status(404).json({ error: "Student not found" });
            return;
        }

        const initialLength = student.grades.length;
        student.grades = student.grades.filter(
            (g) => g.subject.toLowerCase() !== subject.toLowerCase()
        ) as typeof student.grades;

        if (student.grades.length === initialLength) {
            res.status(404).json({ error: "Grade for the specified subject not found" });
            return;
        }

        await student.save();
        await redisClient.del('students');

        res.status(200).json({ message: "Grade deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete grade" });
    }
});

// ADD MULTIPLE GRADES
app.patch('/students/:id/grades/batch', authenticateToken, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { grades } = req.body;

        if (!grades || !Array.isArray(grades)) {
            res.status(400).json({ error: "Grades must be an array" });
            return;
        }

        const student = await StudentModel.findById(id);

        if (!student) {
            res.status(404).json({ error: "Student not found" });
            return;
        }

        for (const grade of grades) {
            const existingIndex = student.grades.findIndex(g => g.subject === grade.subject);
            if (existingIndex !== -1) { 
                student.grades[existingIndex].value = grade.value;
            } else {
                student.grades.push(grade);
            }
        }

        await student.save();
        await redisClient.del('students');

        const { password: _, ...studentWithoutPassword } = student.toObject();
        res.status(200).json(studentWithoutPassword);

    } catch (error) {
        res.status(500).json({ error: "Failed to add grades" });
    }
});

// DELETE MULTIPLE GRADES
app.delete('/students/:id/grades', authenticateToken, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { subjects } = req.body;

        if (!subjects || !Array.isArray(subjects)) {
            res.status(400).json({ error: "Subjects must be an array" });
            return;
        }

        const student = await StudentModel.findById(id);

        if (!student) {
            res.status(404).json({ error: "Student not found" });
            return;
        }

        const initialLength = student.grades.length;

        const targets = subjects.map((s: string) => String(s).trim().toLowerCase());

        student.grades = student.grades.filter(
            (g) => !targets.includes(g.subject.trim().toLowerCase())
        ) as typeof student.grades;

        if (student.grades.length === initialLength) {
            res.status(404).json({ error: "Wanted grades not found" });
            return;
        }

        await student.save();
        await redisClient.del('students');

        res.status(200).json({ message: "Grades deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: "Failed to delete grades" });
    }
});

//GET AVERAGE GRADE FOR A STUDENT
app.get('/students/:id/grades/average', authenticateToken, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const student = await StudentModel.findById(id).select("-password");

        if (!student) {
            res.status(404).json({ error: "Student not found" });
            return;
        }

        if (student.grades.length === 0) {
            res.status(200).json({ average: 0 });
            return;
        }

        const sum = student.grades.reduce((acc, grade) => acc + grade.value, 0);
        const average = sum / student.grades.length;

        res.status(200).json({ average });

    } catch (error) {
        res.status(500).json({ error: "Failed to calculate average grade" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

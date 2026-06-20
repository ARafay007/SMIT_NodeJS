
import express from 'express';
import cors from 'cors';
import { connectDB } from './connectDB.js';
import { studentRoutes } from './routes/student.js';
import { teacherRoutes } from './routes/teacher.js';
import 'dotenv/config'

await connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/student', studentRoutes);

app.use('/teacher', teacherRoutes);

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`server is listening at http://localhost:${PORT}`);
});
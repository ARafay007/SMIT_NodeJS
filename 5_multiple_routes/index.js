
import express from 'express';
import { connectDB } from './connectDB.js';
import { studentRoutes } from './routes/student.js';
import { teacherRoutes } from './routes/teacher.js';
import 'dotenv/config'

await connectDB();

const app = express();

app.use(express.json());

app.use('/student', studentRoutes);

app.use('/teacher', teacherRoutes);

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`server is listening at http://localhost:${PORT}`);
});

import express from 'express';
import cors from 'cors';
import { connectDB } from './connectDB.js';
import { studentRoutes } from './routes/student.js';
import { teacherRoutes } from './routes/teacher.js';
import 'dotenv/config'
import { authorize } from './routes/authorize.js';
import { studentLogin } from './routes/studentLoging.js';

await connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/student', authorize, studentRoutes);

app.use('/', studentLogin)

app.use('/teacher', teacherRoutes);

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`server is listening at http://localhost:${PORT}`);
});
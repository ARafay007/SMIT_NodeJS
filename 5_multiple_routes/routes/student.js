

// import express from 'express';
// const route = express.Router();

import { Router } from 'express';
import { dbo } from '../connectDB.js';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authorize } from './authorize.js';
import { getAllStudent, getStudent, addStudent, signIn } from '../controllers/student.js';

const route = Router();

route.get('/findOne', authorize, getStudent);

route.get('/findAll', authorize, getAllStudent);

route.post('/', authorize, addStudent);

route.put('/:id', authorize, async (req, res) => {
    try{
        const { id } = req.params;
        const { name, content, song } = req.body;

        await dbo.collection('practice_collection_1').updateOne(
            { _id: new ObjectId(id) },
            {
                $set: { name, content, song }
            }
        );

        res.status(200).json({
            message: 'student data updated successfully',
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            error
        });
    }
});

route.delete('/deleteById/:id', async (req, res) => {
    try{
        const { id } = req.params;
        await dbo.collection('practice_collection_1').deleteOne({ _id: new ObjectId(id) })

        res.status(200).json({
            message: 'student data deleted successfully'
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            error: error.message
        });
    }
});

route.delete('/deleteByName/:name', async (req, res) => {
    try{
        const { name } = req.params;
        await dbo.collection('practice_collection_1').deleteOne({ name })

        res.status(200).json({
            message: 'student data deleted successfully',
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            error
        });
    }
});

route.post('/studentFee', () => {
    try{

    }
    catch(error){

    }
});

route.post('/signin', signIn);

export { route as studentRoutes };
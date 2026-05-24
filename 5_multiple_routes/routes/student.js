

// import express from 'express';
// const route = express.Router();

import { Router } from 'express';
import { dbo } from '../connectDB.js';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

const route = Router();

route.get('/findOne', async (req, res) => {
    try{
        const collection = dbo.collection('movies');
        const data = await collection.findOne(
            {title: "Civilization"},
            {
                projection: {
                    _id: 0,
                    title: 1,
                    directors: 1,
                    plot: 1,
                    genres: 1,
                    languages: 1,
                    runtime: 1,
                    year: 1
                }
            }
        );

        res.status(200).json({
            message: 'Student get route',
            data
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            error
        });
    }
});

route.get('/findAll', async (req, res) => {
    try{
        const collection = dbo.collection('movies');
        // const data = await collection.find({},
        //     {
        //         projection: {
        //             _id: 0,
        //             title: 1,
        //             plot: 1,
        //             runtime: 1,
        //             year: 1
        //         }
        //     }
        // ).limit(5).sort({year: 1}).toArray();

        const data = await collection.aggregate([
            { $limit: 5 },
            { $sort: { year: 1 } },
            {
                $project: {
                    _id: 0,
                    title: 1,
                    plot: 1,
                    runtime: 1,
                    year: 1
                }
            }
        ]).toArray();

        const totalMovies = await collection.aggregate([
            { $count: 'film' }
        ]).toArray();

        res.status(200).json({
            message: 'Student get route',
            data,
            totalMovies,
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            error
        });
    }
});

route.post('/', async (req, res) => {
    try{
        const { name, content, song, password } = req.body;

        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const collection = dbo.collection('practice_collection_1');
        await collection.insertOne({ name, content, song, password: hashedPassword })

        res.status(200).json({
            message: 'student data inserted successfully',
        });
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            error
        });
    }
});

route.put('/:id', async (req, res) => {
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

route.post('/signin', async (req, res) => {
    try{
        const { name, password } = req.body;

        const collection = dbo.collection('practice_collection_1');
        const data = await collection.findOne({ name });

        const passwordMatch = await bcrypt.compare(password, data.password);
        let signinMsg = 'Invalid username or password';

        if(passwordMatch){
            signinMsg = 'Logged in successfully';
        }

        res.status(200).json({signinMsg});
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            error
        });
    }
});

export { route as studentRoutes };
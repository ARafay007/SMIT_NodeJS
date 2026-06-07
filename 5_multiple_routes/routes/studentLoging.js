import { Router } from 'express';
import { dbo } from '../connectDB.js';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const route = Router();

route.post('/signin', async (req, res) => {
    try{
        const { name, password } = req.body;

        if(!name, !password){
            res.status(400).json({
                error: 'Please provide required fields!'
            });
        }

        const collection = dbo.collection('practice_collection_1');
        const data = await collection.findOne({ name });

        const passwordMatch = await bcrypt.compare(password, data.password);
        let signinMsg = 'Invalid username or password';
        let token = '';

        if(passwordMatch){
            signinMsg = 'Logged in successfully';

            token = await jwt.sign(
                { data: name },
                process.env.JWT_SECRET,
                { expiresIn: '1m' }
            );
        }


        res.status(200).json({signinMsg, token});
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            error: error.message
        });
    }
});

export { route as studentLogin };


// import express from 'express';
// const route = express.Router();

import { Router } from 'express';
const route = Router();

route.get('/', (req, res) => {
    try{
        res.status(200).json({
            message: 'Student get route'
        });
    }
    catch(error){

    }
});

route.post('/', () => {
    try{

    }
    catch(error){

    }
});

route.put('/:id', () => {
    try{

    }
    catch(error){

    }
});

route.delete('/:id', () => {
    try{

    }
    catch(error){

    }
});

route.post('/studentFee', () => {
    try{

    }
    catch(error){

    }
});

export { route as studentRoutes };


import express from 'express';

const app = express();

// Middleware
app.use(express.json());

// HTTP Methods: Get, Post, Put, Delete, Patch

app.get('/', (req, res) => {
    res.send('Welcome to the server');
});

app.get('/testing', (req, res) => {
    res.send('This is testing API');
});

app.post('/', (req, res) => {
    const data = req.body;
    console.log("====>", data);
    res.send('Data received successfuly.');
});

// app.put('/update/:id', (req, res) => {
app.put('/:id', (req, res) => {
    // const id = req.params.id
    const {id} = req.params;

    console.log('====>', id);

    res.send('Updated successfuly');
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`server is listening at http://localhost:${PORT}`);
});

// Importing necessary modules
// const express = require('express'); // -- before ES6
// "type": "module",  => used in package.json
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'

// configure env
dotenv.config();  // we have dotenv in root so no need of path

// database config
connectDB();

// Initlizing Express App
// REST Object
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ROUTES
app.use('/api/v1/auth', authRoutes);

// REST API // TESTING APPLICATION
app.get('/', (req, res) => {
    res.send({message:'Hello World!'});
});

// PORT
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () => {
    console.log(`Application running on ${PORT} port`);
})
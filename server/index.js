import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import Connection from './database/db.js';
// import Routes from './routes/route.js';
import { userRoutes } from './routes/route.js';
import { userAuthRouter } from './routes/userRoutes.js'
import cors from 'cors';


const app = express();

app.use(bodyParser.json({ extended: true }));    // for reading the post parameter data
app.use(bodyParser.urlencoded({ extended: true }))  // for decode the url if any
app.use(cors());

app.use('/form', userRoutes);
app.use('/users', userAuthRouter);







const PORT = 8000;
// dot env config
dotenv.config();


const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);



app.listen(PORT, () => console.log('Server is running on port:8000'));

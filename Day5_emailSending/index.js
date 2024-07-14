import express from 'express';
import { dbConnection } from './config/database.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());


import mail from './route/mail.route.js'
app.use('/api',mail);

dbConnection()
.then(()=>{
    console.log('Database connected successfully')
    app.listen(5000,(req,res)=>{
        console.log("server is running at 3000")
    });
}).catch(err=>{
    console.log(err)
})
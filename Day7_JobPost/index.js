import dbConnection from "./config/database.js";
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { app } from "./app.js";
dotenv.config({
    path: './.env'
})

mongoose.set('strictQuery', false);


dbConnection()
.then(()=>{
   app.listen(process.env.PORT,(req,res)=>{
    console.log(`server is running at ${process.env.PORT}`)
   })
}).catch((e)=>{
    console.error("Error connecting to database", e);
    process.exit(1);
})
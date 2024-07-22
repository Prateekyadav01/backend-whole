import express  from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';



const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


import auth from './routes/auth.route.js'
import blog from './routes/blog.route.js'

app.use('/api/v1/auth', auth);
app.use('/api/v1/blog', blog);



export {app};
import express from 'express'
import cors from 'cors'


const app = express();




app.use(cors());
app.use(express.json())

import jokeRoutes from './routes/joke.routes.js'

console.log("hello")
app.use('/api/v1/jokes', jokeRoutes);



export{app};

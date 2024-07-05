import mongoose from "mongoose";




 export const dbConnection = async(req,res)=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/myDatabase');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        res.status(500).send('Server Error');
    }
}



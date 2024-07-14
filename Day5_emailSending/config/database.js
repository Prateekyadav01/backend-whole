import mongoose from "mongoose";


export const dbConnection = async (req,res)=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/jobDatabase');
        console.log("Connected to MongoDB");
        // res.status(200).json({message: "Connected to MongoDB"});
    } catch (error) {
        console.log(error);
    }
}   



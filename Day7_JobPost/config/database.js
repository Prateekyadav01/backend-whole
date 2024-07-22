import mongoose from 'mongoose';



const dbConnection = async(req,res)=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB Atlas!');
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

export default dbConnection;


import mongoose from 'mongoose';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

userSchema.pre("save", async function(next){
    
        if(!this.isModified("password")) return next();
        console.log("password modified");

       try {
        this.password = await bcrypt.hash(this.password,10);
        next();
       } catch (error) {
        next(error);
       }
})

userSchema.methods.isPasswordConfirm = async function (password){
        return await bcrypt.compare(password,this.password)
}

userSchema.methods.GenerateAccessToken =function(){
    console.log("userName------",this.userName)
    return jwt.sign(
        {
            _id:this._id,
            userName: this.userName,
            email: this.email
        },
            process.env.ACCESS_TOKEN_SECRET
        ,{
           expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


userSchema.methods.GenerateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}



export const User = mongoose.model('User', userSchema);
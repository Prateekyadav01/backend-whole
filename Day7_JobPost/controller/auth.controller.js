
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/apiError.js";

const generateAccessAndRefereshTokens = async (userId) => {
    try {
      const user = await User.findById(userId);
      console.log(user);
      const accessToken = user.GenerateAccessToken();
      const refreshToken = user.GenerateRefreshToken();
      console.log(accessToken,refreshToken);
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false })
  
      console.log(refreshToken,accessToken)
      return { accessToken, refreshToken };
    } catch (error) {
      throw new ApiError(
        500,
        "Something went wrong while generating referesh and access token"
      );
    }
  };

export const signup = async(req,res)=>{
    console.log(req.body);
    try {
        const{userName , email ,password} = req.body;
        if([userName,email,password].some(
            (field) => typeof field === 'string' && field.trim()===''
        )){
            throw new ApiError(400, "all fields are required");
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            throw new ApiError(400, "email already exists");
        }

        const user = await User.create({
            userName,
            email,
            password,
        })

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
          );
      
          if (!createdUser) {
            throw new ApiError(
              500,
              "User not created something went wrong while creating"
            );
          }

          return res
          .status(200)
          .json(new ApiResponse(200, createdUser, "user registered successfully"));


    } catch (error) {
        console.log(error);
        throw new ApiError(400, error.message);
    }
}


export const login = async(req,res)=>{
    console.log(req.body);
    try {
        const {email , password} = req.body
        if([email,password].some((field)=> typeof field === 'string' && field.trim==='')){
            throw new ApiError(400, "all fields are required");
        }
        const existingUser = await User.findOne({email})
        if(!existingUser){
            throw new ApiError(401,"User is not registered")
        }

        const checkPassword  = await existingUser.isPasswordConfirm(password);
        if(!checkPassword){
            throw new ApiError(401,"Invalid password")
        }

        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
            existingUser._id
          );

        const loggedInUser = await User.findById(existingUser._id).select(
            "-password -refreshToken"
        )

        const options={
            httpOnly:true,
            secure:true,
        }

        // req.accessTokenNew_pra = accessToken;
        // console.log("access token------New",req.accessTokenNew_pra);
        return res.status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));

        
    } catch (error) {
        console.log(error);
        throw new ApiError(400, error.message);
    }
}
import { JobPost, JobPost } from "../models/Job.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";



export const jobPost = async(req,res)=>{
    console.log(req.body);
    try {
        const{ title,experience,description} = req.body;
        const user = req.user;
        console.log("New blog-------->",user);
        

        if([title,content,image].some(
            (field) => typeof field === 'string' && field.trim()===''
        )){
            throw new ApiError(400, "all fields are required");
        }
        const newPost = await JobPost.create({
            title,
            experience,
            author:user._id,
            description
        })
        // await newPost.save();
        console.log(newPost);

        return res.status(200).json(
            new ApiResponse(200, newPost,"New Blog is created successfully")
        )
    } catch (error) {
        console.log("error in creating blog post", error);

    }
}


export const allPost = async(req,res)=>{
    try {
        const posts = await JobPost.find();
        return res.status(200).json(
            new ApiResponse(200, posts,"All Blogs are fetched successfully")
        )
    } catch (error) {
        console.log("error in fetching all blog posts", error);
    }
}

export const singlePost = async(req,res)=>{
    console.log(req.params.id);
    try {
        const post = await JobPost.findById(req.params.id);
        if(!post){
            throw new ApiError(404, "post not found");
        }
        return res.status(200).json(
            new ApiResponse(200, post,"Single Blog is fetched successfully")
        )
    } catch (error) {
        console.log("error in fetching single blog post", error);
    }
}

export const deletePost = async(req,res)=>{
    console.log(req.params.id);
    try {
        const post = await JobPost.findByIdAndDelete(req.params.id);
        if(!post){
            throw new ApiError(404, "post not found");
        }
        return res.status(200).json(
            new ApiResponse(200, post,"Single Blog is deleted successfully")
        )
    } catch (error) {
        console.log("error in deleting single blog post", error);
    }
}


export const updatePost = async(req,res)=>{
    console.log(req.params.id);
    try {
        const post = await JobPost.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!post){
            throw new ApiError(404, "post not found");
        }
        return res.status(200).json(
            new ApiResponse(200, post,"Single Blog is updated successfully")
        )
    } catch (error) {
        console.log("error in updating single blog post", error);
    }
}


export const filterPost = async (req, res) => {
    const { title, author } = req.query;
    console.log(req.query);
    const filterCriteria = {};

    if (title) {
        filterCriteria.title = { $regex: title, $options: 'i' };
    }

    if (author) {
        filterCriteria.author = author;
    }

    try {
        const posts = await JobPost.find(filterCriteria).populate('author');
        if(posts.length==0){
            throw new ApiError(404, "post not found");   
        }
        return res.status(200).json({
            status: 200,
            data: posts,
            message: "Filtered blogs are fetched successfully"
        });
    } catch (error) {
        console.error("Error in fetching filtered blog posts", error);
        return res.status(500).json({
            status: 500,
            message: "Error in fetching filtered blog posts"
        });
    }
};
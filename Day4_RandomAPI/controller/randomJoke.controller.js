import axios from "axios";





export const randomJokeApi = async(req,res)=>{
    try {
        console.log("hello");
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
import { app } from "./app.js";
import { dbConnection } from "./config/database.js";




dbConnection()
.then(()=>{
    app.listen(3000,(req,res)=>{
     console.log("server is running at 3000")
    })
 }).catch((e)=>{
     console.error("Error connecting to database", e);
     process.exit(1);
 })
//require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path:'./env'
})

connectDB()

.then(()=>{
    app.on("Errror",(error)=>{    // this can be used before app.listen to have an extra check on the errors
        console.log("Errr :",error);
        throw error
    })
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})// promise return by the async function in index.js
.catch((err)=>{
    console.log("Mongo db connection failed !!! ",err);
})














/*
import express from "express";
const app = express()

;(async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror",(error)=>{      // this can be used before app.listen to have an extra check on the errors 
            console.log("ERRR: ",error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    }catch(error){
        console.error("Error: ",error)
        throw err
    }
})()
*/
// require("dotenv").config({path:"./.env"});
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000 || 8080,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.error("MongoDB connection failed !!!! ",err);
})




































/*
import express from "express";
const app = express()
(async () =>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERRR:",error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    } catch (err) {
        console.error("Error : ",err);
        throw err;
        
    }
})()
*/
// require("dotenv").config();

import dotenv from "dotenv";
import connectDB from "./db/index.js";


dotenv.config({

    path: "./config.env"
})

connectDB()


















// import express from "express";
// ( async () => {
//     try{
//       await  mongoose.connect(`${process.env.MONGO_URI}/ ${DB_NAME}`)
//       app.on("eror", (error)=>{
//         console.log("error", error);
//         throw error
//       })
//       app.listen(process.env.PORT, () => {
//         console.log(`Server is running on port ${process.env.PORT}`);
//       });
//     }
//     catch (error){
//         console.error("ERROR: ", error);
//         throw err
//     }
// } )()
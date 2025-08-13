const express = require("express");
require("dotenv").config();
const userModel = require("./models/user.model");

const userController=require("./controllers/user.controller")

const app = express();
const port = process.env.PORT;

//todo: use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/registration", userController.registration);
app.post("/login",userController.login)

// app.get("/test",(req,res)=>{
//     // console.log("ok")
//     res.send("mern 2403")

// })

module.exports = { app };

const express = require("express");
require("dotenv").config();
const userModel = require("./models/user.model");
const categoryModel=require("./models/category.model")

const userController=require("./controllers/user.controller")
const categoryController=require('./controllers/category.controller')

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


//todo:category routes
app.post('/create-category',categoryController.createCategory);
app.get('/getall-category',categoryController.getAllCategory);
app.get('/single-category/:name',categoryController.getSingleCategory);
app.put('/update-category/:id',categoryController.updateCategory);
app.delete('/delete-category/:id',categoryController.deleteCategory);


module.exports = { app };

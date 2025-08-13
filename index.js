// console.log("mern2403")

const mongoose=require("mongoose");
const {app}=require("./src/app")
const {connectDB}=require("./src/database/db")
const port=process.env.PORT
// connectDB()

connectDB().then(()=>{
    app.listen(port || 5000,()=>{
    console.log(`Server is running on port ${port} url:http://localhost:${port}`);
})
}).catch((error)=>{
    console.log("Error connecting to the database:", error);
})




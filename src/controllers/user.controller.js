
const userModel=require("../models/user.model")

exports.registration=async(req, res) => {

    try{
         const { userName, email, password, phoneNumber } = req.body;

  if (!userName) {
    return res.status(401).json({
      msg: "Username is missing",
    });
  }

  if (!email) {
    return res.status(401).json({
      msg: "email is missing",
    });
  }

  if (!password) {
    return res.status(401).json({
      msg: "password is missing",
    });
  }

  if (!phoneNumber) {
    return res.status(401).json({
      msg: "phoneNumber is missing",
    });
  }

  //todo:Query the database to check if the user email already exists
  const isExsits=await userModel.findOne({email:email})
  if(isExsits){
    return res.status(401).json({
      msg: `user already exists with this ${email}`
    })
  }
  return

  

  //todo:save the data on database
  userModel.create({
    userName,
    email,
    //   avatar,
    password,
    phoneNumber,
    ...req.body,
  });

  return res.status(201).json({
    msg: "User registration successful",
  });

    }catch(err){
        console.log("error from user registration controller",err)
        res.status(501).json({
            msg:"error from user registration controller",
            error:err.message
        })
    }
  // console.log(req.body)
 
}

//todo:login

exports.login =async (req,res)=>{
    try{
        console.log(req.body)
      const isExsists= await userModel.findOne({$and:[{email:req.body.email,password:req.body.password}]})
      console.log(isExsists)
      if(!isExsists){
        return res.status(401).json({
            msg:"user not found with this email or password"
        })
      }
      return res.status(200).json({
        msg:"user login successful",
      })
    }
    catch(error){
        console.log("error from user login controller",Error)
    }
}
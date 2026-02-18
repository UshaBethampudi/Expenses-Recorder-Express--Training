const express=require("express");
const jwt = require("jsonwebtoken");
const userModel=require("../models/UserSchema")
const user=express.Router()
user.get("/getuser",(req,res)=>{
    res.send({message: "Hello from get users"})
})
user.post("/postsignup",async(req,res)=>{
    try{
        let createdUser=await userModel.insertOne(req.body);
        console.log(createdUser)
        res.status(201).send({payload: createdUser})
    }
    catch(e){
        res.status(400).send({message: "Error",error: e.message})
    }
})
user.post("/postlogin",async(req,res)=>{
    let {email,password}=req.body
    let foundUser=await userModel.find({email, password},{name:1})
    console.log(foundUser)
    if (foundUser.length===1){
        const token=jwt.sign({userId:foundUser[0]._id},'usha@123',{expiresIn:'30m'}
    );
    res.status(200).send({
        message: "Login successful",
        token: token
})
}
})
user.get("/", async (req,res)=>{
    const data =await userModel.find()
    res.send({payload: data})
})
module.exports=user
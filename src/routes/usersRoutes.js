const express=require("express");
const jwt = require("jsonwebtoken");
const userModel=require("../models/UserSchema")
const user=express.Router()
user.get("/getuser",(req,res)=>{
    res.send({message: "Hello from get users"})
})
user.post("/signup",async(req,res)=>{
    try{
        let createdUser=await userModel.insertOne(req.body);
        console.log(createdUser)
        res.status(201).send({payload: createdUser})
    }
    catch(e){
        res.status(400).send({message: "Error",error: e.message})
    }
})
user.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let foundUser = await userModel.find({ email, password }, { name: 1 });
        if (foundUser.length === 1) {
            const token = jwt.sign({ userId: foundUser[0]._id }, 'usha@123', { expiresIn: '30m' });
            res.status(200).send({
                message: "Login successful",
                token: token
            });
        } else {
            res.status(401).send({
                message: "Invalid credentials"
            });
        }
    } catch (err) {
        console.error("Error occurred during login", err);
        res.status(500).send({
            message: "Server error"
        });
    }
});
user.get("/", async (req,res)=>{
    const data =await userModel.find()
    res.send({payload: data})
})
module.exports=user
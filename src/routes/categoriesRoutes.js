const express= require("express");
const categoriesModel=require("../models/categoriesSchema")
const Authorization=require("../middlewares/Authorization")
const userModel=require("../models/UserSchema")
const categories=express.Router()

categories.get("/",Authorization,async(req,res)=>{
    try{
        const user=req.user;
        console.log(user)
        let categoriesList= await categoriesModel.find({});
        res.status(201).send({payload: categoriesList})
    }
    catch(e){
        res.status(400).send({message: "Error",error: e.message})
    }
});

categories.post("/",Authorization,async(req,res)=>{
    try{
        const { title, user_id } = req.body;
        let createdCategory=await categoriesModel.insertOne({title, user_id});
        console.log(title)
        res.status(201).send({payload: createdCategory})
    }
    catch(e){
        res.status(400).send({message: "Error",error: e.message})
    }
    
});
categories.delete("/",Authorization,async(req,res)=>{
    const {category_id}=req.body;
    console.log(category_id);
    const userId=req.user.userId
    console.log(userId)
    try{
        const deletedCategory = await categoriesModel.findById(category_id);
        if (!deletedCategory) 
            return res.status(404).send({ message: "Category not found" });
        await categoriesModel.deleteOne({ _id: category_id });
        res.status(200).send({ message: "Category deleted successfully" });
    } catch (e) {
        res.status(400).send({ message: "Error", error: e.message });
    }
});


module.exports=categories
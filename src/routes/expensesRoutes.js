const express=require("express");
const expenseModel = require("../models/ExpenseSchema");
const Authorization = require("../middlewares/Authorization"); 
const expenses=express.Router()


expenses.post("/",Authorization,async(req,res)=>{
    try{
        const {description, amount, date,category_id}=req.body;
        const userId = req.user.userId;
        const newExpense=new expenseModel({
            description, 
            amount, 
            date,
            category_id,
            user_id: userId
        })
        console.log(userId)
        const createdExpense = await newExpense.save();
        res.status(201).send({payload: createdExpense})
        // let createdExpense=await expenseModel.insertOne(req.body);
        // console.log(createdExpense)
    }
    catch(e){
        res.status(400).send({message: "Error",error: e.message})
    }
});


expenses.get("/getexpenses",Authorization,async(req,res)=>{
    try{
        const userId = req.user.userId;
        let expenseList= await expenseModel.find({user_id:userId});
        res.status(200).send({payload: expenseList})
    }
    catch(e){
        res.status(400).send({message: "Error",error: e.message})
    }
})


expenses.delete("/:eid",Authorization,async(req,res)=>{
    const {eid}=req.params
    const userId = req.user.userId;
    try{
        const deleteExpense=await expenseModel.deleteOne({_id:eid, user_id:userId})
        if(deleteExpense.deletedCount === 0) {
            return res.status(404).send({ message: "Expense not found" });
    }
        res.status(200).send({message:" Expense Deleted Successfully"})
    
    }catch(e){
        res.status(200).send({ message: "Error", error: e.message });
    }
})


expenses.put("/putexpenses",(req,res)=>{
    res.send({message: "Hello from put expenses"})
})

expenses.get("/filter",(req,res)=>{
    const {eid,from,to}=req.query
    res.send(`Expense deleted by ${eid} from ${from} to ${to}`)
})

module.exports=expenses
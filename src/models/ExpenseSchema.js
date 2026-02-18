const mongoose=require("mongoose")
const ExpenseSchema=new mongoose.Schema({
    description:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    category_id:{
        type: mongoose.Schema.ObjectId,
        required:true
    },
    user_id:{
            type: mongoose.Schema.ObjectId,
            required: true
    }
})
const expenseModel=mongoose.model("expense", ExpenseSchema,"expense")
module.exports=expenseModel
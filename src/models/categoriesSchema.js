const mongoose=require("mongoose")
const categoriesSchema=new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    user_id:{
        type: mongoose.Schema.ObjectId,
        required: true
    }
})
const categoriesModel=mongoose.model("categories", categoriesSchema, "categories")
module.exports=categoriesModel
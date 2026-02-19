let express=require("express");
let cors=require("cors");
let mongoose=require("mongoose");
const userRoutes=require("./src/routes/usersRoutes");
const categoriesRoutes=require("./src/routes/categoriesRoutes");
const expensesRoutes=require("./src/routes/expensesRoutes");
let app=express();
let port = 8080;
mongoose.connect("mongodb://localhost:27017/expenseRecorder")//return the promise
.then(()=>{
    console.log("Database is connected")
})
.catch((err)=>{
    console.log(err)
})
app.use(cors());
app.use(express.json()); //middleware
app.use("/users",(userRoutes))
app.use("/categories",categoriesRoutes)
app.use("/expenses",expensesRoutes)

app.listen(port,()=>{
    console.log("Server is running")
})

app.get("/",(req,res)=>{
    res.send("Hello from server")
})
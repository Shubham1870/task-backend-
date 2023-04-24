const express=require("express")
const app=express()
const mongoose=require("mongoose")
const bodyParser = require("body-parser")
const port=8000

app.use(express.json())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost/test").then(()=>console.log("connected"))
const Schema=mongoose.Schema

const Taskschema=mongoose.Schema({
    title:String,
    is_completed:Boolean
})
const mymodel=mongoose.model("test",Taskschema)

app.get("/v1/tasks",async(req,res)=>{
    try{
        const data=await mymodel.find({})
        res.status(200).json({
            status:"success",
            data:data
        })
    }
    catch(error){
        res.status(400).json({
            status:"failed",
            message:error.message
        })
    }
})
app.get("/v1/tasks/:id",async(req,res)=>{
    try{
        const data=await mymodel.findOne({})
        res.status(200).json({
            status:"success",
            data:data
        })
    }
    catch(error){
        res.status(400).json({
            status:"failed",
            message:error.message
        })
    }
})

app.post("/v1/tasks",async(req,res)=>{
    try{
        if((res.body.title=="")){
            res.status(200).json({
                status:"error",
                message:"all field mandatory"
            })
        }
        const data=await mymodel.create({
            title:req.body.title,
            is_completed:req.body.is_completed
        })
        res.status(200).json({
            status:"success",
            data:data
        })
    }
    catch(error){
        res.status(400).json({
            status:"failed",
            message:error.message
        })
    }
})

app.put("/v1/tasks/:id",async(req,res)=>{
    try{
        if((res.body.title=="")){
            res.status(200).json({
                status:"error",
                message:"all field mandatory"
            })
        }
        await mymodel.find({_id:req.params.id}).updateOne(req.body)
        const data=await mymodel.findOne({_id:req.params.id})
        res.status(200).json({
            status:"success",
            data:data
        })
    }
    catch(error){
        res.status(400).json({
            status:"failed",
            message:error.message
        })
    }
})

app.delete("/v1/tasks/:id",async(req,res)=>{
    try{
       const deletedata= await mymodel.deleteOne({_id:req.params.id})
        res.status(200).json({
            status:"success",
            data:"data deleted"
        })
    }
    catch(error){
        res.status(400).json({
            status:"failed",
            message:error.message
        })
    }
})

app.listen(port,()=>console.log("app is running"))
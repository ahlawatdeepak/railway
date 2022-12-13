const express = require("express")
const mongoose = require("mongoose")
const Register = require("../Models/register.model")
const cors = require("cors")
const connect = require("../Connect/Connect")
const req = require("express/lib/request")
const PORT = process.env.PORT || 8000
mongoose.set('strictQuery', true)



const app = express()

app.use(express.json())

app.use(cors())




//  For register data ******************************************

app.get("/",async(req,res)=>{
    res.status(200).send("Hello Welcome to my app")
})


app.post("/register",async(req,res)=>{
    const register = req.body
    try {
        const data = await Register.create(register)
      res.send({message:"User created successfully",data:data})
    } catch (error) {
        res.status(501).send(error.message)
    }
      
    
    
})
//  Register info end here ************************************** and start login info **********************


// FOR USER LOGIN IF USER FIND IN DATABASE THEN RETURN RESPONSE 200 ELSE RETURN  ERROR ****

app.post("/login",async(req,res)=>{
     const {email,password}=req.body
    try {
        const data=await Register.findOne({email,password})
        console.log("data",data)
        if(!data){
            res.status(501).send({message:"INvalid information"})
        }
        else{
            res.send("User login successfull")
        }
    } catch (error) {
        res.status(401).send(error.message)
    }
    
    
   

})

// USER LOGIN END HERE ********************************


//  find last user logged information here **************
app.get("/getprofile" ,async(req,res)=>{
       
    let data=await Register.find()
    // console.log(data.length)
   
    let ans=data[data.length-1]
    res.send({message:"logged  user details" , data:ans})
      
})

//  end getprofile here ?*******************************


app.post("/emi",async(req,res)=>{
    const {loan,interest,month}=req.body
      let r=(interest/12/100).toFixed(6)
     
     
    let E= Math.ceil((+loan * +r * Math.pow((1 + +r), +month) ) / (Math.pow((1 + +r),month) - 1))
    E=Math.floor(E)
    let Total=E*month
    let pay=Total-loan
   
   res.send({message:"loan details",EMI:E,total:Total,Pay:pay})
})


















app.listen(PORT, async () => {
    await connect()
    console.log(`Database Connected and app listening on port ${PORT}`)
})
const mongoose = require("mongoose")
const registerSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,require:true,unique:false},
    password:{type:String,required:true}
})
const registerModel = mongoose.model("register",registerSchema)
module.exports = registerModel
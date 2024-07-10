const mongoose=require('mongoose');
const User=require('../model/user.model.js')



const textSchema=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true 
    },
    title:{type:String},
    description:{type:String},
    image:{type:String}
},{timestamps:true});


const Text=mongoose.model("text",textSchema);

module.exports=Text;

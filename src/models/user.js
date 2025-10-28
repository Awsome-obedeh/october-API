import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    // id:{
    //     type:Number,
    //     required:true,
    //     unique:true
    // },

    // name:{
    //     type:String,
    //     required:true,
        
    // },

    // country:{
    //     type:String,
    //     required:true
    // },

    // age:{
    //     type:Number,
    //     required:true
    // },
    // gender:{
    //     type:String,
    //     required:true,
    //     enum:["M","F"]
    // }

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }


}, {timestamps:true})

// because we are usiing next js we have to check if the model already exists or not    
// if it doesn not exixts, we create it and applly the schema this
const User=mongoose.models.User || mongoose.model("User", userSchema);
export default User;
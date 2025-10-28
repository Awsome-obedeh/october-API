import mongoose from "mongoose";

async function connectDb() {
    try{
        const connection=await mongoose.connect(process.env.MONGODB_URL);
        if(connection.readyState===1){
            console.log("database connected");
        }
        else{
            console.log("Database not connected")

        }
        return connection;
    }
    catch(err){
        console.log("Database connection error:", err);
    }
   
}

export default connectDb;
import User from "@/models/user";
import connectDb from "@/util/connect";

export const POST=async(req)=>{
    try{

        // take incoming request and extract body and conrvert to object
        const {email,password}=await req.json();
        
        // store user detail in the database
        await connectDb();
        const user=new User({email,password});
        await user.save();
        if(!user){
            return new Response(JSON.stringify({error:"User registration failed"}),{status:400});
        }
        return new Response(JSON.stringify({message:"User registered successfully"}),{status:200});
    }

    catch(err){

        console.log("Error in registration route:", err);
        return new Response(JSON.stringify({error:"Internal Server Error"}),{status:500});
    }
}
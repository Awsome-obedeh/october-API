export const POST=async(req)=>{
    try{

        // take incoming request and extract body and conrvert to object
        const {email,password}=await req.json();
        
        console.log("Received registration data:", {email,password});
        return new Response(JSON.stringify({message:"User registered successfully"}),{status:200});
    }

    catch(err){

        console.log("Error in registration route:", err);
        return new Response(JSON.stringify({error:"Internal Server Error"}),{status:500});
    }
}
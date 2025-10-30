import User from "@/models/user"
import connectDb from "@/util/connect"

export const POST = async (req) => {
    try {
        // first, collect incoming data from the user
        const { email, password } = await req.json()

        // call my database connection
        await connectDb()
        const userExists = await User.findOne({ email })
        if(!userExists){
            return new Response(JSON.stringify({ message: "Invalid details" }), { status: 401 })
        }

        // check password
        if (userExists.password !== password) {
            return new Response(JSON.stringify({ message: "Invalid details 2" }), { status: 401 })
        }
        return new Response(JSON.stringify({ message: "User logged in successfully" }), { status: 200 })
    } catch (err) {
        console.log(err.message)
        return new Response(JSON.stringify({ message:"Server Error" }), { status: 500 })
    }

}
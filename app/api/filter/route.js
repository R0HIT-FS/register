import { connectToDb } from "../../../lib/db";
import User from "../../../models/User";
import { NextResponse } from "next/server";
// const setCorsHeaders = (res) => {
//     res.headers.set('Access-Control-Allow-Origin', 'https://registration-kohl-ten.vercel.app'); // Your Vercel URL
//     res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
//   };

const allowedOrigins = [
    'https://registration-kohl-ten.vercel.app', 
    'https://register-phi-silk.vercel.app'
  ];
  
  const setCorsHeaders = (req, res) => {
    const origin = req.headers.get('origin');
  
    // Check if the request's origin is in the allowed origins
    if (allowedOrigins.includes(origin)) {
      res.headers.set('Access-Control-Allow-Origin', origin);
    }
  
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  };

export async function GET(request){
    const res = NextResponse.next(); 
    setCorsHeaders(res);
    try {
        await connectToDb();
        const minAge = request.nextUrl.searchParams.get("minAge");
        const maxAge = request.nextUrl.searchParams.get("maxAge");
        const users = await User.find({age:{$gte:parseInt(minAge),$lte:parseInt(maxAge)}})
        return NextResponse.json(users,{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Internal server error"},{status:500})
    }
}
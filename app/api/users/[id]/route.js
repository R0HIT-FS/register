import { connectToDb } from "../../../../lib/db";
import User from "../../../../models/User";
import { NextResponse } from "next/server";
const setCorsHeaders = (res) => {
    res.headers.set('Access-Control-Allow-Origin', 'https://registration-kohl-ten.vercel.app'); 
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  };

// const allowedOrigins = [
//     'https://registration-kohl-ten.vercel.app', 
//     'https://register-phi-silk.vercel.app'
//   ];
  
//   const setCorsHeaders = (req, res) => {
//     const origin = req.headers.get('origin');
  
//     // Check if the request's origin is in the allowed origins
//     if (allowedOrigins.includes(origin)) {
//       res.headers.set('Access-Control-Allow-Origin', origin);
//     }
  
//     res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
//   };

export async function PUT(request,{params}){
    const res = NextResponse.next(); 
    setCorsHeaders(res);
        const {id} = params;
        const {newName:name, newAge:age,newNumber:phone,newGender:gender,newPaid:paid} = await request.json();
        await connectToDb();
       const updatedUser =  await User.findByIdAndUpdate({_id:id},{name,age,phone,paid,gender}, { new: true });
        return NextResponse.json({message:updatedUser},{status:200})
}

export async function GET(request,{params}){
    const res = NextResponse.next(); 
    setCorsHeaders(res);
    try {
        const {id} = params;
        await connectToDb();
        const user = await User.findById({_id:id});
        return NextResponse.json(user,{status:200});
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"An error occured"},{status:500});
    }

}
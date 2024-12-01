import { connectToDb } from "../../../lib/db";
import User from "../../../models/User";
import { NextResponse } from "next/server";


const setCorsHeaders = (res) => {
  res.headers.set('Access-Control-Allow-Origin', 'https://registration-kohl-ten.vercel.app'); // Your Vercel URL
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
};

// const allowedOrigins = [
//   'https://registration-kohl-ten.vercel.app', 
//   'https://register-phi-silk.vercel.app'
// ];

// const setCorsHeaders = (req, res) => {
//   const origin = req.headers.get('origin');

//   // Check if the request's origin is in the allowed origins
//   if (allowedOrigins.includes(origin)) {
//     res.headers.set('Access-Control-Allow-Origin', origin);
//   }

//   res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
// };
export async function POST(request) {
  const res = NextResponse.next(); 
  setCorsHeaders(res);
  try {
    const { name, age, gender, paid, phone } = await request.json();
    // await connectToDb();
    await connectToDb();
    let user = await User.create({
      name,
      age,
      gender,
      paid,
      phone,
    });
    return NextResponse.json(user,{status:201})
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function GET(){
  const res = NextResponse.next(); 
  setCorsHeaders(res);
   try {
     await connectToDb();
     let users = await User.find();
     return NextResponse.json(users,{status:200})
   } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
   }
}

export async function DELETE(request){
  const res = NextResponse.next(); // Create a response object
  setCorsHeaders(res);
    try {
        const id = request.nextUrl.searchParams.get("id");
        await connectToDb();
        let user = await User.deleteOne({_id:id})
        return NextResponse.json({message:user},{status:200});
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
}



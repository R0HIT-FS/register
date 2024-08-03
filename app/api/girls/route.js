import { connectToDb } from "../../../lib/db";
import User from "../../../models/User";
import { NextResponse } from "next/server";

// const setCorsHeaders = (res) => {
//   res.headers.set('Access-Control-Allow-Origin', 'https://registration-kohl-ten.vercel.app'); // Your Vercel URL
//   res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
// };

export async function GET(){
  // const res = NextResponse.next(); 
  // setCorsHeaders(res);
    try {
      await connectToDb();
      let girls = await User.find({gender:"Female"});
      const res = NextResponse.json(girls,{status:200})
      res.headers.set('Access-Control-Allow-Origin', 'https://registration-kohl-ten.vercel.app'); // Your Vercel URL
      res.headers.set('Access-Control-Allow-Methods', 'GET');
      res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
      return res
    } catch (error) {
     console.log(error)
     return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
  }
import { connectToDb } from "../../../lib/db";
import User from "../../../models/User";
import { NextResponse } from "next/server";

const setCorsHeaders = (res) => {
  res.headers.set('Access-Control-Allow-Origin', 'https://registration-kohl-ten.vercel.app'); // Your Vercel URL
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
};

export async function GET(){
  const res = NextResponse.next(); 
  setCorsHeaders(res);
    try {
      await connectToDb();
      let boys = await User.find({gender:"Female"});
      return NextResponse.json(boys,{status:200})
    } catch (error) {
     console.log(error)
     return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
  }
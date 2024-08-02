import { connectToDb } from "../../../lib/db";
import User from "../../../models/User";
import { NextResponse } from "next/server";


export async function GET(){ 
    try {
      await connectToDb();
      let boys = await User.find({gender:"Male"});
      const res = NextResponse.json(boys,{status:200})
      res.headers.set('Access-Control-Allow-Origin', 'https://registration-kohl-ten.vercel.app'); // Your Vercel URL
      res.headers.set('Access-Control-Allow-Methods', 'GET');
      return res
    } catch (error) {
     console.log(error)
     return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
  }
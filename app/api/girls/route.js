import { connectToDb } from "../../../lib/db";
import User from "../../../models/User";
import { NextResponse } from "next/server";

export async function GET(){
    try {
      await connectToDb();
      let boys = await User.find({gender:"Female"});
      return NextResponse.json(boys,{status:200})
    } catch (error) {
     console.log(error)
     return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
    }
  }
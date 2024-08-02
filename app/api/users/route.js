import { connectToDb } from "../../../lib/db";
import User from "../../../models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
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



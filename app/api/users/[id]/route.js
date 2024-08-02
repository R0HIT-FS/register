import { connectToDb } from "../../../../lib/db";
import User from "../../../../models/User";
import { NextResponse } from "next/server";

export async function PUT(request,{params}){
        const {id} = params;
        const {newName:name, newAge:age,newNumber:phone,newGender:gender,newPaid:paid} = await request.json();
        await connectToDb();
       const updatedUser =  await User.findOneAndUpdate({_id:id},{name,age,phone,paid,gender}, { new: true });
        return NextResponse.json({message:updatedUser},{status:200})
}

export async function GET(request,{params}){
    try {
        const {id} = params;
        // console.log(id)
        await connectToDb();
        const user = await User.findOne({_id:id});
        return NextResponse.json(user,{status:200});
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"An error occured"},{status:500});
    }

}
import mongoose from "mongoose";
const uri = process.env.MONGODB_URI;

const options = {
    useNewUrlParser:true,
    useUnifiedTopology: true,
};


export async function connectToDb(){
    try {
        await mongoose.connect(uri);
        console.log("connected to mongoDB");
    }
 catch (error) {
        console.log(error)
    }
}

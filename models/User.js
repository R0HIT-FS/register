import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
    name:String,
    phone:Number,
    age:Number,
    gender:String,
    paid:String
})

const User = mongoose.models.User || mongoose.model("User",userSchema);

export default User;
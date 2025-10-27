import mongoose from "mongoose";

const TempOTP = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId , ref : "User" , require :true },
    otp: { type: String, required: true },
    expiredAt: { type: Date, required: true },
})

export default mongoose.model("TempUser", TempOTP);

import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv()

async function connectdb ()  {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Ket noi db thanh cong')
    }catch (err) {
        console.log("khong the ket noi db")
    }
}
export default connectdb

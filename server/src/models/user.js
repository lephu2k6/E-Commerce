import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name : {type : String , require :true } , 
    email : {type : String , require : true , unique : true },
    password : {type : String , require : true} ,
    phone : String ,
    role : {type : String , enum : ['customer' , 'seller' , 'admin'] , default : 'customer'},
    createdAt: { type: Date, default: Date.now }

})


export default mongoose.model ('User' ,UserSchema)
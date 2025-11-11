import mongoose from "mongoose";


const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true 
    } , 
    color : {
        type:String , 
    },
    icon: {
        type: String,
    },
    image: {
        type : String , 
        required : true
    }

})

export default mongoose.model ('Category' ,categorySchema )
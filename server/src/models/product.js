import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  brand: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  image: { 
    type: String, 
    required: true 
  },
  images: [{ 
    type: String 
  }],
  description: { 
    type: String, 
    required: true 
  },
  richDescription: { 
    type: String 
  },
  stock: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  category: {
    type: mongoose.Schema.Types.ObjectId , 
    ref : 'Category',
    required: true 
  },
  isFeature: {
    type: Boolean , 
    default:false 
  },
  rating: {
    type: Number , 
    default: 0
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model("Product", productSchema);

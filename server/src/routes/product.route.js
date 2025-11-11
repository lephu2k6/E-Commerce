import express from "express";
import { getProducts,getProductById,createProduct } from "../controllers/product.controller.js";

const router = express.Router() 
// Danh sách sản phẩm
router.get("/", getProducts);
// Chi tiết sản phẩm 
router.get("/:id" , getProductById) 
//Thêm sản phẩm
router.post('/' , createProduct)


export default router
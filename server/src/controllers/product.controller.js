import Product from "../models/product.js";

// Lấy tất cả sản phẩm
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category'); 
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: err.message,
    });
  }
};

// Lấy sản phẩm theo ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Không tồn tại sản phẩm",
      });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: err.message,
    });
  }
};

// Tạo sản phẩm mới
export const createProduct = async (req, res) => {
  try {
    const { 
      name, 
      brand, 
      price, 
      description, 
      image, 
      images, 
      stock, 
      category, 
      isFeature, 
      rating, 
      richDescription 
    } = req.body;

    // Kiểm tra dữ liệu bắt buộc
    if (!name || !brand || !price || !description || !image || !stock || !category) {
      return res.status(400).json({
        success: false,
        message: "Thiếu dữ liệu bắt buộc",
      });
    }

    const product = await Product.create({
      name,
      brand,
      price,
      description,
      image,
      images,
      stock,
      category,
      isFeature,
      rating,
      richDescription
    });

    res.status(201).json({
      success: true,
      message: "Tạo sản phẩm thành công",
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: err.message,
    });
  }
};

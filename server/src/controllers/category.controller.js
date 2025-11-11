import Category from "../models/category.js";


export const getCategory = async (req, res) => {
    try {
        const  categoryList = await Category.find()
        if(!categoryList) {
            return res.status(400).json({
                success : false , 
                message: 'Kh co category list'
            })
        }
        res.status(200).json(categoryList)
    }catch (err) {
        res.status(500).json({
            message: 'Loi Server'
        })
    }
}
export const PostCategory = async (req, res) => {
    try {
      const { name, icon, color, image } = req.body;
  
      // Kiểm tra các field bắt buộc
      if (!name || !image) {
        return res.status(400).json({
          success: false,
          message: "Thiếu thông tin bắt buộc: name hoặc image",
        });
      }
  
      // Tạo Category
      const category = new Category({ name, icon, color, image });
      await category.save();
  
      res.status(201).json({
        success: true,
        message: "Tạo danh mục thành công",
        data: category,
      });
    } catch (err) {
      console.error(err); // log lỗi ra console để debug
      res.status(500).json({
        success: false,
        message: "Lỗi server",
        error: err.message, // trả thêm thông tin lỗi
      });
    }
  };
export const deleteCategory = async (req, res) => {
    try {
        const {id} = req.params
        await Category.findByIdAndDelete(id)
        res.status(200).json({
            success:true , 
            message: 'Xoa thanh cong'
        })

    }catch(err) {
        res.status(500).json({
            message:'Loi Server'
        })
    }
}
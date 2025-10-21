import UserSchema from '../models/user.js'
import bcrypt from 'bcrypt'

export const signup = async (req, res ) => {
    try {
        const {email , password} = req.body 
        if (!email || !password) {
            return  res.status(400).json({
                message: 'Thiếu gì đấy nhờ ??? '
            }) 
        }
        // Kiểm tra có tồn tại tài khoản hong 
        const exist = await UserSchema.findOne({email : email})
        if (exist) {
            // 409 là conflict
            return res.status(409).json({
                message: 'đã tồn tại email'
            })
        }
        // saltRound là chuỗi vòng lằp mà bcrypt phải thực hiện 
        // saltRound càng cao thì tốc độ càng chậm nhưng bảo mật càng víp
        const saltRounds = 8
        const hashPassword = await bcrypt.hash(password, saltRounds)
        const newUser = new UserSchema({
            email : email ,
            password : hashPassword
        })
        await newUser.save()
        return res.status(201).json({
            success: true,
            message: 'Đăng ký thành công!',
            user: {
              email: newUser.email,
              createdAt: newUser.createdAt
            }
        })
    }catch (err) {
        return res.status(500).json({
            success : false , 
            message : 'Loi server' , 
        })
    }
}
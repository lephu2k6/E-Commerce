import UserSchema from "../models/user.js"
import TempOTP from "../models/tempOTP.js"
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import dotenv from "dotenv"
dotenv.config()
import {sendTelegramOTP}  from '../utils/sendTelegram.js'

export const signup = async (req, res ) => {
    try {
        const {email , password, telegramId} = req.body 
        if (!email || !password || !telegramId) {
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
            password : hashPassword,
            telegramId
        })
        await newUser.save()

        await sendTelegramOTP(telegramId, newUser._id)

        res.status(201).json({
            success: true,
            message: "Đăng ký thành công! Hãy kiểm tra Telegram để lấy OTP.",
            userId: newUser._id,
          });
    }catch (err) {
        return res.status(500).json({
            success : false , 
            message : 'Loi server' , 
        })
    }
}
export const login = async (req , res) => {
    try {
      const {email , password} = req.body 
      // Kiểm tra tính hợp lệ 
      if(!email || !password) {
        return res.status(409).json(
          {
            success: false , 
            message: 'Thieu du lieu'
          }
        )
      }
      // Kiểm tra email và tk có dc kích hoạt hay k
      const user = await UserSchema.findOne(
        {
          $and : [
            {email : email} ,
            {isVerified : true}
          ]
        }
      )
      // console.log(user)
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Email không tồn tại hoặc chưa xác thực"
        });
      }
      const isMatch = await bcrypt.compare(password , user.password)
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Sai mật khẩu"
        });
      }
      const token = jwt.sign ({userId : user._id , email : user.email }, process.env.JWT_SECRET , {expiresIn : '24h'})
      res.status(200).json({
        success: true,
        message: "Đăng nhập thành công!",
        token,
        user : 
          {
            id : user._id ,
            email: user.email 
          }
          
      });
    }catch (err) {
      res.status(500).json(
        {
          success : false , 
          message: 'loi server'
        }
      )
    }
}



export const verifyOTP = async (req, res) => {
    try {
      const { userId, otp } = req.body;
      const record = await TempOTP.findOne({ userId });
      if (!record) return res.status(400).json({ message: "Không tìm thấy mã OTP" });
      

      if (record.expiredAt < new Date()) {
        await TempOTP.deleteOne({ userId });
        return res.status(400).json({ message: "Mã OTP đã hết hạn" });
      }
  
      if (record.otp !== otp) {
        return res.status(400).json({ message: "Mã OTP không đúng" });
      }
  
      await UserSchema.findByIdAndUpdate(userId, { isVerified: true });
      await TempOTP.deleteOne({ userId });
  
      res.status(200).json(
        {
          success : true,
          message : 'Xác thực thành công'
        }
      )
    } catch (err) {
      res.status(500).json({ message: "Lỗi server", error: err.message });
    }
  };
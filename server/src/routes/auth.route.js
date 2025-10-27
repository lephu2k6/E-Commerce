import express from "express" 
const router = express.Router()
// 
import { signup, verifyOTP , login } from "../controllers/auth.controller.js";


router.post ('/signup' , signup)
router.post('/verify-otp' , verifyOTP)
router.post('/login', login)



export default router




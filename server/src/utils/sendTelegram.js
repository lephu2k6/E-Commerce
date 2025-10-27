import TempOTP from "../models/tempOTP.js"
import axios from "axios";
const BOT_TOKEN = "7976988194:AAEnQCxCZ0CffyZiPSh34oQcBnf_Wr1WRkc"
/**
 * Gửi mã OTP đến người dùng qua Telegram
 * @param {string} chatId - ID của người nhận (telegramId)
 */
export const sendTelegramOTP  = async (chatId , userId) => {
    try {
        const otp = Math.floor(100000 + Math.random() * 900000);
        const message = `Mã xác thực otp của bạn là : ${otp}`
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage` , 
            {
                chat_id: chatId,
                text: message,
                parse_mode: "Markdown",
            }
        )
        console.log('gui ok roi')
        const expiredAt = new Date(Date.now() + 5 * 60 * 1000) //2025-10-21T06:46:49.858Z
        await TempOTP.findOneAndUpdate(
            { userId } , 
            { otp, expiredAt },
            { upsert: true, new: true }
        )
    }catch (err) {
        console.error("Lỗi khi gửi OTP qua Telegram:", err.message);
        throw new Error("Không thể gửi OTP qua Telegram")
    }
}
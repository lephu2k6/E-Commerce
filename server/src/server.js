import bodyParser from 'body-parser'
import express from 'express'
import morgan from 'morgan' 
import cors from 'cors'
import dotenv from "dotenv"
import connectdb from './config/db.js';
//------ 
import authRouter from "../src/routes/auth.route.js"

//-----

// Ket noi db 
dotenv.config()
connectdb()

const app = express()
app.use(bodyParser.json())
app.use(morgan('dev'));
app.use(cors());


// Xay dung route
app.use('/api/auth' , authRouter )


const PORT = process.env.PORT || 3000
app.listen (PORT , () => {
    console.log(`Ket Noi Thanh Cong Port ${PORT}`)
})
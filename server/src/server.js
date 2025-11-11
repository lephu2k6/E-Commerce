import bodyParser from 'body-parser'
import express from 'express'
import morgan from 'morgan' 
import cors from 'cors'
import dotenv from "dotenv"
import connectdb from './config/db.js';
//------ 
import authRouter from "../src/routes/auth.route.js"
import producRouter from '../src/routes/product.route.js'
import orderRouter from '../src/routes/order.route.js'
import categoryRouter from '../src/routes/category.route.js'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'

//----- 

// Ket noi db 
dotenv.config()
connectdb()

const app = express()
app.use(express.json());
app.use(bodyParser.json())
app.use(morgan('dev'));
app.use(cors());

//swagger
const swaggerDocument = JSON.parse (fs.readFileSync("swagger.json" , 'utf8'))
app.use('/api-docs' , swaggerUi.serve , swaggerUi.setup(swaggerDocument))

// Xay dung route
app.use('/api/auth' , authRouter )
app.use('/api/product' , producRouter)
app.use('/api/category', categoryRouter)
app.use('/api/orders', orderRouter);


const PORT = process.env.PORT || 3000
app.listen (PORT , () => {
    console.log(`Ket Noi Thanh Cong Port ${PORT}`)
})
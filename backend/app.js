const express=require('express')
const cors =require('cors')
const {verifyToken} = require('./middlewares/verifyToken')
const connectDB = require('./db/db')
const app=express()

require('dotenv').config()
const port= process.env.PORT

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// require('./routes/userRoutes')
app.use('/', require('./routes/userRoutes'));
app.use('/', verifyToken ,require('./routes/transactionRoutes'))
app.listen(port,()=>console.log(`Server started at port ${port}`));
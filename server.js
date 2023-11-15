const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const auth = require("./routes/auth")
const connectDB = require('./config/db')
dotenv.config({path:'./config/.env'})
connectDB()

const app=express()
app.use(cors());
app.use(express.json());

app.use("/api/auth", auth)

console.log(`SERVER UP and running at ${process.env.PORT}`)

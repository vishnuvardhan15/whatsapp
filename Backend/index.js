const express = require('express');
const cors = require('cors');
const dbConnect = require('./connection')
const chatRoute = require('./routes/chatRoute')
const dotenv = require('dotenv');
dotenv.config();


const app  = express();
dbConnect();//db connection
app.use(cors());//cross origin request
app.use(express.json());//parsing to json
app.use(express.urlencoded({ extended: true }));//when sending from postman using form-url-encoded


app.use('/api',chatRoute); //localhost:3000/api


app.listen(process.env.PORT,()=>{
    console.log('server is running on the port no 3000');
    
})
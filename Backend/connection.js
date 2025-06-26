const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();

const dbConnection = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('db connected succussfully')
    }catch(err){
        console.log(err);
    }
}

module.exports = dbConnection;
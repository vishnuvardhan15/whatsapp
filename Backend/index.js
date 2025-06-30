const express = require('express');
const cors = require('cors');
const dbConnect = require('./connection')
const chatRoute = require('./routes/chatRoute')
const {Server} = require("socket.io")
const dotenv = require('dotenv');
const http = require('http');
const { log } = require('console');
const { connection } = require('mongoose');
dotenv.config();

const app  = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

dbConnect();//db connection
app.use(cors());//cross origin request
app.use(express.json());//parsing to json
app.use(express.urlencoded({ extended: true }));//when sending from postman using form-url-encoded

//exposing express server
app.use('/api',chatRoute); //localhost:3000/api

//exposing websocket server
io.on('connection', (socket) =>{
  console.log("connected to frontend io")
  socket.on('clientMessage',(data) =>{
    io.emit('serverMessage',data);
  })
})

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

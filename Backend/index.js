const express = require('express');
const cors = require('cors');
const dbConnect = require('./connection');
const messageRoute = require('./routes/messageRoute');
const authRoute = require('./routes/authRoute');
const {Server} = require("socket.io");
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
app.use('/api/auth',authRoute); //localhost:3000/api/auth
app.use('/api', messageRoute); //localhost:3000/api


//exposing websocket server
io.on("connection",(socket)=>{

    console.log("User Connected:",socket.id);
    //join chat
    socket.on("join-chat",(chatId)=>{

        socket.join(chatId);

        console.log(
            `${socket.id} joined ${chatId}`
        );
    });

    socket.on("disconnect",()=>{
        console.log("User Disconnected");
    });

});

app.set("io",io);

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000 }`);
});

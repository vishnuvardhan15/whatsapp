const Chat = require("../model/chat");

const getAllChats = async(req,res)=>{
    try{
        const chat = await Chat.find();
        res.send(chat);
    }catch(err){
        res.send(err);
    }
}

const addChat = async(req,res)=>{
    try{
        const chat = await Chat.create(req.body); //{owner: "nani", text: "hello"}
        res.send("chat add to DB Successfully");
    }catch(err){
        res.send(err);
    }
    
}

const clearChat = async(req,res)=>{
    try {
        const chat = await Chat.deleteMany()
        res.send('chat deleted successfully');
    } catch (error) {
        res.send(error)
    }
}

module.exports = {getAllChats, addChat, clearChat}
const mongoose=require('mongoose');


const messageSchema= new mongoose.Schema({
  senderId:String,
  senderName:String,

  receiverId:String,
  receiverName:String,

  date:String,

  message:String

});

module.exports=mongoose.model('messages',messageSchema);

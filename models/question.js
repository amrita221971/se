const mongoose=require('mongoose');

const questionSchema= new mongoose.Schema({
  question:String,
  option1:String,
  option2:String,
  option3:String,
  option4:String,
  answer:Number, //option number
});

module.exports=mongoose.model('question',questionSchema);

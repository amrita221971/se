const mongoose=require('mongoose');


const quizSchema= new mongoose.Schema({
  title:String,
  by_name:String,
  by_id:String,
  to_name:String,
  to_id:String,
  Q1:String,
  Q1o1:String,
  Q1o2:String,
  Q1o3:String,
  Q1o4:String,
  Q1an:Number,
  Q1a:String
});

module.exports=mongoose.model('quiz',quizSchema);

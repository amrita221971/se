const mongoose=require('mongoose');


const goalSchema= new mongoose.Schema({
  goal:String,
  postedBy:Array,
  to:Array,


});

module.exports=mongoose.model('goal',goalSchema);

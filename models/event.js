const mongoose = require('mongoose');

const eventSchema=new mongoose.Schema({
  name:String,
  postedBy:String,
  attendedBy:Array,
  
  attendedByCount:{type:Number, default:0}
});

module.exports=mongoose.model('event',eventSchema);

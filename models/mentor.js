const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    name: {type:String , required:true},
    email: String,
    password: String,
    skill :String,

    connectionrequests:Array,

    students: Array,

    quizziesPosted: Array,

    myGoals:Array,


    eventsPosted:Array
    });

module.exports = mongoose.model('mentor', mentorSchema);

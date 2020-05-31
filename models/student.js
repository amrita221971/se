const mongoose = require('mongoose');



const studentSchema = new mongoose.Schema({
    name: String ,
    email: String,
    password:String,
    skill : String,
    uni:String,

    myMentors: Array,
    pendingMentors: Array,

    quizzes: Array,
    pendingQuizzes: Array,

    myGoals:Array,
    pendingGoals:Array



});

module.exports = mongoose.model('student', studentSchema);

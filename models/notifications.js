const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    name: String ,
    sourceId: String,
    receiverId:String,
});

module.exports = mongoose.model('notification', notificationSchema);

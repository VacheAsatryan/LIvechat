

const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
  room: String,
  author: String,
  message: Array, 
  time: Array
});


module.exports = mongoose.model("Message", messageSchema)
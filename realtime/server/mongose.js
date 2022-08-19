

const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    data:{
  room: String,
  author: String,
  message: Array, 
  time: Array
    }
});


module.exports = mongoose.model("allData", messageSchema)
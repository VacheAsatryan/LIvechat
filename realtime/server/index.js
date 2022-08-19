    const express = require('express');
    const app = express();
    const http = require('http');
    const cors = require('cors');
    const { Server } = require('socket.io');
    const bodyParser =require('body-parser');
    const mongoose = require('mongoose');
    
    const messageSchema = require('./mongose');
    const router = express.Router();
    const url = "mongodb://localhost:27017/";

app.use(cors());

const server =http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods : ['GET','POST'],
    },
});
const
io.on('connection', (socket) => {
    console.log(`user conected:${socket.id}`);

    socket.on('join_room',(data) => {
      socket.join(data);
      console.log(`User with id : ${socket.id} joined a room ${data}`);
    });

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('recive_message', data);  
        
        mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => {
            console.log("DB Connection Succesfull")
            const result = new messageSchema({
                data:{
                room:data.room,
                author: data.author,
                message: [data.message], 
                time: data.time
                },
            });
            const test = result.save();
        })
            .catch((err) => {
            console.log(err.message)
        });
    });
 
    socket.on('disconnect', () => {
        console.log(`User Disconectid`, socket.id);
    });
});

server.listen(3001,() => {
    console.log('listen' )
});
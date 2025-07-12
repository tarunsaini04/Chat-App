//Node server which will handel socket io connections
//const { Socket } = require('socket.io');

// const express=require('express');
// const cors=require('cors');
// const app=express();
// const server=require('http').createServer(app);
// const io=require('socket.io')(server);

// app.use(cors());

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://127.0.0.1:5500',  // or 'http://localhost:5500'
        methods: ["GET", "POST"]
    }
});

app.use(cors({
    origin: 'http://127.0.0.1:5500',  // or 'http://localhost:5500'
}));

const users={};

io.on('connection',socket=>{
    //when new user join chat other will get to know
    socket.on('new-user-joined',name=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    //when somone send message
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
    });

    //when someone leave
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})  

server.listen(8000,()=>{
    console.log("listing on server 8000");
})
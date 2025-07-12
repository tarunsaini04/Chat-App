//Node server which will handel socket io connections
//const { Socket } = require('socket.io');

// const express=require('express');
// const cors=require('cors');
// const app=express();
// const server=require('http').createServer(app);
// const io=require('socket.io')(server);

// app.use(cors());

// const express = require('express');
// const cors = require('cors');
// const http = require('http');
// const { Server } = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: 'http://127.0.0.1:5500',  // or 'http://localhost:5500'
//         methods: ["GET", "POST"]
//     }
// });

// app.use(cors({
//     origin: 'http://127.0.0.1:5500',  // or 'http://localhost:5500'
// }));

// const users={};

// io.on('connection',socket=>{
//     //when new user join chat other will get to know
//     socket.on('new-user-joined',name=>{
//         users[socket.id] = name;
//         socket.broadcast.emit('user-joined',name);
//     });

//     //when somone send message
//     socket.on('send',message=>{
//         socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
//     });

//     //when someone leave
//     socket.on('disconnect',message=>{
//         socket.broadcast.emit('left',users[socket.id]);
//         delete users[socket.id];
//     });
// })  

// server.listen(8000,()=>{
//     console.log("listing on server 8000");
// })

// Node server which will handle socket.io connections

const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path'); // <<< IMPORTANT: Import the 'path' module
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// --- 1. Configure CORS dynamically for production/development ---
const allowedOrigins = [
    'http://127.0.0.1:5500', // For local development if you're using Live Server
    'http://localhost:5500', // Also for local development
    'https://chat-app-backend-ec8y.onrender.com' // Your deployed Render URL
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ["GET", "POST"]
}));

// --- 2. Serve static files from the project root ---
// __dirname is the current directory (nodeServer/)
// '../' goes up one level to the project root where index.html, css/, js/ are
app.use(express.static(path.join(__dirname, '../')));

// --- 3. Optional: Explicit route for the root (though express.static usually handles index.html) ---
// This ensures that if someone hits the root URL, index.html is definitely sent.
// This should come AFTER app.use(express.static)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});


const io = new Server(server, {
    cors: {
        // Use the same dynamic origin configuration for Socket.IO
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        methods: ["GET", "POST"]
    }
});


const users = {};

io.on('connection', socket => {
    //when new user join chat other will get to know
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    //when somone send message
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    //when someone leave
    socket.on('disconnect', () => { // Removed 'message' parameter as it's not provided by disconnect event
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});

// --- 4. Use process.env.PORT for listening ---
const PORT = process.env.PORT || 8000; // Render will provide process.env.PORT
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`); // Log the actual port being listened on
});

const { configDotenv } = require('dotenv');
const express = require('express');
const app = express();
const {Server} = require('socket.io');
const http = require('http');
configDotenv();

const server = http.createServer(app);

const io = new Server(server, {

    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    },
    admin: true
});
server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

io.on('connection', (socket) =>{
    console.log(`User connected: ${socket.id}`);
});
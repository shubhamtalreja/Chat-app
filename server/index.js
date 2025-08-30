require('dotenv').config();
const express = require('express');
const app = express();
const { Server } = require('socket.io');
const http = require('http');

const server = http.createServer(app);
const users = new Map();

const io = new Server(server, {

    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});
server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('joinRoom', ({ username, room }) => {
        socket.join(room);

        users.set(socket.id, { username, room });
        
        console.log(`${username} joined room: ${room}`);
    });

    socket.on('disconnect', () => {

        if (users.has(socket.id)) {
            const { username, room } = users.get(socket.id);
            console.log(`${username} left room: ${room}`);
            users.delete(socket.id);
            console.log(`User disconnected: ${socket.id}`);

        } else {
            // This case might happen if a user connects but never 'joins' a room.
            console.log(`User disconnected: ${socket.id} (was not in a room)`);
        }
    });
});
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

        socket.emit('message', {
            user: 'Admin',
            text: `Welcome to the room, ${username}!`
        });

        socket.broadcast.to(room).emit('message', {
            user: 'Admin',
            text: `${username} has joined the room!`
        });
    });

    socket.on('sendMessage', (message) => {
        if (users.has(socket.id)) {
            const user = users.get(socket.id);
            io.to(user.room).emit('newMessage', {
                user: user.username,
                text: message
            });
            console.log(`Message from ${user.username} with ${socket.id} in room ${user.room}: ${message}`);
        } else {
            console.log(`Received message from an unknown user: ${socket.id}`);

        }

    })

    socket.on('disconnect', () => {

        if (users.has(socket.id)) {
            const { username, room } = users.get(socket.id);
            console.log(`${username} left room: ${room}`);
            users.delete(socket.id);

            socket.broadcast.to(room).emit('message', {
                user: 'Admin',
                text: `${username} has left the room.`
            });

        } else {
            // This case might happen if a user connects but never 'joins' a room.
            console.log(`User disconnected: ${socket.id} (was not in a room)`);
        }
    });
});
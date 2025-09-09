require('dotenv').config();
const express = require('express');
const app = express();
const { Server } = require('socket.io');
const http = require('http');
const connectDb = require('./config/db');
const Message = require('./models/Message');
const { timeStamp } = require('console');

const server = http.createServer(app);
const users = new Map();
connectDb();

const io = new Server(server, {

    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});
server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

const getRoomUsers = (room) => {
    const roomUsers = [];
    users.forEach((value, key) => {
        if (value.room === room) {
            roomUsers.push({ id: key, username: value.username });
        }
    });
    return roomUsers;
}

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('joinRoom', async ({ username, room }) => {
        socket.join(room);

        users.set(socket.id, { username, room });

        try {
            const chatHistory = await Message.find({ room: room }).sort({ timeStamp: 1 });
            console.log(`Found ${chatHistory.length} messages for room "${room}".`);
            socket.emit('loadHistory', chatHistory);
            console.log(`Sent chat history to user ${username} (${socket.id})`);


        } catch (error) {
            console.error('Error fetching chat history:', error);

        }


        socket.emit('message', {
            user: 'Admin',
            text: `Welcome to the room, ${username}!`
        });

        socket.broadcast.to(room).emit('message', {
            user: 'Admin',
            text: `${username} has joined the room!`
        });

        io.to(room).emit('roomData', {
            room: room,
            users: getRoomUsers(room)
        });
        console.log(`Sent updated user list for room \"${room}\" to all clients.`);
    });



    socket.on('sendMessage', async (message) => {
        if (users.has(socket.id)) {
            const user = users.get(socket.id);

            try {
                const newMessage = new Message({
                    author: user.username,
                    text: message,
                    room: user.room,
                    timestamp: new Date()
                });

                await newMessage.save();
                io.to(user.room).emit('newMessage', {
                    id: newMessage._id,
                    text: newMessage.text,
                    sender: {
                        id: socket.id,
                        username: user.username,
                    },
                    room: user.room,
                    timestamp: newMessage.timestamp,
                });
                console.log('Message saved to database successfully.');

            } catch (error) {
                console.error('Error saving message to database:', error);

            }



            console.log(`Message from ${user.username} with ${socket.id} in room ${user.room}: ${message}`);
        } else {
            console.log(`Received message from an unknown user: ${socket.id}`);

        }

    });

    socket.on('privateMessage', ({ recipientId, text }) => {

        const sender = users.get(socket.id);

        if (sender) {
            const messagePayload = {
                text: text,
                sender: {
                    id: socket.id,
                    username: sender.username,
                },
                recipient: {
                    id: recipientId
                }
            };

            io.to(recipientId).emit('newPrivateMessage', messagePayload);
            socket.emit('newPrivateMessage', messagePayload);

        } else {
            console.log(`Received private message from an unknown user: ${socket.id}`);
        }
    });

    socket.on('typing', () => {

        if (users.has(socket.id)) {
            const user = users.get(socket.id);
            socket.broadcast.to(user.room).emit('userTyping',
                { username: user.username }
            );
        }
    })

    socket.on('stopTyping', () => {
        if (users.has(socket.id)) {
            const user = users.get(socket.id);

            socket.broadcast.to(user.room).emit('userStoppedTyping', {
                username: user.username
            });
        }
    });

    socket.on('disconnect', () => {

        if (users.has(socket.id)) {
            const { username, room } = users.get(socket.id);
            console.log(`${username} left room: ${room}`);

            socket.broadcast.to(room).emit('message', {
                user: 'Admin',
                text: `${username} has left the room.`
            });
            users.delete(socket.id);

            const updatedUsers = getRoomUsers(room);
            io.to(room).emit('roomData', {
                room: room,
                users: updatedUsers
            });

            console.log(`Sent updated user list for room "${room}" after user disconnect.`);

        } else {
            console.log(`User disconnected: ${socket.id} (was not in a room)`);
        }
    });
});
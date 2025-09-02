import React from 'react'
import UserList from '../components/UserList';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import { useEffect } from 'react';
import { useState } from 'react';
import { socket } from '../socket';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [roomUsers, setRoomUsers] = useState();

    useEffect(() =>{

        const messageListner = (message) =>{
            setMessages((prevMessages) => [...prevMessages, message]);
        }

        const newMessageListener = (message) =>{
            setMessages((prevMessages) => [...prevMessages, message]);
        }

        const roomDataListener = ({ room, users }) => {
            console.log(`Room: ${room}`);
            console.log('Users in room:', users);
            setRoomUsers(users);
        }

        socket.on('message', messageListner);
        socket.on('newMessage', newMessageListener);
        socket.on('roomData', roomDataListener);

        return () => {
            socket.off('message', messageListner);
            socket.off('newMessage', newMessageListener);
            socket.off('roomData', roomDataListener);
        }
    },[])
    return (
        <div className="chat-page">

            <div className="chat-container">

                <div className="sidebar">
                    <h3>Room Name</h3>
                 <UserList roomUsers={roomUsers}/>
                </div>

                <div className="chat-main">
                    <MessageList messages={messages}/>
                 
                   <MessageInput/>
                </div>

            </div>
        </div>
    );
}

export default ChatPage

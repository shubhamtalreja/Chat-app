import React from 'react'
import UserList from '../components/UserList';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import { useEffect } from 'react';
import { useState } from 'react';
import { socket } from '../socket';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [room, setRoom] = useState("");

    useEffect(() => {

        const messageListner = (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        }

        const newMessageListener = (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        }

        const roomDataListener = ({ room, users }) => {
            setRoom(room);
            setUsers(users);
        }

        const loadHistoryListener = (history) => {
            const formattedHistory = history.map(msg => ({
                user: msg.author,
                text: msg.text,
            }));
            console.log(history);
            setMessages((prevMessages) => [...formattedHistory, ...prevMessages])
        }


        socket.on('message', messageListner);
        socket.on('newMessage', newMessageListener);
        socket.on('roomData', roomDataListener);
        socket.on('loadHistory', loadHistoryListener);

        return () => {
            socket.off('message', messageListner);
            socket.off('newMessage', newMessageListener);
            socket.off('roomData', roomDataListener);
            socket.off('loadHistory', loadHistoryListener);
        }
    }, [])
    return (
        <div className="chat-page">

            <div className="chat-container">

                <div className="sidebar">
                    <h3>{room}</h3>
                    <UserList roomUsers={users} />
                </div>

                <div className="chat-main">
                    <MessageList messages={messages} />

                    <MessageInput />
                </div>

            </div>
        </div>
    );
}

export default ChatPage

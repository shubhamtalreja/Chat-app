import React from 'react'
import UserList from '../components/UserList';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import { useEffect, useRef, useState } from 'react';
import { socket } from '../socket';
import './ChatPage.css'
import PrivateChatWindow from '../components/PrivateChatWindow';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [room, setRoom] = useState("");
    const [typingUser, setTypingUser] = useState();
    const userTypingTimeoutRef = useRef(null);
    const [privateChatTarget, setPrivateChatTarget] = useState(null);

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
        const userTypingListener = ({ username }) => {

            if (userTypingTimeoutRef.current) {
                clearTimeout(userTypingTimeoutRef.current);
            }
            setTypingUser(username);
            userTypingTimeoutRef.current = setTimeout(() => {
                setTypingUser('');
            }, 1000);
        }

        const userStoppedTypingListener = ({ username }) => {
            if (typingUser === username) {
                setTypingUser('');
                if (userTypingTimeoutRef.current) {
                    clearTimeout(userTypingTimeoutRef.current);
                }
            }
        };


        socket.on('message', messageListner);
        socket.on('newMessage', newMessageListener);
        socket.on('roomData', roomDataListener);
        socket.on('loadHistory', loadHistoryListener);
        socket.on('userTyping', userTypingListener);
        socket.on('userStoppedTyping', userStoppedTypingListener);

        return () => {
            socket.off('message', messageListner);
            socket.off('newMessage', newMessageListener);
            socket.off('roomData', roomDataListener);
            socket.off('loadHistory', loadHistoryListener);
            socket.off('userTyping', userTypingListener);
            socket.off('userStoppedTyping', userStoppedTypingListener);
            if (userTypingTimeoutRef.current) {
                clearTimeout(userTypingTimeoutRef.current);
            }
        }
    }, [typingUser]);

    const handleUserSelect = (user) => {
        if (users.id !== socket.id) {
            setPrivateChatTarget(user);
            console.log(`Starting private chat with: ${user.username}`);
        }
    };

    const handleClosePrivateChat = () => {
        setPrivateChatTarget(null);
    };
    return (
        <div className="chat-page">

            <div className="chat-container">

                <div className="sidebar">
                    <h3>{room}</h3>
                    <UserList roomUsers={users} onUserSelect={handleUserSelect} />
                </div>

                <div className="chat-main">
                    <MessageList messages={messages} />
                    {typingUser && (
                        <div className="typing-indicator">
                            {`${typingUser} is typing...`}
                        </div>
                    )}
                    <MessageInput />
                </div>

            </div>
            {privateChatTarget && (
                <PrivateChatWindow
                    targetUser={privateChatTarget}
                    onClose={handleClosePrivateChat}
                />
            )}
        </div>
    );
}

export default ChatPage

import React, { useEffect, useRef, useState } from 'react'
import './PrivateChatWindow.css';
import { socket } from '../socket';

const PrivateChatWindow = ({ targetUser, onClose, messages }) => {

    const [privateMessage, setPrivateMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    const handlePrivateMessageSubmit = (e) => {
        e.preventDefault();
        if (privateMessage.trim()) {
            socket.emit('privateMessage', {
                recipientId: targetUser.id,
                text: privateMessage,
            });
            setPrivateMessage('');
        }
    }
    return (
        <div className="private-chat-overlay">
            <div className="private-chat-window">
                <div className="private-chat-header">
                    <h4>Chat with {targetUser.username}</h4>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <div className="private-chat-messages">
                    <ul>
                        {messages.map((msg, index) => (
                            <li
                                key={index}
                                className={msg.sender.id === socket.id ? 'my-private-message' : 'their-private-message'}
                            >
                                <div className="message-content">
                                    {msg.text}
                                    {msg.timestamp && (
                                        <span className="private-message-timestamp">
                                            {format(new Date(msg.timestamp), 'p')}
                                        </span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div ref={messagesEndRef} />

                </div>
                <form className="private-chat-input" onSubmit={handlePrivateMessageSubmit}>
                    <input
                        type="text"
                        placeholder={`Message ${targetUser.username}...`}
                        value={privateMessage}
                        onChange={(e) => setPrivateMessage(e.target.value)}
                        autoFocus
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div >
    )
}

export default PrivateChatWindow

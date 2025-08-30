import React, { useState } from 'react'
import './MessageInput.css';
import { socket } from '../socket';

const MessageInput = () => {
    const [message, setMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {

            socket.emit('sendMessage', message);
            console.log("Sending message:", message);
            setMessage(''); // Clear the input field after sending
        }
    }

    return (
        <form className="message-form" onSubmit={handleSendMessage}>
            <input
                type="text"
                className="message-input"
                placeholder="Type your message..."
                value={message}
                onChange={setMessage(e.target.value)}
            />
            <button type="submit" className="send-button">
                Send
            </button>
        </form>
    );
}

export default MessageInput

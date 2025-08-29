import React from 'react'
import './MessageInput.css';

const MessageInput = () => {
    return (
        <form className="message-form">
            <input
                type="text"
                className="message-input"
                placeholder="Type your message..."
            />
            <button type="submit" className="send-button">
                Send
            </button>
        </form>
    );
}

export default MessageInput

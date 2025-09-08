import React from 'react'
import './PrivateChatWindow.css';

const PrivateChatWindow = ({ targetUser, onClose }) => {
    return (
        <div className="private-chat-overlay">
            <div className="private-chat-window">
                <div className="private-chat-header">
                    <h4>Chat with {targetUser.username}</h4>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <div className="private-chat-messages">
                    <p>Private chat history will be displayed here.</p>
                </div>
                <div className="private-chat-input">
                    <input type="text" placeholder={`Message ${targetUser.username}...`} />
                    <button>Send</button>
                </div>
            </div>
        </div>
    )
}

export default PrivateChatWindow

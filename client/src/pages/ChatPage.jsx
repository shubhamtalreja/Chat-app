import React from 'react'
import UserList from '../components/UserList';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';

const ChatPage = () => {
    return (
        <div className="chat-page">

            <div className="chat-container">

                <div className="sidebar">
                    <h3>Room Name</h3>
                 <UserList />
                </div>

                <div className="chat-main">
                    <MessageList />
                 
                   <MessageInput/>
                </div>

            </div>
        </div>
    );
}

export default ChatPage

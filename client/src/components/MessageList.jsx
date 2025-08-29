import React from 'react'
import './MessageList.css';

const MessageList = () => {
  const messages = [
    { id: 1, author: 'Alice', text: 'Hey everyone, welcome to the room!' },
    { id: 2, author: 'Bob', text: 'Hi Alice! Glad to be here.' },
    { id: 3, author: 'You', text: 'Hello! This is looking great.' },
    { id: 4, author: 'Charlie', text: 'I agree, the layout is clean.' }
  ];

  return (
    <div className="message-list">
      {messages.map(message => (
        <div key={message.id} className="message">
          <div className="message-header">
            <span className="message-author">{message.author}</span>
          </div>
          <p className="message-text">{message.text}</p>
        </div>
      ))}
    </div>
  );
}

export default MessageList

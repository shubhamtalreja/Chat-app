import React from 'react'
import './MessageList.css';

const MessageList = ( {messages} ) => {

  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div key={index} className="message">
          <div className="message-header">
            <span className="message-author">{message.user}</span>
          </div>
          <p className="message-text">{message.text}</p>
        </div>
      ))}
    </div>
  );
}

export default MessageList

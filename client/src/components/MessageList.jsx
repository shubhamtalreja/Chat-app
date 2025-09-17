import React, { useEffect, useRef } from 'react'
import { format } from 'date-fns';
import { socket } from '../socket';
import './MessageList.css';

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="message-list-container">
      {messages.length === 0 ? (
        <div className="no-messages">No messages yet. Say hi!</div>
      ) : (
        <ul className="message-list">
          {messages.map((msg, index) => (
            <li
              key={msg.id || index}
              className={`message-item ${msg?.sender?.id === socket.id ? 'my-message' : 'their-message'}`}
            >
              <div className="message-content">
                {msg.sender?.id !== socket.id && (
                  <div className="message-author">{msg.sender?.username}</div>
                )}
                <div className="message-text">{msg.text}</div>
                {msg.timestamp && (
                  <div className="message-timestamp">
                    {format(new Date(msg.timestamp), 'p')}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>)}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList

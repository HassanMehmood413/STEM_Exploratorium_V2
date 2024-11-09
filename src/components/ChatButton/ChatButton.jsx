import React from 'react';
import './ChatButton.css';

const ChatButton = ({ onClick, isOpen }) => {
  return (
    <button className={`chat-button ${isOpen ? 'open' : ''}`} onClick={onClick}>
      <span className="chat-button-icon">
        {isOpen ? (
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
        )}
      </span>
      {!isOpen && <span className="chat-button-text">Chat with AI</span>}
    </button>
  );
};

export default ChatButton;
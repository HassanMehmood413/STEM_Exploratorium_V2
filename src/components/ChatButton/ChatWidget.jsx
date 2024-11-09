import React, { useState, useRef, useEffect } from 'react';
import ChatButton from './ChatButton';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hello! How can I help you today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: inputMessage }]);
    const userMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      // Make API call to your AI endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      
      // Add bot response
      setMessages(prev => [...prev, { type: 'bot', content: data.message }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-widget-container">
      <ChatButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      
      {isOpen && (
        <div className="chat-widget">
          <div className="chat-header">
            <h3>AI Assistant</h3>
          </div>
          
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.type}`}
              >
                {message.content}
              </div>
            ))}
            {isTyping && (
              <div className="message bot typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chat-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
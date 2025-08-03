import React from 'react';
import './messagebubble.css';

function MessageBubble({ msg }) {
  return (
    <div className={`message-bubble ${msg.sender}`}>
      <p>{msg.text}</p>
    </div>
  );
}

export default MessageBubble;
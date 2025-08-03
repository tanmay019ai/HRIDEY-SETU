import React, { useState } from 'react';

function InputBox({ onSend }) {
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="input-box">
      <input
        type="text"
        value={input}
        placeholder="What's on your heart?"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send 💌</button>
    </div>
  );
}

export default InputBox;
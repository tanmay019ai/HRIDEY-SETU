import React from 'react';
import ChatWindow from './components/chatwindow';
import './App.css';
import FairyLights from './components/fairylights';



function App() {
  return (
    <div className="App">
      <FairyLights /> {/* 🌟 Add this line to show glowing lights */}
      <h1 className="title">🦚Hridey Setu🦚</h1>
      
      <ChatWindow />
    </div>
  );
}

export default App;
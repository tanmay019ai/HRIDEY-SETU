
import React, { useState, useRef, useEffect } from 'react';

import MessageBubble from './messagebubble';
import InputBox from './inputbox';

function ChatWindow() {
  const [showDiary, setShowDiary] = useState(false);
  const [diaryText, setDiaryText] = useState('');
  const [savedDiaryEntries, setSavedDiaryEntries] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showBhajans, setShowBhajans] = useState(false);
  const diaryRef = useRef(null);
  useEffect(() => {
  const handleClickOutside = (event) => {
    if (diaryRef.current && !diaryRef.current.contains(event.target)) {
      setShowDiary(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [showDiary]);




  const speakText = (text) => {
  if (!text || text.trim() === "") {
    console.warn("⛔ speakText skipped: No text provided");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'hi-IN'; // Use 'en-IN' or 'en-US' if Hindi voice isn't available
  utterance.pitch = 0.9;
  utterance.rate = 1;
  
  speechSynthesis.cancel(); // Stop any ongoing speech
  

  // Optional: try to pick a Hindi voice if available
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(
    (v) => v.lang === 'hi-IN' || v.name.toLowerCase().includes('hindi')
  );
  if (preferredVoice) utterance.voice = preferredVoice;

  speechSynthesis.speak(utterance);
};

  const fetchQuoteAndSpeak = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/quote');
      const data = await response.json();
      const quote = data.quote;

      setMessages((prev) => [...prev, { from: 'guru', text: quote }]);
      speakText(quote);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const fetchKrishnaReply = async (text) => {
    if (!text || text.trim() === "") return;

    try {
      const res = await fetch("http://localhost:5050/api/diary-reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ diaryText: text }),
      });

      const data = await res.json();
      const reply = data.reply;

      setMessages((prev) => [
  ...prev,
  { from: "guru", text: reply }
]);

      speakText(reply);
    } catch (err) {
      console.error("Failed to fetch reply:", err);
      setMessages((prev) => [...prev, { from: 'guru', text: "🙏 Sorry, I couldn't get a reply right now." }]);
    }
  };

  const bhajans = [
    {
      title: "Radhe Radhe Japna",
      url: "https://www.youtube.com/watch?v=g1LHzH2dPKs"
    },
    {
      title: "Shree Vrindavan Dham",
      url: "https://www.youtube.com/watch?v=ItMNNGaiQAs"
    },
    {
      title: "Yugal Naam Bhajan",
      url: "https://www.youtube.com/watch?v=2UFEevQ_AZM"
    }
  ];

  const handleMood = (mood) => {
    const moodReplies = {
      heartbroken: [
        "Don't worry. Pain makes you deep. Let your heart break open — that's where Krishna enters. 🕉",
        "Shree Premanand Ji says — jab duniya sath chod de ,tab thakur sabse paas hota hai."
      ],
      anxious: [
        "Surrender your anxiety to me, and I shall give you peace. — Bhagavad Gita 12.15",
        "Indresh Ji Maharaj says — chinta nhi charno me bharosa rakho."
      ],
      lonely: [
        "You are never alone. I reside in your heart, always — Shree Krishna 💙",
        "jaha prem hai, waha mai hu-premanand ji maharaj"
      ],
      overthinking: [
        "Why worry so much? Do your karma, leave results to me — Gita 2.47",
        "man ko sthir krlo phir sab saral ho jayega — Indresh Ji"
      ],
      blank: [
        "Blankness is good. It is space for divine thoughts. Let Krishna fill you now.",
        "Don't fill silence with noise — fill it with remembrance."
      ],
      devotional: [
        "Prema Bhakti is the highest joy — sing Radha Naam, all wounds shall vanish 🌸",
        "prem hi mera swaroop h-bass usi me kho jao-thakur ji."
      ]
    };

    const reply = moodReplies[mood][Math.floor(Math.random() * moodReplies[mood].length)];
    setMessages((prev) => [...prev, { from: 'guru', text: reply }]);
    speakText(reply);
  };

  const handleSend = async (text) => {
    if (!text.trim()) return;
   
    
    fetchKrishnaReply(text);
  };

  return (
    <div className="chat-window">
      {showDiary && (
  <div
    className="diary-section show"
    ref={diaryRef}
  >
    <h3>📝 Write to Thakurji</h3>
    <textarea
      placeholder="Dear Shreeji..."
      value={diaryText}
      onChange={(e) => setDiaryText(e.target.value)}
      style={{ width: "100%", height: "100px", marginBottom: "10px" }}
    />
    <button
      onClick={() => {
        if (diaryText.trim() !== "") {
          setSavedDiaryEntries([...savedDiaryEntries, diaryText]);
          
          setDiaryText("");
        } else {
          alert("🕊️ Please write something before saving.");
        }
      }}
      style={{
        backgroundColor: "#b38dff",
        color: "black",
        padding: "10px 16px",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "0.3s ease",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}
    >
      💾 Save My Feeling
    </button>

    <h4 style={{ marginTop: "20px" }}>📖 Previous Entries:</h4>
    <ul>
      {savedDiaryEntries.map((entry, idx) => (
        <li
          key={idx}
          style={{
            marginBottom: "10px",
            background: "#f9f9f9",
            padding: "10px",
            borderRadius: "8px"
          }}
        >
          {entry}
        </li>
      ))}
    </ul>
  </div>
)}

      

      <div className="mood-selector">
        <p>How are you feeling today?</p>
        <div className="mood-buttons">
          <button onClick={() => handleMood('heartbroken')}>💔 Heartbroken</button>
          <button onClick={() => handleMood('anxious')}>😟 Anxious</button>
          <button onClick={() => handleMood('lonely')}>😞 Lonely</button>
          <button onClick={() => handleMood('overthinking')}>🤯 Overthinking</button>
          <button onClick={() => handleMood('blank')}>🫥 Empty</button>
          <button onClick={() => handleMood('devotional')}>🙏 Devotional</button>
          <button onClick={() => setShowDiary(!showDiary)}>📓 Shree Ji Diary</button>
          <button onClick={fetchQuoteAndSpeak}>📜 Shreeji Daily Quote</button>
          <button onClick={() => setShowBhajans(!showBhajans)}>🎵 Bhajan Clips</button>
        </div>
      </div>

      {showBhajans && (
        <div className="bhajan-list">
          <h3>📿 Listen to Bhajan Clips</h3>
          <ul>
            {bhajans.map((bhajan, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                <strong>{bhajan.title}</strong><br />
                <a href={bhajan.url} target="_blank" rel="noopener noreferrer">▶️ Play on YouTube</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="messages">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} msg={msg} />
        ))}
      </div>

      <InputBox onSend={handleSend} />
    </div>
  );
}

export default ChatWindow;

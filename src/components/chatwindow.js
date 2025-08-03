import React, { useState } from 'react';
import MessageBubble from './messagebubble';
import InputBox from './inputbox';

function ChatWindow() {
  const [showDiary, setShowDiary] = useState(false);
  const [diaryText, setDiaryText] = useState('');
  const [savedDiaryEntries, setSavedDiaryEntries] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showBhajans, setShowBhajans] = useState(false);

  const speakText = async (text, voiceId = "ErXwobaYiN019PkySvjV") => {
    const apiKey = "sk_your_elevenlabs_api_key"; // 🔐 Use .env for real apps

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: text,
          voice_settings: {
            stability: 0.4,
            similarity_boost: 0.7
          }
        })
      });

      if (!response.ok) {
        console.error("Voice error:", await response.text());
        return;
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("Voice error:", error);
    }
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

  const fetchDiaryQuote = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/quote");
      const data = await response.json();

      setMessages((prev) => [...prev, { from: 'guru', text: data.quote }]);
      speakText(data.quote);
    } catch (error) {
      console.error("Failed to fetch quote:", error);
    }
  };

  const fetchKrishnaReply = async (diaryText) => {
    try {
      const res = await fetch("http://localhost:5000/api/diary-reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ diaryText }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { from: "user", text: diaryText },
        { from: "guru", text: data.reply }
      ]);
      speakText(data.reply);
    } catch (err) {
      console.error("Failed to fetch reply:", err);
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
        "Shree Premanand Ji says — जब दुनिया साथ छोड़ दे, तब ठाकुर सबसे पास होता है।"
      ],
      anxious: [
        "Surrender your anxiety to me, and I shall give you peace. — Bhagavad Gita 12.15",
        "Indresh Ji Maharaj says — चिन्ता नहीं, चरणों में भरोसा रखो।"
      ],
      lonely: [
        "You are never alone. I reside in your heart, always — Shree Krishna 💙",
        "जहाँ प्रेम है, वहाँ मैं हूँ — प्रेमानंद जी महाराज"
      ],
      overthinking: [
        "Why worry so much? Do your karma, leave results to me — Gita 2.47",
        "मन को स्थिर कर लो, फिर सब सरल हो जाएगा। — Indresh Ji"
      ],
      blank: [
        "Blankness is good. It is space for divine thoughts. Let Krishna fill you now.",
        "Don't fill silence with noise — fill it with remembrance."
      ],
      devotional: [
        "Prema Bhakti is the highest joy — sing Radha Naam, all wounds shall vanish 🌸",
        "प्रेम ही मेरा स्वरूप है — बस उसी में खो जाओ। — ठाकुरजी"
      ]
    };

    const reply = moodReplies[mood][Math.floor(Math.random() * moodReplies[mood].length)];
    setMessages((prev) => [...prev, { from: 'guru', text: reply }]);
    speakText(reply);
  };
  const guruMsg = {
  text: "Jo chhod jaaye, usey yaad karna moh hai...",
  sender: 'guru',
};


  const handleSend = async (text) => {
  if (!text.trim()) return;

  // Show your message
  setMessages((prev) => [...prev, { from: 'user', text }]);

  try {
    // Ask backend for a Krishna reply
    const response = await fetch("http://localhost:5000/api/diary-reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ diaryText: text }),
    });

    const data = await response.json();
    const reply = data.reply;

    // Show Krishna's reply
    setMessages((prev) => [...prev, { from: 'guru', text: reply }]);

    // Speak it
    speakText(reply);
  } catch (error) {
    console.error("Error fetching Krishna reply:", error);
    setMessages((prev) => [...prev, { from: 'guru', text: "🙏 Sorry, I couldn't get a reply right now." }]);
  }
};


  return (
    <div className="chat-window">
      {showDiary && (
        <div className="diary-section">
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
                fetchKrishnaReply(diaryText);
                setDiaryText("");
              } else {
                alert("🕊️ Please write something before saving.");
              }
            }}
            style={{
              backgroundColor: "#b38dff",
              color: "white",
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
              <li key={idx} style={{ marginBottom: "10px", background: "#f9f9f9", padding: "10px", borderRadius: "8px" }}>
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

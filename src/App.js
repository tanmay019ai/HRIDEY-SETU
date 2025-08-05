import React from 'react';
import ChatWindow from './components/chatwindow';
import FairyLights from './components/fairylights';
import './App.css';

function App() {
  return (
    <div className="App">
      <FairyLights />

      {/* Navigation Header */}
      <header className="app-header">
        <h1 className="title">🦚 Hridey Setu 🦚</h1>
        <nav className="nav-tabs">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* Home Section (Chat UI) */}
      <div id="home">
        <ChatWindow />
      </div>

      {/* About Section */}
      <div id="about" className="section">
  <h2>🌸 About Hridey Setu</h2>
  <p>
    Hridey Setu is not just an app — it is a spiritual bridge between your heart and the divine love of Shree Krishna. 
    Born from the idea that emotional pain deserves gentle, meaningful healing, this platform is lovingly created to 
    support those facing heartbreak, loneliness, overthinking, or inner silence.
  </p>
  <p>
    In a world that often feels cold and fast, Hridey Setu stands as a warm, sacred space where you can express 
    your emotions through your diary, receive divine responses inspired by the teachings of <strong>Shree Premanand Ji Maharaj</strong> 
    and <strong>Indresh Ji Maharaj</strong>, and be reminded of the unbreakable bond between you and Thakurji.
  </p>
  <p>
    Each reply you receive is crafted to offer clarity, calmness, and divine insight — not from artificial intelligence 
    alone, but through a spiritual lens. It’s like having Shreeji whisper soft truths into your heart when you need 
    them the most.
  </p>
  <p>
    Hridey Setu also features divine bhajans, soothing quotes, and a collection of spiritual moods — helping you 
    navigate your inner storms and reminding you that the soul’s true peace lies at the feet of the Divine.
  </p>
  <p>
    Whether you're feeling broken, anxious, blank, or deeply devotional, Hridey Setu is your safe space — a digital 
    Vrindavan where Krishna lives in your tears, in your hopes, and in your longing.
  </p>
  <p>
    With glowing fairy lights, soft UI, and a mood-driven heart interface, this is not just another app. 
    It’s <em>your sacred companion</em> in the journey toward healing, surrender, and divine love. 🌷
  </p>
  <p>
    <strong>Hridey Setu — where every emotion is heard, and every tear becomes a prayer. 💖</strong>
  </p>
</div>

      {/* Contact Section */}
      <div id="contact" className="section contact-section">
  <h2>📩 Contact Us</h2>
  <p>
    We'd love to hear from you. Whether it's your suggestions, love, or just sharing your experience with Shreeji — your words matter.
  </p>

  <div className="contact-details">
    <p>
      📧 <strong>Email:</strong> <a href="mailto:yourmail@example.com">yourmail@example.com</a>
    </p>
    <p>
      📷 <strong>Instagram:</strong> <a href="https://instagram.com/hridey.setu" target="_blank" rel="noopener noreferrer">@hridey.setu</a>
    </p>
    <p>
      💌 <strong>Feedback Box:</strong> <a href="https://forms.gle/your-google-form" target="_blank" rel="noopener noreferrer">Submit Feedback</a>
    </p>
  </div>

  <p style={{ marginTop: '20px' }}>
    Let your words flow. Sometimes, just writing to someone who listens — is healing itself. 💫
  </p>
</div>

    </div>
  );
}

export default App;

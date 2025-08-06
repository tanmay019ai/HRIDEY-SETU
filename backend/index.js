require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5050;

app.use(cors());
app.use(express.json());

// 🌼 Base route
app.get('/', (req, res) => {
  res.send('🌼 Hridey Setu Backend is running');
});

// 📜 Premanand Ji quotes
const quotes = [
  "जब दुनिया साथ छोड़ दे, तब ठाकुर सबसे पास होता है।",
  "प्रेम ही मेरा स्वरूप है — बस उसी में खो जाओ।",
  "जो तुम्हें छोड़ दे, उसे मोह समझो... ठाकुर कभी नहीं छोड़ते।",
  "विरह की आग में जो जलता है, उसी के हृदय में ठाकुर प्रकट होते हैं।"
];

// 🎯 Route to get one random quote
app.get('/api/quote', (req, res) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ quote: randomQuote });
});

// ✨ Diary reply endpoint using Mistral 7B (Free/Low-cost)
app.post('/api/diary-reply', async (req, res) => {
  const { diaryText } = req.body;
  console.log("🔑 OpenRouter API Key:", process.env.OPENROUTER_API_KEY);
  console.log("📥 Received diaryText:", diaryText);

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct',  // ✅ updated model
        messages: [
          {
            role: "system",
            content:
  "You are Lord Krishna. Reply compassionately in pure Hindi, using spiritual tone inspired by Shree Premanand Ji Maharaj, Indresh Ji Maharaj, and Bhagavad Gita. Avoid English completely. Respond in simple, emotional Hindi as if consoling a bhakt."

              
          },
          {
            role: "user",
            content: `User wrote: "${diaryText}". Please reply as Krishna would.`
          }
        ],
        temperature: 0.8,
        max_tokens: 500
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000', // replace with frontend domain if deployed
          'X-Title': 'Hridey Setu Diary Chat'
        }
      }
    );

    res.json({ reply: response.data.choices[0].message.content.trim() });
  } catch (err) {
    console.error("❌ OpenRouter error:", err?.response?.data || err.message);
    res.status(500).json({ error: "Failed to get Krishna's reply" });
  }
});

// 🚀 Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai"); // ✅ Works with openai@3.x

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

// ✅ Correct way to configure OpenAI with v3.x
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// ✨ Diary reply endpoint
app.post('/api/diary-reply', async (req, res) => {
  const { diaryText } = req.body;
  console.log("Received diaryText:", diaryText);

  try {
    const prompt = `You are Lord Krishna. Give a peaceful, heart-healing reply to this diary message, using Krishna’s wisdom, Premanand Ji’s bhav, and Bhagavad Gita references.\n\nUser wrote: "${diaryText}"\n\nYour reply:`;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are Lord Krishna providing compassionate, devotional replies." },
        { role: "user", content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 200
    });

    res.json({ reply: completion.data.choices[0].message.content.trim() });
  } catch (error) {
    console.error("❌ OpenAI error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get Krishna's reply" });
  }
});

// 🚀 Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

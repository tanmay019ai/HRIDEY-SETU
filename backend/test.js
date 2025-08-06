const express = require('express');
const app = express();
const PORT = 5050;

app.get('/', (req, res) => {
  res.send('Test OK ✅');
});

app.listen(PORT, () => {
  console.log(`🧪 Test server running at http://localhost:${PORT}`);
});

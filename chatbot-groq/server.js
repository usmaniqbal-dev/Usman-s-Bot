const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const { getGroqReply } = require("./lib/groqChat");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/chat", async (req, res) => {
  const result = await getGroqReply(req.body);
  return res.status(result.status).json(result.body);
});

app.listen(PORT, () => {
  console.log(`Chatbot running at http://localhost:${PORT}`);
});

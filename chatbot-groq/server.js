const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const { getGroqReply } = require("./lib/groqChat");

dotenv.config();

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Chat API route
app.post("/api/chat", async (req, res) => {
  try {
    const result = await getGroqReply(req.body);

    return res.status(result.status).json(result.body);
  } catch (error) {
    console.error("Chat API Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "Running",
    timestamp: new Date().toISOString(),
  });
});

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// Local Development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
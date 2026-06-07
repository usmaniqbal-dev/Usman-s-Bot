const path = require("path");
const dotenv = require("dotenv");

const DEFAULT_MODEL = "llama-3.1-8b-instant";
const PLACEHOLDER_KEY = "USMAN_IQBAL_API_KEY";

dotenv.config({ path: path.join(__dirname, "..", ".env") });
dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });
dotenv.config();

function parseMessage(body) {
  if (!body) {
    return "";
  }

  if (typeof body === "string") {
    try {
      const parsed = JSON.parse(body);
      return typeof parsed?.message === "string" ? parsed.message.trim() : "";
    } catch {
      return "";
    }
  }

  return typeof body?.message === "string" ? body.message.trim() : "";
}

function getGroqApiKey() {
  return process.env.GROQ_API_KEY || process.env.GROQ_KEY || "";
}

function isGroqKeyConfigured() {
  const apiKey = getGroqApiKey();
  return Boolean(apiKey && apiKey !== PLACEHOLDER_KEY);
}

async function getGroqReply(body) {
  const message = parseMessage(body);
  const apiKey = getGroqApiKey();
  const model = process.env.GROQ_MODEL || DEFAULT_MODEL;

  if (!isGroqKeyConfigured()) {
    return {
      status: 500,
      body: {
        error: "Groq API key is missing. Add your real key to GROQ_API_KEY in environment variables."
      }
    };
  }

  if (!message) {
    return {
      status: 400,
      body: { error: "Message is required." }
    };
  }

  try {
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content: "You are a helpful, friendly AI assistant. Keep replies clear and useful."
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 800
      })
    });

    const data = await groqResponse.json();

    if (!groqResponse.ok) {
      return {
        status: groqResponse.status,
        body: {
          error: data?.error?.message || "Groq API request failed."
        }
      };
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return {
        status: 502,
        body: { error: "Groq API returned an empty response." }
      };
    }

    return {
      status: 200,
      body: { reply }
    };
  } catch (error) {
    console.error("Groq chat error:", error);
    return {
      status: 500,
      body: { error: "Something went wrong while contacting the AI service." }
    };
  }
}

module.exports = {
  getGroqReply,
  isGroqKeyConfigured
};

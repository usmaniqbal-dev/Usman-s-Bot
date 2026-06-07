const { getGroqReply } = require("../lib/groqChat");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const result = await getGroqReply(req.body);
  return res.status(result.status).json(result.body);
};

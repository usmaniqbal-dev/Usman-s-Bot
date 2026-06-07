const { isGroqKeyConfigured } = require("../lib/groqChat");

module.exports = function handler(req, res) {
  return res.status(200).json({
    success: true,
    status: "Running",
    groqKeyConfigured: isGroqKeyConfigured(),
    timestamp: new Date().toISOString()
  });
};

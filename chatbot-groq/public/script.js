const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const messages = document.getElementById("messages");
const sendButton = document.getElementById("sendButton");
const clearChatButton = document.getElementById("clearChat");

const welcomeMessage = "Hi! Ask me anything and I will reply using Groq.";
const messageInputMaxHeight = 190;

function scrollToBottom() {
  messages.scrollTop = messages.scrollHeight;
}

function resizeMessageInput() {
  messageInput.style.height = "auto";
  const nextHeight = Math.min(messageInput.scrollHeight, messageInputMaxHeight);
  messageInput.style.height = `${nextHeight}px`;
  messageInput.style.overflowY = messageInput.scrollHeight > messageInputMaxHeight ? "auto" : "hidden";
}

function createMessageElement(role, content, options = {}) {
  const message = document.createElement("article");
  message.className = `message ${role}${options.error ? " error" : ""}`;

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = role === "user" ? "You" : "AI";

  const bubble = document.createElement("div");
  bubble.className = "bubble";

  if (options.loading) {
    bubble.innerHTML = '<span class="typing" aria-label="AI is typing"><span></span><span></span><span></span></span>';
  } else {
    bubble.textContent = content;
  }

  message.append(avatar, bubble);
  return message;
}

function addMessage(role, content, options) {
  const message = createMessageElement(role, content, options);
  messages.appendChild(message);
  scrollToBottom();
  return message;
}

function setFormDisabled(disabled) {
  messageInput.disabled = disabled;
  sendButton.disabled = disabled;
  sendButton.textContent = disabled ? "Sending..." : "Send";
}

async function sendMessage(message) {
  addMessage("user", message);
  const loadingMessage = addMessage("bot", "", { loading: true });
  setFormDisabled(true);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "AI request failed.");
    }

    loadingMessage.replaceWith(createMessageElement("bot", data.reply));
  } catch (error) {
    loadingMessage.replaceWith(
      createMessageElement("bot", error.message || "Something went wrong.", { error: true })
    );
  } finally {
    setFormDisabled(false);
    resizeMessageInput();
    messageInput.focus();
    scrollToBottom();
  }
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const message = messageInput.value.trim();

  if (!message) {
    return;
  }

  messageInput.value = "";
  resizeMessageInput();
  sendMessage(message);
});

messageInput.addEventListener("input", resizeMessageInput);

messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    chatForm.requestSubmit();
  }
});

clearChatButton.addEventListener("click", () => {
  messages.innerHTML = "";
  addMessage("bot", welcomeMessage);
  messageInput.value = "";
  resizeMessageInput();
  messageInput.focus();
});

resizeMessageInput();

# Groq AI Chatbot

Simple responsive AI chatbot website using HTML, CSS, JavaScript, Node.js, Express, and Groq Cloud API.

## Installation

```bash
npm install
```

If PowerShell blocks `npm`, use:

```bash
npm.cmd install
```

## Add Groq API Key

For local development, open `.env` and replace the placeholder value with your real Groq API key:

```env
GROQ_API_KEY="your_real_groq_api_key_here"
GROQ_MODEL="llama-3.1-8b-instant"
PORT=3000
```

## Run

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

## Development Mode

```bash
npm run dev
```

## Deploy on Vercel

### Option 1: Vercel Dashboard

1. Push this project to GitHub.
2. Open Vercel and click `Add New Project`.
3. Import the GitHub repository.
4. Keep the default framework setting as `Other`.
5. Add Environment Variables:

```env
GROQ_API_KEY=your_real_groq_api_key_here
GROQ_MODEL=llama-3.1-8b-instant
```

6. Click `Deploy`.

### Option 2: Vercel CLI

Install Vercel CLI:

```bash
npm install -g vercel
```

Login:

```bash
vercel login
```

Deploy:

```bash
vercel
```

Add production environment variables:

```bash
vercel env add GROQ_API_KEY production
vercel env add GROQ_MODEL production
```

Deploy to production:

```bash
vercel --prod
```

## Vercel Notes

- Do not add your real Groq key to frontend JavaScript.
- Do not commit `.env`.
- The frontend calls `/api/chat`.
- On Vercel, `/api/chat` runs from `api/chat.js` as a serverless function.
- Locally, `/api/chat` runs from `server.js` through Express.

## Project Structure

```text
chatbot-groq/
  api/
    chat.js
  lib/
    groqChat.js
  public/
    index.html
    style.css
    script.js
  server.js
  package.json
  .env
  .env.example
  vercel.json
```

# Vercel Deploy Quick Guide

## Best Upload Method

Upload the full `CHAT_BOT` folder to GitHub, then import it in Vercel.

## Vercel Settings

- Framework Preset: `Other`
- Root Directory: leave empty if you uploaded the full `CHAT_BOT` folder
- Build Command: `npm run build`
- Output Directory: leave empty
- Install Command: `npm install`

## Environment Variables

Add these in Vercel Project Settings > Environment Variables:

```env
GROQ_API_KEY=your_real_groq_api_key_here
GROQ_MODEL=llama-3.1-8b-instant
```

Do not upload your real `.env` file.

## Deploy

After adding environment variables, click `Deploy`.

## Local Test

```bash
cd chatbot-groq
npm install
npm start
```

Open:

```text
http://localhost:3000
```

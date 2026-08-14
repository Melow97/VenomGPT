# Venom GPT

Initial GitHub-ready scaffold for the Venom GPT website.

## Stack
- Frontend: current approved Venom GPT landing UI
- Auth/database: Supabase
- Google Sign-In: Google OAuth via Supabase Auth
- Email/newsletter: Resend + Supabase
- Hosting/API: Cloudflare Pages + Pages Functions
- Local AI during development: Ollama
- Later payments: Revolut Merchant / webhooks

## Owner test configuration
- Owner email: `melozturk00@gmail.com`
- Owner role is assigned server-side/database-side after successful authentication.

## Important
This repository contains configuration placeholders only. No production secrets are included. Keep Google secrets, Supabase service-role keys, AI provider keys, Revolut secrets and webhook secrets out of GitHub.
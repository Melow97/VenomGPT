# Venom GPT — Live Google Sign-In

## Project
Supabase URL:
https://dqqqagpsaaalsztblmsc.supabase.co

Supabase callback URL for Google OAuth:
https://dqqqagpsaaalsztblmsc.supabase.co/auth/v1/callback

Owner test email:
melozturk00@gmail.com

## One required manual step
Create a Google OAuth Web Application in Google Cloud and add:

Authorized JavaScript origin (local):
http://localhost:3000

Authorized redirect URI:
https://dqqqagpsaaalsztblmsc.supabase.co/auth/v1/callback

Then copy the Google Client ID and Client Secret into the Supabase Dashboard under Authentication → Providers → Google.

Do not commit the Client Secret to GitHub. Put server-only secrets in Cloudflare environment variables.

## Venom auth behavior
After Supabase authentication, the database trigger assigns:
- melozturk00@gmail.com → role=owner, plan=pro
- all other new users → role=user, plan=free

The public UI should remain the approved Venom GPT design. Authentication should only replace the dummy login behavior; do not redesign the landing page.

## Later
GitHub sign-in, additional app connectors, Cloudflare connectors, and other OAuth integrations can be added after Google authentication is stable.
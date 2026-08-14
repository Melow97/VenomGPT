# Venom GPT local test

From the project folder, serve `public/` locally:

```powershell
cd .\public
python -m http.server 3000
```

Then open `http://localhost:3000`.

The current public UI is intentionally kept aligned with the approved Venom GPT landing design. Authentication remains a demo until the Supabase Google provider is connected.

Production direction:

GitHub -> Cloudflare Pages -> Supabase Auth/DB -> server-side AI/payment integrations.

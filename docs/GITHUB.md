# GitHub upload

Recommended first repository:
  venom-gpt

From the project folder:

  git init
  git add .
  git commit -m "Initial Venom GPT scaffold"
  git branch -M main
  git remote add origin https://github.com/YOUR_USERNAME/venom-gpt.git
  git push -u origin main

Or use GitHub CLI:
  gh repo create venom-gpt --private --source . --remote origin --push

Keep the repository private while backend/auth/payments are being built.
Never commit .env files, API keys, OAuth secrets, service role keys,
Revolut secret keys or webhook secrets.

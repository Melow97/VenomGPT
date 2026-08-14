# Automatic email + newsletter plan

Recommended split:

Authentication:
  Supabase Auth handles login confirmation / auth-related emails.

Product emails:
  Resend handles Venom GPT welcome emails, onboarding, receipts,
  product announcements and transactional mail.

Newsletter:
  Store subscribers in newsletter_subscribers.
  Use double opt-in for marketing mail.
  Add an unsubscribe link to every marketing email.
  Do not automatically subscribe a user to the newsletter just because
  they signed in with Google.

First login:
  1. Google login succeeds.
  2. Backend creates/updates profiles.
  3. Backend queues a welcome email.
  4. If the user opted into the newsletter, send a confirmation email.

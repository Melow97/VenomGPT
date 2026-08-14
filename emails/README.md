# Venom GPT email templates

Templates:
- `welcome.html` — standard first account welcome.
- `first-user.html` — special early-community message for the first signups.
- `pro-receipt.html` — €20/month Pro payment confirmation.

Placeholders such as `{{name}}`, `{{login_url}}`, `{{receipt_reference}}`, and `{{payment_date}}` are filled server-side.

## Receipt references
Generate the payment receipt reference only after the payment provider confirms the transaction. Keep it server-side, for example `VNG-2026-8F4K2M7Q`. Do not accept a receipt reference supplied by the browser.

## Sending
The templates are designed to be sent through Resend using `RESEND_API_KEY` stored as a server-side secret. Do not place the key in GitHub or frontend JavaScript.

## First-user logic
The special early-user email should be triggered only for the first account(s) according to a server-side count or a dedicated launch cohort flag. Avoid checking this in browser code because concurrent signups can race.

# Google Sign-In checklist

1. Create a Google Cloud project.
2. Configure Google Auth Platform / OAuth consent screen.
3. Create an OAuth client with type Web application.
4. Add your local origin, for example http://localhost:5173.
5. Add the Supabase callback URI shown in Supabase Authentication > Providers > Google.
6. Copy the Google Client ID + Client Secret into Supabase's Google provider settings.
7. In Supabase Authentication > URL Configuration, add:
   - your local callback / redirect URL
   - your production site URL
8. In frontend code call Supabase auth.signInWithOAuth({ provider: 'google', options: { redirectTo: YOUR_REDIRECT_URL } }).
9. On first login, create/update a row in public.profiles from auth.users.
10. Determine owner/admin role on the server/database; do not trust the browser.

First-time users should land in the Free plan by default.
Owner account should be promoted to role='owner' in the database.

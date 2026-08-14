export async function onRequestPost({ request, env }) {
  const { email, source = "website" } = await request.json();

  if (!email || !email.includes("@")) {
    return new Response(JSON.stringify({ error: "Valid email required" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }

  // Production: call Supabase with the server-side service key, then
  // call Resend with RESEND_API_KEY to send a double-opt-in confirmation.
  // Keep all secrets in Cloudflare environment variables.
  return new Response(JSON.stringify({
    ok: true,
    status: "pending",
    email,
    source
  }), {
    headers: { "content-type": "application/json" }
  });
}

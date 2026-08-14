export async function onRequestPost({ request, env }) {
  const { email, name = "there" } = await request.json();

  if (!email || !email.includes("@")) {
    return new Response(JSON.stringify({ error: "Valid email required" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }

  // Production: send through Resend using RESEND_API_KEY from
  // Cloudflare environment variables. Never put the key in frontend code.
  return new Response(JSON.stringify({
    ok: true,
    queued: true,
    email,
    message: `Welcome email queued for ${name}`
  }), {
    headers: { "content-type": "application/json" }
  });
}

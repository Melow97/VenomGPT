export async function onRequestPost({ request, env }) {
  if (!env.REVOLUT_SECRET_KEY) {
    return new Response(JSON.stringify({ error: 'Revolut checkout is not configured. Add REVOLUT_SECRET_KEY to the server environment.' }), { status: 503, headers: { 'content-type': 'application/json' } });
  }

  let body = {};
  try { body = await request.json(); } catch (_) {}
  const plan = body.plan === 'pro' ? 'pro' : null;
  if (!plan) return new Response(JSON.stringify({ error: 'Unknown plan' }), { status: 400, headers: { 'content-type': 'application/json' } });

  const origin = new URL(request.url).origin;
  const response = await fetch('https://merchant.revolut.com/api/orders', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${env.REVOLUT_SECRET_KEY}`,
      'Revolut-Api-Version': '2026-04-20',
      'Idempotency-Key': crypto.randomUUID()
    },
    body: JSON.stringify({
      amount: 2000,
      currency: 'EUR',
      description: 'Venom GPT Pro — monthly plan',
      redirect_url: `${origin}/?payment=revolut-success`
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.checkout_url) {
    return new Response(JSON.stringify({ error: data.message || data.error || 'Revolut order creation failed' }), { status: 502, headers: { 'content-type': 'application/json' } });
  }

  return new Response(JSON.stringify({ ok: true, checkout_url: data.checkout_url, order_id: data.id, token: data.token }), { headers: { 'content-type': 'application/json' } });
}

async function getUser(request, env) {
  const auth = request.headers.get('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!token || !env.SUPABASE_SERVICE_ROLE_KEY) return null;
  const supabaseUrl = env.SUPABASE_URL || 'https://dqqqagpsaaalsztblmsc.supabase.co';
  const r = await fetch(`${supabaseUrl}/auth/v1/user`, { headers: { apikey: env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${token}` } });
  if (!r.ok) return null;
  return await r.json();
}

export async function onRequestPost({ request, env }) {
  if (!env.REVOLUT_SECRET_KEY || !env.SUPABASE_SERVICE_ROLE_KEY) {
    return new Response(JSON.stringify({ error: 'Payment service is not configured on the server.' }), { status: 503, headers: { 'content-type': 'application/json' } });
  }

  const user = await getUser(request, env);
  if (!user?.id) return new Response(JSON.stringify({ error: 'Sign in before upgrading.' }), { status: 401, headers: { 'content-type': 'application/json' } });

  let body = {};
  try { body = await request.json(); } catch (_) {}
  if (body.plan !== 'pro') return new Response(JSON.stringify({ error: 'Unknown plan' }), { status: 400, headers: { 'content-type': 'application/json' } });

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
      merchant_order_data: { reference: `VENOM-PRO-${user.id}` },
      metadata: { user_id: user.id, plan: 'pro', email: user.email || '' },
      redirect_url: `${origin}/?payment=revolut-success`
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.checkout_url) {
    return new Response(JSON.stringify({ error: data.message || data.error || 'Revolut order creation failed' }), { status: 502, headers: { 'content-type': 'application/json' } });
  }

  return new Response(JSON.stringify({ ok: true, checkout_url: data.checkout_url, order_id: data.id, token: data.token }), { headers: { 'content-type': 'application/json' } });
}

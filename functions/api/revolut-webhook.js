function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function hmac(secret, message) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const bytes = new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message)));
  return Array.from(bytes).map(x => x.toString(16).padStart(2, '0')).join('');
}

async function setPro(env, userId) {
  const supabaseUrl = env.SUPABASE_URL || 'https://dqqqagpsaaalsztblmsc.supabase.co';
  const r = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}`, {
    method: 'PATCH',
    headers: { apikey: env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`, 'content-type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({ plan: 'pro' })
  });
  if (!r.ok) throw new Error(`Supabase profile update failed: ${r.status}`);
}

export async function onRequestPost({ request, env }) {
  if (!env.REVOLUT_WEBHOOK_SECRET || !env.REVOLUT_SECRET_KEY || !env.SUPABASE_SERVICE_ROLE_KEY) return new Response('Webhook not configured', { status: 503 });
  const raw = await request.text();
  const timestamp = request.headers.get('Revolut-Request-Timestamp') || '';
  const signature = request.headers.get('Revolut-Signature') || '';
  const ts = Number(timestamp);
  if (!timestamp || !Number.isFinite(ts) || Math.abs(Date.now() - ts) > 5 * 60 * 1000) return new Response('Invalid timestamp', { status: 401 });
  const expected = 'v1=' + await hmac(env.REVOLUT_WEBHOOK_SECRET, `v1.${timestamp}.${raw}`);
  const valid = signature.split(',').some(item => timingSafeEqual(item.trim(), expected));
  if (!valid) return new Response('Invalid signature', { status: 401 });

  let event = {};
  try { event = JSON.parse(raw); } catch (_) { return new Response('Invalid JSON', { status: 400 }); }
  if (event.event !== 'ORDER_COMPLETED') return new Response('OK');

  const orderId = event.order_id || event.data?.id || event.data?.order_id;
  if (!orderId) return new Response('Missing order id', { status: 400 });

  const orderResponse = await fetch(`https://merchant.revolut.com/api/orders/${encodeURIComponent(orderId)}`, {
    headers: { Authorization: `Bearer ${env.REVOLUT_SECRET_KEY}`, 'Revolut-Api-Version': '2026-04-20' }
  });
  const order = await orderResponse.json().catch(() => ({}));
  if (!orderResponse.ok || order.state !== 'completed') return new Response('Order not completed', { status: 409 });
  if (order.currency !== 'EUR' || Number(order.amount) !== 2000 || order.metadata?.plan !== 'pro') return new Response('Order validation failed', { status: 400 });

  await setPro(env, order.metadata.user_id);
  return new Response('OK');
}

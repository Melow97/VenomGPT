const PLANS = {
  plus: { price: 'price_1U52TcJ5QBix9Fh0UbrrQuID', label: 'Venom GPT Plus' },
  pro: { price: 'price_1U52UFJ5QBix9Fh0HxDPbZBh', label: 'Venom Pro' },
};

async function getUser(request, env) {
  const auth = request.headers.get('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!token || !env.SUPABASE_SERVICE_ROLE_KEY) return null;
  const supabaseUrl = env.SUPABASE_URL || 'https://dqqqagpsaaalsztblmsc.supabase.co';
  const r = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: { apikey: env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${token}` },
  });
  if (!r.ok) return null;
  return await r.json();
}

function response(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}

export async function onRequestPost({ request, env }) {
  if (!env.STRIPE_SECRET_KEY) return response({ error: 'Stripe is not configured on the production worker yet.' }, 503);
  if (!env.SUPABASE_SERVICE_ROLE_KEY) return response({ error: 'Authentication service is not configured on the production worker.' }, 503);

  const user = await getUser(request, env);
  if (!user?.id) return response({ error: 'Sign in before upgrading.', code: 'AUTH_REQUIRED' }, 401);

  let body = {};
  try { body = await request.json(); } catch (_) {}
  const plan = PLANS[body.plan];
  if (!plan) return response({ error: 'Unknown plan.' }, 400);

  const origin = new URL(request.url).origin;
  const form = new URLSearchParams();
  form.set('mode', 'subscription');
  form.set('line_items[0][price]', plan.price);
  form.set('line_items[0][quantity]', '1');
  form.set('success_url', `${origin}/?payment=stripe-success&plan=${body.plan}`);
  form.set('cancel_url', `${origin}/?payment=stripe-cancelled&plan=${body.plan}`);
  form.set('customer_email', user.email || '');
  form.set('client_reference_id', user.id);
  form.set('metadata[user_id]', user.id);
  form.set('metadata[plan]', body.plan);
  form.set('subscription_data[metadata][user_id]', user.id);
  form.set('subscription_data[metadata][plan]', body.plan);

  const r = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      'content-type': 'application/x-www-form-urlencoded',
      'Idempotency-Key': `venom-checkout-${user.id}-${body.plan}-${Date.now()}`,
    },
    body: form,
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok || !data.url) return response({ error: data.error?.message || 'Stripe Checkout could not be created.' }, 502);
  return response({ ok: true, checkout_url: data.url, plan: body.plan, product: plan.label });
}

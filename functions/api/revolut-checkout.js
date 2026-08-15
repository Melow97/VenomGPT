async function getUser(request, env) {
  const auth = request.headers.get('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!token || !env.SUPABASE_SERVICE_ROLE_KEY) return null;
  const supabaseUrl = env.SUPABASE_URL || 'https://dqqqagpsaaalsztblmsc.supabase.co';
  const r = await fetch(`${supabaseUrl}/auth/v1/user`, { headers: { apikey: env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${token}` } });
  if (!r.ok) return null;
  return await r.json();
}

async function supabaseProfile(env, userId) {
  const url = env.SUPABASE_URL || 'https://dqqqagpsaaalsztblmsc.supabase.co';
  const r = await fetch(`${url}/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}&select=id,email,full_name,revolut_customer_id`, {
    headers: { apikey: env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}` }
  });
  if (!r.ok) throw new Error(`Supabase profile lookup failed: ${r.status}`);
  const rows = await r.json();
  return rows[0] || null;
}

async function saveBilling(env, userId, patch) {
  const url = env.SUPABASE_URL || 'https://dqqqagpsaaalsztblmsc.supabase.co';
  const r = await fetch(`${url}/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}`, {
    method: 'PATCH', headers: { apikey: env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`, 'content-type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({ ...patch, billing_updated_at: new Date().toISOString() })
  });
  if (!r.ok) throw new Error(`Supabase billing update failed: ${r.status}`);
}

async function revolutCustomer(env, profile, user) {
  if (profile?.revolut_customer_id) return profile.revolut_customer_id;
  const r = await fetch('https://merchant.revolut.com/api/customers', {
    method: 'POST', headers: { 'content-type': 'application/json', Authorization: `Bearer ${env.REVOLUT_SECRET_KEY}`, 'Revolut-Api-Version': '2026-04-20', 'Idempotency-Key': `venom-customer-${user.id}` },
    body: JSON.stringify({ email: user.email, full_name: profile?.full_name || user.user_metadata?.full_name || user.email })
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok || !data.id) throw new Error(data.message || data.error || 'Could not create Revolut customer');
  await saveBilling(env, user.id, { revolut_customer_id: data.id });
  return data.id;
}

async function setupSubscription(env, user, profile, plan, variationId, origin) {
  const customerId = await revolutCustomer(env, profile, user);
  const r = await fetch('https://merchant.revolut.com/api/subscriptions', {
    method: 'POST', headers: { 'content-type': 'application/json', Authorization: `Bearer ${env.REVOLUT_SECRET_KEY}`, 'Revolut-Api-Version': '2026-04-20', 'Idempotency-Key': `venom-sub-${user.id}-${plan}` },
    body: JSON.stringify({ plan_variation_id: variationId, customer_id: customerId, setup_order_redirect_url: `${origin}/?payment=revolut-success&plan=${plan}`, external_reference: `VENOM-${plan.toUpperCase()}-${user.id}` })
  });
  const sub = await r.json().catch(() => ({}));
  if (!r.ok || !sub.id || !sub.setup_order_id) throw new Error(sub.message || sub.error || 'Could not create Revolut subscription');
  await saveBilling(env, user.id, { revolut_subscription_id: sub.id, billing_plan: plan, billing_status: sub.state || 'pending' });

  const orderR = await fetch(`https://merchant.revolut.com/api/orders/${encodeURIComponent(sub.setup_order_id)}`, { headers: { Authorization: `Bearer ${env.REVOLUT_SECRET_KEY}`, 'Revolut-Api-Version': '2026-04-20' } });
  const order = await orderR.json().catch(() => ({}));
  if (!orderR.ok || !order.checkout_url) throw new Error('Revolut setup checkout is unavailable');
  return { checkout_url: order.checkout_url, order_id: sub.setup_order_id, subscription_id: sub.id, plan, recurring: true };
}

export async function onRequestPost({ request, env }) {
  if (!env.REVOLUT_SECRET_KEY || !env.SUPABASE_SERVICE_ROLE_KEY) return new Response(JSON.stringify({ error: 'Payment service is not configured on the server.' }), { status: 503, headers: { 'content-type': 'application/json' } });
  const user = await getUser(request, env);
  if (!user?.id) return new Response(JSON.stringify({ error: 'Sign in before upgrading.' }), { status: 401, headers: { 'content-type': 'application/json' } });
  let body = {}; try { body = await request.json(); } catch (_) {}
  const plan = body.plan === 'annual' ? 'annual' : body.plan === 'pro' ? 'pro' : null;
  if (!plan) return new Response(JSON.stringify({ error: 'Unknown plan' }), { status: 400, headers: { 'content-type': 'application/json' } });

  const profile = await supabaseProfile(env, user.id);
  const variationId = plan === 'annual' ? env.REVOLUT_ANNUAL_VARIATION_ID : env.REVOLUT_MONTHLY_VARIATION_ID;
  const origin = new URL(request.url).origin;

  if (variationId) {
    try {
      const result = await setupSubscription(env, user, profile, plan, variationId, origin);
      return new Response(JSON.stringify({ ok: true, ...result }), { headers: { 'content-type': 'application/json' } });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message || 'Subscription setup failed' }), { status: 502, headers: { 'content-type': 'application/json' } });
    }
  }

  // Safe fallback until the Revolut subscription variation IDs are configured.
  const amount = plan === 'annual' ? 23000 : 2000;
  const description = plan === 'annual' ? 'Venom GPT Pro — annual plan' : 'Venom GPT Pro — monthly plan';
  const response = await fetch('https://merchant.revolut.com/api/orders', { method: 'POST', headers: { 'content-type': 'application/json', Authorization: `Bearer ${env.REVOLUT_SECRET_KEY}`, 'Revolut-Api-Version': '2026-04-20', 'Idempotency-Key': crypto.randomUUID() }, body: JSON.stringify({ amount, currency: 'EUR', description, merchant_order_data: { reference: `VENOM-${plan.toUpperCase()}-${user.id}` }, metadata: { user_id: user.id, plan, email: user.email || '' }, redirect_url: `${origin}/?payment=revolut-success&plan=${plan}` }) });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.checkout_url) return new Response(JSON.stringify({ error: data.message || data.error || 'Revolut order creation failed' }), { status: 502, headers: { 'content-type': 'application/json' } });
  return new Response(JSON.stringify({ ok: true, checkout_url: data.checkout_url, order_id: data.id, token: data.token, plan, recurring: false, configuration_required: true }), { headers: { 'content-type': 'application/json' } });
}

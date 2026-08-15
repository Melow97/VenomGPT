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

async function setBilling(env, userId, patch) {
  const supabaseUrl = env.SUPABASE_URL || 'https://dqqqagpsaaalsztblmsc.supabase.co';
  const r = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}`, {
    method: 'PATCH', headers: { apikey: env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`, 'content-type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({ ...patch, billing_updated_at: new Date().toISOString() })
  });
  if (!r.ok) throw new Error(`Supabase profile update failed: ${r.status}`);
}

function userIdFromReference(ref) {
  const m = String(ref || '').match(/^VENOM-(?:PRO|MONTHLY|ANNUAL)-([0-9a-f-]{20,})$/i);
  return m?.[1] || null;
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>\"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '\"':'&quot;', "'":'&#39;' }[c]));
}

async function sendReceipt(env, { to, name, reference, plan, amount, currency, date }) {
  if (!env.RESEND_API_KEY || !to) return false;
  const from = env.RESEND_FROM || 'Venom GPT <receipts@venomgpt.com>';
  const subject = `Venom GPT Pro payment receipt · ${reference}`;
  const billing = plan === 'annual' ? 'Annual' : 'Monthly';
  const html = `<!doctype html><html><body style="margin:0;background:#080b0c;color:#eee7d8;font-family:Arial,sans-serif"><div style="max-width:620px;margin:0 auto;padding:36px 24px"><div style="font-size:24px;font-weight:900">VENOM <span style="color:#39c0b8">GPT</span></div><div style="margin-top:28px;padding:26px;border:1px solid #334445;border-radius:14px;background:#0b1315"><div style="font:11px monospace;color:#55d8d0">VENOMGPT PRO · PAYMENT CONFIRMED</div><h1 style="font-size:28px;margin:12px 0">Thanks for upgrading, ${escapeHtml(name || 'there')}.</h1><p style="font-size:14px;line-height:1.7;color:#9aa6a3">Your Pro payment was confirmed by the payment provider. Keep this email for your records.</p><div style="margin-top:18px;padding:14px;border:1px solid #263739;border-radius:9px;background:#091012"><p style="margin:7px 0;font-size:12px"><b>Receipt reference:</b> ${escapeHtml(reference)}</p><p style="margin:7px 0;font-size:12px"><b>Plan:</b> Venom GPT Pro</p><p style="margin:7px 0;font-size:12px"><b>Amount:</b> ${escapeHtml(currency)} ${(Number(amount || 0)/100).toFixed(2)}</p><p style="margin:7px 0;font-size:12px"><b>Billing:</b> ${billing}</p><p style="margin:7px 0;font-size:12px"><b>Date:</b> ${escapeHtml(date)}</p></div><a href="${escapeHtml(env.PUBLIC_APP_URL || 'https://venomgp.mel-m-ozturk.workers.dev/') }" style="display:inline-block;margin-top:18px;padding:12px 18px;border-radius:8px;background:#d95a36;color:#fff;text-decoration:none;font-weight:800">OPEN PRO WORKSPACE</a><p style="font-size:10px;line-height:1.6;color:#687572;margin-top:22px">This receipt is generated only after the payment provider confirms the transaction. Reference: ${escapeHtml(reference)}</p></div></div></body></html>`;
  const r = await fetch('https://api.resend.com/emails', { method:'POST', headers:{ Authorization:`Bearer ${env.RESEND_API_KEY}`, 'content-type':'application/json' }, body:JSON.stringify({ from, to:[to], subject, html }) });
  return r.ok;
}

export async function onRequestPost({ request, env }) {
  if (!env.REVOLUT_WEBHOOK_SECRET || !env.REVOLUT_SECRET_KEY || !env.SUPABASE_SERVICE_ROLE_KEY) return new Response('Webhook not configured', { status: 503 });
  const raw = await request.text();
  const timestamp = request.headers.get('Revolut-Request-Timestamp') || '';
  const signature = request.headers.get('Revolut-Signature') || '';
  const ts = Number(timestamp);
  if (!timestamp || !Number.isFinite(ts) || Math.abs(Date.now() - ts) > 5 * 60 * 1000) return new Response('Invalid timestamp', { status: 401 });
  const expected = 'v1=' + await hmac(env.REVOLUT_WEBHOOK_SECRET, `v1.${timestamp}.${raw}`);
  if (!signature.split(',').some(item => timingSafeEqual(item.trim(), expected))) return new Response('Invalid signature', { status: 401 });

  let event = {};
  try { event = JSON.parse(raw); } catch (_) { return new Response('Invalid JSON', { status: 400 }); }
  if (event.event !== 'ORDER_COMPLETED') return new Response('OK');
  const orderId = event.order_id || event.data?.id || event.data?.order_id;
  if (!orderId) return new Response('Missing order id', { status: 400 });

  const orderResponse = await fetch(`https://merchant.revolut.com/api/orders/${encodeURIComponent(orderId)}`, { headers: { Authorization: `Bearer ${env.REVOLUT_SECRET_KEY}`, 'Revolut-Api-Version': '2026-04-20' } });
  const order = await orderResponse.json().catch(() => ({}));
  if (!orderResponse.ok || order.state !== 'completed') return new Response('Order not completed', { status: 409 });

  const plan = order.metadata?.plan || (Number(order.amount) === 23000 ? 'annual' : Number(order.amount) === 2000 ? 'pro' : null);
  const userId = order.metadata?.user_id || userIdFromReference(order.merchant_order_ext_ref || order.merchant_order_data?.reference || event.merchant_order_ext_ref);
  const validAmount = plan === 'annual' ? Number(order.amount) === 23000 : plan === 'pro' ? Number(order.amount) === 2000 : false;
  if (order.currency !== 'EUR' || !validAmount || !userId) return new Response('Order validation failed', { status: 400 });

  const reference = `VENOM-${String(plan).toUpperCase()}-${orderId}`;
  await setBilling(env, userId, { plan: 'pro', billing_plan: plan, billing_status: 'active', payment_reference: reference });

  const email = order.metadata?.email || '';
  if (email) {
    await sendReceipt(env, {
      to: email,
      name: order.metadata?.full_name || email.split('@')[0],
      reference,
      plan,
      amount: order.amount,
      currency: order.currency,
      date: new Date().toISOString()
    }).catch(() => false);
  }
  return new Response('OK');
}

const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

function cleanMessages(messages) {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter(m => m && (m.role === 'user' || m.role === 'assistant' || m.role === 'system') && typeof m.content === 'string')
    .slice(-40)
    .map(m => ({ role: m.role, content: m.content.slice(0, 12000) }));
}

async function callOllama(messages, env) {
  const base = (env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434').replace(/\/$/, '');
  const model = env.OLLAMA_MODEL || 'llama3.2';
  const r = await fetch(`${base}/api/chat`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ model, messages, stream: false })
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || `Ollama returned HTTP ${r.status}`);
  return data?.message?.content || '';
}

async function callOpenAI(messages, env) {
  const key = env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY is not configured');
  const base = (env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
  const model = env.OPENAI_MODEL || 'gpt-4o-mini';
  const r = await fetch(`${base}/chat/completions`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
    body: JSON.stringify({ model, messages, temperature: 0.7 })
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data?.error?.message || `AI provider returned HTTP ${r.status}`);
  return data?.choices?.[0]?.message?.content || '';
}

async function callWorkersAI(messages, env) {
  if (!env.AI) throw new Error('Workers AI binding is not configured');
  const model = env.WORKERS_AI_MODEL || '@cf/meta/llama-3.1-8b-instruct';
  const prompt = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n') + '\n\nASSISTANT:';
  const result = await env.AI.run(model, { prompt });
  return result?.response || '';
}

export async function onRequestPost({ request, env }) {
  let body = {};
  try { body = await request.json(); } catch (_) { return json({ error: 'Invalid JSON body' }, 400); }

  const messages = cleanMessages(body.messages);
  if (!messages.length) return json({ error: 'At least one message is required' }, 400);

  try {
    let reply = '';
    const provider = env.AI ? 'workers-ai' : env.OPENAI_API_KEY ? 'openai' : 'ollama';
    if (provider === 'workers-ai') reply = await callWorkersAI(messages, env);
    else if (provider === 'openai') reply = await callOpenAI(messages, env);
    else reply = await callOllama(messages, env);

    if (!reply) return json({ error: 'AI provider returned an empty response' }, 502);
    return json({ ok: true, reply, provider });
  } catch (e) {
    console.error('[VENOM /api/chat]', e);
    return json({ error: e?.message || 'AI request failed' }, 502);
  }
}

export function onRequestOptions() {
  return new Response(null, { status: 204 });
}

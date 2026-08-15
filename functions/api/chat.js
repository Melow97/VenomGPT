const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

const VENOM_SYSTEM = `You are VenomGPT, a capable AI assistant inside the VenomGPT workspace. Give direct, useful, well-structured answers. Match the user's requested level of detail. Prefer concrete steps, examples, tables, and concise summaries when they improve the answer. Do not invent facts. When web research is available, use it for freshness-sensitive questions and distinguish verified current information from general knowledge. If sources are available, ground current claims in them. Never claim to have browsed when web research was not actually used.`;

function cleanMessages(messages) {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter(m => m && (m.role === 'user' || m.role === 'assistant' || m.role === 'system') && typeof m.content === 'string')
    .slice(-40)
    .map(m => ({ role: m.role, content: m.content.slice(0, 12000) }));
}

function buildMessages(messages) {
  const hasSystem = messages.some(m => m.role === 'system');
  return hasSystem ? messages : [{ role: 'system', content: VENOM_SYSTEM }, ...messages];
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 30000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } catch (e) {
    if (e?.name === 'AbortError') throw new Error(`AI provider timed out after ${timeoutMs / 1000}s`);
    throw e;
  } finally {
    clearTimeout(timer);
  }
}

async function callOllama(messages, env) {
  const base = (env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434').replace(/\/$/, '');
  const model = env.OLLAMA_MODEL || 'llama3.2';
  const r = await fetchWithTimeout(`${base}/api/chat`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ model, messages, stream: false })
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || `Ollama returned HTTP ${r.status}`);
  return { reply: data?.message?.content || '', sources: [] };
}

async function callOpenAIChat(messages, env) {
  const key = env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY is not configured');
  const base = (env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
  const model = env.OPENAI_MODEL || 'gpt-4o-mini';
  const r = await fetchWithTimeout(`${base}/chat/completions`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
    body: JSON.stringify({ model, messages, temperature: 0.7 })
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data?.error?.message || `OpenAI returned HTTP ${r.status}`);
  return { reply: data?.choices?.[0]?.message?.content || '', sources: [] };
}

function extractSources(response) {
  const found = [];
  const seen = new Set();
  const walk = value => {
    if (!value || found.length >= 10) return;
    if (Array.isArray(value)) { value.forEach(walk); return; }
    if (typeof value !== 'object') return;
    if (typeof value.url === 'string' && /^https?:\/\//i.test(value.url)) {
      if (!seen.has(value.url)) {
        seen.add(value.url);
        found.push({ url: value.url, title: typeof value.title === 'string' ? value.title : value.url });
      }
    }
    Object.values(value).forEach(walk);
  };
  walk(response?.output);
  return found;
}

async function callOpenAIResponses(messages, env, useWeb) {
  const key = env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY is not configured');
  const base = (env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
  const model = env.OPENAI_RESPONSES_MODEL || env.OPENAI_MODEL || 'gpt-5.6';
  const body = {
    model,
    input: messages.map(m => ({ role: m.role, content: m.content })),
    store: false,
  };
  if (useWeb && env.OPENAI_WEB_SEARCH !== 'false') body.tools = [{ type: 'web_search' }];
  const r = await fetchWithTimeout(`${base}/responses`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
    body: JSON.stringify(body)
  }, useWeb ? 45000 : 30000);
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data?.error?.message || `OpenAI Responses returned HTTP ${r.status}`);
  return { reply: data?.output_text || '', sources: useWeb ? extractSources(data) : [] };
}

async function callWorkersAI(messages, env) {
  if (!env.AI) throw new Error('Workers AI binding is not configured');
  const model = env.WORKERS_AI_MODEL || '@cf/meta/llama-3.1-8b-instruct-fp8';
  const prompt = messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n') + '\n\nASSISTANT:';
  const result = await env.AI.run(model, { prompt });
  return { reply: result?.response || '', sources: [] };
}

export async function onRequestPost({ request, env }) {
  let body = {};
  try { body = await request.json(); } catch (_) { return json({ error: 'Invalid JSON body' }, 400); }

  const rawMessages = cleanMessages(body.messages);
  if (!rawMessages.length) return json({ error: 'At least one message is required' }, 400);
  const messages = buildMessages(rawMessages);
  const useWeb = body.web === true || body.web === 'true';
  const preferResponses = body.responses === true || body.responses === 'true' || env.OPENAI_RESPONSES === 'true' || useWeb;

  try {
    let result;
    let provider;

    if (env.OPENAI_API_KEY && preferResponses) {
      provider = useWeb ? 'openai-responses-web' : 'openai-responses';
      result = await callOpenAIResponses(messages, env, useWeb);
    } else if (env.OPENAI_API_KEY) {
      provider = 'openai';
      result = await callOpenAIChat(messages, env);
    } else if (env.AI) {
      provider = 'workers-ai';
      result = await callWorkersAI(messages, env);
    } else if (env.OLLAMA_BASE_URL) {
      provider = 'ollama';
      result = await callOllama(messages, env);
    } else {
      const host = new URL(request.url).hostname;
      if (host === 'localhost' || host === '127.0.0.1' || host === '::1') {
        provider = 'ollama';
        result = await callOllama(messages, env);
      } else {
        return json({ error: 'No production AI provider is configured. Configure OPENAI_API_KEY, Workers AI, or OLLAMA_BASE_URL.' }, 503);
      }
    }

    if (!result?.reply) return json({ error: 'AI provider returned an empty response', provider }, 502);
    return json({ ok: true, reply: result.reply, provider, sources: result.sources || [], webUsed: provider === 'openai-responses-web' });
  } catch (e) {
    console.error('[VENOM /api/chat]', e);
    return json({ error: e?.message || 'AI request failed' }, 502);
  }
}

export function onRequestOptions() {
  return new Response(null, { status: 204 });
}

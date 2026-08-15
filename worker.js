import * as chat from './functions/api/chat.js';
import * as health from './functions/api/health.js';
import * as newsletter from './functions/api/newsletter.js';
import * as paymentInfo from './functions/api/payment-info.js';
import * as revolutCheckout from './functions/api/revolut-checkout.js';
import * as revolutWebhook from './functions/api/revolut-webhook.js';
import * as welcomeEmail from './functions/api/welcome-email.js';

const API_MODULES = new Map([
  ['/api/chat', chat],
  ['/api/health', health],
  ['/api/newsletter', newsletter],
  ['/api/payment-info', paymentInfo],
  ['/api/revolut-checkout', revolutCheckout],
  ['/api/revolut-webhook', revolutWebhook],
  ['/api/welcome-email', welcomeEmail],
]);

const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  },
});

async function dispatchApi(request, env, module) {
  const method = request.method.toLowerCase();
  const handler = module?.[`onRequest${method[0].toUpperCase()}${method.slice(1)}`];
  if (typeof handler !== 'function') {
    if (method === 'options') return new Response(null, { status: 204 });
    return json({ error: `Method ${request.method} not allowed` }, 405);
  }

  try {
    return await handler({
      request,
      env,
      params: {},
      next: () => env.ASSETS.fetch(request),
      waitUntil: promise => promise && typeof promise.then === 'function' ? promise : undefined,
      functionPath: request.url,
    });
  } catch (error) {
    console.error('[VENOM API]', error);
    return json({ error: error?.message || 'API request failed' }, 500);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/')) {
      const module = API_MODULES.get(url.pathname);
      if (!module) return json({ error: 'API route not found' }, 404);
      return dispatchApi(request, env, module);
    }

    return env.ASSETS.fetch(request);
  },
};

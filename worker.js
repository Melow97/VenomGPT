/**
 * VenomGPT — Production Worker
 * Routes existing API handlers through a Workers static-assets deployment.
 */
import * as chat from "./functions/api/chat.js";
import * as health from "./functions/api/health.js";
import * as newsletter from "./functions/api/newsletter.js";
import * as paymentInfo from "./functions/api/payment-info.js";
import * as revolutCheckout from "./functions/api/revolut-checkout.js";
import * as revolutWebhook from "./functions/api/revolut-webhook.js";
import * as welcomeEmail from "./functions/api/welcome-email.js";
import * as stripeCheckout from "./functions/api/stripe-checkout.js";

const API_MODULES = {
  "/api/chat": chat,
  "/api/health": health,
  "/api/newsletter": newsletter,
  "/api/payment-info": paymentInfo,
  "/api/revolut-checkout": revolutCheckout,
  "/api/revolut-webhook": revolutWebhook,
  "/api/welcome-email": welcomeEmail,
  "/api/stripe-checkout": stripeCheckout,
};

function getHandler(mod, method) {
  const suffix = method.charAt(0) + method.slice(1).toLowerCase();
  return mod[`onRequest${suffix}`] || mod.default;
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

function makeContext(request, env, ctx) {
  return {
    request,
    env,
    params: {},
    next: () => env.ASSETS.fetch(request),
    waitUntil: (promise) => ctx.waitUntil(promise),
    data: {},
  };
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path.startsWith("/api/")) {
      const mod = API_MODULES[path];
      if (!mod) return json({ ok: false, error: "Not found" }, 404);
      if (request.method === "OPTIONS") {
        const handler = getHandler(mod, "OPTIONS");
        if (typeof handler === "function") return handler(makeContext(request, env, ctx));
        return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
      }
      const handler = getHandler(mod, request.method);
      if (typeof handler !== "function") return json({ ok: false, error: "Method not allowed" }, 405);
      try {
        return await handler(makeContext(request, env, ctx));
      } catch (err) {
        console.error(`[VENOM WORKER] ${path}`, err?.message || err);
        return json({ ok: false, error: "Internal server error" }, 500);
      }
    }

    return env.ASSETS.fetch(request);
  },
};

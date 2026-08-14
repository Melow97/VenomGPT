export async function onRequestGet() {
  return new Response(JSON.stringify({
    ok: true,
    service: "venom-gpt",
    timestamp: new Date().toISOString()
  }), {
    headers: { "content-type": "application/json" }
  });
}

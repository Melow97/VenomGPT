export async function onRequestGet({ env }) {
  return new Response(JSON.stringify({
    beneficiary: env.PAYMENT_BENEFICIARY || 'Venom GPT',
    iban: env.PAYMENT_IBAN || '',
    bic: env.PAYMENT_BIC || '',
    reference: env.PAYMENT_REFERENCE || 'VENOM-PRO'
  }), { headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });
}

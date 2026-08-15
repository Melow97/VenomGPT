/* VENOM PRO PAYMENT FIX — real checkout chooser, no dead Upgrade button */
(function(){
  const CONFIG={
    cardUrl:window.VENOM_REVOLUT_PAYMENT_URL||'',
    iban:window.VENOM_PAYMENT_IBAN||'',
    beneficiary:window.VENOM_PAYMENT_BENEFICIARY||'',
    bic:window.VENOM_PAYMENT_BIC||'',
    reference:window.VENOM_PAYMENT_REFERENCE||'VENOM GPT PRO'
  };
  const esc=s=>String(s||'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
  function close(){document.getElementById('venom-pay-modal')?.remove()}
  function copy(text){if(!text)return; navigator.clipboard?.writeText(text); if(window.toast)toast('COPIED TO CLIPBOARD');}
  function openPayment(){
    if(document.getElementById('venom-pay-modal'))return;
    const m=document.createElement('div');m.id='venom-pay-modal';
    m.innerHTML=`<div class="vp-backdrop"></div><section class="vp-card" role="dialog" aria-modal="true" aria-label="Venom GPT Pro payment">
      <button class="vp-close" aria-label="Close">×</button>
      <div class="vp-kicker">VENOM GPT // PRO</div><h2>Upgrade to Pro</h2><p class="vp-sub">€20/month · Choose how you want to pay.</p>
      <div class="vp-tabs"><button class="active" data-tab="card">CARD / REVOLUT</button><button data-tab="bank">BANK TRANSFER</button></div>
      <div class="vp-panel active" data-panel="card"><div class="vp-icon">▣</div><h3>Pay by card</h3><p>Open the secure Revolut checkout and complete the €20 Pro payment.</p>${CONFIG.cardUrl?`<button class="vp-primary" id="vp-card">OPEN SECURE CARD CHECKOUT →</button>`:`<div class="vp-missing">Card checkout link is not configured yet. Add your Revolut Payment Link to the production payment configuration.</div>`}</div>
      <div class="vp-panel" data-panel="bank"><div class="vp-icon">⌁</div><h3>Bank transfer / IBAN</h3><p>Use the details below for a manual transfer. Keep the payment reference unchanged.</p>
        <div class="vp-details"><div><span>BENEFICIARY</span><b>${esc(CONFIG.beneficiary||'Not configured')}</b></div><div><span>IBAN</span><b>${esc(CONFIG.iban||'Not configured')}</b>${CONFIG.iban?'<button data-copy="iban">COPY</button>':''}</div><div><span>BIC / SWIFT</span><b>${esc(CONFIG.bic||'Not configured')}</b>${CONFIG.bic?'<button data-copy="bic">COPY</button>':''}</div><div><span>REFERENCE</span><b>${esc(CONFIG.reference)}</b><button data-copy="reference">COPY</button></div></div>
        ${CONFIG.iban?'<div class="vp-note">After the transfer, allow normal bank processing time before Pro access is marked as paid.</div>':'<div class="vp-missing">IBAN and beneficiary details are not configured yet, so no bank details are being invented or shown incorrectly.</div>'}
      </div>
      <div class="vp-secure">SECURE PAYMENT · VENOM GPT PRO · €20 / MONTH</div>
    </section>`;
    document.body.appendChild(m);
    const style=document.createElement('style');style.id='venom-payment-style';style.textContent=`
      #venom-pay-modal{position:fixed;inset:0;z-index:1000000;font-family:system-ui,sans-serif}.vp-backdrop{position:absolute;inset:0;background:#030607d9;backdrop-filter:blur(9px)}.vp-card{position:relative;width:min(620px,92vw);margin:7vh auto 0;background:linear-gradient(145deg,#11191a,#0a0e0f);border:1px solid #ffffff1c;border-radius:24px;padding:34px;box-shadow:0 35px 100px #000b;color:#f1e8d9}.vp-close{position:absolute;right:18px;top:14px;background:none;border:0;color:#aab3b0;font-size:30px;cursor:pointer}.vp-kicker{font:800 11px monospace;letter-spacing:.16em;color:#55ddd6}.vp-card h2{font-size:36px;margin:8px 0}.vp-sub{color:#9ca9a6}.vp-tabs{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:24px 0 18px}.vp-tabs button{padding:12px;border:1px solid #ffffff1c;background:#ffffff06;color:#aeb8b5;border-radius:12px;font-weight:800;cursor:pointer}.vp-tabs button.active{border-color:#55ddd6;background:#55ddd611;color:#6ee8e0}.vp-panel{display:none;border:1px solid #ffffff12;background:#0b1213;border-radius:18px;padding:24px}.vp-panel.active{display:block}.vp-panel h3{font-size:22px;margin:6px 0}.vp-panel p{color:#a7b1af;line-height:1.6}.vp-icon{font-size:28px;color:#ff633f}.vp-primary{width:100%;padding:15px;border:0;border-radius:12px;background:#ff6038;color:white;font-weight:900;cursor:pointer}.vp-missing{padding:14px;border:1px dashed #e6bd6744;border-radius:12px;color:#d8c79d;line-height:1.5}.vp-details{display:grid;gap:10px;margin-top:18px}.vp-details>div{position:relative;padding:12px 78px 12px 13px;border:1px solid #ffffff10;border-radius:10px;background:#ffffff05}.vp-details span{display:block;font:800 9px monospace;color:#73807d;letter-spacing:.1em}.vp-details b{display:block;margin-top:4px;overflow-wrap:anywhere}.vp-details button{position:absolute;right:9px;top:12px;border:1px solid #55ddd644;background:#55ddd60d;color:#6ee8e0;border-radius:7px;padding:5px 7px;font:800 9px monospace;cursor:pointer}.vp-note{margin-top:14px;color:#8fa09b;font-size:12px;line-height:1.5}.vp-secure{text-align:center;margin-top:18px;color:#687572;font:800 10px monospace;letter-spacing:.08em}@media(max-width:600px){.vp-card{margin:3vh auto 0;padding:24px}.vp-card h2{font-size:30px}}
    `;document.head.appendChild(style);
    m.querySelector('.vp-close').onclick=close;m.querySelector('.vp-backdrop').onclick=close;
    m.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{m.querySelectorAll('[data-tab]').forEach(x=>x.classList.toggle('active',x===b));m.querySelectorAll('[data-panel]').forEach(x=>x.classList.toggle('active',x.dataset.panel===b.dataset.tab))});
    const card=m.querySelector('#vp-card');if(card)card.onclick=()=>window.open(CONFIG.cardUrl,'_blank','noopener,noreferrer');
    m.querySelectorAll('[data-copy]').forEach(b=>b.onclick=()=>copy(b.dataset.copy==='iban'?CONFIG.iban:b.dataset.copy==='bic'?CONFIG.bic:CONFIG.reference));
  }
  function hook(){
    document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(/upgrade to pro|go pro/i.test(b.textContent||'')){e.preventDefault();e.stopImmediatePropagation();openPayment()}},true);
  }
  window.venomOpenPayment=openPayment;hook();
})();

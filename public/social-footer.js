/* VENOM GPT — home social footer + world tracker loader */
(function(){
  const X_URL='https://x.com/SpideytrackerAI';
  const STYLE_ID='venom-social-footer-style';
  const FOOTER_ID='venom-home-social';
  const TRACKER_ID='venom-world-tracker-loader';
  function installStyle(){
    if(document.getElementById(STYLE_ID)) return;
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
      #${FOOTER_ID}{
        margin:14px 0 4px;padding:18px 20px;border:1px solid #263b41;border-radius:13px;
        background:linear-gradient(135deg,rgba(12,24,29,.96),rgba(7,14,17,.96));
        box-shadow:0 18px 50px rgba(0,0,0,.28);display:flex;align-items:center;
        justify-content:space-between;gap:18px;position:relative;overflow:hidden;
      }
      #${FOOTER_ID}:before{content:'';position:absolute;width:220px;height:220px;right:-100px;top:-120px;border-radius:50%;background:radial-gradient(circle,rgba(85,221,214,.12),transparent 68%);pointer-events:none}
      #${FOOTER_ID} .vsf-copy{position:relative;z-index:1}
      #${FOOTER_ID} .vsf-kicker{font:900 8px/1 monospace;letter-spacing:.16em;color:#55ddd6;margin-bottom:7px}
      #${FOOTER_ID} .vsf-title{font-size:15px;font-weight:900;color:#eee8dc;margin-bottom:4px}
      #${FOOTER_ID} .vsf-sub{font-size:10px;color:#7f8f8c;line-height:1.45}
      #${FOOTER_ID} .vsf-x{position:relative;z-index:1;display:inline-flex;align-items:center;gap:9px;padding:10px 13px;border:1px solid #344e54;border-radius:9px;background:#0b171b;color:#eee8dc;text-decoration:none;transition:.18s ease;white-space:nowrap}
      #${FOOTER_ID} .vsf-x:hover{border-color:#55ddd6;color:#55ddd6;transform:translateY(-1px);box-shadow:0 0 24px rgba(85,221,214,.1)}
      #${FOOTER_ID} .vsf-xmark{width:17px;height:17px;display:grid;place-items:center;font:900 13px/1 Arial,sans-serif;color:#fff}
      #${FOOTER_ID} .vsf-handle{font:900 10px monospace;letter-spacing:.03em}
      @media(max-width:650px){#${FOOTER_ID}{align-items:flex-start;flex-direction:column}#${FOOTER_ID} .vsf-x{width:100%;justify-content:center}}
    `;
    document.head.appendChild(s);
  }
  function add(){
    const main=document.getElementById('main');
    if(!main || document.getElementById(FOOTER_ID)) return;
    if(!main.querySelector('.v3-home')) return;
    const footer=document.createElement('section');
    footer.id=FOOTER_ID;
    footer.innerHTML=`<div class="vsf-copy"><div class="vsf-kicker">FOLLOW THE WEB</div><div class="vsf-title">Follow Venom GPT on X</div><div class="vsf-sub">Updates, Spider-Tech builds and new Venom GPT drops.</div></div><a class="vsf-x" href="${X_URL}" target="_blank" rel="noopener noreferrer" aria-label="Follow SpideyTrackerAI on X"><span class="vsf-xmark">𝕏</span><span class="vsf-handle">@SpideyTrackerAI</span><span>↗</span></a>`;
    main.appendChild(footer);
  }
  function loadWorldTracker(){
    if(document.getElementById(TRACKER_ID)) return;
    if(!document.getElementById('tracker')) return;
    const s=document.createElement('script');
    s.id=TRACKER_ID;
    s.src='/world-tracker-v4.js?v=20260815-11';
    s.onload=()=>console.info('[VENOM] world tracker v4 loaded');
    s.onerror=()=>console.error('[VENOM] world tracker v4 failed to load');
    document.body.appendChild(s);
  }
  function boot(){
    installStyle();
    add();
    loadWorldTracker();
    const obs=new MutationObserver(()=>{add();loadWorldTracker()});
    obs.observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();

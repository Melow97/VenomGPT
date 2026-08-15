/* VENOM GPT — AUTHORITATIVE PRODUCTION BOOT */
(()=>{
  const VERSION='20260816-90';
  const load=src=>new Promise(resolve=>{
    const s=document.createElement('script');
    s.src=src+'?v='+VERSION;
    s.onload=resolve;
    s.onerror=()=>{console.error('[VENOM BOOT] failed:',src);resolve()};
    document.head.appendChild(s);
  });
  const boot=async()=>{
    if(window.__VENOM_AUTHORITATIVE_BOOTED)return;
    window.__VENOM_AUTHORITATIVE_BOOTED=true;
    await load('/venom-authoritative-ui-v2.js');
    await load('/venom-final-polish-v1.js');
    await load('/venom-welcome-professional-v1.js');
    await load('/venom-runtime-override-v1.js');
    await load('/venom-runtime-hotfix-v4.js');
    await load('/venom-integrations-dropdown-v1.js');
    await load('/spider-tech-cinematic-v1.js');
    await load('/venom-auth-ai-handoff-v1.js');
    await load('/venom-feature-tiers-v1.js');
    await load('/venom-auth-final-override-v1.js');
    await load('/venom-home-tiers-v2.js');
    await load('/venom-home-features-hub-v1.js');
    await load('/venom-spider-seller-polish-v1.js');
    await load('/venom-company-logo-v1.js');
    await load('/venom-home-red-black-override-v1.js');
    await load('/venom-auth-guarantee-v2.js');
    await load('/venom-footer-brand-v1.js');
    console.info('[VENOM] production '+VERSION+' loaded: red/black Home + restored legal footer + canonical spider mark + deterministic Google -> AI guarantee');
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();

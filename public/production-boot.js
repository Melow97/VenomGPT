/* VENOM GPT — AUTHORITATIVE PRODUCTION BOOT
   One authoritative workspace renderer + protected design/interaction + professional welcome + runtime failsafe. */
(()=>{
  const VERSION='20260815-78';
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
    console.info('[VENOM] production '+VERSION+' loaded: authoritative UI + Spider-Tech + welcome + OAuth + sharp eyes + pricing/contact/nav');
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();

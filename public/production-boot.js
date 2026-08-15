/* VENOM GPT — AUTHORITATIVE PRODUCTION BOOT
   One authoritative workspace renderer + one protected design/interaction layer + one welcome/legal enhancement layer. */
(()=>{
  const VERSION='20260815-74';
  const load=src=>new Promise(resolve=>{const s=document.createElement('script');s.src=src+'?v='+VERSION;s.onload=resolve;s.onerror=()=>{console.error('[VENOM BOOT] failed:',src);resolve()};document.head.appendChild(s)});
  const boot=async()=>{
    if(window.__VENOM_AUTHORITATIVE_BOOTED)return;
    window.__VENOM_AUTHORITATIVE_BOOTED=true;
    await load('/venom-authoritative-ui-v2.js');
    await load('/venom-final-polish-v1.js');
    await load('/venom-welcome-professional-v1.js');
    console.info('[VENOM] authoritative UI '+VERSION+' loaded: protected workspace + Spider-Tech + professional welcome');
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();

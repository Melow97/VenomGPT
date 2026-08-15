/* VENOM GPT — AUTHORITATIVE PRODUCTION BOOT
   One workspace renderer + one final interaction/design layer. Legacy UI scripts remain intentionally unloaded. */
(()=>{
  const VERSION='20260815-73';
  const load=src=>new Promise(resolve=>{const s=document.createElement('script');s.src=src+'?v='+VERSION;s.onload=resolve;s.onerror=()=>{console.error('[VENOM BOOT] failed:',src);resolve()};document.head.appendChild(s)});
  const boot=async()=>{
    if(window.__VENOM_AUTHORITATIVE_BOOTED)return;
    window.__VENOM_AUTHORITATIVE_BOOTED=true;
    await load('/venom-authoritative-ui-v2.js');
    await load('/venom-final-polish-v1.js');
    console.info('[VENOM] authoritative UI '+VERSION+' loaded with protected final polish');
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();

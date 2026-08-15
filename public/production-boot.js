/* VENOM GPT — AUTHORITATIVE PRODUCTION BOOT
   Only one workspace renderer is allowed to run. Legacy UI/auth scripts are intentionally not loaded. */
(()=>{
  const VERSION='20260815-72';
  const load=src=>new Promise(resolve=>{const s=document.createElement('script');s.src=src+'?v='+VERSION;s.onload=resolve;s.onerror=()=>{console.error('[VENOM BOOT] failed:',src);resolve()};document.head.appendChild(s)});
  const boot=async()=>{if(window.__VENOM_AUTHORITATIVE_BOOTED)return;window.__VENOM_AUTHORITATIVE_BOOTED=true;await load('/venom-authoritative-ui-v2.js');console.info('[VENOM] authoritative UI '+VERSION+' loaded');};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();

/* VENOM GPT — PRODUCTION BOOT V2
   The old project accumulated visual patch layers. Production now deliberately stops loading them.
   Core auth/API scripts remain in index.html; this loader installs one authoritative workspace UI. */
(function(){
  const VERSION='20260815-70';
  function load(src,key){return new Promise(resolve=>{if(document.querySelector('script['+key+']'))return resolve();const s=document.createElement('script');s.src=src+'?v='+VERSION;s.setAttribute(key,'1');s.onload=()=>resolve();s.onerror=()=>{console.error('[VENOM BOOT] failed:',src);resolve()};document.head.appendChild(s)})}
  async function boot(){
    await load('/venom-authoritative-ui-v1.js','data-venom-authoritative-ui');
    console.info('[VENOM] authoritative workspace UI '+VERSION+' loaded');
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,350),{once:true});
  }else setTimeout(boot,350);
})();

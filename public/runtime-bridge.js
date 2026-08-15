/* VENOM RUNTIME BRIDGE — resilient, event-driven module loader */
(function(){
  const VERSION='20260815-31';
  const modules=[
    ['/home-map-enhance.js','data-venom-runtime-home'],
    ['/home-finish.js','data-venom-home-finish'],
    ['/ai-workspace-polish-v2.js','data-venom-ai-workspace-v2'],
    ['/ai-premium-ui-v2.js','data-venom-ai-premium-v2'],
    ['/payment-fix.js','data-venom-payment-fix'],
    ['/ai-shell-minimal.js','data-venom-ai-shell-minimal'],
    ['/ai-pro-finish.js','data-venom-ai-pro-finish'],
    ['/premium-responsive.js','data-venom-premium-responsive'],
    ['/ai-chat-work-toggle.js','data-venom-chat-work-toggle'],
    ['/payment-experience-v2.js','data-venom-payment-v2'],
    ['/spider-tracker-retro-v2.js','data-venom-spider-retro-v2'],
    ['/admin-command-center.js','data-venom-admin-command-center'],
    ['/admin-access-override.js','data-venom-admin-access-override']
  ];
  function load(src,attr){return new Promise(resolve=>{if(document.querySelector('script['+attr+']'))return resolve({src,ok:true,existing:true});const s=document.createElement('script');let settled=false;const finish=ok=>{if(settled)return;settled=true;clearTimeout(timer);resolve({src,ok})};const timer=setTimeout(()=>{console.warn('[VENOM RUNTIME] timeout:',src);finish(false)},7000);s.src=src+'?v='+VERSION;s.setAttribute(attr,'1');s.onload=()=>finish(true);s.onerror=()=>{console.error('[VENOM RUNTIME] failed:',src);finish(false)};document.body.appendChild(s)})}
  function removePause(){document.querySelectorAll('button').forEach(b=>{if(/^\s*PAUSE\s*$/i.test(b.textContent||''))b.remove()})}
  function openAIAfterAuth(){if(sessionStorage.getItem('venom-open-ai')!=='1')return;const open=()=>{if(typeof window.venomOpenChat==='function'){sessionStorage.removeItem('venom-open-ai');window.venomOpenChat();return true}if(typeof window.newChat==='function'){sessionStorage.removeItem('venom-open-ai');window.newChat();return true}return false};if(open())return;let attempts=0;const retry=()=>{if(open()||++attempts>=20)return;setTimeout(retry,150)};setTimeout(retry,150)}
  async function boot(){const results=await Promise.all(modules.map(([src,attr])=>load(src,attr)));const failed=results.filter(r=>!r.ok).map(r=>r.src);if(failed.length)console.warn('[VENOM RUNTIME] optional modules unavailable:',failed);removePause();try{if(window.venomAuthClient){const client=window.venomAuthClient();if(client?.auth?.onAuthStateChange)client.auth.onAuthStateChange((event,session)=>{if(session&&(event==='SIGNED_IN'||sessionStorage.getItem('venom-open-ai')==='1'))openAIAfterAuth()})}}catch(e){console.warn('[VENOM RUNTIME] auth handoff unavailable',e)}openAIAfterAuth();document.documentElement.classList.add('venom-runtime-ready')}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
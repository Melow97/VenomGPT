/* VENOM GPT PRODUCTION BOOT — V6 deterministic loader */
(function(){
  const VERSION='20260815-61';
  const SUPABASE_URL='https://dqqqagpsaaalsztblmsc.supabase.co';
  const SUPABASE_KEY='sb_publishable_a5XQdHRe3daJPTfYnEMIRA_m-B5sksfH';
  function ensureScript(src,key){return new Promise(resolve=>{if(document.querySelector('script['+key+']'))return resolve();const s=document.createElement('script');s.src=src+'?v='+VERSION;s.setAttribute(key,'1');s.onload=()=>resolve();s.onerror=()=>{console.error('[VENOM BOOT] failed:',src);resolve()}})}
  async function getClient(){let n=0;while(!window.supabase?.createClient&&n++<80)await new Promise(r=>setTimeout(r,100));if(!window.supabase?.createClient)throw new Error('Supabase library did not load.');if(!window.__venomSupabase)window.__venomSupabase=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'pkce'}});return window.__venomSupabase}
  function makeInteractive(){document.querySelectorAll('a,button').forEach(el=>{if(el.dataset.venomInteraction)return;el.dataset.venomInteraction='1';el.addEventListener('pointerdown',()=>el.classList.add('venom-pressed'),{passive:true});['pointerup','pointercancel','pointerleave'].forEach(ev=>el.addEventListener(ev,()=>el.classList.remove('venom-pressed'),{passive:true}))})}
  async function boot(){
    await ensureScript('/runtime-bridge.js','data-venom-runtime-final');
    await ensureScript('/social-footer.js','data-venom-social-footer');
    await ensureScript('/home-map-enhance.js','data-venom-home-final');
    await ensureScript('/auth-signup.js','data-venom-auth-signup');
    await ensureScript('/ai-experience-v2.js','data-venom-ai-v2');
    await ensureScript('/profile-menu-loader.js','data-venom-profile-menu');
    await ensureScript('/venom-spider-enhance.js','data-venom-spider-enhance');
    await ensureScript('/venom-payment-auth.js','data-venom-payment-auth');
    await ensureScript('/venom-premium-polish.js','data-venom-premium-polish');
    await ensureScript('/venom-plan-polish.js','data-venom-plan-polish');
    await ensureScript('/venom-ui-overhaul-v2.js','data-venom-ui-overhaul-v2');
    await ensureScript('/venom-ui-bridge-v1.js','data-venom-ui-bridge');
    await ensureScript('/venom-ui-polish-v2.js','data-venom-ui-polish-v2');
    await ensureScript('/venom-ui-polish-v3.js','data-venom-ui-polish-v3');
    await ensureScript('/venom-comic-home-v1.js','data-venom-comic-home-v1');
    await ensureScript('/venom-ai-visuals-v1.js','data-venom-ai-visuals-v1');
    await ensureScript('/venom-ui-v5.js','data-venom-ui-v5');
    await ensureScript('/spider-command-center-v6.js','data-venom-spider-command-v6');
    await ensureScript('/venom-sidebar-actions-v1.js','data-venom-sidebar-actions-v1');
    makeInteractive();
    new MutationObserver(makeInteractive).observe(document.body,{childList:true,subtree:true});
    try{await getClient()}catch(e){console.warn('[VENOM AUTH] client warmup failed',e)}
    console.info('[VENOM] production boot '+VERSION+' ready; sidebar interaction repair loaded');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();

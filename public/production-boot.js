/* VENOM GPT PRODUCTION BOOT — V5 deterministic loader */
(function(){
  const VERSION='20260815-52';
  const SUPABASE_URL='https://dqqqagpsaaalsztblmsc.supabase.co';
  const SUPABASE_KEY='sb_publishable_a5XQdHRe3daJPTfYnEMIRA_m-B5sksH';
  function ensureScript(src,key){return new Promise(resolve=>{if(document.querySelector('script['+key+']'))return resolve();const s=document.createElement('script');s.src=src;s.setAttribute(key,'1');s.onload=()=>resolve();s.onerror=()=>{console.error('[VENOM BOOT] failed:',src);resolve()}})}
  async function getClient(){let n=0;while(!window.supabase?.createClient&&n++<80)await new Promise(r=>setTimeout(r,100));if(!window.supabase?.createClient)throw new Error('Supabase library did not load.');if(!window.__venomSupabase)window.__venomSupabase=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'pkce'}});return window.__venomSupabase}
  function makeInteractive(){document.querySelectorAll('a,button').forEach(el=>{if(el.dataset.venomInteraction)return;el.dataset.venomInteraction='1';el.addEventListener('pointerdown',()=>el.classList.add('venom-pressed'),{passive:true});['pointerup','pointercancel','pointerleave'].forEach(ev=>el.addEventListener(ev,()=>el.classList.remove('venom-pressed'),{passive:true}))})}
  async function boot(){
    await ensureScript('/runtime-bridge.js?v='+VERSION,'data-venom-runtime-final');
    await ensureScript('/social-footer.js?v='+VERSION,'data-venom-social-footer');
    await ensureScript('/home-map-enhance.js?v='+VERSION,'data-venom-home-final');
    await ensureScript('/auth-signup.js?v='+VERSION,'data-venom-auth-signup');
    await ensureScript('/ai-experience-v2.js?v='+VERSION,'data-venom-ai-v2');
    await ensureScript('/profile-menu-loader.js?v='+VERSION,'data-venom-profile-menu');
    await ensureScript('/venom-spider-enhance.js?v='+VERSION,'data-venom-spider-enhance');
    await ensureScript('/venom-payment-auth.js?v='+VERSION,'data-venom-payment-auth');
    await ensureScript('/venom-premium-polish.js?v='+VERSION,'data-venom-premium-polish');
    await ensureScript('/venom-plan-polish.js?v='+VERSION,'data-venom-plan-polish');
    await ensureScript('/venom-ui-overhaul-v2.js?v='+VERSION,'data-venom-ui-overhaul-v2');
    await ensureScript('/venom-ui-bridge-v1.js?v='+VERSION,'data-venom-ui-bridge');
    await ensureScript('/venom-ui-polish-v2.js?v='+VERSION,'data-venom-ui-polish-v2');
    await ensureScript('/venom-ui-polish-v3.js?v='+VERSION,'data-venom-ui-polish-v3');
    await ensureScript('/venom-comic-home-v1.js?v='+VERSION,'data-venom-comic-home-v1');
    await ensureScript('/venom-ai-visuals-v1.js?v='+VERSION,'data-venom-ai-visuals-v1');
    /* V5 replaces the older composer/tracker layers. Do not load v2/v3/v4 interaction patches. */
    await ensureScript('/venom-ui-v5.js?v='+VERSION,'data-venom-ui-v5');
    makeInteractive();
    new MutationObserver(makeInteractive).observe(document.body,{childList:true,subtree:true});
    try{await getClient()}catch(e){console.warn('[VENOM AUTH] client warmup failed',e)}
    console.info('[VENOM] production boot '+VERSION+' ready; V5 cream workspace + minimal composer + live fictional tracker loaded');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();

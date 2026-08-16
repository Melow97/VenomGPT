/* VENOM GPT — STABLE PRODUCTION BOOT v102 */
(()=>{
'use strict';
const VERSION='20260816-102';
const finish=()=>document.getElementById('venom-boot-loader')?.classList.add('done');
const load=(src,timeout=3500)=>new Promise(resolve=>{let settled=false,timer;const done=()=>{if(settled)return;settled=true;clearTimeout(timer);resolve()};const s=document.createElement('script');s.src=src+'?v='+VERSION;s.async=true;s.onload=done;s.onerror=done;document.head.appendChild(s);timer=setTimeout(done,timeout)});
const boot=async()=>{
 if(window.__VENOM_AUTHORITATIVE_BOOTED)return;
 window.__VENOM_AUTHORITATIVE_BOOTED=true;
 try{
  if(!window.supabase?.createClient)await new Promise(r=>{let n=0;const t=setInterval(()=>{if(window.supabase?.createClient||++n>=12){clearInterval(t);r()}},100)});
  await load('/venom-authoritative-ui-v2.js',4000);
  await load('/venom-welcome-professional-v1.js',2500);
  await load('/venom-auth-ai-handoff-v1.js',2500);
 }catch(e){console.error('[VENOM] core boot',e)}
 finish();
 // Stable core remains the critical path. Only the audited, self-contained pricing module is allowed
 // back in after startup; all other enhancement modules remain quarantined until separately audited.
 setTimeout(()=>load('/venom-home-tiers-v2.js',2500).catch(()=>{}),1200);
 console.info('[VENOM] v102 stable core active; audited pricing module enabled');
};
try{if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot()}catch(e){console.error('[VENOM] fatal boot',e);finish()}
})();

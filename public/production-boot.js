/* VENOM GPT — STABLE PRODUCTION BOOT v101 */
(()=>{
'use strict';
const VERSION='20260816-101';
const finish=()=>document.getElementById('venom-boot-loader')?.classList.add('done');
const load=(src,timeout=3500)=>new Promise(resolve=>{
 let settled=false,timer;const done=()=>{if(settled)return;settled=true;clearTimeout(timer);resolve()};
 const s=document.createElement('script');s.src=src+'?v='+VERSION;s.async=true;s.onload=done;s.onerror=done;document.head.appendChild(s);timer=setTimeout(done,timeout);
});
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
 // PRODUCTION SAFE MODE: secondary enhancement scripts are quarantined from startup.
 // Several of them install document-wide MutationObservers and/or rewrite already-rendered DOM.
 // They can be reintroduced individually after each is audited. This prevents a delayed main-thread
 // stall while preserving the approved core UI, auth, Home styling and existing content.
 console.info('[VENOM] v101 stable core active; secondary enhancement quarantine enabled');
};
try{if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot()}catch(e){console.error('[VENOM] fatal boot',e);finish()}
})();

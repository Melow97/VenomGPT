/* VENOM GPT — STABLE PRODUCTION BOOT v99 */
(()=>{
'use strict';
const VERSION='20260816-99';
const finish=()=>document.getElementById('venom-boot-loader')?.classList.add('done');
const load=(src,timeout=3500)=>new Promise(resolve=>{
 let settled=false;const done=()=>{if(settled)return;settled=true;clearTimeout(timer);resolve()};
 const s=document.createElement('script');s.src=src+'?v='+VERSION;s.async=true;s.onload=done;s.onerror=done;document.head.appendChild(s);const timer=setTimeout(done,timeout);
});
const idle=fn=>{if(typeof window.requestIdleCallback==='function')window.requestIdleCallback(fn,{timeout:1200});else setTimeout(fn,250)};
const bootOptional=items=>{let i=0;const next=()=>{if(i>=items.length)return;const src=items[i++];idle(async()=>{await load(src,3000);setTimeout(next,150)});};setTimeout(next,1200)};
const boot=async()=>{
 if(window.__VENOM_AUTHORITATIVE_BOOTED)return;
 window.__VENOM_AUTHORITATIVE_BOOTED=true;
 // Supabase is a deferred, ordered dependency in index.html. Give it a short grace period only.
 if(!window.supabase?.createClient)await new Promise(r=>{let n=0;const t=setInterval(()=>{if(window.supabase?.createClient||++n>=12){clearInterval(t);r()}},100)});
 await load('/venom-authoritative-ui-v2.js',4000);
 await load('/venom-welcome-professional-v1.js',2500);
 await load('/venom-auth-ai-handoff-v1.js',2500);
 // Critical UI is now interactive. Enhancement modules are deliberately moved off the critical path:
 // load them one-at-a-time during browser idle periods so they cannot create a startup request/DOM/CPU storm.
 finish();
 const optional=['/venom-final-polish-v1.js','/venom-runtime-override-v1.js','/venom-runtime-hotfix-v4.js','/venom-integrations-dropdown-v1.js','/spider-tech-cinematic-v1.js','/venom-feature-tiers-v1.js','/venom-auth-final-override-v1.js','/venom-home-tiers-v2.js','/venom-home-features-hub-v1.js','/venom-spider-seller-polish-v1.js','/venom-company-logo-v1.js','/venom-home-red-black-override-v1.js','/venom-auth-guarantee-v2.js','/venom-footer-brand-v1.js'];
 bootOptional(optional);
};
try{if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot()}catch(e){console.error('[VENOM] boot failure',e);finish()}
})();

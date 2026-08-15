/* VENOM GPT — AUTH GUARANTEE
   Final auth layer: Google sign-in always requests the AI workspace and the OAuth callback reveals it. */
(()=>{
'use strict';
if(window.__VENOM_AUTH_GUARANTEE__)return;window.__VENOM_AUTH_GUARANTEE__=true;
const SUPABASE_URL='https://dqqqagpsaaalsztblmsc.supabase.co';
const SUPABASE_KEY='sb_publishable_a5XQdHRe3daJPTfYnEMIRA_m-B5sksfH';
const DEST='venom-open-ai';
let client;
function sb(){return client||(client=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'pkce'}}))}
function reveal(){['landing','auth'].forEach(id=>{const e=document.getElementById(id);if(e)e.style.display='none'});['app','main'].forEach(id=>{const e=document.getElementById(id);if(e)e.style.display='block'});document.body.classList.add('venom-ai-active')}
async function enter(){reveal();try{const c=sb(),r=await c.auth.getSession();if(r.data.session&&typeof window.applySession==='function')await window.applySession(r.data.session)}catch(e){console.warn('[VENOM AUTH]',e)}try{if(typeof window.venomRepairAI==='function')await window.venomRepairAI()}catch(e){}setTimeout(()=>{reveal();if(typeof window.venomOpenChat==='function')window.venomOpenChat();else if(typeof window.newChat==='function')window.newChat();else window.dispatchEvent(new CustomEvent('venom:open-ai'))},250)}
async function startGoogle(button){if(button?.dataset.venomAuthBusy==='1')return;sessionStorage.setItem(DEST,'1');if(button){button.dataset.venomAuthBusy='1';button.disabled=true;button.setAttribute('aria-busy','true');button.dataset.originalText=button.textContent;button.textContent='CONNECTING…'}try{const {error}=await sb().auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+'/?venom_ai=1',queryParams:{prompt:'select_account'},skipBrowserRedirect:false}});if(error)throw error}catch(e){sessionStorage.removeItem(DEST);if(button){button.disabled=false;button.dataset.venomAuthBusy='0';button.removeAttribute('aria-busy');button.textContent=button.dataset.originalText||'Continue with Google'}console.error('[VENOM GOOGLE]',e)}}
function bind(){const els=[...document.querySelectorAll('button,a,[role="button"]')];els.filter(e=>{const t=((e.textContent||'')+' '+(e.getAttribute('aria-label')||'')).toLowerCase();return t.includes('continue with google')||t.includes('google sign')||t==='google'}).forEach(e=>{if(e.dataset.venomAuthBound==='1')return;e.dataset.venomAuthBound='1';e.addEventListener('click',ev=>{ev.preventDefault();ev.stopImmediatePropagation();startGoogle(e)},true)})}
async function callback(){try{const c=sb();const qs=new URLSearchParams(location.search);const hasCode=qs.has('code');if(hasCode){const {error}=await c.auth.exchangeCodeForSession(qs.get('code'));if(error)console.warn('[VENOM OAUTH EXCHANGE]',error)}const {data:{session}}=await c.auth.getSession();const wanted=qs.get('venom_ai')==='1'||sessionStorage.getItem(DEST)==='1';if(session&&wanted){sessionStorage.removeItem(DEST);history.replaceState({},document.title,location.pathname||'/');await enter()}}catch(e){console.error('[VENOM AUTH CALLBACK]',e)}}
window.addEventListener('DOMContentLoaded',()=>{bind();callback()},{once:true});window.addEventListener('load',()=>{bind();setTimeout(callback,100)});new MutationObserver(bind).observe(document.documentElement,{childList:true,subtree:true});
})();

/* VENOM GPT — CRITICAL BEHAVIOUR FIXES ONLY
 * Does not replace landing copy, pricing, social links, branding, or workspace content.
 * Fixes only Google -> AI handoff and Stripe upgrade button wiring.
 */
(()=>{
'use strict';
if(window.__VENOM_CRITICAL_FIXES_V1__)return;
window.__VENOM_CRITICAL_FIXES_V1__=true;
const SUPABASE_URL='https://dqqqagpsaaalsztblmsc.supabase.co';
const SUPABASE_KEY='sb_publishable_a5XQdHRe3daJPTfYnEMIRA_m-B5sksH';
const getClient=()=>window.supabase?.createClient?.(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'pkce'}});

async function enterAI(){
  try{
    const c=getClient();
    if(!c)return false;
    const {data:{session}}=await c.auth.getSession();
    if(!session)return false;
    sessionStorage.removeItem('venom-open-ai');
    for(let i=0;i<30;i++){
      if(typeof window.venomOpenChat==='function'){window.venomOpenChat();return true;}
      if(typeof window.venomRepairAI==='function'){await window.venomRepairAI();return true;}
      await new Promise(r=>setTimeout(r,200));
    }
    const landing=document.getElementById('landing'),auth=document.getElementById('auth'),app=document.getElementById('app');
    if(landing)landing.style.display='none';
    if(auth)auth.style.display='none';
    if(app)app.style.display='block';
    return false;
  }catch(e){console.error('[VENOM AUTH FIX]',e);return false}
}

async function google(e){
  e?.preventDefault();e?.stopImmediatePropagation();
  const b=document.getElementById('va-google')||document.getElementById('google');
  const err=document.getElementById('va-err')||document.getElementById('err');
  if(b){b.disabled=true;b.textContent='CONNECTING TO GOOGLE…'}
  sessionStorage.setItem('venom-open-ai','1');
  try{
    const c=getClient();
    if(!c)throw Error('Authentication service unavailable');
    const {error}=await c.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+'/?venom_ai=1',queryParams:{prompt:'select_account'},skipBrowserRedirect:false}});
    if(error)throw error;
  }catch(x){
    sessionStorage.removeItem('venom-open-ai');
    if(err)err.textContent='GOOGLE SIGN-IN ERROR · '+(x?.message||x);
    if(b){b.disabled=false;b.textContent='G  Continue with Google'}
  }
}

async function stripe(plan,button){
  if(button){button.disabled=true;button.dataset.originalText=button.dataset.originalText||button.textContent;button.textContent='OPENING STRIPE…'}
  try{
    const c=getClient();
    if(!c)throw Error('Authentication service unavailable');
    const {data}=await c.auth.getSession();
    if(!data?.session){sessionStorage.setItem('venom-open-ai','1');document.getElementById('va-enter')?.click();return;}
    const r=await fetch('/api/stripe-checkout',{method:'POST',headers:{'content-type':'application/json',Authorization:`Bearer ${data.session.access_token}`},body:JSON.stringify({plan})});
    const d=await r.json().catch(()=>({}));
    if(!r.ok||!d.checkout_url)throw Error(d.error||'Stripe Checkout unavailable');
    location.assign(d.checkout_url);
  }catch(e){
    console.error('[VENOM STRIPE FIX]',e);
    alert(e?.message||'Stripe Checkout is temporarily unavailable.');
  }finally{
    if(button){button.disabled=false;button.textContent=button.dataset.originalText||button.textContent}
  }
}

function wire(){
  document.addEventListener('click',e=>{
    const el=e.target?.closest?.('button');
    if(!el)return;
    const text=(el.textContent||'').replace(/\s+/g,' ').trim().toLowerCase();
    if(el.id==='va-google'||el.id==='google'||text.includes('continue with google')){google(e);return;}
    if(text.includes('upgrade to pro')){e.preventDefault();e.stopImmediatePropagation();stripe('pro',el);return;}
    if(text.includes('upgrade to plus')){e.preventDefault();e.stopImmediatePropagation();stripe('plus',el);return;}
  },true);
  if(location.search.includes('venom_ai=1')||location.search.includes('auth=1')||sessionStorage.getItem('venom-open-ai'))setTimeout(enterAI,250);
}

const boot=()=>{wire();setTimeout(enterAI,800);setTimeout(enterAI,1800);setTimeout(enterAI,3500)};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();

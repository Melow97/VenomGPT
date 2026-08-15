/* VENOM GPT — GOOGLE AUTH -> AI WORKSPACE HANDOFF
   Keeps the existing Supabase auth flow but makes the post-login destination deterministic. */
(()=>{
  'use strict';
  if(window.__VENOM_AUTH_AI_HANDOFF__) return;
  window.__VENOM_AUTH_AI_HANDOFF__=true;
  const U='https://dqqqagpsaaalsztblmsc.supabase.co';
  const K='sb_publishable_a5XQdHRe3daJPTfYnEMIRA_m-B5sksfH';
  let client=null;
  const supa=()=>client||(client=window.supabase?.createClient(U,K,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'pkce'} }));
  const mark=()=>sessionStorage.setItem('venom-open-ai','1');
  const reveal=()=>{
    const landing=document.getElementById('landing'),auth=document.getElementById('auth'),app=document.getElementById('app'),main=document.getElementById('main');
    if(app) app.style.display='block';
    if(main) main.style.display='block';
    if(landing) landing.style.display='none';
    if(auth) auth.style.display='none';
    document.body.classList.add('venom-ai-active');
    return !!app;
  };
  const openAI=async()=>{
    reveal();
    if(typeof window.venomRepairAI==='function') await window.venomRepairAI();
    if(typeof window.venomOpenChat==='function'){window.venomOpenChat();return true}
    if(typeof window.newChat==='function'){window.newChat();return true}
    window.dispatchEvent(new CustomEvent('venom:open-ai'));
    return false;
  };
  async function callback(){
    const c=supa(); if(!c)return;
    const qs=new URLSearchParams(location.search), code=qs.get('code');
    if(!code && !sessionStorage.getItem('venom-open-ai')) return;
    try{
      let session=(await c.auth.getSession()).data.session;
      if(!session && code){const r=await c.auth.exchangeCodeForSession(code);if(r.error)throw r.error;session=r.data.session}
      if(!session)return;
      if(typeof window.applySession==='function') await window.applySession(session);
      history.replaceState({},document.title,location.pathname);
      sessionStorage.removeItem('venom-open-ai');
      await openAI();
    }catch(e){console.error('[VENOM AUTH HANDOFF]',e)}
  }
  function wire(){
    const old=document.getElementById('google')||document.getElementById('va-google');
    if(!old || old.dataset.aiHandoff==='1')return;
    const fresh=old.cloneNode(true);fresh.dataset.aiHandoff='1';old.replaceWith(fresh);
    fresh.addEventListener('click',async e=>{
      e.preventDefault();e.stopImmediatePropagation();
      const err=document.getElementById('err')||document.getElementById('va-err');
      fresh.disabled=true;fresh.textContent='CONNECTING TO GOOGLE…';if(err)err.textContent='';mark();
      try{const c=supa();if(!c)throw new Error('Authentication service is unavailable. Please refresh and try again.');const {error}=await c.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+'/',queryParams:{prompt:'select_account'}}});if(error)throw error}
      catch(e){sessionStorage.removeItem('venom-open-ai');if(err)err.textContent='GOOGLE SIGN-IN ERROR · '+(e?.message||String(e));fresh.disabled=false;fresh.textContent='G  Continue with Google'}
    },true);
  }
  const boot=()=>{wire();setTimeout(wire,500);setTimeout(callback,650);setTimeout(callback,1500);setTimeout(callback,3000)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();

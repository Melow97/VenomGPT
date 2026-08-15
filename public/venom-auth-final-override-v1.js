/* VENOM AUTH FINAL OVERRIDE — Google callback always lands in the AI workspace */
(()=>{
  'use strict';
  const U='https://dqqqagpsaaalsztblmsc.supabase.co';
  const K='sb_publishable_a5XQdHRe3daJPTfYnEMIRA_m-B5sksH';
  const KEY='venom-open-ai';
  let sb;
  const client=()=>sb||(sb=window.supabase.createClient(U,K,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'pkce'}}));
  const showAI=()=>{
    const landing=document.getElementById('landing');
    const auth=document.getElementById('auth');
    const app=document.getElementById('app');
    const main=document.getElementById('main');
    if(landing)landing.style.display='none';
    if(auth)auth.style.display='none';
    if(app)app.style.display='block';
    if(main)main.style.display='block';
    document.body.classList.add('venom-ai-active');
  };
  const enter=async()=>{
    showAI();
    try{
      if(typeof window.applySession==='function'){
        const {data:{session}}=await client().auth.getSession();
        if(session)await window.applySession(session);
      }
    }catch(e){console.warn('[VENOM AUTH FINAL] applySession',e)}
    try{
      if(typeof window.venomRepairAI==='function')await window.venomRepairAI();
    }catch(e){console.warn('[VENOM AUTH FINAL] repair',e)}
    setTimeout(()=>{
      showAI();
      if(typeof window.venomOpenChat==='function')window.venomOpenChat();
      else if(typeof window.newChat==='function')window.newChat();
      else window.dispatchEvent(new CustomEvent('venom:open-ai'));
    },180);
  };
  const check=async()=>{
    try{
      const {data:{session}}=await client().auth.getSession();
      if(!session)return;
      const qs=new URLSearchParams(location.search);
      const callback=qs.get('venom_ai')==='1'||sessionStorage.getItem(KEY)==='1';
      if(!callback)return;
      sessionStorage.removeItem(KEY);
      if(history.replaceState)history.replaceState({},document.title,location.pathname||'/');
      await enter();
    }catch(e){console.error('[VENOM AUTH FINAL]',e)}
  };
  window.addEventListener('load',()=>setTimeout(check,120));
  document.addEventListener('DOMContentLoaded',()=>setTimeout(check,120),{once:true});
  setTimeout(check,900);
  if(window.supabase?.createClient){
    try{client().auth.onAuthStateChange((event,session)=>{
      if(session && (sessionStorage.getItem(KEY)==='1'||new URLSearchParams(location.search).get('venom_ai')==='1'))setTimeout(check,80);
    })}catch(e){console.warn('[VENOM AUTH FINAL] listener',e)}
  }
})();

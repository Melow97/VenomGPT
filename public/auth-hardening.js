/* VENOM AUTH HARDENING — deterministic Google -> AI workspace handoff */
(function(){
  const U='https://dqqqagpsaaalsztblmsc.supabase.co';
  const K='sb_publishable_a5XQdHRe3daJPTfYnEMIRA_m-B5sksfH';
  const origin=window.location.origin;
  let authClient;
  function client(){
    if(authClient)return authClient;
    if(!window.supabase?.createClient)throw new Error('Supabase client is not loaded. Refresh the page and try again.');
    authClient=window.supabase.createClient(U,K,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'pkce'}});
    return authClient;
  }
  function revealAI(){
    const landing=document.getElementById('landing'),auth=document.getElementById('auth'),app=document.getElementById('app'),main=document.getElementById('main');
    if(app)app.style.display='block';if(main)main.style.display='block';if(landing)landing.style.display='none';if(auth)auth.style.display='none';
    document.body.classList.add('venom-ai-active');
  }
  async function openAI(){
    revealAI();
    if(typeof window.venomRepairAI==='function'){try{await window.venomRepairAI()}catch(e){console.warn('[VENOM AI ENTRY]',e)}}
    if(typeof window.venomOpenChat==='function'){window.venomOpenChat();return true}
    if(typeof window.newChat==='function'){window.newChat();return true}
    window.dispatchEvent(new CustomEvent('venom:open-ai'));return false;
  }
  window.login=async function(){
    const button=document.getElementById('google'),err=document.getElementById('err');
    if(button){button.disabled=true;button.textContent='CONNECTING TO GOOGLE…'}if(err)err.textContent='';
    sessionStorage.setItem('venom-open-ai','1');
    try{
      const {error}=await client().auth.signInWithOAuth({provider:'google',options:{redirectTo:origin+'/?venom_ai=1',queryParams:{prompt:'select_account'},skipBrowserRedirect:false}});
      if(error)throw error;
    }catch(e){
      sessionStorage.removeItem('venom-open-ai');console.error('[VENOM AUTH]',e);
      if(err)err.textContent='GOOGLE SIGN-IN ERROR · '+(e?.message||String(e));
      if(button){button.disabled=false;button.textContent='G  Continue with Google'}
    }
  };
  window.openAuth=window.openAuth||function(){const landing=document.getElementById('landing'),auth=document.getElementById('auth'),app=document.getElementById('app');if(landing)landing.style.display='none';if(auth)auth.style.display='block';if(app)app.style.display='none'};
  window.venomAuthClient=client;
  async function sync(){
    try{
      const c=client();const {data:{session}}=await c.auth.getSession();if(!session)return;
      if(typeof window.applySession==='function')await window.applySession(session);
      const qs=new URLSearchParams(location.search),wanted=qs.get('venom_ai')==='1'||sessionStorage.getItem('venom-open-ai')==='1';
      if(wanted){sessionStorage.removeItem('venom-open-ai');history.replaceState({},document.title,location.pathname);await openAI()}
    }catch(e){console.warn('[VENOM AUTH SYNC]',e)}
  }
  window.addEventListener('load',()=>setTimeout(sync,150));
  setTimeout(sync,900);
})();

/* VENOM AUTH HARDENING */
(function(){
  const U='https://dqqqagpsaaalsztblmsc.supabase.co';
  const K='sb_publishable_a5XQdHRe3daJPTfYnEMIRA_m-B5sksH';
  const origin=window.location.origin;
  let authClient;
  function client(){
    if(authClient)return authClient;
    if(!window.supabase?.createClient)throw new Error('Supabase client is not loaded. Refresh the page and try again.');
    authClient=window.supabase.createClient(U,K,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'pkce'}});
    return authClient;
  }
  window.login=async function(){
    const button=document.getElementById('google'),err=document.getElementById('err');
    if(button){button.disabled=true;button.textContent='CONNECTING TO GOOGLE…'}
    if(err)err.textContent='';
    try{
      const {error}=await client().auth.signInWithOAuth({provider:'google',options:{redirectTo:origin+'/',queryParams:{prompt:'select_account'}}});
      if(error)throw error;
    }catch(e){
      console.error('[VENOM AUTH]',e);
      if(err)err.textContent='GOOGLE SIGN-IN ERROR · '+(e?.message||String(e));
      if(button){button.disabled=false;button.textContent='G  Continue with Google'}
    }
  };
  window.openAuth=window.openAuth||function(){
    const landing=document.getElementById('landing'),auth=document.getElementById('auth'),app=document.getElementById('app');
    if(landing)landing.style.display='none';if(auth)auth.style.display='block';if(app)app.style.display='none';
  };
  window.venomAuthClient=client;
  async function sync(){
    try{
      const {data:{session}}=await client().auth.getSession();
      if(session && typeof window.applySession==='function')await window.applySession(session);
    }catch(e){console.warn('[VENOM AUTH SYNC]',e)}
  }
  client;
  window.addEventListener('load',()=>setTimeout(sync,120));
})();

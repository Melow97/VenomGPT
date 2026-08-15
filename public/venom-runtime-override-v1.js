/* VENOM GPT — RUNTIME OVERRIDE / SAFE FAILSAFE
   Repairs stale UI bindings, theme switching and Google sign-in without replacing the authoritative renderer. */
(()=>{
  'use strict';
  if(window.__VENOM_RUNTIME_OVERRIDE_V1)return;
  window.__VENOM_RUNTIME_OVERRIDE_V1=true;
  const SUPABASE_URL='https://dqqqagpsaaalsztblmsc.supabase.co';
  const SUPABASE_KEY='sb_publishable_a5XQdHRe3daJPTfYnEMIRA_m-B5sksfH';
  let client=null;
  const getClient=()=>client||(client=window.supabase?.createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'pkce'}}));
  const $=id=>document.getElementById(id);

  function fixTheme(){
    const b=$('va-theme');
    if(!b||b.dataset.runtimeTheme)return;
    b.dataset.runtimeTheme='1';
    const apply=()=>{
      const dark=localStorage.getItem('venom-theme')==='dark';
      document.body.classList.toggle('venom-dark',dark);
      b.textContent=dark?'☀':'☾';
      b.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
    };
    b.onclick=()=>{
      localStorage.setItem('venom-theme',document.body.classList.contains('venom-dark')?'light':'dark');
      apply();
    };
    apply();
  }

  function fixSignIn(){
    const b=$('va-google');
    if(!b||b.dataset.runtimeAuth)return;
    b.dataset.runtimeAuth='1';
    b.onclick=async()=>{
      const err=$('va-err');
      b.disabled=true;
      b.textContent='CONNECTING TO GOOGLE…';
      if(err)err.textContent='';
      try{
        const c=getClient();
        if(!c)throw new Error('Authentication service did not load. Please refresh and try again.');
        const {error}=await c.auth.signInWithOAuth({
          provider:'google',
          options:{
            redirectTo:window.location.origin+'/?auth=google',
            queryParams:{prompt:'select_account'},
            skipBrowserRedirect:false
          }
        });
        if(error)throw error;
      }catch(e){
        console.error('[VENOM AUTH]',e);
        if(err)err.textContent='GOOGLE SIGN-IN ERROR · '+(e?.message||String(e));
        b.disabled=false;
        b.textContent='G  Continue with Google';
      }
    };
  }

  function removeUglyPlus(){
    const p=$('va-plus');
    if(p){
      p.remove();
      const tools=$('va-tools');
      if(tools)tools.style.display='none';
    }
  }

  function repairSidebar(){
    document.querySelectorAll('.va-sidebtn[data-view]').forEach(btn=>{
      if(btn.dataset.runtimeNav)return;
      btn.dataset.runtimeNav='1';
      btn.addEventListener('click',()=>{
        if(typeof window.navigate==='function')window.navigate(btn.dataset.view,btn);
      });
    });
  }

  function checkSession(){
    const c=getClient();
    if(!c||window.__VENOM_RUNTIME_SESSION_WATCH)return;
    window.__VENOM_RUNTIME_SESSION_WATCH=true;
    c.auth.getSession().then(({data})=>{
      if(data?.session&&typeof window.workspace==='function')window.workspace();
    }).catch(()=>{});
  }

  function repair(){
    fixTheme();
    fixSignIn();
    removeUglyPlus();
    repairSidebar();
    checkSession();
  }

  const mo=new MutationObserver(repair);
  function boot(){
    repair();
    if(document.body)mo.observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();

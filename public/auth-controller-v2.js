/* VENOM GPT AUTH CONTROLLER V2 — single authoritative workspace/session flow */
(()=>{
  'use strict';
  const SUPABASE_URL='https://dqqqagpsaaalsztblmsc.supabase.co';
  const SUPABASE_KEY='sb_publishable_a5XQdHRe3daJPTfYnEMIRA_m-B5sksH';
  const AI_AFTER_AUTH='venom-open-ai';
  let signingOut=false;
  let client=null;

  function getClient(){
    if(client)return client;
    if(window.__venomSupabase) return (client=window.__venomSupabase);
    if(!window.supabase?.createClient) return null;
    return (client=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'pkce'}}));
  }
  function els(){return {landing:document.getElementById('landing'),auth:document.getElementById('auth'),app:document.getElementById('app')}}
  function showWorkspace(){const {landing,auth,app}=els();if(landing)landing.style.display='none';if(auth)auth.style.display='none';if(app)app.style.display='block';document.body.classList.remove('auth-open')}
  function showHome(){const {landing,auth,app}=els();if(app)app.style.display='none';if(auth)auth.style.display='none';if(landing)landing.style.display='block';document.body.classList.remove('auth-open');window.scrollTo(0,0)}
  function openAI(){
    showWorkspace();
    const open=()=>{
      try{
        if(typeof window.venomOpenChat==='function'){window.venomOpenChat();return true}
        if(typeof window.newChat==='function'){window.newChat();return true}
      }catch(e){console.warn('[VENOM AUTH] AI entry retry',e)}
      return false;
    };
    if(open())return;
    let tries=0;const timer=setInterval(()=>{if(open()||++tries>40)clearInterval(timer)},150);
  }
  async function syncSession(session,{openChat=false}={}){
    if(!session?.user)return false;
    showWorkspace();
    try{if(typeof window.applySession==='function')await window.applySession(session)}catch(e){console.warn('[VENOM AUTH] applySession',e)}
    if(openChat)openAI();
    return true;
  }
  window.openAuth=()=>{const {landing,auth,app}=els();if(landing)landing.style.display='none';if(auth)auth.style.display='block';if(app)app.style.display='none';document.body.classList.add('auth-open');window.scrollTo(0,0)};
  window.login=async()=>{
    const b=document.getElementById('google'),e=document.getElementById('err');
    if(b){b.disabled=true;b.textContent='CONNECTING TO GOOGLE…'}if(e)e.textContent='';
    sessionStorage.setItem(AI_AFTER_AUTH,'1');
    try{
      const c=getClient();if(!c)throw new Error('Supabase authentication is not ready yet. Please refresh and try again.');
      const {error}=await c.auth.signInWithOAuth({provider:'google',options:{redirectTo:window.location.origin+'/?auth=google',queryParams:{prompt:'select_account',access_type:'online'}}});
      if(error)throw error;
    }catch(err){
      sessionStorage.removeItem(AI_AFTER_AUTH);console.error('[VENOM AUTH]',err);
      if(e)e.textContent='AUTH ERROR · '+(err?.message||String(err));
      if(b){b.disabled=false;b.textContent='G  Continue with Google'}
    }
  };
  window.logout=async()=>{
    if(signingOut)return;
    signingOut=true;
    const c=getClient();
    sessionStorage.removeItem(AI_AFTER_AUTH);
    try{if(c)await c.auth.signOut({scope:'local'})}catch(e){console.warn('[VENOM AUTH] sign out',e)}
    try{localStorage.removeItem('venom-open-ai')}catch(_){ }
    try{if(typeof window.closeProfileMenu==='function')window.closeProfileMenu()}catch(_){ }
    showHome();
    signingOut=false;
  };
  window.venomAuthController={getClient,showWorkspace,showHome,openAI,isSigningOut:()=>signingOut};

  async function boot(){
    const c=getClient();if(!c)return;
    try{
      const {data:{session},error}=await c.auth.getSession();if(error)throw error;
      const callback=new URLSearchParams(location.search).get('auth');
      if(session){
        const shouldOpen=sessionStorage.getItem(AI_AFTER_AUTH)==='1'||callback==='google'||callback==='email';
        await syncSession(session,{openChat:shouldOpen});
        if(shouldOpen)sessionStorage.removeItem(AI_AFTER_AUTH);
        if(callback)history.replaceState({},document.title,location.pathname+location.hash);
      }else if(!signingOut){
        const {auth}=els();if(auth?.style.display==='block')return;
        showHome();
      }
      c.auth.onAuthStateChange(async(event,next)=>{
        if(event==='SIGNED_OUT'){
          if(signingOut){showHome();return;}
          showHome();return;
        }
        if(next){
          const shouldOpen=event==='SIGNED_IN'||sessionStorage.getItem(AI_AFTER_AUTH)==='1';
          await syncSession(next,{openChat:shouldOpen});
          if(shouldOpen)sessionStorage.removeItem(AI_AFTER_AUTH);
        }
      });
    }catch(e){console.error('[VENOM AUTH CONTROLLER]',e)}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();

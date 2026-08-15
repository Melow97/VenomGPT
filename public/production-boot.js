/* VENOM GPT PRODUCTION BOOT — final deterministic loader/auth/click safety */
(function(){
  const VERSION='20260815-7';
  const SUPABASE_URL='https://dqqqagpsaaalsztblmsc.supabase.co';
  const SUPABASE_KEY='sb_publishable_a5XQdHRe3daJPTfYnEMIRA_m-B5sksH';
  const AI_AFTER_AUTH='venom-open-ai';

  function ensureScript(src,key){
    return new Promise((resolve)=>{
      if(document.querySelector('script['+key+']')) return resolve();
      const s=document.createElement('script');
      s.src=src;s.setAttribute(key,'1');
      s.onload=()=>resolve();s.onerror=()=>{console.error('[VENOM BOOT] failed:',src);resolve()};
      document.body.appendChild(s);
    });
  }

  async function getClient(){
    let n=0;
    while(!window.supabase?.createClient && n++<80) await new Promise(r=>setTimeout(r,100));
    if(!window.supabase?.createClient) throw new Error('Supabase library did not load.');
    if(!window.__venomSupabase) window.__venomSupabase=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'pkce'}});
    return window.__venomSupabase;
  }

  function showAuthError(message){
    const e=document.getElementById('err'); if(e)e.textContent='GOOGLE SIGN-IN ERROR · '+message;
    const b=document.getElementById('google'); if(b){b.disabled=false;b.textContent='G  Continue with Google'}
  }

  window.openAuth=function(){
    const landing=document.getElementById('landing'),auth=document.getElementById('auth'),app=document.getElementById('app');
    if(landing)landing.style.display='none';
    if(auth)auth.style.display='block';
    if(app)app.style.display='none';
    setTimeout(()=>document.getElementById('google')?.focus(),30);
  };

  window.login=async function(){
    const b=document.getElementById('google');
    if(b){b.disabled=true;b.textContent='CONNECTING TO GOOGLE…'}
    const e=document.getElementById('err');if(e)e.textContent='';
    sessionStorage.setItem(AI_AFTER_AUTH,'1');
    try{
      const client=await getClient();
      const redirectTo=window.location.origin+'/?auth=google';
      const {error}=await client.auth.signInWithOAuth({provider:'google',options:{redirectTo,queryParams:{prompt:'select_account',access_type:'online'}}});
      if(error)throw error;
    }catch(err){
      sessionStorage.removeItem(AI_AFTER_AUTH);
      console.error('[VENOM GOOGLE AUTH]',err);
      showAuthError(err?.message||String(err));
    }
  };

  async function finishAuth(){
    try{
      const client=await getClient();
      const {data:{session},error}=await client.auth.getSession();
      if(error)throw error;
      if(session && typeof window.applySession==='function') await window.applySession(session);
      if(session && sessionStorage.getItem(AI_AFTER_AUTH)==='1'){
        sessionStorage.removeItem(AI_AFTER_AUTH);
        let tries=0;
        const open=()=>{
          if(typeof window.newChat==='function'){window.newChat();return true}
          return false;
        };
        if(!open()){
          const timer=setInterval(()=>{if(open()||++tries>60)clearInterval(timer)},100);
        }
      }
      client.auth.onAuthStateChange(async(_event,next)=>{
        if(next && typeof window.applySession==='function') await window.applySession(next);
        if(next && sessionStorage.getItem(AI_AFTER_AUTH)==='1'){
          sessionStorage.removeItem(AI_AFTER_AUTH);
          setTimeout(()=>typeof window.newChat==='function'&&window.newChat(),150);
        }
      });
    }catch(err){console.error('[VENOM AUTH BOOT]',err)}
  }

  function makeInteractive(){
    document.querySelectorAll('a,button').forEach(el=>{
      if(el.dataset.venomInteraction)return;
      el.dataset.venomInteraction='1';
      el.addEventListener('pointerdown',()=>el.classList.add('venom-pressed'),{passive:true});
      ['pointerup','pointercancel','pointerleave'].forEach(ev=>el.addEventListener(ev,()=>el.classList.remove('venom-pressed'),{passive:true}));
    });
    const x=document.querySelector('[data-x-profile]');
    if(x)x.onclick=()=>window.open('https://x.com/SpideytrackerAI','_blank','noopener,noreferrer');
  }

  async function boot(){
    await ensureScript('/runtime-bridge.js?v='+VERSION,'data-venom-runtime-final');
    await ensureScript('/social-footer.js?v='+VERSION,'data-venom-social-footer');
    await ensureScript('/home-map-enhance.js?v='+VERSION,'data-venom-home-final');
    makeInteractive();
    new MutationObserver(makeInteractive).observe(document.body,{childList:true,subtree:true});
    await finishAuth();
    console.info('[VENOM] production boot '+VERSION+' ready');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();

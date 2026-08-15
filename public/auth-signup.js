/* VENOM AUTH — passwordless email signup / magic-link flow */
(function(){
  const VERSION='20260815-21';
  const SUPABASE_URL='https://dqqqagpsaaalsztblmsc.supabase.co';
  const SUPABASE_KEY='sb_publishable_a5XQdHRe3daJPTfYnEMIRA_m-B5sksH';
  const REDIRECT=()=>window.location.origin+'/?auth=email';

  function style(){
    if(document.getElementById('venom-auth-signup-style'))return;
    const s=document.createElement('style');s.id='venom-auth-signup-style';
    s.textContent=`
      .venomAuthModes{display:flex;gap:8px;margin:0 0 18px}
      .venomAuthMode{flex:1;border:1px solid rgba(85,221,214,.22);background:#0b1112;color:#aebcba;border-radius:12px;padding:11px 12px;font-weight:800;cursor:pointer}
      .venomAuthMode.active{border-color:#55ddd6;color:#55ddd6;box-shadow:0 0 18px rgba(85,221,214,.1)}
      .venomAuthForm{display:grid;gap:11px}
      .venomAuthInput{width:100%;box-sizing:border-box;border:1px solid rgba(232,222,203,.16);background:#0b1112;color:#f2eadc;border-radius:12px;padding:14px 15px;font:inherit;outline:none}
      .venomAuthInput:focus{border-color:#55ddd6;box-shadow:0 0 0 3px rgba(85,221,214,.08)}
      .venomAuthSubmit{border:0;border-radius:12px;padding:14px 16px;background:linear-gradient(135deg,#55ddd6,#2fb7b1);color:#071011;font-weight:900;cursor:pointer}
      .venomAuthHint{font-size:12px;line-height:1.55;color:#84918f;margin:2px 0 4px}
      .venomAuthSuccess{display:none;border:1px solid rgba(85,221,214,.25);background:rgba(85,221,214,.06);color:#d8fffc;border-radius:12px;padding:14px;line-height:1.5;margin-top:10px}
      .venomAuthSuccess.show{display:block}
    `;document.head.appendChild(s);
  }

  async function client(){
    if(window.__venomSupabase)return window.__venomSupabase;
    if(window.supabase?.createClient){
      window.__venomSupabase=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'pkce'}});
      return window.__venomSupabase;
    }
    throw new Error('Supabase client is not ready.');
  }

  function render(){
    const card=document.querySelector('#auth .authCard');
    if(!card)return;
    style();
    card.innerHTML=`
      <div class="authLogo">VENOM <span>GPT</span></div>
      <h1 id="venomAuthTitle">Welcome to Venom.</h1>
      <p id="venomAuthSubtitle">Sign in or create your workspace. No password and no verification code to type.</p>
      <div class="venomAuthModes">
        <button type="button" class="venomAuthMode active" id="venomSignInTab">SIGN IN</button>
        <button type="button" class="venomAuthMode" id="venomSignUpTab">CREATE ACCOUNT</button>
      </div>
      <button class="google" id="google" onclick="login()">G&nbsp;&nbsp; Continue with Google</button>
      <div style="display:flex;align-items:center;gap:10px;color:#667370;font-size:11px;margin:14px 0"><span style="height:1px;background:#243031;flex:1"></span>OR EMAIL<span style="height:1px;background:#243031;flex:1"></span></div>
      <form class="venomAuthForm" id="venomEmailForm">
        <input class="venomAuthInput hide" id="venomName" autocomplete="name" placeholder="Your name" maxlength="80">
        <input class="venomAuthInput" id="venomEmail" type="email" autocomplete="email" placeholder="Email address" required>
        <div class="venomAuthHint" id="venomAuthHint">We'll email you a secure sign-in link. Click it and you're in — no password or code.</div>
        <button class="venomAuthSubmit" id="venomEmailSubmit" type="submit">EMAIL ME A SIGN-IN LINK →</button>
      </form>
      <div id="venomAuthSuccess" class="venomAuthSuccess"></div>
      <div id="err" class="error"></div>
      <div class="secure">SECURE PASSWORDLESS AUTH · SUPABASE</div>
    `;
    const si=document.getElementById('venomSignInTab'),su=document.getElementById('venomSignUpTab'),name=document.getElementById('venomName');
    function mode(signup){
      si.classList.toggle('active',!signup);su.classList.toggle('active',signup);name.classList.toggle('hide',!signup);
      document.getElementById('venomAuthTitle').textContent=signup?'Create your Venom workspace.':'Welcome back.';
      document.getElementById('venomAuthSubtitle').textContent=signup?'Enter your name and email. We will send one secure link — no password, no code.':'Sign in with Google or get a secure sign-in link by email.';
      document.getElementById('venomEmailSubmit').textContent=signup?'CREATE ACCOUNT →':'EMAIL ME A SIGN-IN LINK →';
      document.getElementById('venomAuthSuccess').classList.remove('show');
      document.getElementById('err').textContent='';
    }
    si.onclick=()=>mode(false);su.onclick=()=>mode(true);
    document.getElementById('venomEmailForm').onsubmit=(e)=>{e.preventDefault();send(modeState());};
    let signup=false;
    function modeState(){return signup}
    const oldSi=si.onclick,oldSu=su.onclick;
    si.onclick=()=>{signup=false;oldSi()};su.onclick=()=>{signup=true;oldSu()};
  }

  async function send(signup){
    const email=(document.getElementById('venomEmail')?.value||'').trim();
    const name=(document.getElementById('venomName')?.value||'').trim();
    const submit=document.getElementById('venomEmailSubmit'),err=document.getElementById('err'),ok=document.getElementById('venomAuthSuccess');
    if(!email)return;
    if(signup&&!name){err.textContent='Please enter your name.';return}
    submit.disabled=true;submit.textContent='SENDING SECURE LINK…';err.textContent='';ok.classList.remove('show');
    try{
      const c=await client();
      const {error}=await c.auth.signInWithOtp({email,options:{emailRedirectTo:REDIRECT(),shouldCreateUser:true,data:signup?{full_name:name,first_name:name.split(/\s+/)[0]}:undefined}});
      if(error)throw error;
      sessionStorage.setItem('venom-open-ai','1');
      ok.innerHTML='<strong>Check your email.</strong><br>We sent a secure Venom GPT sign-in link to <b>'+email.replace(/[<>]/g,'')+'</b>. Open it to finish signing in automatically.';ok.classList.add('show');
      submit.textContent='LINK SENT ✓';
    }catch(e){err.textContent='EMAIL SIGN-IN ERROR · '+(e?.message||String(e));submit.disabled=false;submit.textContent=signup?'CREATE ACCOUNT →':'EMAIL ME A SIGN-IN LINK →'}
  }

  window.venomEmailSignupReady=true;
  const boot=()=>{render();};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();

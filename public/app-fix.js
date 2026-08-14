/* Venom GPT production polish: readable UI, working auth, tracker themes, interaction feedback */
(function(){
  const css=document.createElement('style');css.id='venom-production-polish';css.textContent=`
    html{font-size:16px}body{min-width:320px}
    .links a,.nav button,.sideBtn,.side a,.topbtn{font-size:15px!important}.nav{height:78px}.brand{font-size:28px!important}
    .hero p,.section p{font-size:19px!important}.eyebrow{font-size:13px!important}.heroActions a{font-size:15px!important;padding:16px 22px!important}
    .card h3{font-size:20px!important}.card p{font-size:15px!important}.kicker{font-size:13px!important}
    .authCard{width:min(560px,94vw);padding:52px!important}.authLogo{font-size:46px!important}.authCard h1{font-size:48px!important}.authCard p{font-size:18px!important}.google{font-size:18px!important;padding:19px!important}.secure,.error{font-size:13px!important}
    .layout{grid-template-columns:275px 1fr}.side{padding:18px}.sideBtn{padding:15px 16px!important}.title{font-size:13px!important}.side a{padding:11px 13px!important}
    .main{padding:38px 42px}.dashHero{padding:42px!important}.dashHero h1{font-size:70px!important}.dashHero p{font-size:20px!important}.dashBtns button{font-size:14px!important;padding:13px 16px!important}.dashCard h3,.module h3{font-size:18px!important}.row{font-size:14px!important}.module p{font-size:14px!important}
    .chatTitle{font-size:19px!important}.chatMeta{font-size:13px!important}.chatBody{padding:42px!important}.welcome h2{font-size:56px!important}.welcome p{font-size:18px!important}.bubble{font-size:17px!important;padding:17px 21px!important}.composer textarea{font-size:17px!important}.thinking{font-size:14px!important}.composer{min-height:70px}
    .light .appShell{background:#e9e0cc}.light .main{background:#e9e0cc}.light .side,.light .top{background:#f7f0df}.light .dash,.light .chat{background:#fffaf0}
    a,button,.click{transition:transform .12s ease,filter .12s ease}.venom-pressed{transform:scale(.97)!important;filter:brightness(1.15)}
    #venom-toast{transition:opacity .2s ease}
    @media(max-width:900px){.layout{grid-template-columns:1fr}.side{display:none}.main{padding:24px}.hero{margin:12px;height:auto;min-height:720px}.hero h1{font-size:78px!important}.status{position:relative;right:auto;top:auto;margin-top:30px;width:100%}}
    @media(max-width:600px){.nav{padding:0 16px}.brand{font-size:22px!important}.main{padding:16px}.dashHero h1{font-size:50px!important}.welcome{margin:70px auto}.welcome h2{font-size:38px!important}.authCard{padding:34px 24px!important}.authCard h1{font-size:36px!important}}
  `;document.head.appendChild(css);

  const U='https://dqqqagpsaaalsztblmsc.supabase.co';
  const production='https://venomgp.mel-m-ozturk.workers.dev/';

  window.openAuth=function(){landing.style.display='none';auth.style.display='block';app.style.display='none';const e=document.getElementById('err');if(e)e.textContent='';};

  window.login=async function(){
    const button=document.getElementById('google'),err=document.getElementById('err');
    if(button){button.disabled=true;button.textContent='CONNECTING TO GOOGLE…'}if(err)err.textContent='';
    try{
      if(!window.supabase)throw new Error('Authentication service is still loading. Please refresh and try again.');
      if(!client)client=supabase.createClient(U,K,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
      const {error}=await client.auth.signInWithOAuth({provider:'google',options:{redirectTo:production,queryParams:{prompt:'select_account'}}});
      if(error)throw error;
    }catch(e){console.error(e);if(err)err.textContent='GOOGLE SIGN-IN ERROR · '+(e?.message||'Unable to start authentication');if(button){button.disabled=false;button.textContent='G  Continue with Google'}}
  };

  window.boot=async function(){
    try{
      if(!window.supabase)return setTimeout(window.boot,300);
      if(!client)client=supabase.createClient(U,K,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
      const {data:{session}}=await client.auth.getSession();if(session)await applySession(session);
      client.auth.onAuthStateChange(async(_event,session)=>{if(session)await applySession(session);});
    }catch(e){console.error('Auth boot failed',e)}
  };

  window.pinChat=function(){toast('CHAT PINNED · PRIORITY LIST')};
  window.shareChat=function(){if(navigator.clipboard)navigator.clipboard.writeText(location.href);toast('SHARE LINK COPIED')};
  window.toast=function(text){let t=document.getElementById('venom-toast');if(!t){t=document.createElement('div');t.id='venom-toast';Object.assign(t.style,{position:'fixed',left:'50%',bottom:'28px',transform:'translateX(-50%)',zIndex:10000,padding:'12px 18px',border:'1px solid #d71920',borderRadius:'10px',background:'#101617',color:'#f3eadb',font:'900 12px monospace',boxShadow:'0 15px 45px #0008'});document.body.appendChild(t)}t.textContent=text;t.style.opacity='1';clearTimeout(t._timer);t._timer=setTimeout(()=>t.style.opacity='0',1800)};

  function setTrackerTheme(){const map=document.getElementById('map');if(!map)return;map.style.backgroundImage=`url(${document.body.classList.contains('light')?'/assets/spider-tech-tracker-light.svg':'/assets/spider-tech-tracker-dark.svg'})`;map.style.backgroundSize='cover';map.style.backgroundPosition='center'}
  const oldTheme=window.toggleTheme;window.toggleTheme=function(){if(typeof oldTheme==='function')oldTheme();else document.body.classList.toggle('light');setTrackerTheme()};

  function navFeedback(){document.querySelectorAll('a,button,.click').forEach(el=>{el.addEventListener('pointerdown',()=>el.classList.add('venom-pressed'),{passive:true});el.addEventListener('pointerup',()=>el.classList.remove('venom-pressed'),{passive:true});el.addEventListener('pointercancel',()=>el.classList.remove('venom-pressed'),{passive:true})})}
  window.addEventListener('DOMContentLoaded',()=>{setTrackerTheme();navFeedback();const field=document.getElementById('venomPrompt');if(field)window.prompt=field});
  window.addEventListener('load',()=>{setTrackerTheme();navFeedback();boot()});
})();
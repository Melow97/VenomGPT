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
    .vgCarousel{margin:36px auto 0;max-width:1180px;position:relative}
    .vgSlides{position:relative;overflow:hidden;border-radius:24px;border:1px solid #ffffff20;background:#0b1011;box-shadow:0 24px 80px #0008;min-height:390px}
    .vgSlide{position:absolute;inset:0;opacity:0;transform:scale(1.035);transition:opacity .8s ease,transform 1.1s ease;pointer-events:none}
    .vgSlide.active{opacity:1;transform:scale(1);pointer-events:auto}
    .vgSlideArt{position:absolute;inset:0;background-size:cover;background-position:center}
    .vgSlideArt.spider{background-image:linear-gradient(90deg,#05090be8 0%,#071012b0 42%,#07101230 100%),url('/assets/spider-tech-tracker-dark.svg');background-size:cover,cover}
    .vgSlideArt.workspace{background:radial-gradient(circle at 78% 28%,#55ddd655 0 2px,transparent 3px),linear-gradient(135deg,#081315,#12191b 48%,#05090a);background-size:42px 42px,cover}
    .vgSlideArt.vision{background:radial-gradient(circle at 70% 45%,#d7192038 0 70px,transparent 71px),linear-gradient(135deg,#090d0e,#1a1011 55%,#060708)}
    .vgSlideContent{position:relative;z-index:2;padding:58px;max-width:680px;height:100%;display:flex;flex-direction:column;justify-content:center}
    .vgSlideKicker{font:800 12px/1 monospace;letter-spacing:.2em;color:#55ddd6;margin-bottom:14px}.vgSlide h3{font:900 48px/1.02 system-ui;margin:0 0 14px;color:#f3eadb}.vgSlide p{font-size:17px;line-height:1.6;color:#cbd5d4;max-width:560px}.vgSlideTag{display:inline-flex;align-self:flex-start;margin-top:18px;padding:9px 12px;border:1px solid #ffffff20;border-radius:999px;background:#ffffff0a;font:800 11px monospace;letter-spacing:.08em}
    .vgCarouselDots{display:flex;justify-content:center;gap:8px;margin-top:16px}.vgCarouselDot{width:28px;height:5px;border:0;border-radius:99px;background:#ffffff24;cursor:pointer;padding:0}.vgCarouselDot.active{background:#55ddd6;box-shadow:0 0 14px #55ddd677}
    .vgCarouselHint{position:absolute;right:18px;bottom:18px;z-index:4;padding:8px 10px;border:1px solid #ffffff18;border-radius:999px;background:#080b0ccc;color:#aab7b6;font:700 10px monospace;letter-spacing:.08em}
    .light .vgSlides{background:#fffaf0;border-color:#00000014}.light .vgSlideArt.spider{background-image:linear-gradient(90deg,#fffaf0ee 0%,#fffaf0bb 48%,#fffaf022 100%),url('/assets/spider-tech-tracker-light.svg')}.light .vgSlideArt.workspace{background:radial-gradient(circle at 78% 28%,#1b777055 0 2px,transparent 3px),linear-gradient(135deg,#fffaf0,#efe6d5 48%,#e6dcc8);background-size:42px 42px,cover}.light .vgSlideArt.vision{background:radial-gradient(circle at 70% 45%,#d7192020 0 70px,transparent 71px),linear-gradient(135deg,#fffaf0,#eee3d4 55%,#dfd2bf)}.light .vgSlide h3{color:#171d1d}.light .vgSlide p{color:#485353}.light .vgCarouselHint{background:#fffaf0dd;color:#596665}.light .vgCarouselDot{background:#00000020}.light .vgCarouselDot.active{background:#1b7770}
    @media(max-width:700px){.vgSlideContent{padding:34px 26px}.vgSlide h3{font-size:34px}.vgSlides{min-height:430px}.vgCarouselHint{display:none}}
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

  function installWelcomeCarousel(){
    if(!document.getElementById('landing')||document.getElementById('venom-welcome-carousel'))return;
    const hero=document.querySelector('#landing .vgHero');if(!hero)return;
    const wrap=document.createElement('div');wrap.id='venom-welcome-carousel';wrap.className='vgCarousel';
    wrap.innerHTML=`
      <div class="vgSlides">
        <article class="vgSlide active"><div class="vgSlideArt spider"></div><div class="vgSlideContent"><div class="vgSlideKicker">01 // SPIDER-TECH</div><h3>Spider Tracker.</h3><p>Retro NYC signal intelligence, moving paths and tactile controls — built as a cinematic Venom GPT experience.</p><span class="vgSlideTag">LIVE DEMO TELEMETRY</span></div></article>
        <article class="vgSlide"><div class="vgSlideArt workspace"></div><div class="vgSlideContent"><div class="vgSlideKicker">02 // AI WORKSPACE</div><h3>One workspace. Every mode.</h3><p>Chat, voice, thinking, code, research, files, images and data — presented as one polished AI cockpit.</p><span class="vgSlideTag">CHAT · VOICE · THINK · CREATE</span></div></article>
        <article class="vgSlide"><div class="vgSlideArt vision"></div><div class="vgSlideContent"><div class="vgSlideKicker">03 // VENOM VISION</div><h3>Built to feel alive.</h3><p>Small clicks, responsive motion and cinematic surfaces make the interface something you can actually play with.</p><span class="vgSlideTag">INTERACTIVE BY DESIGN</span></div></article>
      </div>
      <div class="vgCarouselDots"><button class="vgCarouselDot active" aria-label="Spider Tracker"></button><button class="vgCarouselDot" aria-label="AI Workspace"></button><button class="vgCarouselDot" aria-label="Venom Vision"></button></div>
      <div class="vgCarouselHint">AUTO-SLIDE · 5 SEC</div>`;
    hero.insertAdjacentElement('afterend',wrap);
    const slides=[...wrap.querySelectorAll('.vgSlide')],dots=[...wrap.querySelectorAll('.vgCarouselDot')];
    let index=0,timer;
    const show=i=>{index=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.classList.toggle('active',n===index));dots.forEach((d,n)=>d.classList.toggle('active',n===index));};
    const start=()=>{clearInterval(timer);timer=setInterval(()=>show(index+1),5000)};
    dots.forEach((d,n)=>d.addEventListener('click',()=>{show(n);start()}));
    wrap.addEventListener('mouseenter',()=>clearInterval(timer));
    wrap.addEventListener('mouseleave',start);
    start();
  }

  window.addEventListener('DOMContentLoaded',()=>{setTrackerTheme();navFeedback();installWelcomeCarousel();const field=document.getElementById('venomPrompt');if(field)window.prompt=field});
  window.addEventListener('load',()=>{setTrackerTheme();navFeedback();installWelcomeCarousel();boot()});
})();
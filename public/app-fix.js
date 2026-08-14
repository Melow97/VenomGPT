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

  function installRetroTracker(){
    const root=document.querySelector('#tracker .vgTracker');
    if(!root||root.dataset.retroZoom==='1')return;
    root.dataset.retroZoom='1';
    const map=root.querySelector('.vgMap');
    if(!map)return;
    map.innerHTML=`<div class="rt-grid"></div><div class="rt-streets"></div><div class="rt-skyline"><i class="empire">EMPIRE<br>STATE</i><i class="tower">MIDTOWN</i><i class="oneWTC">1 WTC</i></div><div class="rt-borough manhattan">MANHATTAN</div><div class="rt-borough queens">QUEENS</div><div class="rt-borough brooklyn">BROOKLYN</div><div class="rt-borough bronx">BRONX</div><div class="rt-signal s1" data-label="SIGNAL A-01"></div><div class="rt-signal s2" data-label="SIGNAL A-02"></div><div class="rt-signal s3" data-label="COMMUNITY PING"></div><div class="rt-signal s4" data-label="ACTIVE TRACE"></div><div class="rt-signal s5" data-label="SIGNAL A-05"></div><div class="rt-path"></div><div class="rt-reticle"><span></span></div><div class="rt-panel"><b>SPIDER-TECH // SAT-01</b><span id="rtCoords">40.7484° N · 73.9857° W</span><span id="rtZoomReadout">CITY VIEW · 1.0×</span></div><div class="rt-sat">◉ NYC SIGNAL ONLINE</div><div class="rt-moon"><span>☾</span><b>LUNAR VIEW</b><small>ORBITAL RANGE</small></div><div class="rt-scan"></div>`;
    const style=document.createElement('style');style.id='venom-retro-tracker';style.textContent=`
      #tracker .vgTracker{overflow:hidden;background:#070b10;border:1px solid #55ddd655;box-shadow:0 20px 70px #0009}
      #tracker .vgMap{height:620px!important;min-height:620px;position:relative;overflow:hidden;background:#081329;cursor:grab;touch-action:none;isolation:isolate}
      #tracker .vgMap:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 52% 45%,#172f66 0,#0b1730 46%,#040810 100%);z-index:-3}
      .rt-grid{position:absolute;inset:-20%;background-image:linear-gradient(#47b9d918 1px,transparent 1px),linear-gradient(90deg,#47b9d918 1px,transparent 1px);background-size:42px 42px;transform:rotate(-7deg);z-index:-2}
      .rt-streets{position:absolute;inset:-10%;background:repeating-linear-gradient(18deg,transparent 0 34px,#4fc8e52c 35px 36px,transparent 37px 68px),repeating-linear-gradient(78deg,transparent 0 52px,#4fc8e51d 53px 54px,transparent 55px 98px);transform:rotate(-8deg);z-index:-1}
      .rt-borough{position:absolute;color:#67d9e4aa;font:900 24px monospace;letter-spacing:.12em;text-shadow:0 0 12px #2bb8c855}.manhattan{left:45%;top:35%}.queens{right:9%;top:28%}.brooklyn{right:18%;bottom:16%}.bronx{left:49%;top:8%}
      .rt-skyline{position:absolute;left:42%;top:22%;width:190px;height:220px;opacity:.65;color:#87b8c9;font:900 9px monospace;text-align:center}.rt-skyline:before{content:"";position:absolute;left:40%;bottom:0;width:34px;height:150px;background:linear-gradient(90deg,#07101b,#29465b,#07101b);clip-path:polygon(20% 100%,20% 16%,43% 4%,57% 0,70% 4%,84% 16%,84% 100%);box-shadow:0 0 20px #55ddd622}.rt-skyline:after{content:"";position:absolute;left:54%;bottom:0;width:14px;height:195px;background:linear-gradient(90deg,#07101b,#37576a,#07101b);clip-path:polygon(25% 100%,25% 18%,50% 0,75% 18%,75% 100%)}.rt-skyline i{position:absolute;font-style:normal;z-index:2}.empire{left:0;bottom:48px;color:#ffb06d}.tower{right:0;top:45px;color:#55ddd6}.oneWTC{left:2px;top:8px;color:#d6b66a}
      .rt-signal{position:absolute;width:20px;height:20px;border:2px solid #ff5c45;border-radius:50%;background:#ff5c4525;box-shadow:0 0 0 6px #ff5c4512,0 0 28px #ff5c4c99;z-index:4}.rt-signal:after{content:"";position:absolute;inset:5px;background:#ff715d;border-radius:50%;box-shadow:0 0 10px #ff715d}.rt-signal:before{content:attr(data-label);position:absolute;left:24px;top:-6px;white-space:nowrap;color:#ffb29e;font:800 9px monospace;background:#080d14dd;border:1px solid #ff5c4540;padding:5px 7px}.s1{left:45%;top:42%}.s2{left:59%;top:51%;animation:rtPulse 1.8s infinite}.s3{left:70%;top:32%;}.s4{left:36%;top:62%;animation:rtPulse 2.1s infinite}.s5{left:24%;top:43%}@keyframes rtPulse{50%{transform:scale(1.3);box-shadow:0 0 0 12px #ff5c4510,0 0 34px #ff5c4cbb}}
      .rt-path{position:absolute;left:30%;top:54%;width:42%;height:18%;border-top:2px dashed #55ddd6aa;border-radius:50%;transform:rotate(-16deg);filter:drop-shadow(0 0 7px #55ddd655)}
      .rt-reticle{position:absolute;left:50%;top:50%;width:84px;height:84px;transform:translate(-50%,-50%);border:1px solid #55ddd688;border-radius:50%;box-shadow:0 0 35px #55ddd622}.rt-reticle:before,.rt-reticle:after,.rt-reticle span:before,.rt-reticle span:after{content:"";position:absolute;background:#55ddd688}.rt-reticle:before,.rt-reticle:after{width:110px;height:1px;left:-14px;top:41px}.rt-reticle:after{transform:rotate(90deg)}.rt-reticle span:before,.rt-reticle span:after{width:1px;height:18px;left:41px;top:-1px}.rt-reticle span:after{top:67px}
      .rt-panel{position:absolute;left:18px;top:18px;display:flex;flex-direction:column;gap:6px;padding:11px 13px;background:#06101adf;border:1px solid #55ddd655;color:#b9d8d8;font:800 10px monospace;letter-spacing:.05em;box-shadow:0 10px 30px #0008}.rt-panel b{color:#55ddd6}.rt-sat{position:absolute;right:18px;top:18px;color:#66efb7;font:900 10px monospace;background:#06101adf;border:1px solid #66efb733;padding:10px}.rt-moon{position:absolute;right:22px;bottom:22px;width:96px;height:96px;border:1px solid #d6b66a55;border-radius:50%;background:radial-gradient(circle at 35% 35%,#f3e1ae 0 8%,#8e7d62 9% 16%,#302c29 17% 55%,#0a0d13 56%);box-shadow:0 0 40px #d6b66a22;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#f0d89a;text-align:center}.rt-moon span{font-size:28px}.rt-moon b{font:900 7px monospace}.rt-moon small{font:700 6px monospace;color:#8d9a9d}
      .rt-scan{position:absolute;left:0;right:0;height:2px;top:0;background:linear-gradient(90deg,transparent,#55ddd6aa,transparent);box-shadow:0 0 18px #55ddd6;animation:rtScan 4.5s linear infinite}@keyframes rtScan{0%{transform:translateY(0)}100%{transform:translateY(620px)}}
      #tracker .vgMap.rt-zoom-city{background:#071426}#tracker .vgMap.rt-zoom-orbit .rt-grid{background-size:90px 90px}#tracker .vgMap.rt-zoom-orbit .rt-streets{opacity:.35}#tracker .vgMap.rt-zoom-orbit .rt-skyline{transform:scale(.45);left:46%;top:35%}#tracker .vgMap.rt-zoom-orbit .rt-borough{opacity:.5;transform:scale(.75)}#tracker .vgMap.rt-zoom-orbit .rt-moon{transform:scale(1.35);right:8%;bottom:8%}
      #tracker .vgMap.rt-dragging{cursor:grabbing}.rt-zoom-controls{position:absolute;left:18px;bottom:18px;z-index:9;display:flex;gap:6px}.rt-zoom-controls button{min-width:42px;height:38px;border:1px solid #55ddd655;background:#06101ade;color:#f3eadb;border-radius:7px;font:900 16px monospace;cursor:pointer}.rt-zoom-controls button:hover{border-color:#55ddd6;color:#55ddd6}.rt-zoom-level{padding:10px 12px;border:1px solid #55ddd633;background:#06101ade;color:#d6b66a;font:900 9px monospace;display:flex;align-items:center}
      .light #tracker .vgMap{background:#243d61}.light .rt-grid{background-image:linear-gradient(#1a77701e 1px,transparent 1px),linear-gradient(90deg,#1a77701e 1px,transparent 1px)}.light .rt-streets{opacity:.7}.light .rt-panel,.light .rt-sat,.light .rt-zoom-controls button{background:#fff7e8ee;color:#273131;border-color:#1b777044}.light .rt-borough{color:#126e75aa}.light .rt-moon{background:radial-gradient(circle at 35% 35%,#fff0b7 0 8%,#b79b6d 9% 16%,#655a4d 17% 55%,#e8dcc9 56%);color:#765a22}
      @media(max-width:700px){#tracker .vgMap{height:520px!important;min-height:520px}.rt-skyline{transform:scale(.75);left:35%}.rt-borough{font-size:14px}.rt-panel{font-size:8px}.rt-sat{display:none}}
    `;document.head.appendChild(style);
    const controls=document.createElement('div');controls.className='rt-zoom-controls';controls.innerHTML='<button type="button" data-z="out" aria-label="Zoom out">−</button><div class="rt-zoom-level" id="rtZoomLevel">CITY · 1.0×</div><button type="button" data-z="in" aria-label="Zoom in">+</button><button type="button" data-z="moon" aria-label="Orbital view">☾</button>';
    map.appendChild(controls);
    let zoom=1,panX=0,panY=0,dragging=false,startX=0,startY=0,baseX=0,baseY=0;
    const readout=()=>{const level=zoom>=3?'ORBITAL':zoom>=2?'DISTRICT':'CITY';document.getElementById('rtZoomLevel').textContent=level+' · '+zoom.toFixed(1)+'×';const r=document.getElementById('rtZoomReadout');if(r)r.textContent=level+' VIEW · '+zoom.toFixed(1)+'×';};
    const apply=()=>{const scale=Math.max(1,Math.min(4,zoom));map.querySelector('.rt-grid').style.transform=`rotate(-7deg) scale(${scale}) translate(${panX/scale}px,${panY/scale}px)`;map.querySelector('.rt-streets').style.transform=`rotate(-8deg) scale(${scale}) translate(${panX/scale}px,${panY/scale}px)`;map.classList.toggle('rt-zoom-orbit',scale>=3);map.classList.toggle('rt-zoom-city',scale<2);readout()};
    const change=d=>{zoom=Math.max(1,Math.min(4,+(zoom+d).toFixed(1)));if(zoom===1){panX=panY=0}apply()};
    controls.querySelector('[data-z="in"]').onclick=()=>change(.5);controls.querySelector('[data-z="out"]').onclick=()=>change(-.5);controls.querySelector('[data-z="moon"]').onclick=()=>{zoom=3.5;panX=panY=0;apply();toast('ORBITAL VIEW · LUNAR RANGE');};
    map.addEventListener('wheel',e=>{e.preventDefault();change(e.deltaY<0?.25:-.25)},{passive:false});
    map.addEventListener('pointerdown',e=>{if(e.target.closest('.rt-zoom-controls'))return;dragging=true;map.classList.add('rt-dragging');startX=e.clientX;startY=e.clientY;baseX=panX;baseY=panY;map.setPointerCapture(e.pointerId)});map.addEventListener('pointermove',e=>{if(!dragging)return;panX=baseX+(e.clientX-startX);panY=baseY+(e.clientY-startY);apply()});map.addEventListener('pointerup',e=>{dragging=false;map.classList.remove('rt-dragging');try{map.releasePointerCapture(e.pointerId)}catch{}});map.addEventListener('dblclick',()=>change(.5));
    apply();
  }

  window.addEventListener('DOMContentLoaded',()=>{setTrackerTheme();navFeedback();installWelcomeCarousel();installRetroTracker();const field=document.getElementById('venomPrompt');if(field)window.prompt=field});
  window.addEventListener('load',()=>{setTrackerTheme();navFeedback();installWelcomeCarousel();installRetroTracker();boot()});
})();
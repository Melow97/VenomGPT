/* VENOM GPT — RUNTIME OVERRIDE / SAFE FAILSAFE v2
   Repairs OAuth return handling, adds the Venom-eye brand indicator,
   premium hover navigation and the company X follow link without replacing
   the authoritative renderer. */
(()=>{
  'use strict';
  if(window.__VENOM_RUNTIME_OVERRIDE_V2)return;
  window.__VENOM_RUNTIME_OVERRIDE_V2=true;

  const SUPABASE_URL='https://dqqqagpsaaalsztblmsc.supabase.co';
  const SUPABASE_KEY='sb_publishable_a5XQdHRe3daJPTfYnEMIRA_m-B5sksfH';
  let client=null;
  const getClient=()=>client||(client=window.supabase?.createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'pkce'}}));
  const $=id=>document.getElementById(id);

  function addCSS(){
    if($('venom-runtime-v2-css'))return;
    const s=document.createElement('style');
    s.id='venom-runtime-v2-css';
    s.textContent=`
      .venom-eyes{display:inline-flex;align-items:center;gap:4px;margin-left:8px;vertical-align:middle;transform:translateY(-1px);filter:drop-shadow(0 0 5px rgba(255,255,255,.45))}
      .venom-eye{display:block;width:13px;height:7px;background:#fff;border-radius:100% 8px 100% 8px;box-shadow:0 0 8px rgba(255,255,255,.8);transform:skewX(-18deg)}
      .venom-eye:last-child{transform:scaleX(-1) skewX(-18deg)}
      .va-brand .venom-eyes,.va-sidebrand .venom-eyes{transform:scale(.82) translateY(-1px);transform-origin:left center}
      .va-hero h1 .venom-eyes{transform:scale(1.45) translateY(-3px);transform-origin:left center;margin-left:14px}
      .venom-nav-dropdown{position:relative;height:100%;display:flex;align-items:center}
      .venom-nav-trigger{border:0;background:transparent;color:#413a32;font:800 13px Inter,system-ui,sans-serif;cursor:pointer;padding:25px 2px;display:flex;align-items:center;gap:6px}
      .venom-nav-trigger .chev{font-size:10px;transition:transform .18s ease}
      .venom-nav-dropdown:hover .chev,.venom-nav-dropdown:focus-within .chev{transform:rotate(180deg)}
      .venom-nav-panel{position:absolute;top:58px;left:50%;transform:translate(-50%,8px);width:520px;padding:12px;display:grid;grid-template-columns:1fr 1fr;gap:8px;background:rgba(250,241,225,.98);border:1px solid #c8b9a4;border-radius:18px;box-shadow:0 25px 70px rgba(52,39,24,.22);opacity:0;pointer-events:none;visibility:hidden;transition:opacity .16s ease,transform .16s ease,visibility .16s ease;z-index:100}
      .venom-nav-dropdown:hover .venom-nav-panel,.venom-nav-dropdown:focus-within .venom-nav-panel{opacity:1;pointer-events:auto;visibility:visible;transform:translate(-50%,0)}
      .venom-nav-panel .nav-panel-title{grid-column:1/-1;padding:7px 10px 4px;color:#159c96;font:900 10px ui-monospace,monospace;letter-spacing:1.6px}
      .venom-nav-item{display:flex;gap:11px;align-items:flex-start;text-decoration:none;color:#342f29;padding:12px;border-radius:12px;border:1px solid transparent}
      .venom-nav-item:hover{background:#fff8eb;border-color:#d4c5ae;transform:translateY(-1px)}
      .venom-nav-icon{width:28px;height:28px;display:grid;place-items:center;border-radius:9px;background:#e8ddd0;color:#159c96;font-weight:950;flex:none}
      .venom-nav-item b{display:block;font-size:13px;margin-bottom:3px}
      .venom-nav-item span{display:block;color:#7a7064;font-size:11px;line-height:1.35;font-weight:600}
      .venom-x-link{display:inline-flex;align-items:center;gap:7px;text-decoration:none;color:#413a32;font-size:12px;font-weight:900;padding:9px 11px;border:1px solid #c5b6a1;border-radius:10px;background:#f8efdf;white-space:nowrap}
      .venom-x-link:hover{border-color:#1f1f1f;background:#fff;color:#111;transform:translateY(-1px)}
      .venom-x-icon{font-weight:1000;font-size:14px}
      .venom-footer-follow{margin-top:28px;display:flex;justify-content:center}
      @media(max-width:900px){
        .venom-nav-panel{position:fixed;top:70px;left:16px;right:16px;width:auto;transform:translateY(8px);grid-template-columns:1fr}
        .venom-nav-dropdown:hover .venom-nav-panel,.venom-nav-dropdown:focus-within .venom-nav-panel{transform:translateY(0)}
      }
      @media(max-width:600px){.venom-x-link{display:none}.venom-eyes{margin-left:5px}.venom-eye{width:10px;height:6px}}
    `;
    document.head.appendChild(s);
  }

  function fixTheme(){
    const b=$('va-theme');
    if(!b||b.dataset.runtimeTheme)return;
    b.dataset.runtimeTheme='1';
    const apply=()=>{const dark=localStorage.getItem('venom-theme')==='dark';document.body.classList.toggle('venom-dark',dark);b.textContent=dark?'☀':'☾';b.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode')};
    b.onclick=()=>{localStorage.setItem('venom-theme',document.body.classList.contains('venom-dark')?'light':'dark');apply()};
    apply();
  }

  function fixSignIn(){
    const b=$('va-google');
    if(!b||b.dataset.runtimeAuth)return;
    b.dataset.runtimeAuth='1';
    b.onclick=async()=>{
      const err=$('va-err');b.disabled=true;b.textContent='CONNECTING TO GOOGLE…';if(err)err.textContent='';
      try{
        const c=getClient();
        if(!c)throw new Error('Authentication service did not load. Please refresh and try again.');
        const {error}=await c.auth.signInWithOAuth({provider:'google',options:{redirectTo:window.location.origin+'/',queryParams:{prompt:'select_account'},skipBrowserRedirect:false}});
        if(error)throw error;
      }catch(e){
        console.error('[VENOM AUTH]',e);
        if(err)err.textContent='GOOGLE SIGN-IN ERROR · '+(e?.message||String(e));
        b.disabled=false;b.textContent='G  Continue with Google';
      }
    };
  }

  async function hardenOAuthReturn(){
    const c=getClient();
    if(!c)return;
    const params=new URLSearchParams(window.location.search);
    const code=params.get('code');
    const oauthMarker=params.get('auth');
    if(!code&&!oauthMarker)return;
    try{
      let data=(await c.auth.getSession()).data;
      if(!data?.session&&code){
        const result=await c.auth.exchangeCodeForSession(code);
        if(result.error)throw result.error;
        data=result.data;
      }
      if(data?.session){
        console.info('[VENOM AUTH] Google session recovered; restarting authoritative boot');
        history.replaceState({},document.title,window.location.pathname);
        window.location.replace(window.location.pathname);
        return;
      }
      console.warn('[VENOM AUTH] OAuth return had no session');
    }catch(e){
      console.error('[VENOM AUTH CALLBACK]',e);
      const err=$('va-err');
      if(err)err.textContent='GOOGLE CALLBACK ERROR · '+(e?.message||String(e));
    }
  }

  function removeUglyPlus(){const p=$('va-plus');if(p){p.remove();const tools=$('va-tools');if(tools)tools.style.display='none'}}
  function repairSidebar(){document.querySelectorAll('.va-sidebtn[data-view]').forEach(btn=>{if(btn.dataset.runtimeNav)return;btn.dataset.runtimeNav='1';btn.addEventListener('click',()=>{if(typeof window.navigate==='function')window.navigate(btn.dataset.view,btn)})})}

  function addEyes(el){
    if(!el||el.querySelector('.venom-eyes'))return;
    const t=Array.from(el.childNodes).find(n=>n.nodeType===3&&/venom/i.test(n.nodeValue||''));
    if(!t)return;
    const eyes=document.createElement('span');eyes.className='venom-eyes';eyes.setAttribute('aria-hidden','true');eyes.innerHTML='<i class="venom-eye"></i><i class="venom-eye"></i>';el.appendChild(eyes);
  }
  function decorateVenom(){document.querySelectorAll('.va-brand,.va-sidebrand,.va-hero h1,.va-view h1,.va-view h2,.va-kicker').forEach(el=>addEyes(el))}

  function makeDropdown(title,items){
    const wrap=document.createElement('div');wrap.className='venom-nav-dropdown';
    wrap.innerHTML=`<button class="venom-nav-trigger" type="button" aria-haspopup="true" aria-expanded="false">${title}<span class="chev">⌄</span></button><div class="venom-nav-panel" role="menu"><div class="nav-panel-title">${title.toUpperCase()} · VENOM GPT</div>${items.map(x=>`<a class="venom-nav-item" href="${x.href}" role="menuitem"><span class="venom-nav-icon">${x.icon}</span><span><b>${x.name}</b><span>${x.desc}</span></span></a>`).join('')}</div>`;
    const trigger=wrap.querySelector('.venom-nav-trigger');trigger.addEventListener('click',()=>{const open=wrap.classList.toggle('open');trigger.setAttribute('aria-expanded',String(open))});
    return wrap;
  }

  function repairLandingNav(){
    const nav=document.querySelector('.va-nav'),links=document.querySelector('.va-navlinks');
    if(!nav||!links||links.dataset.runtimeDropdowns)return;
    links.dataset.runtimeDropdowns='1';
    const feature=Array.from(links.querySelectorAll('a')).find(a=>a.textContent.trim().toLowerCase()==='features');
    const workspace=Array.from(links.querySelectorAll('a')).find(a=>a.textContent.trim().toLowerCase()==='workspace');
    if(feature)feature.replaceWith(makeDropdown('Features',[
      {icon:'◉',name:'AI Chat',desc:'Fast everyday conversation and assistance.',href:'#features'},
      {icon:'◈',name:'Think Mode',desc:'A deeper reasoning path for harder tasks.',href:'#features'},
      {icon:'◎',name:'Research Lab',desc:'Organise investigation, sources and findings.',href:'#features'},
      {icon:'▧',name:'Image Studio',desc:'Create visual concepts directly in Venom.',href:'#features'},
      {icon:'⌘',name:'Code Studio',desc:'Build, debug and explore code with AI.',href:'#features'},
      {icon:'🎙',name:'Voice & Vision',desc:'Talk naturally and work with visual input.',href:'#features'},
      {icon:'▤',name:'Files & Data',desc:'Work across documents, tables and data.',href:'#features'},
      {icon:'✦',name:'Spider-Tech',desc:'Open the cinematic tactical tracker.',href:'#tracker'}
    ]));
    if(workspace)workspace.replaceWith(makeDropdown('Workspace',[
      {icon:'⌂',name:'Your Workspace',desc:'A focused home for chats, projects and tools.',href:'#workspace'},
      {icon:'▦',name:'Projects',desc:'Keep related work together in one place.',href:'#workspace'},
      {icon:'▤',name:'Documents',desc:'Draft, analyse and organise your files.',href:'#features'},
      {icon:'♢',name:'Team Spaces',desc:'Designed for shared work and collaboration.',href:'#workspace'},
      {icon:'⚡',name:'Connected Tools',desc:'Bring your favourite workflows into one shell.',href:'#workspace'},
      {icon:'✦',name:'Spider Tracker',desc:'Jump into the tactical map experience.',href:'#tracker'}
    ]));
    if(!nav.querySelector('.venom-x-link')){
      const actions=nav.querySelector(':scope > div:last-child');
      if(actions){const x=document.createElement('a');x.className='venom-x-link';x.href='https://x.com/SpideytrackerAI';x.target='_blank';x.rel='noopener noreferrer';x.innerHTML='<span class="venom-x-icon">𝕏</span> Follow us';actions.insertBefore(x,actions.firstChild)}
    }
  }

  function addLandingFollow(){
    const section=document.querySelector('#tracker');
    if(!section||section.querySelector('.venom-footer-follow'))return;
    const row=document.createElement('div');row.className='venom-footer-follow';row.innerHTML='<a class="venom-x-link" href="https://x.com/SpideytrackerAI" target="_blank" rel="noopener noreferrer"><span class="venom-x-icon">𝕏</span> Follow SpideyTracker AI on X</a>';section.appendChild(row);
  }

  function repair(){addCSS();fixTheme();fixSignIn();removeUglyPlus();repairSidebar();decorateVenom();repairLandingNav();addLandingFollow()}
  const mo=new MutationObserver(repair);
  function boot(){repair();hardenOAuthReturn();if(document.body)mo.observe(document.body,{childList:true,subtree:true})}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();

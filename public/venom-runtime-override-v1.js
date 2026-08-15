/* VENOM GPT — RUNTIME OVERRIDE / SAFE FAILSAFE v3
   Repairs OAuth return handling, sharp Venom-eye branding, premium hover navigation,
   pricing, contact and company social links without replacing the authoritative renderer. */
(()=>{
  'use strict';
  if(window.__VENOM_RUNTIME_OVERRIDE_V3)return;
  window.__VENOM_RUNTIME_OVERRIDE_V3=true;

  const SUPABASE_URL='https://dqqqagpsaaalsztblmsc.supabase.co';
  const SUPABASE_KEY='sb_publishable_a5XQdHRe3daJPTfYnEMIRA_m-B5sksfH';
  let client=null;
  const getClient=()=>client||(client=window.supabase?.createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'pkce'}}));
  const $=id=>document.getElementById(id);

  function addCSS(){
    if($('venom-runtime-v3-css'))return;
    const s=document.createElement('style');s.id='venom-runtime-v3-css';
    s.textContent=`
      .venom-eyes{display:inline-flex;align-items:center;gap:3px;margin-left:8px;vertical-align:middle;transform:translateY(-1px);filter:drop-shadow(0 0 5px rgba(255,255,255,.35))}
      .venom-eye{position:relative;display:block;width:18px;height:12px;background:#111;clip-path:polygon(0 55%,20% 18%,50% 0,82% 18%,100% 55%,72% 43%,48% 38%,24% 43%);filter:drop-shadow(0 1px 2px #000)}
      .venom-eye:after{content:"";position:absolute;inset:2px 3px 3px 3px;background:#fff;clip-path:polygon(0 55%,20% 18%,50% 0,82% 18%,100% 55%,72% 43%,48% 38%,24% 43%)}
      .venom-eye:last-child{transform:scaleX(-1)}
      .va-brand .venom-eyes,.va-sidebrand .venom-eyes{transform:scale(.82) translateY(-1px);transform-origin:left center}
      .va-hero h1 .venom-eyes{transform:scale(1.45) translateY(-3px);transform-origin:left center;margin-left:14px}
      .venom-nav-dropdown{position:relative;height:100%;display:flex;align-items:center}
      .venom-nav-trigger{border:0;background:transparent;color:#413a32;font:800 13px Inter,system-ui,sans-serif;cursor:pointer;padding:25px 2px;display:flex;align-items:center;gap:6px}
      .venom-nav-trigger .chev{font-size:10px;transition:transform .18s ease}.venom-nav-dropdown:hover .chev,.venom-nav-dropdown:focus-within .chev{transform:rotate(180deg)}
      .venom-nav-panel{position:absolute;top:58px;left:50%;transform:translate(-50%,8px);width:560px;padding:12px;display:grid;grid-template-columns:1fr 1fr;gap:8px;background:rgba(250,241,225,.99);border:1px solid #c8b9a4;border-radius:20px;box-shadow:0 25px 70px rgba(52,39,24,.24);opacity:0;pointer-events:none;visibility:hidden;transition:opacity .16s ease,transform .16s ease,visibility .16s ease;z-index:100}
      .venom-nav-dropdown:hover .venom-nav-panel,.venom-nav-dropdown:focus-within .venom-nav-panel{opacity:1;pointer-events:auto;visibility:visible;transform:translate(-50%,0)}
      .venom-nav-panel .nav-panel-title{grid-column:1/-1;padding:7px 10px 4px;color:#159c96;font:900 10px ui-monospace,monospace;letter-spacing:1.6px}
      .venom-nav-item{display:flex;gap:11px;align-items:flex-start;text-decoration:none;color:#342f29;padding:12px;border-radius:13px;border:1px solid transparent;transition:.15s ease}
      .venom-nav-item:hover{background:#fff8eb;border-color:#d4c5ae;transform:translateY(-1px);box-shadow:0 8px 18px rgba(52,39,24,.08)}
      .venom-nav-icon{width:31px;height:31px;display:grid;place-items:center;border-radius:10px;background:linear-gradient(145deg,#eee3d3,#ded0bb);color:#159c96;font-size:16px;flex:none;box-shadow:inset 0 1px #fff}
      .venom-nav-item b{display:block;font-size:13px;margin-bottom:3px}.venom-nav-item span{display:block;color:#7a7064;font-size:11px;line-height:1.35;font-weight:600}
      .venom-x-link{display:inline-flex;align-items:center;gap:7px;text-decoration:none;color:#413a32;font-size:12px;font-weight:900;padding:9px 11px;border:1px solid #c5b6a1;border-radius:10px;background:#f8efdf;white-space:nowrap}.venom-x-link:hover{border-color:#1f1f1f;background:#fff;color:#111;transform:translateY(-1px)}
      .venom-x-icon{font-weight:1000;font-size:14px}.venom-footer-follow{margin-top:28px;display:flex;justify-content:center;flex-wrap:wrap;gap:10px}
      .venom-pricing{max-width:1220px;margin:auto;padding:78px 34px;background:linear-gradient(180deg,#efe4d000,#e8dbc600 18%,#e8dbc600 82%,#efe4d000);scroll-margin-top:70px}
      .venom-pricing-head{text-align:center;max-width:700px;margin:0 auto 32px}.venom-pricing-head h2{font-size:48px;letter-spacing:-2px;margin:8px 0 12px}.venom-pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
      .venom-price-card{position:relative;padding:28px;border:1px solid #c8bba7;background:#f8efdf;border-radius:22px;min-height:340px;box-shadow:0 18px 45px rgba(70,55,35,.07);transition:.2s ease}.venom-price-card:hover{transform:translateY(-5px);border-color:#1bbeb6;box-shadow:0 24px 55px rgba(70,55,35,.13)}
      .venom-price-card.featured{border:2px solid #1bbeb6;box-shadow:0 22px 60px rgba(27,190,182,.14)}.venom-price-badge{position:absolute;right:18px;top:18px;background:#1fbdb5;color:#fff;border-radius:999px;padding:6px 9px;font:900 9px ui-monospace;letter-spacing:.7px}.venom-price-icon{font-size:29px}.venom-price-card h3{font-size:22px;margin:12px 0 3px}.venom-price{font-size:42px;font-weight:1000;letter-spacing:-2px}.venom-price small{font-size:13px;font-weight:700;color:#7a7064;letter-spacing:0}.venom-price-card p{color:#746b60;line-height:1.5;font-size:13px}.venom-price-card ul{padding-left:20px;color:#4f473e;font-size:13px;line-height:1.8}.venom-price-card .va-btn{margin-top:8px;width:100%}
      .venom-contact{margin:36px auto 0;max-width:860px;padding:24px;border:1px solid #c8bba7;border-radius:20px;background:#f8efdf;display:flex;align-items:center;justify-content:space-between;gap:20px}.venom-contact h3{margin:0 0 5px;font-size:20px}.venom-contact p{margin:0;color:#746b60;font-size:13px;line-height:1.5}.venom-contact a{color:#159c96;font-weight:900;text-decoration:none}.venom-contact a:hover{text-decoration:underline}
      @media(max-width:900px){.venom-nav-panel{position:fixed;top:70px;left:16px;right:16px;width:auto;transform:translateY(8px);grid-template-columns:1fr}.venom-pricing-grid{grid-template-columns:1fr}.venom-contact{flex-direction:column;align-items:flex-start}.venom-nav-dropdown:hover .venom-nav-panel,.venom-nav-dropdown:focus-within .venom-nav-panel{transform:translateY(0)}}
      @media(max-width:600px){.venom-x-link{display:none}.venom-eyes{margin-left:5px}.venom-eye{width:14px;height:9px}.venom-pricing{padding:55px 20px}.venom-pricing-head h2{font-size:38px}}
    `;document.head.appendChild(s);
  }

  function fixTheme(){const b=$('va-theme');if(!b||b.dataset.runtimeTheme)return;b.dataset.runtimeTheme='1';const apply=()=>{const dark=localStorage.getItem('venom-theme')==='dark';document.body.classList.toggle('venom-dark',dark);b.textContent=dark?'☀':'☾';b.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode')};b.onclick=()=>{localStorage.setItem('venom-theme',document.body.classList.contains('venom-dark')?'light':'dark');apply()};apply()}
  function fixSignIn(){const b=$('va-google');if(!b||b.dataset.runtimeAuth)return;b.dataset.runtimeAuth='1';b.onclick=async()=>{const err=$('va-err');b.disabled=true;b.textContent='CONNECTING TO GOOGLE…';if(err)err.textContent='';try{const c=getClient();if(!c)throw new Error('Authentication service did not load. Please refresh and try again.');const {error}=await c.auth.signInWithOAuth({provider:'google',options:{redirectTo:window.location.origin+'/',queryParams:{prompt:'select_account'},skipBrowserRedirect:false}});if(error)throw error}catch(e){console.error('[VENOM AUTH]',e);if(err)err.textContent='GOOGLE SIGN-IN ERROR · '+(e?.message||String(e));b.disabled=false;b.textContent='G  Continue with Google'}}}
  async function hardenOAuthReturn(){const c=getClient();if(!c)return;const params=new URLSearchParams(window.location.search);const code=params.get('code');const oauthMarker=params.get('auth');if(!code&&!oauthMarker)return;try{let data=(await c.auth.getSession()).data;if(!data?.session&&code){const result=await c.auth.exchangeCodeForSession(code);if(result.error)throw result.error;data=result.data}if(data?.session){console.info('[VENOM AUTH] Google session recovered');history.replaceState({},document.title,window.location.pathname);window.location.replace(window.location.pathname);return}console.warn('[VENOM AUTH] OAuth return had no session')}catch(e){console.error('[VENOM AUTH CALLBACK]',e);const err=$('va-err');if(err)err.textContent='GOOGLE CALLBACK ERROR · '+(e?.message||String(e))}}
  function removeUglyPlus(){const p=$('va-plus');if(p){p.remove();const tools=$('va-tools');if(tools)tools.style.display='none'}}
  function repairSidebar(){document.querySelectorAll('.va-sidebtn[data-view]').forEach(btn=>{if(btn.dataset.runtimeNav)return;btn.dataset.runtimeNav='1';btn.addEventListener('click',()=>{if(typeof window.navigate==='function')window.navigate(btn.dataset.view,btn)})})}
  function addEyes(el){if(!el||el.querySelector('.venom-eyes'))return;const t=Array.from(el.childNodes).find(n=>n.nodeType===3&&/venom/i.test(n.nodeValue||''));if(!t)return;const eyes=document.createElement('span');eyes.className='venom-eyes';eyes.setAttribute('aria-hidden','true');eyes.innerHTML='<i class="venom-eye"></i><i class="venom-eye"></i>';el.appendChild(eyes)}
  function decorateVenom(){document.querySelectorAll('.va-brand,.va-sidebrand,.va-hero h1,.va-view h1,.va-view h2,.va-kicker').forEach(el=>addEyes(el))}
  function makeDropdown(title,items){const wrap=document.createElement('div');wrap.className='venom-nav-dropdown';wrap.innerHTML=`<button class="venom-nav-trigger" type="button" aria-haspopup="true" aria-expanded="false">${title}<span class="chev">⌄</span></button><div class="venom-nav-panel" role="menu"><div class="nav-panel-title">${title.toUpperCase()} · VENOM GPT</div>${items.map(x=>`<a class="venom-nav-item" href="${x.href}" role="menuitem"><span class="venom-nav-icon">${x.icon}</span><span><b>${x.name}</b><span>${x.desc}</span></span></a>`).join('')}</div>`;const trigger=wrap.querySelector('.venom-nav-trigger');trigger.addEventListener('click',()=>{const open=wrap.classList.toggle('open');trigger.setAttribute('aria-expanded',String(open))});return wrap}
  function repairLandingNav(){const nav=document.querySelector('.va-nav'),links=document.querySelector('.va-navlinks');if(!nav||!links||links.dataset.runtimeDropdowns)return;links.dataset.runtimeDropdowns='1';const feature=Array.from(links.querySelectorAll('a')).find(a=>a.textContent.trim().toLowerCase()==='features');const workspace=Array.from(links.querySelectorAll('a')).find(a=>a.textContent.trim().toLowerCase()==='workspace');const tracker=Array.from(links.querySelectorAll('a')).find(a=>a.textContent.trim().toLowerCase()==='spider tech');
    if(feature)feature.replaceWith(makeDropdown('Features',[
      {icon:'💬',name:'AI Chat',desc:'Fast everyday conversation and assistance.',href:'#features'},
      {icon:'🧠',name:'Think Mode',desc:'A deeper reasoning path for harder tasks.',href:'#features'},
      {icon:'🔎',name:'Research Lab',desc:'Investigate complex questions and organise findings.',href:'#features'},
      {icon:'🎨',name:'Image Studio',desc:'Turn ideas into visual concepts with Venom.',href:'#features'},
      {icon:'⚙️',name:'Code Studio',desc:'Build, debug and explore code with AI.',href:'#features'},
      {icon:'🎙️',name:'Voice & Vision',desc:'Talk naturally and work with visual input.',href:'#features'},
      {icon:'📚',name:'Files & Data',desc:'Work across documents, tables and datasets.',href:'#features'},
      {icon:'🕷️',name:'Spider-Tech',desc:'Enter the cinematic tactical tracker.',href:'#tracker'}
    ]));
    if(workspace)workspace.replaceWith(makeDropdown('Workspace',[
      {icon:'🏠',name:'Your Workspace',desc:'A focused home for chats, projects and tools.',href:'#workspace'},
      {icon:'🗂️',name:'Projects',desc:'Keep related work together in one place.',href:'#workspace'},
      {icon:'📄',name:'Documents',desc:'Draft, analyse and organise your files.',href:'#features'},
      {icon:'👥',name:'Team Spaces',desc:'Shared spaces for collaboration and ideas.',href:'#workspace'},
      {icon:'🔌',name:'Connected Tools',desc:'Bring favourite workflows into one shell.',href:'#workspace'},
      {icon:'💳',name:'Pricing',desc:'Simple startup-friendly plans for Venom GPT.',href:'#pricing'}
    ]));
    if(tracker)tracker.replaceWith(makeDropdown('Spider Tech',[
      {icon:'📡',name:'Spider Tracker',desc:'Open the live cinematic map experience.',href:'#tracker'},
      {icon:'🗺️',name:'Tactical Map',desc:'Explore the Spider-Tech command centre.',href:'#tracker'},
      {icon:'⚡',name:'Signal Console',desc:'View fictional demo telemetry and status.',href:'#tracker'}
    ]));
    if(!nav.querySelector('.venom-x-link')){const actions=nav.querySelector(':scope > div:last-child');if(actions){const x=document.createElement('a');x.className='venom-x-link';x.href='https://x.com/SpideytrackerAI';x.target='_blank';x.rel='noopener noreferrer';x.innerHTML='<span class="venom-x-icon">𝕏</span> Follow us';actions.insertBefore(x,actions.firstChild)}}
  }
  function addPricing(){if(document.querySelector('#pricing'))return;const anchor=document.querySelector('#workspace');if(!anchor)return;const sec=document.createElement('section');sec.id='pricing';sec.className='venom-pricing';sec.innerHTML=`<div class="venom-pricing-head"><div class="va-kicker">VENOM GPT · PRICING</div><h2>Powerful AI without the heavyweight price.</h2><p class="va-lead">Startup-friendly plans designed to give you room to grow while keeping Venom accessible.</p></div><div class="venom-pricing-grid"><article class="venom-price-card"><div class="venom-price-icon">🕸️</div><h3>Venom Free</h3><div class="venom-price">$0 <small>/ month</small></div><p>Explore the core Venom experience before committing.</p><ul><li>AI chat</li><li>Basic voice access</li><li>Limited files and images</li><li>Spider-Tech demo</li></ul><button class="va-btn" onclick="auth()">START FREE</button></article><article class="venom-price-card featured"><div class="venom-price-badge">MOST POPULAR</div><div class="venom-price-icon">🧠</div><h3>Venom Plus</h3><div class="venom-price">$17.99 <small>/ month</small></div><p>More intelligence and room for serious everyday use.</p><ul><li>Expanded AI chat & context</li><li>Higher voice and image limits</li><li>Research & Think Mode</li><li>Code Studio & data tools</li><li>More file uploads</li></ul><button class="va-btn va-primary" onclick="auth()">CHOOSE PLUS</button></article><article class="venom-price-card"><div class="venom-price-icon">⚡</div><h3>Venom Pro</h3><div class="venom-price">$24.99 <small>/ month</small></div><p>For creators, developers and power users who want the full workspace.</p><ul><li>Higher usage limits</li><li>Advanced research workflows</li><li>Priority workspace access</li><li>Expanded image, voice & files</li><li>Early access to new tools</li></ul><button class="va-btn" onclick="auth()">CHOOSE PRO</button></article></div><div class="venom-contact"><div><h3>Need help, have an issue, or want to work with Venom?</h3><p>For support, bug reports, partnerships, business enquiries and other questions, contact the Venom GPT team.</p></div><a href="mailto:venomgpt392@gmail.com">venomgpt392@gmail.com</a></div>`;anchor.parentNode.insertBefore(sec,anchor.nextSibling)}
  function addLandingFollow(){const section=document.querySelector('#tracker');if(!section||section.querySelector('.venom-footer-follow'))return;const row=document.createElement('div');row.className='venom-footer-follow';row.innerHTML='<a class="venom-x-link" href="https://x.com/SpideytrackerAI" target="_blank" rel="noopener noreferrer"><span class="venom-x-icon">𝕏</span> Follow SpideyTracker AI on X</a><a class="venom-x-link" href="mailto:venomgpt392@gmail.com">✉ Contact Venom GPT</a>';section.appendChild(row)}
  function repair(){addCSS();fixTheme();fixSignIn();removeUglyPlus();repairSidebar();decorateVenom();repairLandingNav();addPricing();addLandingFollow()}
  const mo=new MutationObserver(repair);function boot(){repair();hardenOAuthReturn();if(document.body)mo.observe(document.body,{childList:true,subtree:true})}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();

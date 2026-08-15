/* VENOM AI SHELL MINIMAL — reference-driven sidebar + plus connectors */
(function(){
  'use strict';
  const VERSION='20260815-16';
  const svg=(kind)=>{
    const p={
      home:'<path d="m3 10 9-7 9 7v10H5V10"/><path d="M9 20v-6h6v6"/>',
      chat:'<path d="M5 6h14a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H11l-5 3v-3H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3Z"/><path d="M7 11h10M7 14h6"/>',
      search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/>',
      library:'<path d="M4 5h16v14H4z"/><path d="M8 5v14M12 9h5M12 13h5M12 17h3"/>',
      tracker:'<circle cx="12" cy="12" r="7"/><path d="M12 5V2M12 22v-3M5 12H2M22 12h-3M7 7 5 5M19 19l-2-2M17 7l2-2M7 17l-2 2"/>',
      plus:'<path d="M12 5v14M5 12h14"/>',
      drive:'<path d="m8 3 4 7H6L2 3zM12 10h6l4 7h-6zM6 10l-4 7h8l4-7z"/>',
      mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
      calendar:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M7 2v4M17 2v4M3 9h18"/>',
      github:'<path d="M9 19c-4 1-4-2-6-2m12 4v-4c0-1 .4-2 1-3-3-.3-6-1.5-6-6 0-1.3.5-2.4 1.3-3.3C11.1 4.4 11 3.5 11 3.5S12.1 3.2 15 5c.9-.3 2.1-.5 3-.5s2.1.2 3 .5c2.9-1.8 4-1.5 4-1.5s-.1.9-.3 1.2C25.5 5.6 26 6.7 26 8c0 4.5-3 5.7-6 6 .6 1 .9 2 .9 3v4" transform="translate(-5 -2)"/>',
      notion:'<path d="M5 3h13l2 2v16H5z"/><path d="M9 8h6M9 12h6M9 16h4"/>',
      dropbox:'<path d="m7 5 5 4-5 4-5-4zM17 5l5 4-5 4-5-4zM7 15l5 4 5-4-5-4z"/>'
    }; return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+(p[kind]||p.chat)+'</svg>';
  };
  function css(){
    if(document.getElementById('venom-ai-shell-minimal-css'))return;
    const s=document.createElement('style');s.id='venom-ai-shell-minimal-css';s.textContent=`
      .vms-hidden{display:none!important}
      .vms-sidebar{width:248px;flex:0 0 248px;background:#080b0d;border-right:1px solid #ffffff10;display:flex;flex-direction:column;padding:18px 12px;gap:8px;min-height:100vh;box-sizing:border-box;z-index:20}
      .vms-brand{padding:8px 12px 18px;border-bottom:1px solid #ffffff0c;margin-bottom:4px}.vms-brand strong{font-size:25px;letter-spacing:-.06em;color:#f4eadb}.vms-brand span{color:#4fe0d8;font-size:12px;font-weight:900;margin-left:4px}.vms-brand small{display:block;color:#6d7a78;font:800 9px monospace;letter-spacing:.12em;margin-top:3px}
      .vms-nav{display:flex;flex-direction:column;gap:3px}.vms-nav button{width:100%;display:flex;align-items:center;gap:12px;border:0;background:transparent;color:#b9c1bf;padding:11px 12px;border-radius:10px;font:700 14px system-ui;cursor:pointer;text-align:left}.vms-nav button:hover{background:#ffffff08;color:#f4eadb}.vms-nav button.active{background:#123b3c;color:#f5eadf;box-shadow:inset 3px 0 #35d9d1}.vms-nav .vms-ico{width:19px;height:19px;display:grid;place-items:center;color:#52ddd5}.vms-nav .vms-ico svg{width:19px;height:19px}.vms-nav button[data-id="tracker"] .vms-ico{color:#ff6038}.vms-section{padding:16px 12px 5px;color:#55615f;font:800 9px monospace;letter-spacing:.14em}
      .vms-bottom{margin-top:auto;padding-top:12px;border-top:1px solid #ffffff0c}.vms-profile{display:flex;align-items:center;gap:10px;padding:10px 8px;color:#e9e0d2}.vms-avatar{width:32px;height:32px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#f2e7d2 0 12%,#704f40 13% 28%,#171c1d 29%);border:1px solid #ffffff20}.vms-profile small{display:block;color:#5bcfc8;font-size:10px;margin-top:2px}
      .vms-plus{margin:10px 12px 2px;border:1px solid #ffffff18!important;background:#0d1315!important;justify-content:center!important;color:#d7ddd9!important}.vms-plus:hover{border-color:#39d8d0!important;background:#122326!important}.vms-plus .vms-ico{color:#63ddd6!important}
      .vms-connect-panel{position:fixed;left:260px;bottom:22px;width:min(380px,calc(100vw - 280px));background:#0b1012;border:1px solid #ffffff18;border-radius:16px;box-shadow:0 25px 70px #000b;padding:16px;z-index:99999;display:none}.vms-connect-panel.open{display:block}.vms-connect-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}.vms-connect-head strong{font-size:15px;color:#f4eadb}.vms-connect-head button{border:0;background:transparent;color:#7d8886;font-size:18px;cursor:pointer}.vms-connect-sub{font-size:11px;color:#788481;margin-bottom:12px}.vms-app{display:flex;align-items:center;gap:11px;padding:11px;border:1px solid #ffffff0d;border-radius:11px;margin-top:7px;background:#0f1517}.vms-app .vms-appico{width:25px;height:25px;color:#6eddd7}.vms-app .vms-appico svg{width:23px;height:23px}.vms-app b{font-size:13px;color:#e5e2d8}.vms-app small{display:block;color:#697673;font-size:10px;margin-top:2px}.vms-app button{margin-left:auto;border:1px solid #ffffff18;background:#141b1d;color:#cfd8d5;border-radius:8px;padding:6px 9px;font:800 10px monospace;cursor:pointer}.vms-app button:hover{border-color:#36d8d0;color:#63e0d9}
      @media(max-width:900px){.vms-sidebar{width:72px;flex-basis:72px;padding:12px 8px}.vms-brand strong{font-size:18px}.vms-brand span,.vms-brand small,.vms-nav button span:last-child,.vms-section,.vms-profile>div:not(.vms-avatar),.vms-plus span:last-child{display:none}.vms-nav button{justify-content:center;padding:12px}.vms-plus{margin-left:0;margin-right:0}.vms-connect-panel{left:82px;width:min(360px,calc(100vw - 100px))}}
    `;document.head.appendChild(s);
  }
  function makePanel(){
    if(document.getElementById('vms-connect-panel'))return;
    const p=document.createElement('div');p.id='vms-connect-panel';p.className='vms-connect-panel';
    p.innerHTML='<div class="vms-connect-head"><strong>Connect apps</strong><button aria-label="Close">×</button></div><div class="vms-connect-sub">Connect services only when you need them. Nothing is connected automatically.</div>'+
      [['drive','Google Drive'],['mail','Gmail'],['calendar','Google Calendar'],['github','GitHub'],['notion','Notion'],['dropbox','Dropbox']].map(([i,n])=>'<div class="vms-app"><span class="vms-appico">'+svg(i)+'</span><div><b>'+n+'</b><small>Available to connect</small></div><button type="button" data-connect="'+n+'">CONNECT</button></div>').join('');
    document.body.appendChild(p);p.querySelector('button').onclick=()=>p.classList.remove('open');
    p.addEventListener('click',e=>{const b=e.target.closest('[data-connect]');if(b){b.textContent='READY';b.disabled=true;b.previousElementSibling.querySelector('small').textContent='Connection can be configured';}});
  }
  function nav(label,id,action,icon,active){return '<button type="button" class="vms-nav-btn '+(active?'active':'')+'" data-id="'+id+'"><span class="vms-ico">'+svg(icon)+'</span><span>'+label+'</span></button>';}
  function install(){
    css();
    const app=document.getElementById('app');if(!app||document.getElementById('vms-sidebar'))return;
    const old=document.querySelector('.side');
    if(old)old.classList.add('vms-hidden');
    const shell=app.querySelector('.layout')||app.firstElementChild;
    if(!shell)return;
    if(!document.getElementById('vms-sidebar')){
      const side=document.createElement('aside');side.id='vms-sidebar';side.className='vms-sidebar';
      side.innerHTML='<div class="vms-brand"><strong>VENOM</strong><span>GPT</span><small>LOCAL AI</small></div><div class="vms-nav">'+
        nav('Home','home','home','home',true)+nav('New Chat','chat','newChat','chat')+nav('Search','search','module','search')+nav('Chats','chats','module','chat')+nav('Library','library','module','library')+nav('Spider Tracker','tracker','openTracker','tracker')+
        '</div><div class="vms-section">TOOLS</div><button type="button" class="vms-plus"><span class="vms-ico">'+svg('plus')+'</span><span>Connect apps</span></button><div class="vms-bottom"><div class="vms-profile"><div class="vms-avatar"></div><div><b>Workspace</b><small>LOCAL AI</small></div></div></div>';
      shell.insertBefore(side,shell.firstChild);
      side.addEventListener('click',e=>{const b=e.target.closest('.vms-nav-btn');if(!b)return;side.querySelectorAll('.vms-nav-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');const id=b.dataset.id;if(id==='home'&&typeof window.home==='function')window.home(b);else if(id==='chat'&&typeof window.newChat==='function')window.newChat(b);else if(id==='tracker'&&typeof window.openTracker==='function')window.openTracker();else if((id==='search'||id==='chats'||id==='library')&&typeof window.module==='function')window.module(b.textContent.trim(),'Workspace module ready.',b)});
      side.querySelector('.vms-plus').addEventListener('click',()=>{makePanel();document.getElementById('vms-connect-panel').classList.toggle('open')});
    }
    makePanel();
  }
  const run=()=>setTimeout(install,120);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
  new MutationObserver(()=>{if(document.getElementById('app')?.style.display==='block')install()}).observe(document.body,{childList:true,subtree:true});
})();

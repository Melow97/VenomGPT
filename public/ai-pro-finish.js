/* VENOM AI PRO FINISH — premium workspace shell, collapsible sidebar, responsive polish */
(function(){
  'use strict';
  const VERSION='20260815-20';
  const css=`
    :root{--venom-bg:#070b0c;--venom-panel:#0c1214;--venom-panel2:#101819;--venom-line:#253332;--venom-text:#f1e8d8;--venom-muted:#7d8985;--venom-teal:#4fe0d8;--venom-orange:#ff5b36}
    body{background:#070b0c!important}
    #app .appShell{min-height:100dvh;background:radial-gradient(circle at 72% 0%,#15302f22,transparent 34%),#070b0c!important}
    #app .top{height:68px!important;min-height:68px!important;padding:0 18px!important;border-bottom:1px solid #ffffff12!important;background:rgba(7,11,12,.94)!important;backdrop-filter:blur(18px);position:sticky;top:0;z-index:100!important}
    #app .top .brand{font-size:25px!important;font-weight:900!important;letter-spacing:-.06em!important;color:var(--venom-text)!important}
    #app .top .brand span{color:var(--venom-teal)!important}
    #app .layout{min-height:calc(100dvh - 68px)!important;display:flex!important;align-items:stretch!important}
    .vpro-sidebar-toggle{position:absolute;right:-11px;top:20px;width:23px;height:23px;border-radius:50%;border:1px solid #304342;background:#0c1415;color:#a9b6b2;display:grid;place-items:center;cursor:pointer;z-index:50;box-shadow:0 5px 18px #0008;font-size:12px;line-height:1;transition:.2s}
    .vpro-sidebar-toggle:hover{color:#fff;border-color:var(--venom-teal);box-shadow:0 0 18px #4fe0d822}
    .vms-sidebar{position:relative!important;transition:width .22s ease,flex-basis .22s ease,padding .22s ease!important;overflow:visible!important}
    .vms-sidebar.vpro-collapsed{width:76px!important;flex-basis:76px!important;padding-left:8px!important;padding-right:8px!important}
    .vms-sidebar.vpro-collapsed .vms-brand{padding-left:7px!important;padding-right:7px!important;text-align:center}
    .vms-sidebar.vpro-collapsed .vms-brand strong{font-size:18px!important;display:block;letter-spacing:-.08em}
    .vms-sidebar.vpro-collapsed .vms-brand span{display:none!important}
    .vms-sidebar.vpro-collapsed .vms-brand small{font-size:7px!important}
    .vms-sidebar.vpro-collapsed .vms-nav button{justify-content:center!important;padding:12px 8px!important}
    .vms-sidebar.vpro-collapsed .vms-nav button>span:last-child,.vms-sidebar.vpro-collapsed .vms-section,.vms-sidebar.vpro-collapsed .vms-profile>div:not(.vms-avatar),.vms-sidebar.vpro-collapsed .vms-plus>span:last-child{display:none!important}
    .vms-sidebar.vpro-collapsed .vms-plus{margin-left:0!important;margin-right:0!important;padding:11px!important}
    .vms-sidebar.vpro-collapsed .vms-profile{justify-content:center!important;padding-left:0!important;padding-right:0!important}
    .vms-sidebar .vms-nav button{position:relative}
    .vms-sidebar.vpro-collapsed .vms-nav button:hover:after,.vms-sidebar.vpro-collapsed .vms-plus:hover:after{content:attr(data-tip);position:absolute;left:62px;top:50%;transform:translateY(-50%);white-space:nowrap;background:#101819;border:1px solid #2b3d3c;color:#f0e6d5;padding:7px 9px;border-radius:8px;font:700 10px system-ui;z-index:9999;box-shadow:0 10px 30px #000b}
    .vpro-main-wrap{width:100%;min-width:0}
    .vChatPage{max-width:1480px!important;margin:0 auto!important;padding:34px clamp(18px,3vw,46px) 48px!important}
    .vChatTop{margin-bottom:18px!important}
    .vChatTop h1{font-size:clamp(28px,3vw,40px)!important;letter-spacing:-.04em!important}
    .vChatGrid{grid-template-columns:minmax(0,1fr) 300px!important;gap:18px!important;min-height:calc(100dvh - 160px)!important}
    .vConversation,.vActivity{border-radius:20px!important;background:linear-gradient(145deg,#0b1112,#10191a)!important;border-color:#2a3837!important;box-shadow:0 24px 70px #0008,0 1px 0 #ffffff08 inset!important}
    .vConversation{min-height:calc(100dvh - 190px)!important}
    .vConversationBar{height:52px;box-sizing:border-box;align-items:center;padding:0 18px!important;background:#0a1011;border-bottom-color:#243130!important}
    .vConversationBar span{font-size:10px!important;letter-spacing:.08em}
    .vMessages{padding:26px clamp(18px,3vw,38px)!important;scrollbar-width:thin}
    .vWelcome{max-width:760px!important;margin:35px auto!important;padding:23px!important;border-radius:18px!important;background:linear-gradient(135deg,#0f191a,#0c1415)!important}
    .vSpiderBadge{background:linear-gradient(145deg,#153c3d,#162426)!important;border:1px solid #3dd9d255!important;box-shadow:0 0 26px #42ddd722!important}
    .vmsg{max-width:min(820px,82%)!important}
    .vmsgBubble{font-size:15px!important;line-height:1.7!important;padding:15px 18px!important;border-radius:17px!important}
    .vComposer{margin:0 22px!important;border-radius:19px!important;padding:8px!important;background:#090f10!important;border-color:#30403e!important;box-shadow:0 18px 45px #0008!important}
    .vComposer textarea{font-size:15px!important}
    .vIcon,.vSend{width:44px!important;height:44px!important;border-radius:13px!important;transition:.18s!important}
    .vIcon:hover{background:#183031!important;color:#63e1da!important;transform:translateY(-1px)}
    .vSend:hover{filter:brightness(1.08);transform:translateY(-1px)}
    .vComposer.thinking-active{border-color:#55e0d8!important;box-shadow:0 0 0 1px #55e0d822,0 0 34px #55e0d822,0 18px 45px #0009!important}
    .vThinking.on{background:linear-gradient(90deg,#0b1a1b,#10191a,#0b1a1b)!important;animation:vproThinking 1.5s linear infinite;background-size:220% 100%}
    @keyframes vproThinking{0%{background-position:0 0}100%{background-position:220% 0}}
    .vActivity{min-height:0!important}
    .vActivityHead{background:#0a1011!important}
    .vActivityBody{padding:16px!important}
    .vActivityItem{border-radius:10px;padding:11px 9px!important;margin-bottom:3px;border-bottom:0!important}
    .vActivityItem:hover{background:#ffffff05}
    .vTopActions button,.vNewBtn{min-height:42px!important}
    .vHistory{max-width:100%!important}
    .vHistoryRow{transition:.18s!important}
    .vpro-status{display:flex;align-items:center;gap:7px;font:800 9px ui-monospace,monospace;color:#6f7c78;letter-spacing:.08em;margin-left:auto;margin-right:12px}
    .vpro-status i{width:7px;height:7px;border-radius:50%;background:#4fe0d8;box-shadow:0 0 10px #4fe0d8;animation:vproBlink 1.6s ease-in-out infinite}
    @keyframes vproBlink{50%{opacity:.35}}
    @media(max-width:1100px){.vChatGrid{grid-template-columns:1fr!important}.vActivity{display:none!important}.vChatPage{padding-top:24px!important}}
    @media(max-width:720px){#app .top{height:60px!important;min-height:60px!important;padding:0 10px!important}.vms-sidebar{width:72px!important;flex-basis:72px!important}.vms-sidebar .vms-brand span,.vms-sidebar .vms-brand small,.vms-sidebar .vms-nav button>span:last-child,.vms-sidebar .vms-section,.vms-sidebar .vms-profile>div:not(.vms-avatar),.vms-sidebar .vms-plus>span:last-child{display:none!important}.vms-sidebar .vms-nav button{justify-content:center!important;padding:12px 8px!important}.vms-sidebar .vms-plus{margin-left:0!important;margin-right:0!important}.vChatPage{padding:18px 10px 30px!important}.vChatTop{align-items:flex-start!important}.vTopActions{gap:7px}.vTopActions button,.vNewBtn{padding:9px 10px!important;font-size:10px!important}.vConversation{min-height:calc(100dvh - 145px)!important;border-radius:16px!important}.vConversationBar{padding:0 13px!important}.vMessages{padding:18px 12px!important}.vmsg{max-width:92%!important}.vComposer{margin:0 10px!important}.vHint{padding-bottom:6px}.vpro-status{display:none}.vpro-sidebar-toggle{right:-10px}}
    @media(max-width:480px){.vChatTop h1{font-size:26px!important}.vEyebrow{font-size:9px!important}.vWelcome{margin:18px auto!important;padding:16px!important}.vWelcome strong{font-size:17px!important}.vWelcome p{font-size:13px!important}.vIcon,.vSend{width:42px!important;height:42px!important}.vComposer textarea{min-width:0;font-size:14px!important}}
  `;
  function addStyle(){if(document.getElementById('venom-ai-pro-finish-css'))return;const s=document.createElement('style');s.id='venom-ai-pro-finish-css';s.textContent=css;document.head.appendChild(s)}
  function enhanceSidebar(){const side=document.getElementById('vms-sidebar');if(!side||side.dataset.proEnhanced)return;side.dataset.proEnhanced='1';const toggle=document.createElement('button');toggle.className='vpro-sidebar-toggle';toggle.type='button';toggle.setAttribute('aria-label','Collapse sidebar');toggle.innerHTML='‹';side.appendChild(toggle);const set=(collapsed)=>{side.classList.toggle('vpro-collapsed',collapsed);toggle.innerHTML=collapsed?'›':'‹';toggle.setAttribute('aria-label',collapsed?'Expand sidebar':'Collapse sidebar');localStorage.setItem('venom-sidebar-collapsed',collapsed?'1':'0');};side.querySelectorAll('.vms-nav button,.vms-plus').forEach(b=>{const text=(b.querySelector('span:last-child')?.textContent||b.textContent||'').trim();b.dataset.tip=text});set(localStorage.getItem('venom-sidebar-collapsed')==='1');toggle.addEventListener('click',()=>set(!side.classList.contains('vpro-collapsed')))}
  function enhanceHeader(){const top=document.querySelector('#app .top');if(!top||top.querySelector('.vpro-status'))return;const status=document.createElement('span');status.className='vpro-status';status.innerHTML='<i></i> LOCAL AI WORKSPACE';const spacer=top.querySelector('.spacer');if(spacer)spacer.after(status);else top.prepend(status)}
  function enhanceComposer(){const c=document.querySelector('.vComposer');if(!c||c.dataset.proEnhanced)return;c.dataset.proEnhanced='1';const icons=[...c.querySelectorAll('.vIcon')];if(icons[0]){icons[0].title='Attachments & tools'}if(icons[1])icons[1].title='Think mode';if(icons[2])icons[2].title='Voice input';const voice=icons[2];if(voice){voice.addEventListener('click',()=>{voice.classList.toggle('vpro-listening');if(voice.classList.contains('vpro-listening')){voice.style.color='#ff7655';voice.style.boxShadow='0 0 0 2px #ff765533,0 0 26px #ff5b3666';voice.setAttribute('aria-label','Listening');}else{voice.style.color='';voice.style.boxShadow='';voice.setAttribute('aria-label','Voice input')}})}}
  function run(){addStyle();enhanceSidebar();enhanceHeader();enhanceComposer()}
  const obs=new MutationObserver(run);obs.observe(document.body,{childList:true,subtree:true});if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(run,250));else setTimeout(run,250);
})();

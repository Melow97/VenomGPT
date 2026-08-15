/* VENOM AI PREMIUM UI V2 — theme-aware visual system and icon polish */
(function(){
  'use strict';
  const STYLE='venom-ai-premium-v2';
  const esc=s=>String(s||'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
  const icons={
    chat:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5.5h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H11l-4.5 3v-3H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z"/><path d="M7.5 10h9M7.5 13h6"/></svg>',
    work:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="7" width="16" height="12" rx="2"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M4 12h16M10 12v2h4v-2"/></svg>',
    spider:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.2"/><path d="M12 3v5M12 16v5M3 8l6 3M21 8l-6 3M3 16l6-3M21 16l-6-3"/><path d="M8 4.5 10 8M16 4.5 14 8M8 19.5 10 16M16 19.5 14 16"/></svg>',
    plus:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    mic:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="3" width="8" height="12" rx="4"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"/></svg>',
    sparkle:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/></svg>'
  };
  function theme(){return document.documentElement.dataset.theme==='light'||document.body.classList.contains('light')||document.body.classList.contains('vg-light')||localStorage.getItem('venom-theme')==='light'?'light':'dark'}
  function installStyle(){
    if(document.getElementById(STYLE))return;
    const s=document.createElement('style');s.id=STYLE;s.textContent=`
      :root{--va-bg:#07100f;--va-panel:#0d1716;--va-panel2:#111f1e;--va-border:#243635;--va-text:#f4eee2;--va-muted:#7e8b86;--va-teal:#58ddd5;--va-orange:#f06443;--va-gold:#e7c36b;--va-shadow:0 24px 70px rgba(0,0,0,.28)}
      body.light,:root[data-theme="light"]{--va-bg:#f4f7f5;--va-panel:#ffffff;--va-panel2:#f1f6f4;--va-border:#d7e1de;--va-text:#182321;--va-muted:#66736f;--va-teal:#087d78;--va-orange:#d94b2e;--va-gold:#a87812;--va-shadow:0 20px 55px rgba(28,52,48,.12)}
      .vChatPage{background:var(--va-bg);color:var(--va-text)!important;transition:background .25s,color .25s}
      .vChatTop{padding-bottom:4px}.vEyebrow{color:var(--va-teal)!important}.vChatTop h1{letter-spacing:-.7px}
      .vTopActions button,.vNewBtn{background:var(--va-panel)!important;color:var(--va-text)!important;border-color:var(--va-border)!important;box-shadow:0 4px 18px rgba(0,0,0,.06);transition:.2s}.vTopActions button:hover,.vNewBtn:hover{border-color:var(--va-teal)!important;transform:translateY(-1px)}
      .vNewBtn{color:var(--va-orange)!important}
      .vChatGrid{gap:18px}.vConversation,.vActivity{background:var(--va-panel)!important;border-color:var(--va-border)!important;box-shadow:var(--va-shadow)!important}
      .vConversationBar{border-color:var(--va-border)!important;color:var(--va-muted)!important}.vConversationBar span:first-child{color:var(--va-teal)!important}
      .vWelcome{background:var(--va-panel2)!important;border-color:var(--va-border)!important}.vSpiderBadge{background:color-mix(in srgb,var(--va-teal) 12%,var(--va-panel));color:var(--va-teal)!important;border:1px solid color-mix(in srgb,var(--va-teal) 25%,transparent)}
      .vmsgBubble{background:var(--va-panel2)!important;border-color:var(--va-border)!important;color:var(--va-text)}.vyou .vmsgBubble{background:color-mix(in srgb,var(--va-teal) 12%,var(--va-panel))!important;border-color:color-mix(in srgb,var(--va-teal) 30%,var(--va-border))!important}
      .vmsgRole{color:var(--va-muted)!important}.vThinking{border-color:color-mix(in srgb,var(--va-teal) 45%,var(--va-border))!important;background:color-mix(in srgb,var(--va-teal) 8%,var(--va-panel))!important;color:var(--va-teal)!important}
      .vComposer{background:var(--va-panel2)!important;border-color:var(--va-border)!important;box-shadow:0 12px 35px rgba(0,0,0,.08)!important}.vComposer textarea{color:var(--va-text)!important}.vIcon,.vSend{background:var(--va-panel)!important;color:var(--va-muted)!important;border:1px solid var(--va-border)!important}.vIcon:hover{color:var(--va-teal)!important;border-color:var(--va-teal)!important}.vSend{background:var(--va-orange)!important;color:#fff!important;border-color:var(--va-orange)!important}
      .vActivityHead{border-color:var(--va-border)!important}.vActivityHead span{color:var(--va-gold)!important}.vActivityItem{border-color:var(--va-border)!important;color:var(--va-muted)!important}.vActivityItem i{color:var(--va-teal)!important}.vActivityFoot{border-color:var(--va-border)!important;color:var(--va-muted)!important}
      .vaModeBar{display:flex;gap:7px;align-items:center;margin:0 0 16px;padding:5px;background:var(--va-panel);border:1px solid var(--va-border);border-radius:15px;width:max-content;box-shadow:0 8px 25px rgba(0,0,0,.05)}
      .vaMode{display:inline-flex;align-items:center;gap:7px;border:1px solid transparent;background:transparent;color:var(--va-muted);padding:8px 12px;border-radius:10px;font:800 12px ui-sans-serif,system-ui;cursor:pointer;transition:.2s}.vaMode svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}.vaMode:hover{color:var(--va-text);background:var(--va-panel2)}.vaMode.active{background:color-mix(in srgb,var(--va-teal) 13%,var(--va-panel));color:var(--va-teal);border-color:color-mix(in srgb,var(--va-teal) 28%,var(--va-border))}.vaMode.work{color:var(--va-gold)}.vaMode.spider{color:var(--va-orange)}.vaMode .lock{font-size:9px;opacity:.8}
      .vaQuickRow{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 15px}.vaQuick{display:inline-flex;align-items:center;gap:7px;border:1px solid var(--va-border);background:var(--va-panel);color:var(--va-muted);border-radius:10px;padding:8px 10px;font:700 11px ui-sans-serif,system-ui;cursor:pointer;transition:.2s}.vaQuick:hover{color:var(--va-text);border-color:var(--va-teal);transform:translateY(-1px)}.vaQuick svg{width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
      .vIcon svg,.vSend svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}.vHint{color:var(--va-muted)!important}
      @media(max-width:700px){.vaModeBar{width:100%;overflow:auto}.vaMode{flex:1;justify-content:center;white-space:nowrap}.vaQuickRow{overflow:auto;flex-wrap:nowrap;padding-bottom:3px}.vaQuick{white-space:nowrap}}
    `;document.head.appendChild(s)
  }
  function addModes(){
    const page=document.querySelector('.vChatPage');if(!page||page.querySelector('.vaModeBar'))return;
    const top=page.querySelector('.vChatTop');if(!top)return;
    const bar=document.createElement('div');bar.className='vaModeBar';bar.innerHTML=`<button class="vaMode active" data-mode="chat">${icons.chat}<span>Chat</span></button><button class="vaMode work" data-mode="work">${icons.work}<span>Work</span><span class="lock">PRO</span></button><button class="vaMode spider" data-mode="spider">${icons.spider}<span>Spider Signal</span></button>`;
    top.parentNode.insertBefore(bar,top);
    bar.addEventListener('click',e=>{const b=e.target.closest('.vaMode');if(!b)return;const m=b.dataset.mode;if(m==='spider'&&typeof window.openTracker==='function'){window.openTracker();return}if(m==='work'){window.dispatchEvent(new CustomEvent('venom:work-open'));return}bar.querySelectorAll('.vaMode').forEach(x=>x.classList.remove('active'));b.classList.add('active')});
  }
  function addQuick(){
    const page=document.querySelector('.vChatPage');if(!page||page.querySelector('.vaQuickRow'))return;const grid=page.querySelector('.vChatGrid');if(!grid)return;
    const row=document.createElement('div');row.className='vaQuickRow';row.innerHTML=`<button class="vaQuick" data-q="Think deeper">${icons.sparkle}<span>Think</span></button><button class="vaQuick" data-q="Research this topic deeply">${icons.sparkle}<span>Research</span></button><button class="vaQuick" data-q="Help me build this">${icons.work}<span>Build</span></button>`;
    grid.parentNode.insertBefore(row,grid);
    row.addEventListener('click',e=>{const b=e.target.closest('.vaQuick');if(!b)return;const input=document.getElementById('vPrompt');if(input){input.value=b.dataset.q;input.focus()}})
  }
  function upgradeIcons(){
    const attach=document.getElementById('vAttach');if(attach&&!attach.dataset.vIcon){attach.innerHTML=icons.plus;attach.title='Add files';attach.setAttribute('aria-label','Add files');attach.dataset.vIcon='1'}
    const buttons=document.querySelectorAll('.vComposer .vIcon');if(buttons[1]&&!buttons[1].dataset.vIcon){buttons[1].innerHTML=icons.sparkle;buttons[1].title='AI tools';buttons[1].setAttribute('aria-label','AI tools');buttons[1].dataset.vIcon='1'}
    if(buttons[2]&&!buttons[2].dataset.vIcon){buttons[2].innerHTML=icons.mic;buttons[2].title='Voice';buttons[2].setAttribute('aria-label','Voice');buttons[2].dataset.vIcon='1'}
    const send=document.getElementById('vSend');if(send&&!send.dataset.vIcon){send.innerHTML=icons.sparkle;send.title='Send';send.dataset.vIcon='1'}
  }
  function apply(){const shell=document.getElementById('app');if(!shell)return;addModes();addQuick();upgradeIcons();}
  function boot(){installStyle();apply();new MutationObserver(()=>{if(document.querySelector('.vChatPage'))apply()}).observe(document.body,{childList:true,subtree:true});setInterval(apply,1200)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
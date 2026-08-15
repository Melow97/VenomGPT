/* VENOM GPT — Chat / Work mode selector */
(function(){
  'use strict';
  const STYLE_ID='venom-chat-work-toggle-style';
  const ROOT_ID='venom-mode-selector';
  const POP_ID='venom-work-popover';

  function installStyles(){
    if(document.getElementById(STYLE_ID)) return;
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
      .vgModeWrap{display:flex;align-items:center;gap:4px;margin-top:7px;width:max-content;padding:3px;border:1px solid #273231;background:#0b1112;border-radius:12px;box-shadow:0 8px 22px #0004}
      .vgModeBtn{display:inline-flex;align-items:center;gap:7px;border:0;background:transparent;color:#899591;border-radius:9px;padding:7px 11px;font:800 11px/1 system-ui,-apple-system,sans-serif;letter-spacing:.1px;cursor:pointer;transition:.18s}
      .vgModeBtn:hover{background:#141d1e;color:#e9e2d5}
      .vgModeBtn.active{background:#182a2a;color:#eaf4ef;box-shadow:inset 0 0 0 1px #2b5e5b}
      .vgModeIcon{width:15px;height:15px;display:grid;place-items:center;color:#5fe0d8;font-size:13px;line-height:1}
      .vgModeLock{font-size:11px;color:#747f7b}
      .vgModeBtn.work:hover .vgModeLock{color:#e8c66c}
      .vgWorkPopover{position:absolute;top:calc(100% + 10px);left:0;width:min(410px,calc(100vw - 40px));padding:18px;border:1px solid #30403e;border-radius:16px;background:linear-gradient(145deg,#0c1213,#111a1b);box-shadow:0 24px 70px #000b;z-index:10020;color:#eee6d7;display:none}
      .vgWorkPopover.open{display:block;animation:vgWorkIn .16s ease-out}
      @keyframes vgWorkIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
      .vgWorkHead{display:flex;gap:11px;align-items:flex-start}
      .vgWorkBadge{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:#172827;border:1px solid #2b5552;color:#63e0d8;font-size:15px;flex:0 0 auto}
      .vgWorkPopover h3{margin:0;font-size:16px;line-height:1.25}
      .vgWorkPopover .vgWorkIntro{margin:8px 0 13px;color:#8e9995;font-size:11px;line-height:1.55}
      .vgWorkUpgrade{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 14px;padding:10px 11px;border:1px solid #403b25;background:#17170f;border-radius:11px}
      .vgWorkUpgrade b{font-size:10px;color:#e8c66c}.vgWorkUpgrade span{display:block;margin-top:3px;color:#7f8884;font-size:9px}
      .vgWorkUpgrade button{border:1px solid #e95635;background:#e95635;color:#fff;border-radius:9px;padding:7px 10px;font:900 9px system-ui;cursor:pointer;white-space:nowrap}
      .vgWorkFeatures{display:grid;gap:7px;grid-template-columns:1fr 1fr}
      .vgWorkFeature{display:flex;gap:8px;padding:9px;border:1px solid #222e2d;background:#0d1415;border-radius:10px;min-height:54px;box-sizing:border-box}
      .vgWorkFeature .ico{font-size:14px;width:18px;text-align:center;color:#61ddd6}.vgWorkFeature b{display:block;font-size:10px}.vgWorkFeature span{display:block;margin-top:3px;color:#707c78;font-size:9px;line-height:1.35}
      .vgWorkExamples{margin-top:14px;padding-top:12px;border-top:1px solid #202a29}.vgWorkExamples h4{margin:0 0 8px;color:#aab4b0;font:800 9px ui-monospace,monospace;letter-spacing:1px}.vgWorkExample{display:flex;gap:7px;color:#aeb8b3;font-size:10px;line-height:1.4;margin:5px 0}.vgWorkExample i{font-style:normal;color:#5fe0d8}
      .vgChatTop{position:relative}
      @media(max-width:600px){.vgModeWrap{width:100%}.vgModeBtn{flex:1;justify-content:center}.vgWorkPopover{width:calc(100vw - 34px)}.vgWorkFeatures{grid-template-columns:1fr}}
    `;
    document.head.appendChild(s);
  }

  function makePopover(){
    if(document.getElementById(POP_ID)) return;
    const p=document.createElement('div');
    p.id=POP_ID;p.className='vgWorkPopover';
    p.innerHTML=`
      <div class="vgWorkHead"><div class="vgWorkBadge">✦</div><div><h3>Meet Venom Work</h3><p class="vgWorkIntro">Use Work when a task needs more than a quick answer. Venom can gather context, organize the work, and help create polished docs, slides, spreadsheets, websites and more.</p></div></div>
      <div class="vgWorkUpgrade"><div><b>🔒 Unlock with Pro</b><span>Connect tools and unlock advanced workflows.</span></div><button type="button" data-work-upgrade>UNLOCK</button></div>
      <div class="vgWorkFeatures">
        <div class="vgWorkFeature"><div class="ico">🔗</div><div><b>Connect my tools</b><span>Gmail, Calendar, Drive, GitHub and more.</span></div></div>
        <div class="vgWorkFeature"><div class="ico">✍</div><div><b>Learn my writing style</b><span>Adapt to your tone and communication style.</span></div></div>
        <div class="vgWorkFeature"><div class="ico">🌐</div><div><b>Build a working website</b><span>Turn an idea into a functional project.</span></div></div>
        <div class="vgWorkFeature"><div class="ico">📄</div><div><b>Create documents</b><span>Reports, proposals and polished files.</span></div></div>
        <div class="vgWorkFeature"><div class="ico">📊</div><div><b>Build spreadsheets</b><span>Analyze data and create useful models.</span></div></div>
        <div class="vgWorkFeature"><div class="ico">🔎</div><div><b>Deep research</b><span>Organize larger research tasks and findings.</span></div></div>
      </div>
      <div class="vgWorkExamples"><h4>TACKLE YOUR MOST AMBITIOUS TASKS</h4><div class="vgWorkExample"><i>✉</i> Manage my emails and calendar</div><div class="vgWorkExample"><i>◷</i> Create a personalized daily briefing</div><div class="vgWorkExample"><i>▣</i> Create a presentation</div></div>`;
    document.body.appendChild(p);
    p.addEventListener('click',e=>{
      const up=e.target.closest('[data-work-upgrade]');
      if(up){
        if(typeof window.vgAuth==='function') window.vgAuth();
        else document.querySelector('.vgPrimary')?.click();
      }
    });
  }

  function closePopover(){document.getElementById(POP_ID)?.classList.remove('open')}

  function installSelector(){
    const top=document.querySelector('.vChatTop');
    if(!top||top.querySelector('#'+ROOT_ID)) return;
    const titleBlock=top.firstElementChild;
    if(!titleBlock) return;
    const wrap=document.createElement('div');
    wrap.id=ROOT_ID;wrap.className='vgModeWrap';
    wrap.innerHTML=`<button type="button" class="vgModeBtn active" aria-pressed="true"><span class="vgModeIcon">●</span><span>Chat</span></button><button type="button" class="vgModeBtn work" aria-expanded="false"><span class="vgModeIcon vgModeLock">🔒</span><span>Work</span></button>`;
    titleBlock.appendChild(wrap);
    makePopover();
    const work=wrap.querySelector('.work');
    work.addEventListener('click',e=>{
      e.stopPropagation();
      const p=document.getElementById(POP_ID);
      const open=p.classList.toggle('open');
      work.setAttribute('aria-expanded',open?'true':'false');
      if(open){
        const r=wrap.getBoundingClientRect();
        p.style.left=Math.max(0,Math.min(r.left,window.innerWidth-p.offsetWidth-18))+'px';
        p.style.top=(r.bottom+8)+'px';
      }
    });
    document.addEventListener('click',e=>{if(!wrap.contains(e.target)&&!document.getElementById(POP_ID)?.contains(e.target))closePopover()},{passive:true});
  }

  function boot(){installStyles();installSelector()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  new MutationObserver(()=>{installStyles();installSelector()}).observe(document.body,{childList:true,subtree:true});
})();

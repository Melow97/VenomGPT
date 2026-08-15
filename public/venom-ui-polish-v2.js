/* VENOM GPT UI POLISH V2 — Chat/Work switch, cream theme, integrated Spider Tracker */
(()=>{
  'use strict';
  if(window.__venomUIPolishV2)return;
  window.__venomUIPolishV2=true;

  const css=`
  /* compact composer tools */
  .vgComposerTools{gap:5px!important;align-items:center!important}
  .vgComposerTools button,.vgSend{width:36px!important;height:36px!important;min-width:36px!important;min-height:36px!important;padding:0!important;font-size:16px!important}
  #vgPlus{font-size:19px!important;font-weight:500!important}
  /* never show a detached/floating file affordance; files are exposed through + */
  .vgFileFloat,.floating-files,.floating-files-button,[data-floating-files],#floating-files{display:none!important}
  /* Chat / Work switch */
  .vgModeSwitch{display:flex;align-items:center;gap:3px;padding:3px;border:1px solid #ffffff12;background:#ffffff05;border-radius:12px}
  .vgModeSwitch button{height:32px;padding:0 11px;border:0;border-radius:9px;background:transparent;color:#7f8d89;font:800 12px system-ui;cursor:pointer;display:flex;align-items:center;gap:6px}
  .vgModeSwitch button.active{background:#173536;color:#eaf4ef;box-shadow:0 2px 10px #0005}
  .vgModeSwitch .free{color:#63e6df}.vgModeSwitch .lock{font-size:11px;color:#9b8d73}
  .vgModeSwitch button:hover{color:#fff}
  .vgWorkPanel{display:none;position:fixed;inset:0;z-index:4500;background:#0009;backdrop-filter:blur(12px);align-items:center;justify-content:center;padding:20px}
  .vgWorkPanel.open{display:flex}
  .vgWorkCard{width:min(920px,100%);max-height:min(760px,90vh);overflow:auto;background:#0d1516;border:1px solid #39ddd544;border-radius:24px;box-shadow:0 40px 120px #000b;padding:24px}
  .vgWorkHead{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;border-bottom:1px solid #ffffff0d;padding-bottom:18px}
  .vgWorkHead h2{margin:0;color:#f2e8d7;font-size:28px}.vgWorkHead p{margin:7px 0 0;color:#82908c;line-height:1.5}
  .vgClose{width:38px;height:38px;border:1px solid #ffffff12;background:#ffffff05;color:#b7c2be;border-radius:10px;cursor:pointer;font-size:18px}.vgClose:hover{border-color:#39ddd566;color:#fff}
  .vgWorkGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:18px}
  .vgWorkFeature{padding:15px;border:1px solid #ffffff0d;border-radius:15px;background:#ffffff03}.vgWorkFeature b{display:block;color:#e8eee9;font-size:13px}.vgWorkFeature span{display:block;color:#788783;font-size:11px;line-height:1.5;margin-top:5px}
  .vgAppsTitle{margin:24px 0 10px;font:900 11px monospace;letter-spacing:.12em;color:#55ddd5}.vgAppGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}
  .vgAppRow{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:11px 12px;border:1px solid #ffffff0c;border-radius:12px;background:#ffffff03}.vgAppName{display:flex;align-items:center;gap:9px;color:#dfe8e3;font-size:13px}.vgAppDot{width:8px;height:8px;border-radius:50%;background:#e2bd67;box-shadow:0 0 10px #e2bd67}.vgConnect{border:1px solid #39ddd544;background:#39ddd50d;color:#63e6df;border-radius:8px;padding:6px 9px;font-size:11px;font-weight:800;cursor:pointer}.vgConnect:hover{background:#39ddd51c}
  .vgWorkflowRow{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}.vgWorkflow{border:1px solid #ffffff10;background:#ffffff04;color:#aeb9b5;border-radius:10px;padding:9px 11px;font-size:11px;cursor:pointer}.vgWorkflow:hover{border-color:#39ddd566;color:#fff}
  /* integrated tracker inside the AI app */
  .vgTrackerView{padding:20px;max-width:1480px;margin:0 auto}.vgTrackerShell{border:1px solid #124e58;border-radius:22px;overflow:hidden;background:#061217;box-shadow:0 30px 90px #0008}
  .vgTrackerBar{height:58px;display:flex;align-items:center;justify-content:space-between;padding:0 18px;background:#071b20;border-bottom:1px solid #0d4c56;color:#dcece8}.vgTrackerBar b{font:900 11px monospace;letter-spacing:.08em}.vgTrackerStatus{color:#52e4d6;font:900 10px monospace}
  .vgTrackerMap{position:relative;height:min(560px,62vh);min-height:400px;overflow:hidden;background:radial-gradient(circle at 45% 50%,#0d5063,#05202d 42%,#031017 100%)}
  .vgTrackerMap:before{content:'';position:absolute;inset:-10%;opacity:.55;background:repeating-linear-gradient(35deg,transparent 0 27px,#126176 28px 30px,transparent 31px 61px),repeating-linear-gradient(115deg,transparent 0 41px,#0c4b5c 42px 44px,transparent 45px 89px);transform:rotate(-4deg) scale(1.1)}
  .vgTrackerMap:after{content:'MANHATTAN   QUEENS   BROOKLYN';position:absolute;inset:auto 0 22px;text-align:center;color:#3d8da0;font:900 18px monospace;letter-spacing:.2em;opacity:.45}
  .vgMapLine{position:absolute;height:2px;background:linear-gradient(90deg,transparent,#35d7e7,#35d7e7,transparent);box-shadow:0 0 9px #35d7e7;transform-origin:left;opacity:.8}.l1{width:68%;left:10%;top:35%;transform:rotate(18deg)}.l2{width:55%;left:28%;top:62%;transform:rotate(-22deg)}.l3{width:48%;left:5%;top:72%;transform:rotate(-6deg)}
  .vgMapMarker{position:absolute;width:17px;height:17px;border-radius:50%;background:#ff6849;border:3px solid #ffe0a1;box-shadow:0 0 0 7px #ff684933,0 0 30px #ff6849;cursor:pointer;animation:vgPulse 1.5s infinite}.vgMapMarker span{position:absolute;left:25px;top:-5px;white-space:nowrap;padding:5px 7px;border:1px solid #2bbdca;background:#06191dcc;color:#dffaf5;border-radius:6px;font:900 9px monospace}.m1{left:47%;top:42%}.m2{left:69%;top:30%;background:#56e5d9}.m3{left:75%;top:67%;background:#e8bd68}.m4{left:29%;top:55%;background:#56e5d9}@keyframes vgPulse{0%,100%{box-shadow:0 0 0 5px #ff684933,0 0 22px #ff6849}50%{box-shadow:0 0 0 12px #ff684912,0 0 36px #ff6849}}
  .vgTrackerControls{display:grid;grid-template-columns:1.2fr 1fr;gap:12px;padding:14px;background:#061116;border-top:1px solid #0c3d47}.vgTrackerPanel{border:1px solid #ffffff0c;border-radius:15px;padding:14px;background:#09191d}.vgTrackerPanel h3{margin:0 0 9px;color:#e5eee9;font-size:13px}.vgSignal{padding:8px 0;border-bottom:1px solid #ffffff08;color:#91a19d;font:500 11px system-ui}.vgSignal b{color:#5ee1d8;font-family:monospace;margin-right:8px}.vgTrackBtns{display:flex;gap:8px;flex-wrap:wrap}.vgTrackBtns button{border:1px solid #24bac866;background:#0b2930;color:#6ee8df;border-radius:9px;padding:9px 12px;font-weight:800;font-size:11px;cursor:pointer}.vgTrackBtns button:hover{background:#0f3b44}.vgTrackBtns .orange{border-color:#f26b4c66;color:#ff9b82}
  /* cream leather light theme */
  body.light #app{background:linear-gradient(180deg,#f4ead7,#e9dcc5)!important;color:#2b2923}
  body.light #app .top{background:rgba(245,237,222,.94)!important;border-bottom-color:#cfc0a5!important;box-shadow:0 5px 24px #7b68401a!important}
  body.light #app .brand{color:#29261f!important}.light #app .brand span{color:#168e8b!important}
  body.light #app .side{background:linear-gradient(180deg,#eee3d0,#e5d8c1)!important;border-right-color:#cfc0a5!important}
  body.light #app .side>a,body.light #app .side .sideBtn{color:#514b40!important}
  body.light #app .side .sideBtn.active{background:linear-gradient(90deg,#d6ebe6,#c7e0dc)!important;border-color:#5ebdb566!important;color:#166e6a!important;box-shadow:inset 3px 0 #1a9b96,0 8px 24px #6d5d3b18!important}
  body.light #app .main{background:radial-gradient(circle at 50% 0,#fff9eeaa,transparent 38%)!important}
  body.light .vgHomeWrap{background:transparent}
  body.light .vgHeroNew{background:linear-gradient(120deg,#eee1c8,#f8f0e2 55%,#e7d6b9)!important;border-color:#c6b695!important;box-shadow:0 24px 70px #6e593718!important}
  body.light .vgHeroNew h1,body.light .vgHeroNew p,body.light .vgHeroNew .vgAction:not(.primary){color:#342f26!important}
  body.light .vgStatusCard,body.light .vgPanelNew,body.light .vgModuleNew{background:rgba(255,250,240,.72)!important;border-color:#cdbf9f!important;box-shadow:0 12px 35px #6e593712!important}
  body.light .vgStatusCard h3,body.light .vgPanelNew h3,body.light .vgModuleNew h3{color:#3c372d!important}
  body.light .vgStatusLine,body.light .vgSignalRow{border-bottom-color:#9d8b6a22!important;color:#756b59!important}
  body.light .vgModuleNew p,body.light .vgPanelNew p{color:#766d5f!important}.light .vgModuleNew .arrow{color:#716552!important}
  body.light .vgAction{background:#fff9ed;color:#40382d;border-color:#bdaF91}.light .vgAction.primary{background:#195f5b;color:#fff5e6;border-color:#195f5b}
  body.light .vgModeSwitch{background:#e3d7c1;border-color:#bfae8f}.light .vgModeSwitch button{color:#756b59}.light .vgModeSwitch button.active{background:#fff7e8;color:#333026;box-shadow:0 2px 8px #6b59361f}
  body.light .vgChatShell{background:linear-gradient(180deg,#f5ecdc,#efe4d1)!important}.light .vgChatHead{background:#f3e8d5e8;border-bottom-color:#cfc0a5}.light .vgChatHead .title{color:#332e26}.light .vgChatHead .meta{color:#178f8a}.light .vgIconBtn{background:#fff9ef;border-color:#c6b695;color:#655b4b}.light .vgWelcome h2{color:#352f27}.light .vgWelcome p{color:#7a6e5d}.light .vgSuggestion{background:#fff8ec;border-color:#d0c0a4;color:#6a604f}.light .vgSuggestion:hover{border-color:#55aaa6;color:#2f514f}.light .vgBubble{background:#fff8ed;border-color:#d4c5a9;color:#3d382f;box-shadow:0 7px 20px #6e593710}.light .vgMsg.user .vgBubble{background:#dbece8;border-color:#84bdb7}.light .vgComposerNew{background:rgba(255,249,238,.95);border-color:#c5b695;box-shadow:0 20px 60px #6e593725}.light .vgComposerNew textarea{color:#312d26}.light .vgComposerTools button,.light .vgSend{background:#fff8eb;border-color:#cdbd9f;color:#5c5141}.light .vgSend{background:#195f5b;color:#fff7e8;border-color:#195f5b}.light .vgToolMenu,.light .vgCommandBox{background:#f6ecdc;border-color:#c5b695;box-shadow:0 25px 70px #66553533}.light .vgToolMenu button,.light .vgCmdItem{background:#fff8eb;color:#4b4336}.light .vgToolMenu button:hover,.light .vgCmdItem:hover{border-color:#55aaa6;color:#22514f}.light .vgWorkCard{background:#f4ead9;border-color:#bfae8f;box-shadow:0 30px 90px #5b4a302e}.light .vgWorkHead h2{color:#352f27}.light .vgWorkHead p,.light .vgWorkFeature span{color:#756b5b}.light .vgWorkFeature,.light .vgAppRow{background:#fff8ec;border-color:#d0c0a4}.light .vgWorkFeature b,.light .vgAppName{color:#433b2f}.light .vgWorkflow{background:#fff8ec;border-color:#d0c0a4;color:#655a4a}.light .vgConnect{background:#dceee9;color:#196f6b;border-color:#7bbab3}
  @media(max-width:800px){.vgWorkGrid{grid-template-columns:1fr 1fr}.vgAppGrid{grid-template-columns:1fr}.vgTrackerControls{grid-template-columns:1fr}.vgTrackerMap{min-height:360px;height:52vh}}
  @media(max-width:560px){.vgModeSwitch button{padding:0 8px}.vgWorkGrid{grid-template-columns:1fr}.vgTrackerView{padding:12px}.vgTrackerBar{padding:0 12px}.vgTrackerMap{min-height:330px}}
  `;
  const style=document.createElement('style');style.id='venom-ui-polish-v2';style.textContent=css;document.head.appendChild(style);

  const toast=(msg)=>{if(typeof window.__venomToast==='function')return window.__venomToast(msg);document.querySelector('.vgToast')?.remove();const t=document.createElement('div');t.className='vgToast';t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),2200)};

  function removeFloatingFiles(){document.querySelectorAll('body *').forEach(el=>{if(el===document.body||el.matches('input,textarea,script,style'))return;const txt=(el.textContent||'').trim().toLowerCase();const cls=((el.className&&String(el.className))||'').toLowerCase();const id=(el.id||'').toLowerCase();if((cls.includes('floating')||cls.includes('float'))&&(txt.includes('file')||id.includes('file'))){el.style.display='none'}})}

  function ensureModeSwitch(){
    const top=document.querySelector('#app .top');if(!top||top.querySelector('.vgModeSwitch'))return;
    const wrap=document.createElement('div');wrap.className='vgModeSwitch';wrap.innerHTML='<button class="active" data-mode="chat">💬 <span>Chat</span> <span class="free">FREE</span></button><button data-mode="work">▣ <span>Work</span> <span class="lock">🔒</span></button>';
    const spacer=top.querySelector('.spacer');if(spacer)spacer.before(wrap);else top.insertBefore(wrap,top.children[1]||null);
    wrap.querySelectorAll('button').forEach(b=>b.onclick=()=>{if(b.dataset.mode==='chat'){wrap.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active');window.newChat?.()}else openWorkPanel()});
  }

  function openWorkPanel(){
    let p=document.getElementById('vgWorkPanel');if(!p){
      p=document.createElement('div');p.id='vgWorkPanel';p.className='vgWorkPanel';
      p.innerHTML=`<div class="vgWorkCard"><div class="vgWorkHead"><div><h2>Venom GPT Work <span style="font-size:12px;color:#d8b96f">🔒</span></h2><p>A dedicated workspace for longer, multi-step tasks, connected apps and repeatable workflows.</p></div><button class="vgClose">×</button></div><div class="vgAppsTitle">WORK FEATURES</div><div class="vgWorkGrid"><div class="vgWorkFeature"><b>Deep Workflows</b><span>Break larger projects into structured steps and outputs.</span></div><div class="vgWorkFeature"><b>Connected Apps</b><span>Bring approved files, messages, calendars and project data into workflows.</span></div><div class="vgWorkFeature"><b>Automation Ready</b><span>Design repeatable workflows around supported connected services.</span></div><div class="vgWorkFeature"><b>Project Context</b><span>Keep related instructions, files and outputs together.</span></div><div class="vgWorkFeature"><b>Research + Files</b><span>Combine web research with documents and workspace material.</span></div><div class="vgWorkFeature"><b>Team Workflows</b><span>Prepare structured deliverables for work and collaboration.</span></div></div><div class="vgAppsTitle">CONNECTABLE APPS</div><div class="vgAppGrid">${['Google Drive','Gmail','Google Calendar','Notion','GitHub','Dropbox','Slack','Microsoft OneDrive','Trello','Figma'].map(x=>`<div class="vgAppRow"><div class="vgAppName"><i class="vgAppDot"></i>${x}</div><button class="vgConnect" data-app="${x}">Connect</button></div>`).join('')}</div><div class="vgAppsTitle">QUICK WORKFLOWS</div><div class="vgWorkflowRow"><button class="vgWorkflow" data-workflow="Weekly report">Build weekly report</button><button class="vgWorkflow" data-workflow="Meeting brief">Prepare meeting brief</button><button class="vgWorkflow" data-workflow="Project plan">Create project plan</button><button class="vgWorkflow" data-workflow="Inbox summary">Summarize inbox</button></div></div>`;
      document.body.appendChild(p);p.querySelector('.vgClose').onclick=()=>p.classList.remove('open');p.addEventListener('click',e=>{if(e.target===p)p.classList.remove('open')});
      p.querySelectorAll('.vgConnect').forEach(b=>b.onclick=()=>toast(`${b.dataset.app}: connection setup ready — authentication will be required.`));
      p.querySelectorAll('.vgWorkflow').forEach(b=>b.onclick=()=>{p.classList.remove('open');window.newChat?.();setTimeout(()=>{const input=document.getElementById('vgPrompt');if(input){input.value=`Help me ${b.dataset.workflow.toLowerCase()} using my connected workspace context.`;input.dispatchEvent(new Event('input'));input.focus()}},100)});
    }
    p.classList.add('open');
  }
  window.openVenomWork=openWorkPanel;

  function renderTracker(){
    const main=document.getElementById('main');if(!main)return;
    main.innerHTML=`<div class="vgTrackerView"><div class="vgTrackerShell"><div class="vgTrackerBar"><b>🕷 VENOM GPT // SPIDER TRACKER</b><span class="vgTrackerStatus">● NYC SIGNAL ONLINE · FICTIONAL TELEMETRY</span></div><div class="vgTrackerMap"><i class="vgMapLine l1"></i><i class="vgMapLine l2"></i><i class="vgMapLine l3"></i><div class="vgMapMarker m1"><span>MIDTOWN</span></div><div class="vgMapMarker m2"><span>QUEENS</span></div><div class="vgMapMarker m3"><span>BROOKLYN</span></div><div class="vgMapMarker m4"><span>HARLEM</span></div></div><div class="vgTrackerControls"><section class="vgTrackerPanel"><h3>LIVE SIGNAL FEED</h3><div class="vgSignal"><b>NOW</b> Signal moving through Midtown</div><div class="vgSignal"><b>12 SEC</b> Community ping received</div><div class="vgSignal"><b>24 SEC</b> Signal strength stable</div><div class="vgSignal"><b>38 SEC</b> New Queens signal detected</div></section><section class="vgTrackerPanel"><h3>TRACKER CONTROLS</h3><div class="vgTrackBtns"><button onclick="document.querySelector('.vgTrackerMap').scrollIntoView({behavior:'smooth'})">RECENTER</button><button class="orange" onclick="toast('Next fictional sighting: Queens')">NEXT SIGHTING</button><button onclick="toast('Signal filter: all districts')">FILTER</button></div><p style="color:#6f8580;font:500 10px monospace;margin:14px 0 0">DEMO MODE · DOES NOT TRACK REAL PEOPLE</p></section></div></div></div>`;
  }
  window.openVenomTracker=renderTracker;

  function patchTracker(){
    window.openTracker=renderTracker;
    document.querySelectorAll('#app .side a').forEach(a=>{if(a.textContent.toLowerCase().includes('spider tech')||a.textContent.toLowerCase().includes('spider tracker'))a.onclick=e=>{e.preventDefault();renderTracker()}});
  }

  function patchComposerPlus(){
    const plus=document.getElementById('vgPlus');if(!plus||plus.dataset.vgPolish)return;plus.dataset.vgPolish='1';plus.title='Tools & files';plus.style.width='36px';plus.style.height='36px';
  }

  function patchChatMode(){
    const top=document.querySelector('#app .top');const sw=top?.querySelector('.vgModeSwitch');if(sw){sw.querySelector('[data-mode="chat"]')?.classList.add('active')}
  }

  function boot(){
    ensureModeSwitch();patchTracker();patchComposerPlus();removeFloatingFiles();patchChatMode();
    const app=document.getElementById('app');if(app&&!app.dataset.vgPolishObserver){app.dataset.vgPolishObserver='1';new MutationObserver(()=>{ensureModeSwitch();patchTracker();patchComposerPlus();removeFloatingFiles()}).observe(app,{childList:true,subtree:true})}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,500));else setTimeout(boot,500);
})();

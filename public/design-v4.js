/* VENOM GPT DESIGN SYSTEM V4 — premium shared visual layer */
(function(){
  const css=`
  :root{--v4-bg:#060b0d;--v4-panel:#0b1317;--v4-panel2:#0e191e;--v4-line:#24383e;--v4-text:#eee8dc;--v4-muted:#8d9b98;--v4-teal:#55ddd6;--v4-orange:#f26749;--v4-gold:#e8bd62;--v4-shadow:0 24px 80px rgba(0,0,0,.48)}
  body{background:var(--v4-bg)}
  /* shared premium chrome */
  #app .appShell{background:radial-gradient(circle at 72% -10%,rgba(45,126,126,.12),transparent 32%),#060b0d}
  #app .top{height:64px!important;background:rgba(6,11,13,.88)!important;border-bottom:1px solid rgba(85,221,214,.13)!important;backdrop-filter:blur(18px);position:relative;z-index:20}
  #app .brand{font-weight:950;letter-spacing:.08em;text-shadow:0 0 22px rgba(85,221,214,.12)}#app .brand span{color:var(--v4-teal)}
  #app .side{background:linear-gradient(180deg,#091114,#071013)!important;border-right:1px solid rgba(85,221,214,.11)!important}
  #app .sideBtn,#app .side a{border-radius:8px;transition:.18s ease!important}#app .sideBtn:hover,#app .side a:hover{background:#102126!important;color:#72e9e2!important;transform:translateX(2px)}
  #app .side .title{font-size:9px!important;letter-spacing:.14em;color:#526764!important;margin-top:18px}
  /* landing polish */
  #landing.vg{background:radial-gradient(circle at 75% 8%,rgba(64,154,151,.16),transparent 27%),radial-gradient(circle at 20% 45%,rgba(242,103,73,.06),transparent 28%),#060b0d!important}
  #landing .vgBrand{letter-spacing:.06em}#landing .vgWord span{color:var(--v4-teal)}
  #landing .vgHero{box-shadow:0 40px 120px rgba(0,0,0,.55),inset 0 1px rgba(255,255,255,.03)!important}
  #landing .vgPanel{border-color:#35535a!important;box-shadow:0 0 0 1px rgba(85,221,214,.04),0 30px 90px rgba(0,0,0,.5)!important}
  #landing .vgCard,#landing .vgWide,#landing .vgPriceCard{transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease!important}#landing .vgCard:hover,#landing .vgWide:hover,#landing .vgPriceCard:hover{transform:translateY(-4px);border-color:#3aa9a6!important;box-shadow:0 20px 60px rgba(0,0,0,.3)}
  /* home */
  .v4-home-tools{position:absolute;right:20px;bottom:20px;display:flex;gap:7px;z-index:8}.v4-mini{border:1px solid #365057;background:rgba(7,16,20,.9);color:#bfe4e1;border-radius:8px;padding:8px 10px;font:900 9px monospace;backdrop-filter:blur(10px)}.v4-mini:hover{border-color:var(--v4-teal);color:#fff}
  .v4-module-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-top:12px}.v4-module-card{position:relative;min-height:145px;padding:17px;border:1px solid #263b41;border-radius:12px;background:linear-gradient(145deg,#0d181d,#081013);overflow:hidden;cursor:pointer}.v4-module-card:before{content:'';position:absolute;width:110px;height:110px;right:-40px;top:-45px;border-radius:50%;background:radial-gradient(circle,#55ddd620,transparent 68%)}.v4-module-card:hover{border-color:#3caaa7;transform:translateY(-2px);box-shadow:0 20px 55px #0007}.v4-module-icon{width:31px;height:31px;border-radius:8px;display:grid;place-items:center;background:#10252a;border:1px solid #2d565b;color:var(--v4-teal);font-size:16px}.v4-module-card h3{margin:12px 0 5px;font-size:14px}.v4-module-card p{margin:0;color:#81908d;font-size:10px;line-height:1.5}.v4-module-arrow{position:absolute;right:14px;bottom:11px;color:#52716f}
  /* chat */
  .v3-chat{border-color:#294249!important;box-shadow:var(--v4-shadow)}.v3-chat-head{height:68px!important;background:linear-gradient(90deg,#091215,#0a1418)!important}.v3-chat-brand{font-size:14px}.v3-chat-meta{font-size:8px!important;letter-spacing:.1em}.v3-brain{filter:drop-shadow(0 0 9px rgba(232,189,98,.2))}.v3-chat-body{background:radial-gradient(circle at 50% 10%,rgba(43,116,118,.06),transparent 34%),#070d10}.v3-welcome h2{letter-spacing:-.03em}.v3-bubble{box-shadow:0 10px 30px #0004}.v3-you .v3-bubble{border-color:#245a5c!important;background:linear-gradient(135deg,#103235,#0e2528)!important}.v3-composer{background:#080f12!important;padding:14px!important}.v3-composer textarea{border-color:#2d484e!important;background:#071013!important;box-shadow:inset 0 1px rgba(255,255,255,.025)}.v3-composer button{transition:.18s ease}.v3-composer button:hover{border-color:var(--v4-teal);color:#fff;box-shadow:0 0 18px rgba(85,221,214,.08)}
  .v4-composer-wrap{position:relative;flex:1;display:flex;min-width:0}.v4-plus-menu{position:absolute;left:0;bottom:62px;width:300px;padding:9px;border:1px solid #365057;border-radius:12px;background:rgba(8,16,19,.98);box-shadow:0 25px 80px #000b;backdrop-filter:blur(18px);z-index:30;display:none}.v4-plus-menu.open{display:block;animation:v4menu .15s ease}@keyframes v4menu{from{opacity:0;transform:translateY(5px) scale(.98)}to{opacity:1;transform:none}}.v4-menu-title{padding:7px 9px 9px;font:900 9px monospace;color:#687a77;letter-spacing:.12em}.v4-menu-grid{display:grid;grid-template-columns:1fr 1fr;gap:5px}.v4-menu-item{display:flex;gap:9px;align-items:center;padding:10px;border:1px solid transparent;border-radius:8px;background:#0d191d;color:#c8d5d1;text-align:left}.v4-menu-item:hover{border-color:#2c8583;background:#102326}.v4-mi-icon{width:26px;height:26px;display:grid;place-items:center;border-radius:6px;background:#10282c;color:var(--v4-teal)}.v4-mi-copy b{display:block;font-size:10px}.v4-mi-copy span{display:block;color:#697a77;font-size:8px;margin-top:2px}
  .v4-think{display:flex;align-items:center;gap:7px;margin-right:auto;padding:7px 10px;border:1px solid #69582e;background:#151307;color:#e8bd62;border-radius:8px;font:900 9px monospace}.v4-think.active{box-shadow:0 0 20px rgba(232,189,98,.1);border-color:#a08240}.v4-think-dot{width:7px;height:7px;border-radius:50%;background:#e8bd62;box-shadow:0 0 10px #e8bd62}
  /* rich module surfaces */
  .v4-surface{min-height:calc(100vh - 110px);border:1px solid #293e44;border-radius:14px;background:radial-gradient(circle at 80% 0,rgba(61,138,137,.1),transparent 28%),#080f12;overflow:hidden;box-shadow:var(--v4-shadow)}.v4-surface-head{padding:24px 26px;border-bottom:1px solid #25373c;display:flex;align-items:center;gap:13px}.v4-surface-icon{width:43px;height:43px;display:grid;place-items:center;border:1px solid #2f6468;border-radius:10px;background:#0d2226;color:var(--v4-teal);font-size:20px}.v4-surface-head h1{margin:0;font-size:24px}.v4-surface-head p{margin:4px 0 0;color:#71807d;font-size:11px}.v4-surface-body{padding:20px 24px}.v4-tool-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.v4-tool{padding:17px;border:1px solid #263a40;border-radius:11px;background:#0c161a}.v4-tool h3{margin:8px 0 4px;font-size:13px}.v4-tool p{margin:0;color:#778683;font-size:10px;line-height:1.5}.v4-tool .v4-tool-ico{font-size:18px;color:var(--v4-teal)}
  .v4-image-studio{display:grid;grid-template-columns:330px 1fr;gap:14px}.v4-prompt-panel,.v4-preview{border:1px solid #263a40;border-radius:12px;background:#0b1519}.v4-prompt-panel{padding:15px}.v4-prompt-panel textarea{width:100%;min-height:150px;resize:vertical;background:#071013;border:1px solid #30474d;border-radius:9px;color:#eee7d8;padding:12px;font:13px system-ui}.v4-chip-row{display:flex;gap:5px;flex-wrap:wrap;margin:9px 0}.v4-chip{padding:6px 8px;border-radius:20px;border:1px solid #2b484e;background:#0d1b1f;color:#8ca6a2;font:8px monospace}.v4-generate{width:100%;margin-top:8px;padding:11px;border:1px solid #a34b35;border-radius:8px;background:#1b100d;color:#ff8268;font:900 10px monospace}.v4-preview{min-height:360px;display:grid;place-items:center;position:relative;overflow:hidden;background:radial-gradient(circle at 50% 40%,rgba(85,221,214,.1),transparent 30%),repeating-linear-gradient(45deg,#091215 0 10px,#0b171a 10px 20px)}.v4-preview-inner{text-align:center;color:#6d7d7a}.v4-preview-inner .mark{width:70px;height:70px;margin:auto;border:1px solid #37666a;border-radius:20px;display:grid;place-items:center;color:#55ddd6;font-size:30px;box-shadow:0 0 50px rgba(85,221,214,.08)}.v4-preview-inner b{display:block;margin-top:13px;color:#b5c6c2;font-size:12px}.v4-preview-inner span{display:block;margin-top:5px;font:9px monospace}
  @media(max-width:1050px){.v4-module-grid{grid-template-columns:repeat(2,1fr)}.v4-image-studio{grid-template-columns:1fr}.v4-tool-grid{grid-template-columns:1fr 1fr}}@media(max-width:650px){.v4-module-grid,.v4-tool-grid{grid-template-columns:1fr}.v4-plus-menu{width:calc(100vw - 70px)}}`;
  const st=document.createElement('style');st.id='venom-design-v4';st.textContent=css;document.head.appendChild(st);

  const icons={
    'Design Studio':'🎨','Chat with PDFs':'📄','Presentations':'📊','Spreadsheets':'📈','Image Studio':'🖼','Cyber Lab':'🛡','Live Voice':'🎙','Attachments':'📎','Search':'⌕','Research':'◈','Code Studio':'⌘','Data Analysis':'▥'
  };
  function richSurface(title,desc,content){return `<div class="v4"><section class="v4-surface"><div class="v4-surface-head"><div class="v4-surface-icon">${icons[title]||'✦'}</div><div><h1>${title}</h1><p>${desc}</p></div></div><div class="v4-surface-body">${content}</div></section></div>`}
  function imageStudio(){
    const m=document.getElementById('main');if(!m)return;
    m.innerHTML=richSurface('Image Studio','Create visual concepts, refine prompts and prepare assets inside Venom GPT.',`<div class="v4-image-studio"><div class="v4-prompt-panel"><div style="font:900 9px monospace;color:#70817e;letter-spacing:.1em">IMAGE PROMPT</div><textarea id="v4imgprompt" placeholder="Describe the image you want to create…">Premium Spider-Tech emblem, cinematic black interface, subtle teal energy, retro comic-tech details</textarea><div class="v4-chip-row"><button class="v4-chip">Cinematic</button><button class="v4-chip">Retro comic</button><button class="v4-chip">3D emblem</button><button class="v4-chip">Dark UI</button></div><button class="v4-generate" onclick="window.v4ImageDemo()">✦ GENERATE CONCEPT</button><div style="margin-top:12px;color:#62726f;font:9px/1.6 monospace">Generation controls can be connected to the production image endpoint when enabled.</div></div><div class="v4-preview" id="v4imgpreview"><div class="v4-preview-inner"><div class="mark">🕷</div><b>VENOM IMAGE STUDIO</b><span>READY FOR YOUR CONCEPT</span></div></div></div>`);
  }
  window.v4ImageDemo=function(){const p=document.getElementById('v4imgprompt')?.value||'';const v=document.getElementById('v4imgpreview');if(v)v.innerHTML=`<div class="v4-preview-inner"><div class="mark">✦</div><b>CONCEPT QUEUED</b><span>${String(p).slice(0,70).replace(/[<>]/g,'')}</span></div>`};

  function installModuleWrapper(){
    if(typeof window.module!=='function'||window.module.__v4)return;
    const original=window.module;function wrapped(title,desc,b){
      if(title==='Image Studio')return imageStudio();
      const presets={
        'Design Studio':['Creative workspace','🎨',['Brand boards','UI concepts','Logo directions','Visual systems']],
        'Chat with PDFs':['Document intelligence','📄',['Summarize a PDF','Compare documents','Extract tables','Ask questions']],
        'Presentations':['Build polished decks','📊',['Pitch deck','Project update','Research slides','Speaker notes']],
        'Spreadsheets':['Data and analysis','📈',['Clean a dataset','Build a tracker','Analyze trends','Create formulas']],
        'Cyber Lab':['Defensive security workspace','🛡',['Threat analysis','Log review','Vulnerability notes','Incident checklist']],
        'Live Voice':['Voice workspace','🎙',['Voice conversation','Dictation','Read aloud','Meeting notes']],
        'Attachments':['Bring files into the conversation','📎',['PDF','DOCX','XLSX','Images']]
      };
      const x=presets[title];if(x){const[m,d,items]=x;return window.__v4Main(richSurface(title,desc||d,`<div class="v4-tool-grid">${items.map((it,i)=>`<div class="v4-tool"><div class="v4-tool-ico">${x[1]}</div><h3>${it}</h3><p>Open this workflow in the Venom GPT workspace.</p></div>`).join('')}</div>`));}
      return original.apply(this,arguments);
    }
    wrapped.__v4=true;window.module=wrapped;
  }
  window.__v4Main=function(html){const m=document.getElementById('main');if(m){m.innerHTML=html;window.scrollTo({top:0,behavior:'smooth'})}};

  function plusMenu(){
    const c=document.querySelector('.v3-composer');if(!c||c.dataset.v4)return;c.dataset.v4='1';
    const plus=c.querySelector('button');if(!plus)return;
    plus.onclick=function(e){e.stopPropagation();let menu=c.querySelector('.v4-plus-menu');if(!menu){menu=document.createElement('div');menu.className='v4-plus-menu';menu.innerHTML=`<div class="v4-menu-title">ADD TO YOUR CHAT</div><div class="v4-menu-grid">${[['📎','File','Upload a file'],['🖼','Image','Add an image'],['📄','PDF','Chat with a PDF'],['📊','Spreadsheet','Add a dataset'],['🎨','Image Studio','Create visuals'],['🖥','Code','Open code workspace']].map(x=>`<button class="v4-menu-item" data-tool="${x[1]}"><span class="v4-mi-icon">${x[0]}</span><span class="v4-mi-copy"><b>${x[1]}</b><span>${x[2]}</span></span></button>`).join('')}</div>`;c.appendChild(menu);menu.querySelectorAll('.v4-menu-item').forEach(b=>b.onclick=()=>{const t=b.dataset.tool;menu.classList.remove('open');if(t==='Image Studio')imageStudio();else if(t==='PDF')window.module('Chat with PDFs','Document intelligence.');else if(t==='Spreadsheet')window.module('Spreadsheets','Data and analysis.');else window.module('Attachments','Bring files into the conversation.');});document.addEventListener('click',()=>menu.classList.remove('open'),{once:true})}menu.classList.toggle('open')};
    const voice=c.querySelectorAll('button')[1];if(voice)voice.onclick=function(){this.classList.toggle('v4-voice-active');this.textContent=this.classList.contains('v4-voice-active')?'■':'🎙';document.getElementById('v3prompt')?.focus()};
    const send=c.querySelectorAll('button')[2];if(send)send.title='Send message';
    if(!c.querySelector('.v4-think')){const t=document.createElement('button');t.className='v4-think';t.innerHTML='<span class="v4-think-dot"></span><span>THINK</span>';t.onclick=()=>{t.classList.toggle('active');t.querySelector('span:last-child').textContent=t.classList.contains('active')?'THINKING ON':'THINK'};c.insertBefore(t,c.firstChild)}
  }

  function observe(){
    installModuleWrapper();plusMenu();
    const obs=new MutationObserver(()=>{installModuleWrapper();plusMenu()});obs.observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',observe);else observe();
})();

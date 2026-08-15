/* VENOM GPT — FEATURE TIERS / CONNECTOR SELLING PANEL */
(()=>{
  'use strict';
  if(window.__VENOM_FEATURE_TIERS__) return;
  window.__VENOM_FEATURE_TIERS__=true;
  const free=[
    ['🕷️','Spider-Tech Tracker','Cinematic tactical map, demo sightings, scan mode and signal console.'],
    ['💬','Venom AI Chat','Everyday AI conversations, writing, brainstorming and quick answers.'],
    ['📚','Files & Documents','Work with supported files and organise your AI workspace.'],
    ['🎙️','Voice & Vision','Voice input and visual workflows.'],
    ['🎨','Image Studio','Create visual concepts and creative assets.'],
    ['🔎','Research Tools','Organise research and explore complex questions.'],
    ['🗂️','Projects & History','Keep conversations and work organised.']
  ];
  const plus=[
    ['✉️','Gmail','Connect inbox context, threads and email workflows.','Google'],
    ['📅','Google Calendar','Connect schedules, events and planning workflows.','Google'],
    ['☁️','Google Drive','Search and work across connected Drive files.','Google'],
    ['💼','Salesforce CRM','Bring customer, account and pipeline context into Venom.','CRM'],
    ['🎧','Zendesk','Connect support tickets, customer context and service workflows.','Support'],
    ['🛍️','Shopify','Connect products, orders and commerce workflows.','Commerce'],
    ['💬','Slack','Bring team conversations and workspace context into AI workflows.','Teamwork'],
    ['💼','LinkedIn','Professional research, recruiting and outreach workflows.','Work'],
    ['🎨','Adobe Photoshop','Bring creative workflows and image-production tasks into your workspace.','Creative'],
    ['📄','Adobe Acrobat','Work with PDFs and document review workflows.','Documents'],
    ['✍️','DocuSign','Prepare and route documents for signing workflows.','Documents'],
    ['🎨','Canva','Connect design workflows and creative projects.','Creative'],
    ['🧩','Figma','Bring design files, prototypes and product context into AI workflows.','Creative'],
    ['🐙','GitHub','Connect repositories, issues and engineering context.','Engineering'],
    ['🎯','Jira','Connect tickets, projects and delivery workflows.','Engineering'],
    ['📝','Notion','Connect notes, wikis and internal knowledge.','Productivity'],
    ['🎵','Spotify','Bring media and playlist workflows into Venom.','Media'],
    ['🎥','Zoom','Connect meeting workflows and follow-up tasks.','Communication'],
    ['🪟','Microsoft 365','Connect Office productivity workflows.','Productivity'],
    ['📁','Dropbox','Connect cloud files and document workflows.','Storage']
  ];
  const css=`
  .vt-shell{width:min(900px,calc(100vw - 24px));max-height:min(760px,calc(100vh - 70px));overflow:auto;padding:22px;border-radius:24px;background:linear-gradient(145deg,#111216,#07080a);border:1px solid rgba(255,255,255,.12);box-shadow:0 35px 110px rgba(0,0,0,.62);color:#fff;font-family:inherit}
  .vt-head{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;margin-bottom:18px}.vt-kicker{font:800 10px ui-monospace,monospace;letter-spacing:1.7px;color:#58d9d1}.vt-title{font-size:25px;font-weight:900;letter-spacing:-.8px;margin-top:5px}.vt-sub{font-size:12px;line-height:1.5;color:#8e9896;margin-top:6px;max-width:610px}.vt-badge{padding:8px 10px;border-radius:999px;background:#121b1c;border:1px solid #ffffff13;color:#65ddd6;font:800 10px ui-monospace,monospace;white-space:nowrap}
  .vt-section{margin-top:18px}.vt-section-head{display:flex;align-items:end;justify-content:space-between;margin-bottom:9px}.vt-section-head h3{margin:0;font-size:14px}.vt-section-head span{font-size:10px;color:#727c79}.vt-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.vt-card{display:flex;gap:10px;align-items:flex-start;padding:12px;border:1px solid #ffffff0d;border-radius:15px;background:#ffffff05;transition:.16s}.vt-card:hover{transform:translateY(-2px);border-color:#55d9d144;background:#ffffff09}.vt-icon{width:34px;height:34px;flex:none;display:grid;place-items:center;border-radius:10px;background:#161b1d;border:1px solid #ffffff10;font-size:16px}.vt-card b{display:block;font-size:11px}.vt-card p{margin:4px 0 0;color:#7f8986;font-size:9.5px;line-height:1.45}.vt-plus{border-color:#55d9d125;background:linear-gradient(145deg,#101c1d,#0b1011)}.vt-plus .vt-lock{margin-left:auto;font-size:10px;color:#67ddd6}.vt-note{margin-top:16px;padding:13px 14px;border:1px solid #55d9d120;border-radius:14px;background:linear-gradient(90deg,#55d9d108,#ffffff03);font-size:10px;color:#7f8986;line-height:1.5}.vt-note strong{color:#fff}.vt-spider{border-color:#55d9d133;background:radial-gradient(circle at 15% 0,#55d9d112,transparent 40%),#ffffff05}.vt-spider .vt-icon{box-shadow:0 0 20px #55d9d115}
  @media(max-width:760px){.vt-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:500px){.vt-shell{padding:16px}.vt-grid{grid-template-columns:1fr}.vt-badge{display:none}}
  `;
  const style=document.createElement('style');style.id='venom-feature-tiers-css';style.textContent=css;document.head.appendChild(style);
  const makeCard=(item,paid=false)=>{const [icon,name,desc,cat]=item;const d=document.createElement('article');d.className='vt-card '+(name==='Spider-Tech Tracker'?'vt-spider ':'')+(paid?'vt-plus':'');d.innerHTML=`<span class="vt-icon">${icon}</span><div><b>${name}</b><p>${desc}</p></div>${paid?'<span class="vt-lock">PLUS</span>':''}`;return d};
  function render(){
    const old=document.querySelector('.venom-integrations-panel');if(!old||old.dataset.tierRebuilt==='1')return;
    old.dataset.tierRebuilt='1';
    const shell=document.createElement('div');shell.className='vt-shell';
    shell.innerHTML='<div class="vt-head"><div><div class="vt-kicker">VENOM GPT · FEATURES & CONNECT</div><div class="vt-title">More than a chatbot.</div><div class="vt-sub">Start free with Venom AI and Spider-Tech. Upgrade when you want connected business tools, inboxes, calendars, CRMs and creative workflows inside the same workspace.</div></div><div class="vt-badge">FREE → PLUS</div></div>';
    const fs=document.createElement('section');fs.className='vt-section';fs.innerHTML='<div class="vt-section-head"><h3>🕷️ Free tier · included</h3><span>Core Venom experience</span></div>';const fg=document.createElement('div');fg.className='vt-grid';free.forEach(x=>fg.appendChild(makeCard(x,false)));fs.appendChild(fg);shell.appendChild(fs);
    const ps=document.createElement('section');ps.className='vt-section';ps.innerHTML='<div class="vt-section-head"><h3>⚡ Venom Plus · connected workflows</h3><span>Premium connectors</span></div>';const pg=document.createElement('div');pg.className='vt-grid';plus.forEach(x=>pg.appendChild(makeCard(x,true)));ps.appendChild(pg);shell.appendChild(ps);
    const note=document.createElement('div');note.className='vt-note';note.innerHTML='<strong>Unlock the stack.</strong> Plus connectors are presented as available integrations; each third-party service still requires its own authorised connection before Venom can access it. <span>Spider-Tech remains the signature Venom experience.</span>';shell.appendChild(note);
    old.replaceWith(shell);
  }
  const run=()=>{render();setTimeout(render,500);setTimeout(render,1400)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  new MutationObserver(()=>render()).observe(document.body,{childList:true,subtree:true});
})();

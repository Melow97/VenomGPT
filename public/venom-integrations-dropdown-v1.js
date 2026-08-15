/* VENOM GPT — PREMIUM INTEGRATIONS DROPDOWN */
(()=>{
  if(window.__VENOM_INTEGRATIONS_DROPDOWN__) return;
  window.__VENOM_INTEGRATIONS_DROPDOWN__=true;

  const apps=[
    ['Spotify','SP','Music & Media','Bring playlists, listening context and media workflows into Venom.'],
    ['Shopify','SH','Commerce','Connect stores, products, orders and commerce workflows.'],
    ['LinkedIn','in','Work & Identity','Use professional profiles, recruiting and outreach workflows.'],
    ['DocuSign','DS','Documents','Prepare, review and route documents for signing.'],
    ['Google Drive','GD','Files & Cloud','Find, summarize and work with files from Drive.'],
    ['Gmail','GM','Communication','Turn email threads into searchable, actionable work.'],
    ['Slack','SL','Teamwork','Bring conversations, channels and team context into one workspace.'],
    ['Notion','N','Knowledge','Connect notes, wikis, projects and internal knowledge.'],
    ['Microsoft 365','M365','Productivity','Work across Office files, calendars and business workflows.'],
    ['Canva','CA','Creative','Create, review and move designs through your AI workflow.'],
    ['GitHub','GH','Engineering','Work with repositories, issues, pull requests and code context.'],
    ['Jira','JR','Engineering','Connect tickets, projects and delivery workflows.'],
    ['Adobe Acrobat','AA','Documents','Work with PDFs, documents and review workflows.'],
    ['Figma','FG','Creative','Bring designs, prototypes and product context into your workspace.'],
    ['Zoom','ZM','Communication','Connect meetings and turn conversations into follow-up work.'],
    ['Salesforce','SF','CRM','Bring customer, sales and pipeline context into Venom.']
  ];

  const css=`
    .venom-integrations-panel{position:fixed;z-index:2147483000;width:min(760px,calc(100vw - 28px));max-height:min(650px,calc(100vh - 100px));overflow:auto;display:none;padding:18px;border:1px solid rgba(255,255,255,.12);border-radius:22px;background:linear-gradient(145deg,rgba(17,17,21,.98),rgba(5,5,8,.985));box-shadow:0 28px 90px rgba(0,0,0,.58),0 0 45px rgba(255,255,255,.045);backdrop-filter:blur(24px);color:#fff;font-family:inherit}
    .venom-integrations-panel.is-open{display:block;animation:venomIntIn .16s ease-out}
    @keyframes venomIntIn{from{opacity:0;transform:translateY(-5px) scale(.985)}to{opacity:1;transform:translateY(0) scale(1)}}
    .venom-int-head{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;padding:4px 4px 15px}
    .venom-int-kicker{font-size:11px;letter-spacing:.14em;text-transform:uppercase;opacity:.48;font-weight:700;margin-bottom:5px}
    .venom-int-title{font-size:21px;font-weight:750;letter-spacing:-.02em}
    .venom-int-sub{font-size:12px;line-height:1.5;opacity:.55;margin-top:4px;max-width:500px}
    .venom-int-pill{font-size:11px;white-space:nowrap;padding:7px 10px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(255,255,255,.045);opacity:.7}
    .venom-int-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
    .venom-int-app{display:flex;align-items:center;gap:10px;min-width:0;padding:11px;border-radius:15px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.035);transition:.16s ease;cursor:pointer}
    .venom-int-app:hover{transform:translateY(-1px);border-color:rgba(255,255,255,.18);background:rgba(255,255,255,.075)}
    .venom-int-icon{width:36px;height:36px;flex:0 0 36px;border-radius:11px;display:grid;place-items:center;background:linear-gradient(145deg,#26262d,#101014);border:1px solid rgba(255,255,255,.1);font-size:10px;font-weight:800;letter-spacing:-.04em;box-shadow:inset 0 1px rgba(255,255,255,.08)}
    .venom-int-copy{min-width:0}.venom-int-name{font-size:12px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.venom-int-cat{font-size:10px;opacity:.42;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .venom-int-cta{margin-left:auto;font-size:9px;opacity:.42;white-space:nowrap}.venom-int-app:hover .venom-int-cta{opacity:.82}
    .venom-int-foot{display:flex;align-items:center;gap:8px;margin-top:12px;padding:11px 12px;border-radius:14px;background:linear-gradient(90deg,rgba(255,255,255,.05),rgba(255,255,255,.02));border:1px solid rgba(255,255,255,.06);font-size:11px;opacity:.68}
    .venom-int-eye{font-size:14px;line-height:1}.venom-int-foot strong{color:#fff;opacity:.95}
    @media(max-width:760px){.venom-int-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.venom-int-panel{width:calc(100vw - 20px)}}
    @media(max-width:470px){.venom-int-grid{grid-template-columns:1fr}.venom-int-panel{padding:14px}.venom-int-pill{display:none}}
  `;
  const style=document.createElement('style');style.id='venom-integrations-style';style.textContent=css;document.head.appendChild(style);

  const norm=s=>(s||'').replace(/\s+/g,' ').trim().toLowerCase();
  let panel=null, hideTimer=null, activeTrigger=null;

  function buildPanel(){
    if(panel) return panel;
    panel=document.createElement('div');panel.className='venom-integrations-panel';panel.setAttribute('role','menu');
    panel.innerHTML=`<div class="venom-int-head"><div><div class="venom-int-kicker">Venom Connect</div><div class="venom-int-title">Connect your favorite apps</div><div class="venom-int-sub">Bring the tools you already use into Venom GPT — work, commerce, communication, files, creative tools and more.</div></div><div class="venom-int-pill">16 integrations</div></div><div class="venom-int-grid"></div><div class="venom-int-foot"><span class="venom-int-eye">◉</span><span><strong>One workspace. Many tools.</strong> Connect your stack and keep your workflows in one place.</span></div>`;
    const grid=panel.querySelector('.venom-int-grid');
    apps.forEach(([name,mark,cat,desc])=>{
      const el=document.createElement('div');el.className='venom-int-app';el.setAttribute('role','menuitem');el.title=desc;
      el.innerHTML=`<div class="venom-int-icon">${mark}</div><div class="venom-int-copy"><div class="venom-int-name">${name}</div><div class="venom-int-cat">${cat}</div></div><span class="venom-int-cta">Connect →</span>`;
      el.addEventListener('click',()=>{
        window.dispatchEvent(new CustomEvent('venom:integration-selected',{detail:{name,category:cat}}));
        const msg=document.createElement('div');msg.textContent=`${name} selected — connector setup can be configured from Workspace.`;Object.assign(msg.style,{position:'fixed',zIndex:'2147483647',left:'50%',bottom:'28px',transform:'translateX(-50%)',padding:'11px 15px',border:'1px solid rgba(255,255,255,.12)',borderRadius:'999px',background:'rgba(12,12,16,.96)',color:'#fff',font:'12px system-ui',boxShadow:'0 12px 40px rgba(0,0,0,.45)'});document.body.appendChild(msg);setTimeout(()=>msg.remove(),2200);
      });
      grid.appendChild(el);
    });
    panel.addEventListener('mouseenter',()=>{clearTimeout(hideTimer)});
    panel.addEventListener('mouseleave',scheduleHide);
    document.body.appendChild(panel);return panel;
  }
  function scheduleHide(){clearTimeout(hideTimer);hideTimer=setTimeout(()=>{if(panel)panel.classList.remove('is-open')},140)}
  function position(trigger){
    const p=buildPanel();const r=trigger.getBoundingClientRect();
    const w=Math.min(760,window.innerWidth-28);let left=Math.max(14,Math.min(r.left,w===window.innerWidth-28?14:window.innerWidth-w-14));
    if(r.left+w>window.innerWidth-14) left=Math.max(14,window.innerWidth-w-14);
    p.style.left=left+'px';p.style.top=Math.min(window.innerHeight-30,r.bottom+10)+'px';p.style.width=w+'px';
    const pr=p.getBoundingClientRect();if(pr.bottom>window.innerHeight-14)p.style.top=Math.max(14,r.top-pr.height-10)+'px';
  }
  function open(trigger){clearTimeout(hideTimer);activeTrigger=trigger;position(trigger);buildPanel().classList.add('is-open')}
  function wire(){
    const candidates=[...document.querySelectorAll('a,button,[role="button"],div,span')].filter(el=>norm(el.textContent)==='features' || norm(el.getAttribute('aria-label'))==='features');
    candidates.slice(-6).forEach(trigger=>{
      if(trigger.dataset.venomIntegrationsWired==='1')return;
      trigger.dataset.venomIntegrationsWired='1';
      trigger.addEventListener('mouseenter',()=>open(trigger));
      trigger.addEventListener('focus',()=>open(trigger));
      trigger.addEventListener('mouseleave',scheduleHide);
      trigger.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();if(panel?.classList.contains('is-open'))scheduleHide();else open(trigger)});
    });
  }
  wire();
  new MutationObserver(()=>wire()).observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('resize',()=>{if(activeTrigger&&panel?.classList.contains('is-open'))position(activeTrigger)});
  window.addEventListener('scroll',()=>{if(activeTrigger&&panel?.classList.contains('is-open'))position(activeTrigger)},true);
})();

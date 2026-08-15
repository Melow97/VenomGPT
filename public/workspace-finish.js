/* VENOM GPT — final workspace polish
   Small controls, searchable connectors, chat history actions, Siri-style voice state. */
(function(){
  'use strict';
  const ID='venom-workspace-finish';
  if(document.getElementById(ID)) return;

  const style=document.createElement('style');
  style.id=ID;
  style.textContent=`
    .vms-plus{width:44px!important;min-width:44px!important;height:44px!important;min-height:44px!important;padding:0!important;margin:8px 0 2px 12px!important;border-radius:12px!important;box-sizing:border-box!important;display:grid!important;place-items:center!important;align-self:flex-start!important}
    .vms-plus span:last-child{display:none!important}
    .vms-plus .vms-ico,.vms-plus .vms-ico svg{width:22px!important;height:22px!important}
    .vgCustomizeBtn{width:100%;border:1px solid #ffffff12;background:transparent;color:#7f8a88;border-radius:9px;padding:8px 10px;text-align:left;font:700 11px system-ui;cursor:pointer}
    .vgCustomizeBtn:hover{background:#ffffff07;color:#63ddd6;border-color:#35d9d155}
    .vgConnectorSearch{display:flex;gap:7px;align-items:center;margin:8px 0 10px;padding:8px 10px;border:1px solid #ffffff14;border-radius:10px;background:#0e1416}
    .vgConnectorSearch input{flex:1;min-width:0;border:0;outline:0;background:transparent;color:#eee8dc;font:500 12px system-ui}
    .vgConnectorSearch span{color:#59d8d1;font-size:15px}
    .vgConnectorFilters{display:flex;gap:6px;overflow:auto;padding-bottom:5px;margin-bottom:4px;scrollbar-width:none}
    .vgConnectorFilters button{white-space:nowrap;border:1px solid #ffffff12;background:#101719;color:#8d9895;border-radius:999px;padding:5px 8px;font:800 9px system-ui;cursor:pointer}
    .vgConnectorFilters button.active{color:#071011;background:#59d8d1;border-color:#59d8d1}
    .vgConnectorGrid{max-height:47dvh;overflow:auto}
    .vgConnectorGrid .vms-app[data-hidden="1"]{display:none}
    .vgCustomizePanel{position:fixed;left:260px;bottom:22px;width:min(360px,calc(100vw - 280px));background:#0b1012;border:1px solid #ffffff18;border-radius:16px;box-shadow:0 25px 70px #000b;padding:16px;z-index:99999;display:none;color:#eee8dc}
    .vgCustomizePanel.open{display:block}
    .vgCustomizePanel h3{margin:0 0 5px;font-size:15px}.vgCustomizePanel p{margin:0 0 12px;color:#788481;font-size:11px;line-height:1.5}
    .vgCustomizeRow{display:flex;align-items:center;justify-content:space-between;padding:9px 0;border-top:1px solid #ffffff0d;font-size:12px}
    .vgToggle{width:34px;height:20px;border-radius:99px;border:1px solid #ffffff16;background:#182023;position:relative;cursor:pointer}.vgToggle:after{content:"";position:absolute;width:14px;height:14px;left:2px;top:2px;border-radius:50%;background:#788481;transition:.2s}.vgToggle.on{background:#175454;border-color:#35d9d1}.vgToggle.on:after{left:16px;background:#5ee1d9}
    .vgVoiceLive{position:relative;overflow:hidden}
    .vgVoiceLive:before{content:"";position:absolute;inset:-2px;border-radius:inherit;padding:2px;background:conic-gradient(from 0deg,#ff4d67,#ffb34d,#58e8d8,#7d6cff,#ff4d67);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:0;transition:opacity .2s;pointer-events:none}
    .vgVoiceLive.is-listening:before{opacity:1;animation:vgVoiceSpin 2s linear infinite}
    .vgVoiceLive.is-listening{box-shadow:0 0 18px #55ddd655,0 0 36px #7d6cff22}
    @keyframes vgVoiceSpin{to{transform:rotate(360deg)}}
    .vgVoiceLabel{position:absolute;left:50%;bottom:calc(100% + 7px);transform:translateX(-50%);background:#101619;border:1px solid #ffffff16;color:#a8b2ae;border-radius:999px;padding:4px 8px;font:800 9px monospace;opacity:0;pointer-events:none;white-space:nowrap}.is-listening .vgVoiceLabel{opacity:1;color:#69e4db}
    .vgHistoryTools{display:flex;gap:7px;align-items:center;margin-left:auto}
    .vgHistoryTools button{border:1px solid #ffffff14;background:#11181a;color:#9ba6a2;border-radius:8px;padding:6px 8px;font:800 9px system-ui;cursor:pointer}.vgHistoryTools button:hover{border-color:#ff7655;color:#ff9a7e}
    .vgHistoryDelete{color:#ff8060!important}
    @media(max-width:900px){.vgCustomizePanel{left:82px;width:min(360px,calc(100vw - 100px))}.vms-plus{margin-left:0!important}}
    @media(max-width:700px){.vgCustomizePanel{left:72px;right:10px;width:auto;bottom:10px}.vms-plus{width:42px!important;height:42px!important;min-width:42px!important}}
  `;
  document.head.appendChild(style);

  function addCustomize(){
    const side=document.getElementById('vms-sidebar');
    if(!side||side.querySelector('.vgCustomizeBtn')) return;
    const b=document.createElement('button');
    b.className='vgCustomizeBtn';
    b.type='button';
    b.innerHTML='••• &nbsp;Customize';
    side.querySelector('.vms-plus')?.insertAdjacentElement('afterend',b);
    b.onclick=()=>{makeCustomize();document.getElementById('vg-customize').classList.toggle('open')};
  }
  function makeCustomize(){
    if(document.getElementById('vg-customize')) return;
    const p=document.createElement('div');p.id='vg-customize';p.className='vgCustomizePanel';
    p.innerHTML='<h3>Customize workspace</h3><p>Keep Venom focused. Turn optional tools on only when you need them.</p>'+[['Voice glow','voice'],['Connector shortcuts','connectors'],['Chat history','history'],['Spider Tracker','tracker']].map(x=>'<div class="vgCustomizeRow"><span>'+x[0]+'</span><button class="vgToggle on" data-pref="'+x[1]+'" aria-label="Toggle '+x[0]+'"></button></div>').join('');
    document.body.appendChild(p);
    p.addEventListener('click',e=>{const t=e.target.closest('.vgToggle');if(!t)return;t.classList.toggle('on');localStorage.setItem('venom-pref-'+t.dataset.pref,t.classList.contains('on')?'1':'0')});
  }

  function enhanceConnectors(){
    const p=document.getElementById('vms-connect-panel');
    if(!p||p.dataset.enhanced==='1') return;
    p.dataset.enhanced='1';
    const head=p.querySelector('.vms-connect-head');
    if(head){
      const old=head.querySelector('strong');if(old)old.textContent='Connect apps';
      const search=document.createElement('div');search.className='vgConnectorSearch';search.innerHTML='<span>⌕</span><input aria-label="Search connectors" placeholder="Search all connectors…">';
      const filters=document.createElement('div');filters.className='vgConnectorFilters';
      ['All','Productivity','Storage','Dev','Media'].forEach((x,i)=>{const b=document.createElement('button');b.textContent=x;b.dataset.cat=x;b.className=i===0?'active':'';filters.appendChild(b)});
      head.insertAdjacentElement('afterend',search);search.insertAdjacentElement('afterend',filters);
      const grid=document.createElement('div');grid.className='vgConnectorGrid';
      const apps=[['Google Drive','Storage','drive'],['Gmail','Productivity','mail'],['Google Calendar','Productivity','calendar'],['GitHub','Dev','github'],['Notion','Productivity','notion'],['Dropbox','Storage','dropbox'],['Spotify','Media','chat'],['Slack','Productivity','chat'],['OneDrive','Storage','drive'],['Trello','Productivity','chat'],['Figma','Dev','chat']];
      grid.innerHTML=apps.map(([n,c,i])=>'<div class="vms-app" data-name="'+n.toLowerCase()+'" data-cat="'+c+'"><span class="vms-appico">'+(window.__venomSvg?window.__venomSvg(i):'●')+'</span><div><b>'+n+'</b><small>Available to connect</small></div><button type="button" data-connect="'+n+'">CONNECT</button></div>').join('');
      p.querySelectorAll('.vms-app').forEach(x=>x.remove());p.appendChild(grid);
      const input=search.querySelector('input');
      function filter(){const q=input.value.trim().toLowerCase();const cat=filters.querySelector('.active')?.dataset.cat||'All';grid.querySelectorAll('.vms-app').forEach(a=>{const ok=(cat==='All'||a.dataset.cat===cat)&&(!q||a.dataset.name.includes(q));a.dataset.hidden=ok?'0':'1'})}
      input.oninput=filter;filters.onclick=e=>{const b=e.target.closest('button');if(!b)return;filters.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active');filter()};
      grid.addEventListener('click',e=>{const b=e.target.closest('[data-connect]');if(!b)return;b.textContent='READY';b.disabled=true;b.parentElement.querySelector('small').textContent='Connection can be configured'});
    }
  }

  function enhanceVoice(){
    document.querySelectorAll('button').forEach(b=>{
      const txt=(b.getAttribute('aria-label')||b.title||b.textContent||'').toLowerCase();
      if(!txt.includes('mic')&&!txt.includes('voice'))return;
      if(b.dataset.voicePolished==='1')return;
      b.dataset.voicePolished='1';b.classList.add('vgVoiceLive');
      const lab=document.createElement('span');lab.className='vgVoiceLabel';lab.textContent='LISTENING';b.appendChild(lab);
      b.addEventListener('click',()=>{b.classList.toggle('is-listening')});
    });
  }

  function enhanceHistory(){
    document.querySelectorAll('.vHistoryRow').forEach(row=>{
      if(row.querySelector('.vgHistoryTools'))return;
      const tools=document.createElement('div');tools.className='vgHistoryTools';
      const del=document.createElement('button');del.className='vgHistoryDelete';del.textContent='DELETE';del.type='button';
      del.onclick=()=>{if(confirm('Delete this chat from this device?')){row.remove();document.dispatchEvent(new CustomEvent('venom:history-delete'))}};
      tools.appendChild(del);row.appendChild(tools);
    });
  }

  function install(){addCustomize();makeCustomize();enhanceConnectors();enhanceVoice();enhanceHistory()}
  const run=()=>setTimeout(install,350);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
  new MutationObserver(()=>{addCustomize();enhanceConnectors();enhanceVoice();enhanceHistory()}).observe(document.body,{childList:true,subtree:true});
})();

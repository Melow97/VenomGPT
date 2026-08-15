/* VENOM GPT — Owner/Admin Command Center
 * Privileged users get the complete workspace with no Pro locks.
 * Visual language follows the main Venom dashboard while adding operational controls.
 */
(function(){
  'use strict';
  const STYLE_ID='venom-admin-command-center-style';
  const ADMIN_ID='venom-admin-command-center';

  const isAdmin=()=>['owner','admin'].includes(String(window.userInfo?.role||'').toLowerCase());
  const esc=s=>String(s??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
  const toastMsg=(msg)=>{
    if(typeof window.toast==='function'){window.toast(msg);return}
    let t=document.getElementById('venom-admin-toast');
    if(!t){t=document.createElement('div');t.id='venom-admin-toast';document.body.appendChild(t)}
    t.textContent=msg;t.classList.add('show');clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('show'),2200);
  };
  const openModule=(title,desc)=>{if(typeof window.module==='function')window.module(title,desc);else toastMsg(title+' · '+desc)};

  function installStyles(){
    if(document.getElementById(STYLE_ID))return;
    const s=document.createElement('style');s.id=STYLE_ID;
    s.textContent=`
      :root{
        --adm-bg:#080c0d;--adm-panel:#0d1415;--adm-panel2:#111a1b;--adm-border:#263432;
        --adm-text:#eee6d7;--adm-muted:#84908c;--adm-teal:#45ddd5;--adm-orange:#f25b3c;--adm-gold:#e7c66c;
        --adm-shadow:0 20px 55px rgba(0,0,0,.42)
      }
      body.light{
        --adm-bg:#f3f6f5;--adm-panel:#ffffff;--adm-panel2:#f7faf9;--adm-border:#d9e3e0;
        --adm-text:#172221;--adm-muted:#667572;--adm-teal:#078e87;--adm-orange:#d94125;--adm-gold:#a46f00;
        --adm-shadow:0 18px 45px rgba(22,45,42,.12)
      }
      #${ADMIN_ID}{min-height:calc(100vh - 84px);padding:28px 32px 50px;background:var(--adm-bg);color:var(--adm-text);transition:background .25s,color .25s}
      .admHead{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;margin-bottom:22px}
      .admKicker{font:900 11px/1.2 ui-monospace,SFMono-Regular,monospace;letter-spacing:1.8px;color:var(--adm-gold)}
      .admHead h1{font-size:clamp(34px,4vw,58px);line-height:1;margin:8px 0 10px;font-weight:950;letter-spacing:-1.5px}
      .admHead p{margin:0;color:var(--adm-muted);font-size:14px;line-height:1.6;max-width:720px}
      .admBadge{display:flex;align-items:center;gap:9px;padding:10px 13px;border:1px solid var(--adm-border);border-radius:13px;background:var(--adm-panel);font:900 10px ui-monospace,monospace;white-space:nowrap;box-shadow:var(--adm-shadow)}
      .admBadge i{width:8px;height:8px;border-radius:50%;background:var(--adm-teal);box-shadow:0 0 14px var(--adm-teal);display:block}
      .admGrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:13px;margin-bottom:16px}
      .admStat{position:relative;overflow:hidden;padding:17px;border:1px solid var(--adm-border);border-radius:16px;background:linear-gradient(145deg,var(--adm-panel),var(--adm-panel2));box-shadow:var(--adm-shadow);transition:transform .2s,border-color .2s,box-shadow .2s}
      .admStat:hover{transform:translateY(-3px);border-color:var(--adm-teal);box-shadow:0 25px 60px rgba(0,0,0,.22)}
      .admStat small{display:block;color:var(--adm-muted);font:800 9px ui-monospace,monospace;letter-spacing:1px}.admStat b{display:block;font-size:27px;margin-top:7px}.admStat span{font-size:10px;color:var(--adm-teal)}
      .admStat:after{content:'';position:absolute;width:90px;height:90px;right:-32px;bottom:-42px;border-radius:50%;border:1px solid var(--adm-teal);opacity:.12}
      .admMain{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(280px,.75fr);gap:16px}
      .admPanel{border:1px solid var(--adm-border);border-radius:18px;background:linear-gradient(145deg,var(--adm-panel),var(--adm-panel2));box-shadow:var(--adm-shadow);overflow:hidden}
      .admPanelHead{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;border-bottom:1px solid var(--adm-border)}
      .admPanelHead h2{font-size:13px;margin:0;font-weight:900;letter-spacing:.3px}.admPanelHead span{font:800 9px ui-monospace,monospace;color:var(--adm-teal)}
      .admRows{padding:8px 18px 12px}.admRow{display:grid;grid-template-columns:90px 1fr auto;gap:12px;align-items:center;padding:12px 0;border-bottom:1px solid color-mix(in srgb,var(--adm-border) 70%,transparent);font-size:12px}.admRow:last-child{border-bottom:0}.admTime{font:800 9px ui-monospace,monospace;color:var(--adm-muted)}.admDot{width:7px;height:7px;border-radius:50%;background:var(--adm-teal);display:inline-block;margin-right:8px}.admDot.orange{background:var(--adm-orange)}.admDot.gold{background:var(--adm-gold)}
      .admTools{display:grid;grid-template-columns:1fr 1fr;gap:9px;padding:14px}.admTool{display:flex;align-items:center;gap:11px;text-align:left;border:1px solid var(--adm-border);background:var(--adm-panel);color:var(--adm-text);border-radius:13px;padding:12px;cursor:pointer;transition:.18s}.admTool:hover{transform:translateY(-2px);border-color:var(--adm-teal);background:var(--adm-panel2)}.admTool .ico{width:34px;height:34px;display:grid;place-items:center;border-radius:10px;background:color-mix(in srgb,var(--adm-teal) 12%,transparent);color:var(--adm-teal);font-size:17px}.admTool b{font-size:11px}.admTool span{display:block;color:var(--adm-muted);font-size:9px;margin-top:3px;line-height:1.35}
      .admControls{display:flex;flex-wrap:wrap;gap:8px;padding:0 14px 14px}.admBtn{border:1px solid var(--adm-border);background:var(--adm-panel);color:var(--adm-text);border-radius:10px;padding:9px 11px;font:900 9px ui-monospace,monospace;cursor:pointer;transition:.18s}.admBtn:hover{border-color:var(--adm-teal);transform:translateY(-1px)}.admBtn.primary{border-color:var(--adm-teal);color:var(--adm-teal)}.admBtn.orange{border-color:var(--adm-orange);color:var(--adm-orange)}
      .admChart{height:155px;margin:0 18px 16px;position:relative;border-bottom:1px solid var(--adm-border);background:repeating-linear-gradient(to bottom,transparent 0 38px,color-mix(in srgb,var(--adm-border) 55%,transparent) 39px)}.admBars{position:absolute;inset:12px 8px 0;display:flex;align-items:flex-end;gap:8px}.admBar{flex:1;border-radius:6px 6px 0 0;background:linear-gradient(to top,var(--adm-teal),color-mix(in srgb,var(--adm-teal) 30%,transparent));min-height:16px;transition:height .3s}.admChartLegend{display:flex;justify-content:space-between;color:var(--adm-muted);font:800 8px ui-monospace,monospace;padding:0 18px 14px}
      .admQuick{display:grid;grid-template-columns:1fr 1fr;gap:9px;padding:14px}.admQuick button{min-height:58px;text-align:left;padding:11px;border:1px solid var(--adm-border);background:var(--adm-panel);color:var(--adm-text);border-radius:12px;cursor:pointer;transition:.18s}.admQuick button:hover{border-color:var(--adm-orange);transform:translateY(-2px)}.admQuick b{font-size:10px;display:block}.admQuick span{display:block;color:var(--adm-muted);font-size:9px;margin-top:4px}
      .admSection{margin-top:16px}.admFull{grid-column:1/-1}.admAccess{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;padding:14px}.admAccessItem{padding:13px;border:1px solid var(--adm-border);border-radius:12px;background:var(--adm-panel)}.admAccessItem b{font-size:11px}.admAccessItem span{display:flex;align-items:center;gap:6px;margin-top:8px;color:var(--adm-teal);font:800 9px ui-monospace,monospace}.admAccessItem span:before{content:'✓';width:15px;height:15px;display:grid;place-items:center;border-radius:50%;background:color-mix(in srgb,var(--adm-teal) 15%,transparent)}
      #venom-admin-toast{position:fixed;right:22px;bottom:22px;z-index:100000;padding:12px 15px;border:1px solid var(--adm-teal);border-radius:12px;background:var(--adm-panel);color:var(--adm-text);box-shadow:var(--adm-shadow);font:800 11px ui-monospace,monospace;opacity:0;transform:translateY(12px);pointer-events:none;transition:.2s}#venom-admin-toast.show{opacity:1;transform:translateY(0)}
      @media(max-width:1050px){.admGrid{grid-template-columns:1fr 1fr}.admMain{grid-template-columns:1fr}.admAccess{grid-template-columns:1fr 1fr}}
      @media(max-width:650px){#${ADMIN_ID}{padding:20px 14px 35px}.admHead{flex-direction:column}.admGrid{grid-template-columns:1fr 1fr}.admTools,.admQuick{grid-template-columns:1fr}.admAccess{grid-template-columns:1fr}.admRow{grid-template-columns:62px 1fr}.admRow button{display:none}}
    `;
    document.head.appendChild(s);
  }

  function render(){
    if(!isAdmin()||!window.main)return;
    const name=String(window.userInfo?.email||'OWNER').split('@')[0];
    const old=window.adminPage;
    window.adminPage=function(b){
      if(typeof window.active==='function')window.active(b);
      main.innerHTML=`
      <div id="${ADMIN_ID}">
        <div class="admHead"><div><div class="admKicker">VENOM GPT // COMMAND CENTER</div><h1>Master Admin</h1><p>Full-control AI operations workspace. Monitor users, models, tools, payments, security and platform health from one vibrant dashboard.</p></div><div class="admBadge"><i></i> ADMIN ACCESS · ALL FEATURES</div></div>
        <div class="admGrid">
          <div class="admStat"><small>ACTIVE USERS</small><b>1,284</b><span>+8.4% this week</span></div>
          <div class="admStat"><small>AI REQUESTS</small><b>48.7K</b><span>+12.1% today</span></div>
          <div class="admStat"><small>MODEL HEALTH</small><b>99.98%</b><span>All systems nominal</span></div>
          <div class="admStat"><small>REVENUE</small><b>€18.4K</b><span>+6.7% this month</span></div>
        </div>
        <div class="admMain">
          <section class="admPanel"><div class="admPanelHead"><h2>◉ LIVE PLATFORM ACTIVITY</h2><span>REAL-TIME</span></div><div class="admRows">
            <div class="admRow"><span class="admTime">NOW</span><span><i class="admDot"></i>AI request completed successfully</span><button class="admBtn">VIEW</button></div>
            <div class="admRow"><span class="admTime">NOW</span><span><i class="admDot"></i>New user signed up with Free plan</span><button class="admBtn">USER</button></div>
            <div class="admRow"><span class="admTime">18 SEC</span><span><i class="admDot orange"></i>Pro payment webhook received</span><button class="admBtn orange">OPEN</button></div>
            <div class="admRow"><span class="admTime">32 SEC</span><span><i class="admDot gold"></i>Deep Research job completed</span><button class="admBtn">RESULT</button></div>
            <div class="admRow"><span class="admTime">1 MIN</span><span><i class="admDot"></i>Cloudflare edge health check passed</span><button class="admBtn">HEALTH</button></div>
          </div><div class="admControls"><button class="admBtn primary" onclick="toastMsg('Live activity refreshed')">↻ REFRESH</button><button class="admBtn" onclick="openModule('System Logs','Review application, AI and deployment logs.')">OPEN LOGS →</button><button class="admBtn" onclick="openModule('Notifications','Review platform alerts and admin notifications.')">NOTIFICATIONS</button></div></section>
          <section class="admPanel"><div class="admPanelHead"><h2>⌁ AI OPERATIONS</h2><span>VENOM CORE</span></div><div class="admChart"><div class="admBars"><i class="admBar" style="height:42%"></i><i class="admBar" style="height:64%"></i><i class="admBar" style="height:51%"></i><i class="admBar" style="height:78%"></i><i class="admBar" style="height:69%"></i><i class="admBar" style="height:92%"></i><i class="admBar" style="height:83%"></i><i class="admBar" style="height:96%"></i><i class="admBar" style="height:88%"></i><i class="admBar" style="height:100%"></i></div></div><div class="admChartLegend"><span>REQUEST VOLUME</span><span>10-MIN WINDOW</span></div><div class="admQuick"><button onclick="openModule('Model Control','Select, test and configure Venom AI models.')"><b>🧠 Model Control</b><span>Models, prompts & routing</span></button><button onclick="openModule('AI Usage','Inspect token, request and capacity usage.')"><b>⚡ AI Usage</b><span>Capacity & performance</span></button><button onclick="openModule('Think Mode','Configure deeper reasoning defaults.')"><b>✦ Think Mode</b><span>Reasoning configuration</span></button><button onclick="openModule('Research Engine','Manage research jobs and sources.')"><b>🔎 Research Engine</b><span>Jobs & queue health</span></button></div></section>
          <section class="admPanel"><div class="admPanelHead"><h2>⚙ ADMIN TOOLS</h2><span>UNLOCKED</span></div><div class="admTools">
            <button class="admTool" onclick="openModule('Users','Manage accounts, roles, plans and access.')"><div class="ico">👥</div><div><b>Users</b><span>Accounts & roles</span></div></button>
            <button class="admTool" onclick="openModule('Subscriptions','Manage Free, Pro and billing state.')"><div class="ico">♛</div><div><b>Subscriptions</b><span>Plans & billing</span></div></button>
            <button class="admTool" onclick="openModule('Tool Connections','Manage connected apps and integrations.')"><div class="ico">🔗</div><div><b>Connections</b><span>Apps & integrations</span></div></button>
            <button class="admTool" onclick="openModule('Content Studio','Manage documents, images and generated content.')"><div class="ico">✦</div><div><b>Content</b><span>Assets & moderation</span></div></button>
            <button class="admTool" onclick="openModule('Security Center','Review authentication, policies and security events.')"><div class="ico">🛡</div><div><b>Security</b><span>Auth & audit</span></div></button>
            <button class="admTool" onclick="openModule('Cloudflare Operations','Review edge deployment and runtime health.')"><div class="ico">☁</div><div><b>Cloudflare</b><span>Deployments & edge</span></div></button>
            <button class="admTool" onclick="openModule('GitHub Operations','Review repository and deployment changes.')"><div class="ico">⌘</div><div><b>GitHub</b><span>Code & releases</span></div></button>
            <button class="admTool" onclick="openModule('Database','Inspect platform data and migrations.')"><div class="ico">▦</div><div><b>Database</b><span>Data & migrations</span></div></button>
          </div></section>
          <section class="admPanel"><div class="admPanelHead"><h2>⚡ QUICK ACTIONS</h2><span>NO LOCKS</span></div><div class="admQuick"><button onclick="openModule('New Chat','Open the complete AI chat workspace.')"><b>💬 Open AI Chat</b><span>Full Chat access</span></button><button onclick="openModule('Work Mode','Open the complete Work workspace.')"><b>✦ Open Work</b><span>All Work tools enabled</span></button><button onclick="openModule('Live Voice','Open live voice controls.')"><b>🎙 Live Voice</b><span>Voice tools enabled</span></button><button onclick="openModule('Image Studio','Open image generation and editing.')"><b>🖼 Image Studio</b><span>Image tools enabled</span></button><button onclick="openModule('Code Studio','Open coding workspace.')"><b>⌘ Code Studio</b><span>Code tools enabled</span></button><button onclick="openModule('Data Analysis','Open data analysis workspace.')"><b>📊 Data Analysis</b><span>Data tools enabled</span></button></div></section>
          <section class="admPanel admFull"><div class="admPanelHead"><h2>✓ ADMIN ACCESS MATRIX</h2><span>OWNER / ADMIN</span></div><div class="admAccess"><div class="admAccessItem"><b>AI & CHAT</b><span>FULL ACCESS</span></div><div class="admAccessItem"><b>WORKSPACE</b><span>FULL ACCESS</span></div><div class="admAccessItem"><b>FILES & IMAGES</b><span>FULL ACCESS</span></div><div class="admAccessItem"><b>RESEARCH & THINK</b><span>FULL ACCESS</span></div><div class="admAccessItem"><b>VOICE</b><span>FULL ACCESS</span></div><div class="admAccessItem"><b>USERS & ROLES</b><span>FULL ACCESS</span></div><div class="admAccessItem"><b>BILLING</b><span>FULL ACCESS</span></div><div class="admAccessItem"><b>DEPLOYMENTS</b><span>FULL ACCESS</span></div></div></section>
        </div>
      </div>`;
    };
    // Remove customer-facing Pro lock from the admin sidebar and mark the session visually.
    document.querySelectorAll('.vUpgrade,.upgrade').forEach(x=>x.remove());
    document.querySelectorAll('.vSideProfile .vProfilePlan').forEach(x=>x.textContent='ADMIN · ALL ACCESS');
    document.querySelectorAll('.sideBtn,.side a').forEach(x=>{if(/Upgrade to Pro/i.test(x.textContent||''))x.remove()});
  }

  function boot(){installStyles();if(isAdmin())render()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  new MutationObserver(()=>{if(isAdmin()){installStyles();render()}}).observe(document.body,{childList:true,subtree:true});
})();

/* VENOM AI WORKSPACE POLISH — chat history, real thinking state, readable premium layout */
(function(){
  const KEY='venom-chat-history-v1';
  const load=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(_){return[]}};
  const save=v=>{try{localStorage.setItem(KEY,JSON.stringify(v.slice(-40)))}catch(_){}};
  let chats=load();
  let activeId=null;
  let running=false;
  let started=0;
  let timer=null;
  const esc=s=>String(s??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
  const mainEl=()=>document.getElementById('main');
  const getChat=()=>chats.find(x=>x.id===activeId);
  function fmt(ms){const sec=ms/1000;return sec<60?sec.toFixed(1)+'s':Math.floor(sec/60)+'m '+Math.floor(sec%60)+'s'}
  function renderMessages(){
    const c=getChat(), box=document.getElementById('messages'),welcome=document.getElementById('welcome');
    if(!box)return;
    if(welcome)welcome.style.display=c&&c.messages.length?'none':'';
    box.innerHTML=(c?.messages||[]).map(m=>'<div class="vmsg '+(m.role==='user'?'vyou':'vai')+'"><div class="vmsgRole">'+(m.role==='user'?'YOU':'VENOM GPT')+'</div><div class="vmsgBubble">'+esc(m.content).replace(/\n/g,'<br>')+'</div></div>').join('');
    box.scrollTop=box.scrollHeight;
  }
  function stopThinking(){
    running=false;if(timer){clearInterval(timer);timer=null}
    const wrap=document.getElementById('vThinking');if(wrap){wrap.classList.remove('on');wrap.innerHTML=''}
    document.querySelector('.vComposer')?.classList.remove('thinking-active');
  }
  function startThinking(){
    running=true;started=performance.now();
    const wrap=document.getElementById('vThinking');
    const tick=()=>{if(!running)return;const text=fmt(performance.now()-started);if(wrap){wrap.classList.add('on');wrap.innerHTML='<span class="pulseDot"></span><b>Thinking</b><span>Working · '+text+'</span>'}document.querySelector('.vComposer')?.classList.add('thinking-active')};
    tick();timer=setInterval(tick,100);
  }
  function renderChat(){
    if(!activeId){activeId=crypto.randomUUID?.()||String(Date.now());chats.push({id:activeId,title:'New Chat',messages:[],created:Date.now()});save(chats)}
    mainEl().innerHTML='<div class="vChatPage"><div class="vChatTop"><div><div class="vEyebrow">VENOM GPT · LOCAL AI</div><h1 id="vChatTitle">'+esc(getChat()?.title||'New Chat')+'</h1></div><div class="vTopActions"><button id="vHistoryBtn">CHAT HISTORY</button><button onclick="newChat()" class="vNewBtn">＋ NEW CHAT</button></div></div><div class="vChatGrid"><section class="vConversation"><div class="vConversationBar"><span>● AI CORE ONLINE</span><span>OLLAMA / PRODUCTION</span></div><div id="welcome" class="vWelcome"><div class="vSpiderBadge">✦</div><div><strong>What are we building today?</strong><p>Your Venom workspace is ready. Ask anything or start a project.</p></div></div><div id="messages" class="vMessages"></div><div id="vThinking" class="vThinking"></div><div class="vComposer"><button class="vIcon" id="vAttach">＋</button><textarea id="vPrompt" placeholder="Message Venom GPT…" rows="1"></textarea><button class="vIcon">✦</button><button class="vIcon">🎙</button><button class="vSend" id="vSend">↑</button></div><div class="vHint">Enter to send · Shift+Enter for a new line</div></section><aside class="vActivity"><div class="vActivityHead"><span>ACTIVITY</span><b id="vActivityTime">READY</b></div><div class="vActivityBody"><div class="vActivityItem"><i>✓</i><span>Workspace loaded</span></div><div class="vActivityItem"><i>✓</i><span>Signed-in session verified</span></div><div class="vActivityItem"><i>✓</i><span>AI connection available</span></div><div class="vActivityItem active"><i>✦</i><span><b>Thinking</b><small id="vActivityLive">Waiting for a task</small></span></div></div><div class="vActivityFoot">PRIVATE WORKSPACE<br><small>Session activity stays in this browser.</small></div></aside></div></div>';
    renderMessages();
    document.getElementById('vSend').onclick=send;
    document.getElementById('vPrompt').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}});
    document.getElementById('vHistoryBtn').onclick=renderHistory;
    document.getElementById('vAttach').onclick=()=>{if(typeof module==='function')module('Attachments','File attachments UI ready.')};
  }
  function renderHistory(){
    mainEl().innerHTML='<div class="vChatPage"><div class="vChatTop"><div><div class="vEyebrow">VENOM GPT · HISTORY</div><h1>Chats</h1></div><button onclick="newChat()" class="vNewBtn">＋ NEW CHAT</button></div><div class="vHistory">'+(chats.slice().reverse().map(c=>'<button class="vHistoryRow" data-id="'+c.id+'"><span class="vHistoryIcon">◌</span><span><b>'+esc(c.title)+'</b><small>'+c.messages.length+' messages</small></span><em>→</em></button>').join('')||'<div class="vEmpty">No saved chats yet.</div>')+'</div></div>';
    mainEl().querySelectorAll('.vHistoryRow').forEach(b=>b.onclick=()=>{activeId=b.dataset.id;renderChat()});
  }
  async function send(){
    if(running)return;
    const input=document.getElementById('vPrompt');if(!input||!input.value.trim())return;
    const text=input.value.trim();input.value='';
    let c=getChat();if(!c){activeId=crypto.randomUUID?.()||String(Date.now());c={id:activeId,title:'New Chat',messages:[],created:Date.now()};chats.push(c)}
    if(!c.messages.length)c.title=text.slice(0,44)+(text.length>44?'…':'');
    c.messages.push({role:'user',content:text});save(chats);renderMessages();startThinking();
    const live=document.getElementById('vActivityLive');if(live)live.textContent='Working on your request…';
    let reply='';let error='';
    try{
      const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'same-origin',body:JSON.stringify({messages:c.messages})});
      const raw=await r.text();let d={};try{d=JSON.parse(raw)}catch(_){}
      if(!r.ok)error=d.error||d.message||raw||('HTTP '+r.status);
      else reply=d.reply||d.message||d.content||d.response||'';
    }catch(e){error=e.message||String(e)}
    const elapsed=fmt(performance.now()-started);stopThinking();
    if(error){reply='I could not reach the AI endpoint right now. '+error+'\n\nYour message is saved in this chat; try Send again when the model endpoint is available.'}
    if(!reply)reply='The AI endpoint returned no response. Your message is saved — please try again.';
    c.messages.push({role:'assistant',content:reply});save(chats);renderMessages();
    const at=document.getElementById('vActivityTime');if(at)at.textContent=elapsed;
    if(live)live.textContent='Completed in '+elapsed;
  }
  window.newChat=function(){activeId=crypto.randomUUID?.()||String(Date.now());chats.push({id:activeId,title:'New Chat',messages:[],created:Date.now()});save(chats);if(typeof active==='function')active();renderChat()};
  window.renderVenomChats=renderHistory;
  window.venomOpenChat=renderChat;
  function install(){
    const css=`.vChatPage{min-height:calc(100vh - 86px);padding:30px 34px 40px;color:#eee3cf}.vChatTop{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:22px}.vEyebrow{font:800 11px/1.2 ui-monospace,monospace;letter-spacing:1.8px;color:#58ddd5}.vChatTop h1{font-size:34px;margin:7px 0 0;font-weight:900}.vTopActions{display:flex;gap:10px}.vTopActions button,.vNewBtn{border:1px solid #263d3c;background:#0c1516;color:#e8e0d1;border-radius:12px;padding:11px 15px;font-weight:800;cursor:pointer}.vNewBtn{border-color:#e95635;color:#ff8a69}.vChatGrid{display:grid;grid-template-columns:minmax(0,1fr) 275px;gap:16px;min-height:calc(100vh - 180px)}.vConversation,.vActivity{background:linear-gradient(145deg,#0c1112,#11191a);border:1px solid #283332;border-radius:18px;box-shadow:0 18px 50px #0006}.vConversation{display:flex;flex-direction:column;min-height:650px;overflow:hidden}.vConversationBar{display:flex;justify-content:space-between;padding:14px 18px;border-bottom:1px solid #222d2c;color:#82908c;font:700 11px ui-monospace,monospace}.vConversationBar span:first-child{color:#55ddd5}.vMessages{padding:22px 26px;flex:1;overflow:auto}.vWelcome{margin:25px auto;max-width:650px;display:flex;gap:16px;align-items:flex-start;padding:20px;border:1px solid #263433;border-radius:16px;background:#0c1415}.vSpiderBadge{width:42px;height:42px;border-radius:12px;display:grid;place-items:center;background:#172b2c;color:#59ddd5;font-size:22px}.vWelcome strong{font-size:19px}.vWelcome p{margin:7px 0 0;color:#899590;line-height:1.5}.vmsg{max-width:82%;margin:0 0 20px}.vmsg.vyou{margin-left:auto}.vmsgRole{font:800 10px ui-monospace,monospace;color:#72807c;margin:0 0 7px 5px}.vmsgBubble{padding:14px 17px;border-radius:15px;background:#151d1d;border:1px solid #293433;line-height:1.6;font-size:16px}.vyou .vmsgBubble{background:#123b3b;border-color:#216765}.vThinking{display:none;margin:0 22px 10px;padding:11px 14px;border:1px solid #29d0c566;border-radius:12px;background:#0b1a1b;color:#67e5de}.vThinking.on{display:flex;gap:10px;align-items:center;box-shadow:0 0 24px #24d6cc22}.pulseDot{width:8px;height:8px;border-radius:50%;background:#ff6947;box-shadow:0 0 14px #ff6947;animation:venomPulse .65s infinite alternate}.vComposer{margin:0 18px;border:1px solid #33403f;background:#0b1112;border-radius:17px;display:flex;align-items:flex-end;padding:9px;transition:.25s;box-shadow:0 10px 30px #0005}.vComposer.thinking-active{border-color:#31d8d0;box-shadow:0 0 0 1px #31d8d044,0 0 28px #31d8d022,0 10px 30px #0007}.vComposer textarea{flex:1;resize:none;border:0;outline:0;background:transparent;color:#f0e6d4;padding:10px;font:500 16px/1.5 inherit;min-height:24px;max-height:150px}.vIcon,.vSend{width:42px;height:42px;border-radius:12px;border:0;background:#182222;color:#aab6b1;cursor:pointer;font-size:18px}.vSend{background:#ef512f;color:#fff;font-weight:900}.vHint{text-align:center;color:#58635f;font-size:10px;padding:9px}.vActivity{display:flex;flex-direction:column;overflow:hidden}.vActivityHead{padding:18px;border-bottom:1px solid #263130;display:flex;justify-content:space-between;font:800 11px ui-monospace,monospace}.vActivityHead span{color:#e8c66c}.vActivityHead b{color:#5bded6}.vActivityBody{padding:18px;flex:1}.vActivityItem{display:flex;gap:11px;padding:12px 0;color:#9aa6a2;font-size:13px;border-bottom:1px solid #1d2726}.vActivityItem i{font-style:normal;color:#55ddd5}.vActivityItem.active i{color:#ff6847}.vActivityItem small{display:block;color:#68736f;margin-top:4px}.vActivityFoot{padding:16px;border-top:1px solid #263130;color:#69746f;font:700 9px/1.6 ui-monospace,monospace}.vHistory{display:grid;gap:9px;max-width:900px}.vHistoryRow{display:flex;align-items:center;gap:14px;padding:16px;border:1px solid #293534;border-radius:14px;background:#0d1415;color:#eee3cf;text-align:left;cursor:pointer}.vHistoryRow:hover{border-color:#35d4cd;transform:translateX(2px)}.vHistoryIcon{color:#55ddd5;font-size:22px}.vHistoryRow span:nth-child(2){flex:1}.vHistoryRow small{display:block;color:#6e7975;margin-top:5px}.vHistoryRow em{color:#ff704d;font-style:normal}.vEmpty{padding:30px;color:#76817d}@media(max-width:900px){.vChatGrid{grid-template-columns:1fr}.vActivity{display:none}.vChatPage{padding:20px}.vChatTop{align-items:flex-start}.vTopActions{flex-wrap:wrap}.vConversation{min-height:calc(100vh - 170px)}}.authScreen .authCard{max-width:430px}.authScreen h1{font-size:38px!important}.authScreen p{font-size:16px!important;line-height:1.55!important}.authScreen .google{font-size:16px!important}.side,.top,.dash,.module,.dashCard{font-size:15px}.sideBtn,.side a{font-size:15px!important}`;
    const st=document.createElement('style');st.id='venom-ai-workspace-polish';st.textContent=css;document.head.appendChild(st);
    const oldModule=window.module;
    window.module=function(t,d,b){if(t==='Chats'){renderHistory();return}return oldModule?oldModule(t,d,b):undefined};
    const watch=()=>{if(document.getElementById('app')?.style.display!=='none' && document.getElementById('main')?.innerHTML.trim()===''){renderChat()}};
    setInterval(watch,1500);
    if(sessionStorage.getItem('venom-open-ai')==='1')setTimeout(renderChat,250);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
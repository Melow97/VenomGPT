/* VENOM AI EXPERIENCE V2 — richer chat UI, persistence, retry, stop, copy, shortcuts */
(()=>{
  const VERSION='20260815-31';
  let activeRequest=null;
  let localMsgs=[];
  let storageKey='venom-chat-guest';

  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const now=()=>new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
  const toastMsg=t=>{if(typeof window.toast==='function')window.toast(t)};
  const currentKey=()=>{try{return 'venom-chat-'+(window.userInfo?.id||window.__venomSupabase?.auth?.getSession?'user':'guest')}catch(_){return 'venom-chat-guest'}};

  function load(){
    storageKey=currentKey();
    try{const raw=sessionStorage.getItem(storageKey);localMsgs=raw?JSON.parse(raw):[]}catch(_){localMsgs=[]}
  }
  function save(){try{sessionStorage.setItem(storageKey,JSON.stringify(localMsgs.slice(-80)))}catch(_){}
  }

  function style(){
    if(document.getElementById('venom-ai-v2-style'))return;
    const s=document.createElement('style');s.id='venom-ai-v2-style';s.textContent=`
      .v2Chat{height:calc(100vh - 76px);min-height:620px;display:flex;flex-direction:column;border:1px solid #ffffff12;border-radius:20px;overflow:hidden;background:radial-gradient(circle at 75% 10%,#14313255,transparent 34%),#080d0f;box-shadow:0 24px 80px #0007}
      .v2Top{display:flex;align-items:center;gap:12px;padding:15px 18px;border-bottom:1px solid #ffffff10;background:#0a1113e8;backdrop-filter:blur(14px)}
      .v2Title{font-weight:950;letter-spacing:.02em}.v2Meta{font:800 10px monospace;color:#62ddd6;letter-spacing:.08em}.v2Spacer{flex:1}.v2Tool{border:1px solid #ffffff12;background:#ffffff06;color:#c9d2d0;border-radius:9px;padding:8px 10px;cursor:pointer}.v2Tool:hover{border-color:#55ddd6;color:#55ddd6}
      .v2Body{flex:1;overflow:auto;padding:28px 8%;scroll-behavior:smooth}.v2Empty{max-width:820px;margin:7vh auto 0;text-align:center}.v2Kicker{font:900 11px monospace;color:#62ddd6;letter-spacing:.18em}.v2Empty h2{font-size:clamp(34px,5vw,64px);line-height:1;margin:14px 0}.v2Empty p{color:#8e9997;line-height:1.6}.v2Prompts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:28px}.v2Prompt{border:1px solid #ffffff12;background:#ffffff05;color:#d9dfdd;border-radius:14px;padding:14px;text-align:left;cursor:pointer}.v2Prompt:hover{border-color:#55ddd6;background:#55ddd60a}.v2Prompt b{display:block;margin-bottom:4px}.v2Prompt span{font-size:12px;color:#7e8b89}
      .v2Msg{display:flex;gap:12px;margin:18px 0;align-items:flex-start}.v2Msg.you{justify-content:flex-end}.v2Avatar{width:32px;height:32px;border-radius:10px;display:grid;place-items:center;flex:0 0 auto;font:900 12px monospace;background:#102425;color:#61ddd6;border:1px solid #55ddd633}.v2Msg.you .v2Avatar{order:2;background:#2b1714;color:#ff8c72;border-color:#ff634533}.v2Bubble{max-width:min(820px,82%);border:1px solid #ffffff10;background:#0d1416;border-radius:16px;padding:14px 16px;line-height:1.65;color:#e6ece9;white-space:pre-wrap;overflow-wrap:anywhere}.v2Msg.you .v2Bubble{background:#171214;border-color:#ff63451c}.v2Actions{display:flex;gap:6px;margin-top:8px}.v2Action{border:0;background:none;color:#6f7d7b;font:800 10px monospace;cursor:pointer;padding:2px}.v2Action:hover{color:#61ddd6}.v2Time{font:700 10px monospace;color:#52615f;margin-top:5px}.v2Error{border-color:#ff624522;background:#2b171422}.v2Typing{display:inline-flex;gap:5px;align-items:center}.v2Typing i{width:6px;height:6px;border-radius:50%;background:#61ddd6;animation:v2dot 1s infinite}.v2Typing i:nth-child(2){animation-delay:.15s}.v2Typing i:nth-child(3){animation-delay:.3s}@keyframes v2dot{0%,70%,100%{opacity:.25;transform:translateY(0)}35%{opacity:1;transform:translateY(-4px)}}
      .v2Composer{padding:14px 8% 18px;border-top:1px solid #ffffff10;background:#080d0fee}.v2Status{min-height:20px;margin:0 0 8px;font:800 11px monospace;color:#62ddd6}.v2Box{display:flex;align-items:flex-end;gap:8px;border:1px solid #ffffff18;background:#0d1517;border-radius:17px;padding:9px}.v2Box:focus-within{border-color:#55ddd655;box-shadow:0 0 0 3px #55ddd60a}.v2Box textarea{flex:1;resize:none;max-height:180px;min-height:46px;border:0;outline:0;background:transparent;color:#eef4f1;font:16px/1.5 inherit;padding:10px}.v2Box button{border:1px solid #ffffff10;background:#ffffff06;color:#bac5c2;border-radius:10px;padding:10px 12px;cursor:pointer}.v2Box .v2Send{background:#55ddd6;color:#061011;font-weight:950;border-color:#55ddd6}.v2Box button:disabled{opacity:.45;cursor:not-allowed}.v2Foot{display:flex;justify-content:space-between;margin-top:7px;color:#53605e;font:700 10px monospace}.v2Count{margin-left:auto}.v2Select{background:#0d1517;color:#9eaaa8;border:1px solid #ffffff12;border-radius:8px;padding:5px 7px;font:800 10px monospace}
      .light .v2Chat{background:#fffaf0;box-shadow:0 24px 80px #0002}.light .v2Top,.light .v2Composer{background:#fffaf0e8;border-color:#0000000d}.light .v2Bubble{background:#fffdf7;color:#1a2422;border-color:#0000000d}.light .v2Msg.you .v2Bubble{background:#f3e9dc}.light .v2Box{background:#fffdf7;border-color:#00000014}.light .v2Box textarea{color:#17201f}.light .v2Tool,.light .v2Prompt,.light .v2Box button{background:#00000004;color:#33403e;border-color:#00000010}
      @media(max-width:800px){.v2Body,.v2Composer{padding-left:14px;padding-right:14px}.v2Prompts{grid-template-columns:1fr}.v2Bubble{max-width:90%}.v2Top{padding:12px}.v2Meta{display:none}.v2Chat{height:calc(100vh - 40px);min-height:560px;border-radius:14px}}
    `;document.head.appendChild(s);
  }

  function render(){
    style();load();
    const main=document.getElementById('main');if(!main)return;
    main.innerHTML=`<div class="v2Chat" id="v2Chat">
      <div class="v2Top"><div><div class="v2Title">New Chat</div><div class="v2Meta">VENOM GPT · AI WORKSPACE</div></div><div class="v2Spacer"></div><select class="v2Select" id="v2Model" title="Model"><option>VENOM AUTO</option><option>VENOM FAST</option><option>VENOM THINK</option></select><button class="v2Tool" id="v2Clear" title="Clear chat">CLEAR</button></div>
      <div class="v2Body" id="v2Body"><div id="v2Messages"></div></div>
      <div class="v2Composer"><div class="v2Status" id="v2Status"></div><div class="v2Box"><button id="v2Attach" title="Attachments">＋</button><textarea id="v2Prompt" rows="1" maxlength="12000" placeholder="Message Venom GPT…"></textarea><button id="v2Stop" class="hide" title="Stop">■</button><button id="v2Send" class="v2Send" title="Send">↑</button></div><div class="v2Foot"><span>ENTER to send · SHIFT+ENTER for a new line</span><span class="v2Count" id="v2Count">0 / 12000</span></div></div>
    </div>`;
    bind();draw();
  }

  function bind(){
    const p=document.getElementById('v2Prompt'),sendBtn=document.getElementById('v2Send');
    document.getElementById('v2Send').onclick=()=>send();
    document.getElementById('v2Stop').onclick=()=>{if(activeRequest){activeRequest.abort();activeRequest=null;setStatus('Generation stopped.','');draw()}};
    document.getElementById('v2Clear').onclick=()=>{if(confirm('Clear this chat?')){localMsgs=[];save();draw();toastMsg('CHAT CLEARED')}};
    document.getElementById('v2Attach').onclick=()=>{if(typeof window.module==='function')window.module('Attachments','File attachments are ready to be connected to the AI workspace.');else toastMsg('Attachments panel unavailable')};
    p.addEventListener('input',()=>{p.style.height='auto';p.style.height=Math.min(p.scrollHeight,180)+'px';document.getElementById('v2Count').textContent=p.value.length+' / 12000'});
    p.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}});
    setTimeout(()=>p.focus(),60);
    window.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();p.focus()}});
  }

  function setStatus(text,kind){const s=document.getElementById('v2Status');if(!s)return;s.textContent=text||'';s.style.color=kind==='error'?'#ff8167':'#62ddd6'}
  function draw(){
    const root=document.getElementById('v2Messages');if(!root)return;
    const body=document.getElementById('v2Body');
    if(!localMsgs.length){root.innerHTML=`<div class="v2Empty"><div class="v2Kicker">VENOM GPT · READY</div><h2>What are we building today?</h2><p>Ask a question, build something, research an idea, debug code, or work through a file.</p><div class="v2Prompts"><button class="v2Prompt" data-p="Help me plan a project"><b>Plan a project</b><span>Turn an idea into clear next steps.</span></button><button class="v2Prompt" data-p="Explain a difficult topic simply"><b>Learn something</b><span>Get a concise explanation, then go deeper.</span></button><button class="v2Prompt" data-p="Review and improve this code"><b>Fix code</b><span>Find bugs and improve structure.</span></button><button class="v2Prompt" data-p="Help me research this topic"><b>Research</b><span>Build a useful research plan.</span></button></div></div>`;root.querySelectorAll('.v2Prompt').forEach(b=>b.onclick=()=>{document.getElementById('v2Prompt').value=b.dataset.p;send()});return}
    root.innerHTML=localMsgs.map((m,i)=>{
      const isUser=m.role==='user';
      const actions=isUser?`<button class="v2Action" data-retry="${i}">RETRY</button>`:`<button class="v2Action" data-copy="${i}">COPY</button>`;
      return `<div class="v2Msg ${isUser?'you':'ai'}"><div class="v2Avatar">${isUser?'YOU':'V'}</div><div><div class="v2Bubble ${m.error?'v2Error':''}">${esc(m.content)}</div><div class="v2Time">${esc(m.time||'')}</div><div class="v2Actions">${actions}</div></div></div>`
    }).join('');
    root.querySelectorAll('[data-copy]').forEach(b=>b.onclick=async()=>{const m=localMsgs[+b.dataset.copy];try{await navigator.clipboard.writeText(m.content);toastMsg('RESPONSE COPIED')}catch(_){toastMsg('COPY FAILED')}});
    root.querySelectorAll('[data-retry]').forEach(b=>b.onclick=()=>retry(+b.dataset.retry));
    body.scrollTop=body.scrollHeight;
  }

  async function retry(index){
    const m=localMsgs[index];if(!m||m.role!=='user')return;
    localMsgs=localMsgs.slice(0,index);save();draw();
    const p=document.getElementById('v2Prompt');if(p){p.value=m.content;await send()}
  }

  async function send(){
    const p=document.getElementById('v2Prompt');if(!p||activeRequest)return;
    const text=p.value.trim();if(!text)return;
    p.value='';p.style.height='auto';document.getElementById('v2Count').textContent='0 / 12000';
    localMsgs.push({role:'user',content:text,time:now()});save();draw();
    const stop=document.getElementById('v2Stop'),sendBtn=document.getElementById('v2Send');
    stop.classList.remove('hide');sendBtn.disabled=true;setStatus('Thinking · 0.0s');
    const started=performance.now();let ticker=setInterval(()=>setStatus('Thinking · '+((performance.now()-started)/1000).toFixed(1)+'s'),100);
    activeRequest=new AbortController();
    try{
      const payload={messages:localMsgs.map(({role,content})=>({role,content})),model:document.getElementById('v2Model')?.value||'VENOM AUTO'};
      const response=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:activeRequest.signal});
      if(!response.ok){let detail='HTTP '+response.status;try{const j=await response.json();detail=j.error||j.message||detail}catch(_){}throw new Error(detail)}
      const data=await response.json();
      const reply=data.reply||data.message||data.content||(data.choices?.[0]?.message?.content);
      if(!reply)throw new Error('The AI service returned an empty response.');
      localMsgs.push({role:'assistant',content:String(reply),time:now()});setStatus('');save();draw();
    }catch(e){
      if(e?.name==='AbortError'){localMsgs.push({role:'assistant',content:'Generation stopped.',time:now(),error:true});}
      else{localMsgs.push({role:'assistant',content:'The AI request failed: '+(e?.message||String(e))+'\n\nCheck the /api/chat service and try again.',time:now(),error:true});setStatus('AI request failed.','error')}
      save();draw();
    }finally{clearInterval(ticker);activeRequest=null;stop.classList.add('hide');sendBtn.disabled=false;if(!document.getElementById('v2Status')?.style.color.includes('error'))setStatus('');}
  }

  window.venomOpenChat=function(){render()};
  window.newChat=function(){render()};
  window.venomAIv2={version:VERSION,clear:()=>{localMsgs=[];save();draw()}};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',style);else style();
  console.info('[VENOM] AI experience '+VERSION+' ready');
})();

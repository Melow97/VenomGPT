/* VENOM AI ENTRY REPAIR — guarantees authenticated workspace renders without document-wide observers */
(()=>{
  const VERSION='20260815-15';
  let started=false;
  let repairing=false;
  const loadPolish=()=>new Promise(resolve=>{
    if(window.venomOpenChat)return resolve();
    if(document.querySelector('[data-venom-ai-workspace]'))return resolve();
    const s=document.createElement('script');s.src='/ai-workspace-polish.js?v='+VERSION;s.setAttribute('data-venom-ai-workspace','1');s.onload=resolve;s.onerror=e=>{console.error('[VENOM AI] polish failed',e);resolve()};document.body.appendChild(s);
  });
  const showApp=()=>{
    const landing=document.getElementById('landing'),auth=document.getElementById('auth'),app=document.getElementById('app'),main=document.getElementById('main');
    if(!app||!main)return false;
    if(!document.body.contains(app))return false;
    app.style.display='block';
    if(landing)landing.style.display='none';
    if(auth)auth.style.display='none';
    return true;
  };
  const render=async()=>{
    if(repairing)return false;
    repairing=true;
    try{
      if(!showApp())return false;
      await loadPolish();
      const main=document.getElementById('main');
      if(typeof window.venomOpenChat==='function'){
        try{window.venomOpenChat();started=true;return true}catch(e){console.error('[VENOM AI ENTRY] polished chat failed',e)}
      }
      if(typeof window.newChat==='function'){
        try{window.newChat();started=true;return true}catch(e){console.error('[VENOM AI ENTRY] newChat failed',e)}
      }
      if(!main.innerHTML.trim()){
        main.innerHTML='<div class="chat"><div class="chatTop"><div class="chatTitle">New Chat</div><div class="chatMeta">VENOM GPT · READY</div></div><div class="chatBody"><div class="welcome"><div style="font:900 12px monospace;color:#61ddd6">VENOM GPT · READY</div><h2>What are we building today?</h2><p>Your workspace is ready. Type a message below to begin.</p></div></div><div class="composerWrap"><div class="composer"><textarea id="prompt" placeholder="Message Venom GPT…"></textarea><button class="send" onclick="window.send&&window.send()">↑</button></div></div></div>';
        started=true;
        return true;
      }
      return true;
    }finally{repairing=false}
  };
  const repair=()=>{
    const app=document.getElementById('app'),main=document.getElementById('main');
    if(!app||app.style.display==='none')return;
    if(started&&main&&main.innerHTML.trim())return;
    render();
  };
  const boot=()=>{
    [150,600,1400,2800].forEach(ms=>setTimeout(repair,ms));
    if(window.__venomSupabase?.auth){
      window.__venomSupabase.auth.onAuthStateChange((_event,session)=>{if(session){started=false;setTimeout(repair,180)}});
    }
  };
  window.venomRepairAI=repair;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
  console.info('[VENOM] AI entry repair '+VERSION+' ready');
})();

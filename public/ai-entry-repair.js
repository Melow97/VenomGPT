/* VENOM AI ENTRY REPAIR — bounded authenticated workspace handoff */
(()=>{
  const VERSION='20260815-31';
  let started=false,repairing=false;
  const loadWorkspace=()=>new Promise(resolve=>{
    if(typeof window.venomOpenChat==='function')return resolve();
    if(document.querySelector('[data-venom-ai-workspace-v2]'))return resolve();
    const s=document.createElement('script');s.src='/ai-workspace-polish-v2.js?v='+VERSION;s.setAttribute('data-venom-ai-workspace-v2','1');s.onload=resolve;s.onerror=e=>{console.error('[VENOM AI] workspace failed',e);resolve()};document.body.appendChild(s);
  });
  const showApp=()=>{const landing=document.getElementById('landing'),auth=document.getElementById('auth'),app=document.getElementById('app'),main=document.getElementById('main');if(!app||!main)return false;app.style.display='block';if(landing)landing.style.display='none';if(auth)auth.style.display='none';return true};
  const repair=async()=>{if(repairing)return false;repairing=true;try{if(!showApp())return false;await loadWorkspace();if(typeof window.venomOpenChat==='function'){window.venomOpenChat();started=true;return true}if(typeof window.newChat==='function'){window.newChat();started=true;return true}return false}catch(e){console.error('[VENOM AI ENTRY]',e);return false}finally{repairing=false}};
  const schedule=()=>{[120,500,1200].forEach(ms=>setTimeout(()=>{if(!started)repair()},ms))};
  window.venomRepairAI=repair;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
  console.info('[VENOM] AI entry repair '+VERSION+' ready');
})();
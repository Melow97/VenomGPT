/* VENOM GPT UI BRIDGE — keeps the visual layer synchronized with the core app state */
(()=>{
  'use strict';
  if(window.__venomUIBridge)return;
  window.__venomUIBridge=true;
  function sync(){
    const acct=document.getElementById('acct');
    if(acct&&acct.textContent.trim()){
      const raw=acct.getAttribute('data-venom-name')||acct.textContent.trim();
      window.userInfo=window.userInfo||{};
      window.userInfo.email=raw.includes('@')?raw:((raw.replace(/\s+/g,'.').toLowerCase())+'@venom.local');
      window.userInfo.id=window.userInfo.id||'workspace';
    }
  }
  function boot(){
    sync();
    if(document.getElementById('app')?.style.display!=='none'&&window.__venomRenderHome)window.__venomRenderHome();
    new MutationObserver(sync).observe(document.body,{childList:true,subtree:true,characterData:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(boot,700));else setTimeout(boot,700);
})();

/* VENOM RUNTIME BRIDGE — approved UI, auth handoff, responsive premium finish */
(function(){
  const VERSION='20260815-22';
  function load(src,attr,next){
    if(document.querySelector('script['+attr+']')){next&&next();return}
    const s=document.createElement('script');s.src=src;s.setAttribute(attr,'1');s.onload=next||null;s.onerror=e=>console.error('[VENOM RUNTIME]',src,e);document.body.appendChild(s)
  }
  function removePause(){document.querySelectorAll('button').forEach(b=>{if(/^\s*PAUSE\s*$/i.test(b.textContent||''))b.remove()})}
  function openAIAfterAuth(){
    if(sessionStorage.getItem('venom-open-ai')!=='1')return;
    const go=()=>{if(typeof window.venomOpenChat==='function'){sessionStorage.removeItem('venom-open-ai');setTimeout(()=>window.venomOpenChat(),90);return true}if(typeof window.newChat==='function'){sessionStorage.removeItem('venom-open-ai');setTimeout(()=>window.newChat(),90);return true}return false};
    if(!go()){let n=0;const t=setInterval(()=>{if(go()||++n>60)clearInterval(t)},100)}
  }
  load('/home-map-enhance.js?v='+VERSION,'data-venom-runtime-home',()=>{
    load('/home-finish.js?v='+VERSION,'data-venom-home-finish',()=>{
      load('/ai-workspace-polish.js?v='+VERSION,'data-venom-ai-workspace',()=>{
        load('/payment-fix.js?v='+VERSION,'data-venom-payment-fix',()=>{
          load('/ai-shell-minimal.js?v='+VERSION,'data-venom-ai-shell-minimal',()=>{
            load('/ai-pro-finish.js?v='+VERSION,'data-venom-ai-pro-finish',()=>{
              load('/premium-responsive.js?v='+VERSION,'data-venom-premium-responsive',()=>{
                load('/ai-chat-work-toggle.js?v='+VERSION,'data-venom-chat-work-toggle',()=>{
                  load('/admin-command-center.js?v='+VERSION,'data-venom-admin-command-center',()=>{
                    removePause();
                    new MutationObserver(removePause).observe(document.body,{childList:true,subtree:true});
                    if(window.venomAuthClient)window.venomAuthClient().auth.onAuthStateChange((event,session)=>{if(session&&(event==='SIGNED_IN'||sessionStorage.getItem('venom-open-ai')==='1'))openAIAfterAuth()});
                    openAIAfterAuth();
                  });
                });
              });
            });
          });
        });
      });
    });
  });
})();

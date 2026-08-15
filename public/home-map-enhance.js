/* Loads the final signed-in workspace layers after dashboard-overhaul. */
(function(){
  if(document.querySelector('script[data-venom-final-ui]')) return;
  const s=document.createElement('script');
  s.src='/ui-final.js?v=20260815-1';
  s.dataset.venomFinalUi='1';
  s.onload=()=>{
    const v=document.createElement('script');
    v.src='/ui-v2.js?v=20260815-2';
    v.dataset.venomV2='1';
    v.onload=()=>{if(document.getElementById('app')?.style.display==='block'&&typeof window.home==='function')setTimeout(()=>window.home(),80)};
    document.body.appendChild(v);
  };
  document.body.appendChild(s);
})();

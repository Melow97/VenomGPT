/* Loads the final signed-in workspace interaction layer after dashboard-overhaul. */
(function(){
  if(document.querySelector('script[data-venom-final-ui]')) return;
  const s=document.createElement('script');
  s.src='/ui-final.js?v=20260815-1';
  s.dataset.venomFinalUi='1';
  s.onload=()=>{if(document.getElementById('app')?.style.display==='block'&&typeof window.home==='function')setTimeout(()=>window.home(),50)};
  document.body.appendChild(s);
})();

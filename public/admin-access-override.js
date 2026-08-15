/* VENOM GPT — privileged access override
 * Owner/admin sessions see the complete workspace without customer-facing Pro locks.
 */
(function(){
  'use strict';
  const privileged=()=>['owner','admin'].includes(String(window.userInfo?.role||'').toLowerCase());
  function unlock(){
    if(!privileged())return;
    document.querySelectorAll('.vUpgrade,.upgrade').forEach(el=>el.remove());
    document.querySelectorAll('[data-work-upgrade]').forEach(el=>{
      el.textContent='OPEN WORK';
      el.removeAttribute('data-work-upgrade');
      el.onclick=()=>window.toast?.('WORK MODE · ALL ADMIN TOOLS ENABLED');
    });
    document.querySelectorAll('.vgWorkUpgrade').forEach(el=>{
      el.innerHTML='<div><b>✓ ADMIN ACCESS</b><span>All Work tools are enabled for this account.</span></div><button type="button" class="adminWorkReady">OPEN WORK</button>';
      el.querySelector('button')?.addEventListener('click',()=>window.toast?.('WORK MODE · ALL ADMIN TOOLS ENABLED'));
    });
    const work=document.querySelector('#venom-mode-selector .vgModeBtn.work');
    if(work){
      work.classList.remove('work');
      work.classList.add('admin-work');
      const lock=work.querySelector('.vgModeLock');if(lock)lock.textContent='✦';
      work.title='Work · Admin access';
    }
    document.querySelectorAll('.vSideProfile .vProfilePlan').forEach(el=>el.textContent='ADMIN · ALL ACCESS');
  }
  function boot(){unlock();setTimeout(unlock,120);setTimeout(unlock,600)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  new MutationObserver(unlock).observe(document.body,{childList:true,subtree:true});
})();

/* VENOM GPT — PRICING INTERACTION HOTFIX v4 */
(()=>{
  'use strict';
  if(window.__VENOM_PRICING_HOTFIX_V4)return;
  window.__VENOM_PRICING_HOTFIX_V4=true;
  function bind(){
    document.querySelectorAll('.venom-price-card button').forEach(b=>{
      if(b.dataset.pricingBound)return;
      b.dataset.pricingBound='1';
      b.removeAttribute('onclick');
      b.addEventListener('click',()=>document.getElementById('va-login')?.click());
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});
  else bind();
  new MutationObserver(bind).observe(document.body||document.documentElement,{childList:true,subtree:true});
})();

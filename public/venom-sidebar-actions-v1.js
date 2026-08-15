/* VENOM GPT — sidebar interaction repair + sidebar plus removal */
(()=>{
'use strict';
const VERSION='20260815-61';
const qs=(s,r=document)=>r.querySelector(s), qsa=(s,r=document)=>[...r.querySelectorAll(s)];
function removeSidebarPlus(){
 qsa('.side,aside,[class*="sidebar"],nav').forEach(root=>{
  qsa('button,a,div,span',root).forEach(el=>{
   const t=(el.textContent||'').trim();
   const aria=(el.getAttribute('aria-label')||'').toLowerCase();
   const cls=String(el.className||'').toLowerCase();
   if((t==='+'||t==='＋'||aria==='add'||aria==='plus'||/sidebar.*plus|plus.*sidebar|new-chat-plus|sidebar-plus|plus-control/.test(cls)) && !/new chat/i.test(t)){
    el.remove();
   }
  });
 });
}
function tracker(){
 if(typeof window.__venomSpiderOpen==='function'){window.__venomSpiderOpen();return true}
 const candidates=['[data-spider-tracker]','#spider-tracker','.spider-tracker','button[aria-label*="Spider"]','a[href*="spider"]'];
 for(const s of candidates){const el=qs(s);if(el){el.click();return true}}
 window.dispatchEvent(new CustomEvent('venom:open-tracker'));return false;
}
function action(label){
 const l=label.toLowerCase();
 if(l.includes('spider')) return tracker();
 const map={
  'new chat':'chat','chats':'chats','search':'search','library':'library','code studio':'code','research':'research','documents':'documents','image studio':'image','data analysis':'data'
 };
 for(const k in map) if(l.includes(k)){window.dispatchEvent(new CustomEvent('venom:navigate',{detail:{section:map[k],label:k}}));return true}
 return false;
}
function bind(){
 removeSidebarPlus();
 qsa('.sideBtn,.side a,.sidebar button,.sidebar a,aside button,aside a').forEach(el=>{
  if(el.dataset.venomSidebarRepair)return;el.dataset.venomSidebarRepair='1';
  el.addEventListener('click',e=>{const text=(el.textContent||'').trim();if(action(text)){e.preventDefault();e.stopPropagation()}},true);
 });
}
function boot(){bind();new MutationObserver(bind).observe(document.body,{childList:true,subtree:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();

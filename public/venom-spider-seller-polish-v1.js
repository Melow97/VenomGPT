/* VENOM GPT — SPIDER SELLER POLISH
   Keeps the existing tracker layout, improves discoverability and removes CCTV wording. */
(()=>{
'use strict';
if(window.__VENOM_SPIDER_SELLER_POLISH__)return;window.__VENOM_SPIDER_SELLER_POLISH__=true;
const style=document.createElement('style');style.textContent=`
/* Make the tracker action rail obvious without changing its structure */
.spider-tracker button,.spider-tracker [role="button"],#tracker button,#tracker [role="button"],.va-tracker button,.tracker-map button{transition:transform .16s ease,filter .16s ease,box-shadow .16s ease;}
.spider-tracker button:hover,.spider-tracker [role="button"]:hover,#tracker button:hover,#tracker [role="button"]:hover,.va-tracker button:hover,.tracker-map button:hover{filter:brightness(1.18);transform:translateY(-1px);}
/* Bottom controls: clear, compact, scrollable on small screens */
.spider-tracker .tracker-actions,.spider-tracker .action-bar,.spider-tracker .tracker-controls,#tracker .tracker-actions,#tracker .action-bar,#tracker .tracker-controls,.va-tracker .tracker-actions,.va-tracker .action-bar{display:flex!important;align-items:center;gap:8px;overflow-x:auto;overflow-y:hidden;scrollbar-width:thin;padding:8px 4px 10px;white-space:nowrap;}
.spider-tracker .tracker-actions::-webkit-scrollbar,#tracker .tracker-actions::-webkit-scrollbar,.spider-tracker .action-bar::-webkit-scrollbar,#tracker .action-bar::-webkit-scrollbar{height:4px}
.spider-tracker .tracker-actions button,#tracker .tracker-actions button,.spider-tracker .action-bar button,#tracker .action-bar button,.spider-tracker .tracker-controls button,#tracker .tracker-controls button{min-height:38px;padding:8px 11px;font-size:11px;display:inline-flex;align-items:center;justify-content:center;gap:6px;flex:0 0 auto;border-radius:10px;}
/* If a control is icon-only, give it a visible label through aria/title */
.spider-tracker button[title],#tracker button[title],.va-tracker button[title]{min-width:38px;}
@media(max-width:700px){.spider-tracker .tracker-actions,.spider-tracker .action-bar,.spider-tracker .tracker-controls,#tracker .tracker-actions,#tracker .action-bar,#tracker .tracker-controls{padding-bottom:12px}.spider-tracker .tracker-actions button,#tracker .tracker-actions button,.spider-tracker .action-bar button,#tracker .action-bar button{min-height:40px}}
/* Never show the old creepy wording */
.venom-cctv-label,.open-cctv-label{display:none!important}
`;
document.head.appendChild(style);
const bad=/open\s*cctv|cctv/i;
function clean(root=document){
 root.querySelectorAll('button,a,[role="button"],span,div').forEach(el=>{
  const txt=(el.textContent||'').trim();
  if(bad.test(txt) && txt.length<40){
    if(el.children.length===0 || el.tagName==='BUTTON' || el.getAttribute('role')==='button'){
      if(/cctv/i.test(txt)){
        el.textContent='VIEW SIGNAL';
        el.setAttribute('aria-label','View signal evidence');
        el.title='View signal evidence';
      }
    }
  }
 });
}
function run(){clean();setTimeout(clean,400);setTimeout(clean,1200);}
run();
new MutationObserver(()=>clean()).observe(document.body,{subtree:true,childList:true});
window.addEventListener('venom:open-tracker',()=>setTimeout(run,200));
})();
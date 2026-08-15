/* VENOM GPT V5 — cream workspace, minimal composer, production voice, live fictional NYC tracker */
(()=>{
'use strict';
const V='20260815-52';
const APPS=[
 ['Google Drive','Storage','Drive','▣'],['Gmail','Communication','Gmail','✉'],['Google Calendar','Productivity','Calendar','31'],['Notion','Productivity','Notion','N'],['GitHub','Dev Tools','GitHub','⌘'],['Dropbox','Storage','Dropbox','◆'],['Slack','Communication','Slack','S'],['Microsoft OneDrive','Storage','OneDrive','☁'],['Trello','Productivity','Trello','▦'],['Figma','Dev Tools','Figma','F'],['Google Docs','Productivity','Docs','▤'],['Google Sheets','Productivity','Sheets','▥'],['Microsoft Excel','Productivity','Excel','X'],['Microsoft Word','Productivity','Word','W'],['PowerPoint','Productivity','PPT','P'],['Adobe Acrobat','Productivity','Acrobat','A'],['Canva','Productivity','Canva','C'],['Linear','Dev Tools','Linear','L'],['Jira','Dev Tools','Jira','J'],['Asana','Productivity','Asana','A']
];
const SIGHT=[
 {name:'Times Square',area:'MIDTOWN',lat:40.7580,lng:-73.9855,type:'VISUAL',tone:'red'},
 {name:'Empire State Building',area:'MIDTOWN',lat:40.7484,lng:-73.9857,type:'MOTION',tone:'orange'},
 {name:'Queens Plaza',area:'QUEENS',lat:40.7488,lng:-73.9375,type:'PING',tone:'green'},
 {name:'Williamsburg',area:'BROOKLYN',lat:40.7081,lng:-73.9571,type:'MOTION',tone:'green'},
 {name:'SoHo',area:'LOWER MANHATTAN',lat:40.7233,lng:-74.0030,type:'VISUAL',tone:'orange'},
 {name:'Harlem',area:'HARLEM',lat:40.8116,lng:-73.9465,type:'PING',tone:'green'},
 {name:'DUMBO',area:'BROOKLYN',lat:40.7033,lng:-73.9880,type:'PING',tone:'green'},
 {name:'Brooklyn Bridge',area:'BROOKLYN',lat:40.7061,lng:-73.9969,type:'MOTION',tone:'red'}
];
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let recognition=null,listening=false,finalTranscript='',map=null,leafletReady=false,trackerTimer=null,trackerIndex=0,trackerPaused=false;
function styles(){if($('#venom-v5-style'))return;const s=document.createElement('style');s.id='venom-v5-style';s.textContent=`
/* PATCH: sidebar actions + compact composer. */
.side{overflow:auto}.sideBtn,.side a{cursor:pointer}.sideBtn[data-action],.side a[data-action]{pointer-events:auto}
/* remove any standalone sidebar plus/add control */
.side .sidebar-plus,.side .plus-control,.side .new-chat-plus,.side [aria-label="Add"],.side [aria-label="Plus"]{display:none!important}
.v2Box{display:flex!important;align-items:center!important}.v2Box>button:not(#v2Attach):not(#v2Send):not(.v5Mic){display:none!important}.v2Box>svg,.v2Box .v2ExtraIcon{display:none!important}
.v2Box #v2Attach,.v5Mic,.v2Box #v2Send{flex:0 0 auto!important;width:42px!important;height:42px!important;min-width:42px!important;min-height:42px!important;padding:0!important;border-radius:12px!important;display:grid!important;place-items:center!important}
.v2Box #v2Attach{font-size:25px!important;background:transparent!important;border:1px solid transparent!important}.v5Mic{background:transparent!important;border:1px solid transparent!important}.v2Box #v2Send{font-size:22px!important;background:#168f89!important;color:#fff!important;border:1px solid #168f89!important;border-radius:50%!important}
.v5Mic.active{background:linear-gradient(135deg,#e95b28,#a64cff,#1bafa8)!important;color:#fff!important;border-color:#e95b28!important;box-shadow:0 0 0 4px #e95b2814,0 0 26px #7d55ff33!important;animation:v5Pulse 1s infinite}@keyframes v5Pulse{50%{transform:scale(1.035)}}
`;document.head.appendChild(s)}
function bindSidebar(){
 $$('.sideBtn,.side a').forEach(el=>{if(el.dataset.v5Bound)return;el.dataset.v5Bound='1';el.addEventListener('click',e=>{const label=(el.textContent||'').trim().toLowerCase();if(label.includes('spider')){e.preventDefault();openTracker();return}if(label.includes('new chat')){e.preventDefault();location.hash='chat';window.dispatchEvent(new CustomEvent('venom:new-chat'));return}if(label.includes('search')){e.preventDefault();window.dispatchEvent(new CustomEvent('venom:search'));return}if(label.includes('code studio')){e.preventDefault();window.dispatchEvent(new CustomEvent('venom:open-module',{detail:'code'}));return}if(label.includes('research')){e.preventDefault();window.dispatchEvent(new CustomEvent('venom:open-module',{detail:'research'}));return}if(label.includes('document')){e.preventDefault();window.dispatchEvent(new CustomEvent('venom:open-module',{detail:'documents'}));return}if(label.includes('image studio')){e.preventDefault();window.dispatchEvent(new CustomEvent('venom:open-module',{detail:'image'}));return}if(label.includes('data analysis')){e.preventDefault();window.dispatchEvent(new CustomEvent('venom:open-module',{detail:'data'}));return}if(label.includes('library')){e.preventDefault();window.dispatchEvent(new CustomEvent('venom:open-module',{detail:'library'}));return}if(label.includes('chats')){e.preventDefault();window.dispatchEvent(new CustomEvent('venom:open-module',{detail:'chats'}));return}})})
}
function openTracker(){if(window.__venomSpiderOpen){window.__venomSpiderOpen();return}const btn=document.querySelector('[data-spider-tracker],#spider-tracker,.spider-tracker');if(btn&&btn!==document.activeElement){btn.click();return}window.dispatchEvent(new CustomEvent('venom:open-tracker'))}
function boot(){styles();bindSidebar();new MutationObserver(()=>{styles();bindSidebar()}).observe(document.body,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();

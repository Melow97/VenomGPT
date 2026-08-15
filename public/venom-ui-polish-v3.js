/* VENOM GPT UI POLISH V3 — reference-matched chat, persistent mark, scroll + cursor */
(()=>{
'use strict';
if(window.__venomUIPolishV3)return; window.__venomUIPolishV3=true;
const css=`
/* ---------- global scroll / interaction ---------- */
html,body{height:auto!important;min-height:100%!important;overflow-x:hidden!important;overflow-y:auto!important;scroll-behavior:smooth}
body{cursor:none!important}
body *{cursor:none!important}
#app{min-height:100vh!important;height:auto!important;overflow:visible!important}
#app .appShell{min-height:100vh!important;height:auto!important;overflow:visible!important}
#app .layout{min-height:calc(100vh - 68px)!important;height:auto!important;overflow:visible!important}
#app .main{min-height:calc(100vh - 68px)!important;height:auto!important;overflow:visible!important}
#app .side{position:sticky!important;top:0!important;align-self:flex-start!important;max-height:100vh!important;overflow-y:auto!important;overflow-x:hidden!important}
.vgPageScroll{height:100%!important;min-height:100vh!important;overflow:visible!important}
/* native-feeling custom red Venom pointer */
#venom-cursor{position:fixed;left:0;top:0;width:18px;height:18px;z-index:2147483647;pointer-events:none;transform:translate(-3px,-3px) rotate(-14deg);filter:drop-shadow(0 0 5px rgba(224,48,34,.45));transition:transform .035s linear}
#venom-cursor:before{content:'';position:absolute;left:1px;top:0;width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:17px solid #d72f25;transform:rotate(-24deg)}
#venom-cursor:after{content:'';position:absolute;left:7px;top:11px;width:5px;height:2px;background:#d72f25;border-radius:3px;box-shadow:0 0 7px #d72f25}
#venom-cursor.click{transform:translate(-3px,-3px) rotate(-14deg) scale(1.28)}
@media(pointer:coarse){#venom-cursor{display:none}body,body *{cursor:auto!important}}
/* ---------- reference-style light workspace ---------- */
body.light #app{background:#f3e8d5!important;color:#2b2822!important}
body.light #app .top{height:76px!important;background:rgba(248,240,226,.96)!important;border-bottom:1px solid #cdbf9f!important;box-shadow:0 4px 18px rgba(74,58,31,.08)!important}
body.light #app .side{background:#eee3d0!important;border-right:1px solid #cbbd9f!important}
body.light #app .main{background:linear-gradient(180deg,#f8f0e2 0,#f3e8d5 55%,#eee1cc 100%)!important}
body.light #app .layout{background:#f3e8d5!important}
/* persistent Venom identity */
.vgPersistentMark{display:flex;align-items:center;gap:9px;min-width:0;user-select:none}
.vgPersistentMark img{width:38px;height:38px;object-fit:contain;filter:drop-shadow(0 2px 4px rgba(0,0,0,.18))}
.vgPersistentMark .word{font:900 16px/1 system-ui,sans-serif;letter-spacing:-.03em;color:#28251f;white-space:nowrap}
.vgPersistentMark .word span{color:#159b98}
body:not(.light) .vgPersistentMark .word{color:#f2e9da}
body:not(.light) .vgPersistentMark img{filter:drop-shadow(0 2px 5px rgba(0,0,0,.5))}
body.light .vgPersistentMark{margin-left:2px}
/* chat/work mode control sits beside brand */
body.light .vgModeSwitch{background:#e7dcc8!important;border-color:#bcae92!important;box-shadow:inset 0 1px #fff8!important}
body.light .vgModeSwitch button{color:#776b58!important}
body.light .vgModeSwitch button.active{background:#fff8eb!important;color:#2f2b24!important;box-shadow:0 2px 9px rgba(80,61,31,.12)!important}
body.light .vgModeSwitch .free{color:#168e8a!important}
/* reference-like search/status controls */
body.light #app .topbtn{background:#fff8ec!important;border:1px solid #c6b796!important;color:#5b513f!important;border-radius:12px!important}
body.light #app .account{color:#5d5342!important}
body.light #app .badge{background:#dcebe5!important;color:#176f6b!important;border-color:#91bcb2!important}
/* home/chat canvas */
body.light .vgHomeWrap,body.light .vgChatShell{background:transparent!important}
body.light .vgChatShell{max-width:1180px!important;margin:0 auto!important}
body.light .vgChatHead{background:rgba(250,243,232,.76)!important;border:1px solid #d2c4a8!important;border-radius:18px!important;box-shadow:0 10px 28px rgba(85,66,34,.06)!important}
body.light .vgChatHead .title{color:#312d26!important}
body.light .vgChatHead .meta{color:#168f8b!important}
body.light .vgWelcome{max-width:960px!important;margin:24px auto!important;padding:32px 24px!important;background:rgba(255,249,239,.62)!important;border:1px solid #d0c1a5!important;border-radius:24px!important;box-shadow:0 18px 45px rgba(75,58,30,.07)!important}
body.light .vgWelcome h2{font-size:34px!important;color:#302c25!important}
body.light .vgWelcome p{color:#746a59!important}
/* make logo prominent beside welcome message */
.vgWelcomeBrand{display:flex;align-items:center;gap:14px;margin-bottom:16px}
.vgWelcomeBrand img{width:54px;height:54px;object-fit:contain}
.vgWelcomeBrand .faceWord{font:900 13px/1 monospace;letter-spacing:.12em;color:#168f8b;text-transform:uppercase}
body:not(.light) .vgWelcomeBrand .faceWord{color:#62e5dc}
/* pristine icon treatment */
.vgIconBtn,.vgComposerTools button,.vgSend{display:inline-flex!important;align-items:center!important;justify-content:center!important;width:38px!important;height:38px!important;min-width:38px!important;min-height:38px!important;border-radius:11px!important;border:1px solid #bfb095!important;background:#fff8ec!important;color:#4f473a!important;box-shadow:0 2px 7px rgba(70,55,28,.06)!important;transition:transform .12s ease,box-shadow .12s ease,border-color .12s ease!important}
.vgIconBtn:hover,.vgComposerTools button:hover,.vgSend:hover{transform:translateY(-1px)!important;border-color:#55aaa5!important;box-shadow:0 5px 14px rgba(60,100,95,.12)!important}
body:not(.light) .vgIconBtn,body:not(.light) .vgComposerTools button{background:#101a1b!important;border-color:#ffffff16!important;color:#d7e2dd!important}
/* remove oversized plus / floating file controls */
#vgPlus{width:38px!important;height:38px!important;font-size:19px!important;font-weight:500!important}
.vgFileFloat,.floating-files,.floating-files-button,[data-floating-files],#floating-files{display:none!important}
/* composer exactly like the reference: broad, low-profile, pristine */
body.light .vgComposerNew{max-width:960px!important;margin:20px auto 28px!important;background:#fff9ee!important;border:1px solid #c5b695!important;border-radius:22px!important;box-shadow:0 15px 38px rgba(70,53,27,.10)!important}
body.light .vgComposerNew textarea{color:#312d26!important}
body.light .vgComposerTools button{background:#f9f0e1!important}
body.light .vgSend{background:#1d7773!important;border-color:#1d7773!important;color:#fffaf0!important;box-shadow:0 5px 15px rgba(29,119,115,.25)!important}
/* suggestions */
body.light .vgSuggestion{background:#fff9ee!important;border:1px solid #d0c1a5!important;color:#625847!important;border-radius:13px!important}
body.light .vgSuggestion:hover{border-color:#55aaa5!important;background:#f6eee0!important;color:#315653!important}
/* chat bubbles */
body.light .vgBubble{background:#fff9ef!important;border:1px solid #d4c6aa!important;color:#3b362e!important;box-shadow:0 7px 18px rgba(72,54,28,.06)!important;border-radius:17px!important}
body.light .vgMsg.user .vgBubble{background:#dbece7!important;border-color:#8ebdb7!important}
/* side icons */
body.light #app .side .sideBtn,body.light #app .side>a{border-radius:11px!important;margin:2px 9px!important}
body.light #app .side .sideBtn.active{background:#d4e8e3!important;color:#176f6b!important;border-color:#6bbab3!important}
/* scrollbar: visible, elegant, always available */
html::-webkit-scrollbar,body::-webkit-scrollbar,#app .side::-webkit-scrollbar{width:11px}
html::-webkit-scrollbar-track,body::-webkit-scrollbar-track,#app .side::-webkit-scrollbar-track{background:#ded1bb}
html::-webkit-scrollbar-thumb,body::-webkit-scrollbar-thumb,#app .side::-webkit-scrollbar-thumb{background:#a4473e;border:3px solid #ded1bb;border-radius:20px}
html::-webkit-scrollbar-thumb:hover,body::-webkit-scrollbar-thumb:hover,#app .side::-webkit-scrollbar-thumb:hover{background:#d23a2e}
body:not(.light)::-webkit-scrollbar-track{background:#0b1112}
body:not(.light)::-webkit-scrollbar-thumb{background:#9b302b;border-color:#0b1112}
body:not(.light)::-webkit-scrollbar-thumb:hover{background:#d33c32}
/* Firefox */
html,body{scrollbar-width:thin;scrollbar-color:#a4473e #ded1bb}
body:not(.light){scrollbar-color:#9b302b #0b1112}
/* tracker remains reachable and visually consistent */
body.light .vgTrackerShell{box-shadow:0 25px 65px rgba(41,50,49,.14)!important}
/* small screen */
@media(max-width:900px){.vgPersistentMark .word{display:none}.vgPersistentMark img{width:36px;height:36px}.vgWelcome{margin-left:12px!important;margin-right:12px!important}.vgComposerNew{margin-left:12px!important;margin-right:12px!important}}
@media(max-width:600px){body.light #app .top{height:66px!important}.vgPersistentMark img{width:34px;height:34px}.vgWelcome{padding:22px 16px!important}.vgWelcome h2{font-size:27px!important}}
`;
const s=document.createElement('style');s.id='venom-ui-polish-v3';s.textContent=css;document.head.appendChild(s);
function cursor(){if(document.getElementById('venom-cursor'))return;const c=document.createElement('div');c.id='venom-cursor';document.body.appendChild(c);window.addEventListener('pointermove',e=>{c.style.left=e.clientX+'px';c.style.top=e.clientY+'px'},{passive:true});window.addEventListener('pointerdown',()=>c.classList.add('click'),{passive:true});window.addEventListener('pointerup',()=>c.classList.remove('click'),{passive:true})}
function addMark(){const top=document.querySelector('#app .top');if(!top||top.querySelector('.vgPersistentMark'))return;const mark=document.createElement('div');mark.className='vgPersistentMark';mark.innerHTML='<img class="vgPersistentLogo" src="/assets/spider-tech-tracker-light.svg" alt="Venom GPT"><div class="word">VENOM <span>GPT</span></div>';const brand=top.querySelector('.brand');if(brand)brand.replaceWith(mark);else top.prepend(mark)}
function addWelcomeMark(){document.querySelectorAll('.vgWelcome').forEach(w=>{if(w.querySelector('.vgWelcomeBrand'))return;const b=document.createElement('div');b.className='vgWelcomeBrand';b.innerHTML='<img src="/assets/spider-tech-tracker-light.svg" alt="Venom GPT logo"><div class="faceWord">VENOM GPT · LOCAL AI</div>';w.prepend(b)})}
function themeLogo(){document.querySelectorAll('.vgPersistentLogo,.vgWelcomeBrand img').forEach(img=>{img.src=document.body.classList.contains('light')?'/assets/spider-tech-tracker-light.svg':'/assets/spider-tech-tracker-dark.svg'})}
function tidy(){addMark();addWelcomeMark();themeLogo();cursor();document.documentElement.style.overflowY='auto';document.body.style.overflowY='auto';const app=document.getElementById('app');if(app){app.style.height='auto';app.style.minHeight='100vh';app.style.overflow='visible'}document.querySelectorAll('#app .main').forEach(m=>{m.style.height='auto';m.style.minHeight='calc(100vh - 68px)';m.style.overflow='visible'});document.querySelectorAll('.floating-files,.floating-files-button,[data-floating-files],#floating-files').forEach(e=>e.style.display='none')}
window.addEventListener('venom-theme-change',themeLogo);new MutationObserver(tidy).observe(document.body,{childList:true,subtree:true});if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',tidy,{once:true});else tidy();setTimeout(tidy,300);setTimeout(tidy,1200);
})();

/* VENOM GPT — RESTORED FOOTER + SPIDER BRAND MARK */
(()=>{
'use strict';
if(window.__VENOM_FOOTER_BRAND_V1__)return;window.__VENOM_FOOTER_BRAND_V1__=true;
const $=s=>document.querySelector(s);
const css=document.createElement('style');css.id='venom-footer-brand-css';css.textContent=`
.vgpt-footer{margin-top:0;border-top:1px solid #b9aa95;background:#171310;color:#f4ead9;padding:46px max(24px,5vw) 22px;position:relative;overflow:hidden}.vgpt-footer:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#e6391e0a 1px,transparent 1px),linear-gradient(#e6391e08 1px,transparent 1px);background-size:38px 38px;pointer-events:none}.vgpt-footer-inner{position:relative;max-width:1220px;margin:auto;display:grid;grid-template-columns:1.7fr 1fr 1fr 1fr;gap:34px}.vgpt-foot-brand{display:flex;align-items:center;gap:12px;font-weight:1000;font-size:25px;letter-spacing:-1px}.vgpt-foot-brand .spider-mark{width:38px;height:38px;object-fit:contain;filter:drop-shadow(0 0 8px #f21d1638)}.vgpt-foot-brand b{color:#ff2b1d}.vgpt-foot-copy{margin-top:13px;color:#bdb2a3;font-size:13px;line-height:1.6;max-width:330px}.vgpt-foot-contact{margin-top:13px;color:#ff6a55;font-size:12px;font-weight:800}.vgpt-foot-col h4{font-size:11px;letter-spacing:1.5px;color:#ff4a38;margin:0 0 13px}.vgpt-foot-col a{display:block;color:#d8cdbd;text-decoration:none;font-size:12px;margin:9px 0}.vgpt-foot-col a:hover{color:#ff4a38}.vgpt-foot-bottom{position:relative;max-width:1220px;margin:32px auto 0;padding-top:17px;border-top:1px solid #3a322b;display:flex;justify-content:space-between;gap:15px;color:#897f73;font-size:11px}.vgpt-x{color:#fff!important}.vgpt-x:hover{color:#ff2b1d!important}
.vgpt-brand-inline{display:inline-flex!important;align-items:center!important;gap:7px!important}.vgpt-brand-inline .spider-mark{width:24px;height:24px;object-fit:contain;vertical-align:middle;filter:drop-shadow(0 0 5px #f21d1644)}
@media(max-width:800px){.vgpt-footer-inner{grid-template-columns:1fr 1fr}.vgpt-foot-bottom{flex-direction:column}}@media(max-width:480px){.vgpt-footer-inner{grid-template-columns:1fr}.vgpt-foot-brand{font-size:22px}}
`;document.head.appendChild(css);
function findLogo(){
 const existing=document.querySelector('img[src^="data:image/"]');
 return existing?.src||null;
}
function brandify(){
 const logo=findLogo();if(!logo)return;
 document.querySelectorAll('.va-brand,.va-sidebrand').forEach(el=>{
   if(el.querySelector('.spider-mark'))return;
   const img=document.createElement('img');img.className='spider-mark';img.src=logo;img.alt='Venom GPT Spider';
   el.classList.add('vgpt-brand-inline');el.appendChild(img);
 });
}
function footer(){
 const landing=document.getElementById('landing');if(!landing||landing.querySelector('.vgpt-footer'))return;
 const f=document.createElement('footer');f.className='vgpt-footer';f.innerHTML=`<div class="vgpt-footer-inner">
 <div><div class="vgpt-foot-brand">VENOM <b>GPT</b></div><div class="vgpt-foot-copy">Your local AI workspace for chat, research, creation, connected work and Spider-Tech.</div><div class="vgpt-foot-contact">Contact: venomgpt392@gmail.com</div></div>
 <div class="vgpt-foot-col"><h4>PRODUCT</h4><a href="#features">Features</a><a href="#workspace">Workspace</a><a href="#tracker">Spider Tech</a><a href="#venom-home-tiers">Pricing</a></div>
 <div class="vgpt-foot-col"><h4>COMPANY</h4><a href="#about">About Venom GPT</a><a class="vgpt-x" href="https://x.com/SpideytrackerAI" target="_blank" rel="noopener">Follow us on X</a><a href="mailto:venomgpt392@gmail.com">Contact us</a></div>
 <div class="vgpt-foot-col"><h4>LEGAL & SUPPORT</h4><a href="/legal.html#terms">Terms & Conditions</a><a href="/legal.html#privacy">Privacy Policy</a><a href="mailto:venomgpt392@gmail.com">Help & Issues</a></div>
 </div><div class="vgpt-foot-bottom"><span>© 2026 Venom GPT. All rights reserved.</span><span>Built for the next generation of AI.</span></div>`;
 landing.appendChild(f);brandify();
}
function run(){footer();brandify();setTimeout(footer,500);setTimeout(brandify,700);setTimeout(footer,1500);setTimeout(brandify,1700)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
new MutationObserver(()=>{footer();brandify()}).observe(document.body,{childList:true,subtree:true});
})();

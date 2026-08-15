/* VENOM GPT — HOME RED / BLACK PALETTE */
(()=>{
'use strict';
if(window.__VENOM_HOME_RED_BLACK__)return;window.__VENOM_HOME_RED_BLACK__=true;
const s=document.createElement('style');s.textContent=`
:root{--venom-red:#e50914;--venom-red-dark:#8d0610;--venom-black:#090909;--venom-ink:#171313}
/* Replace green/teal accents on the welcome/home marketing layer with Venom red/black. */
#landing .vfh-k,#landing .vfh-tier{color:var(--venom-red)!important}
#landing .vfh-tab.active{background:var(--venom-black)!important;border-color:var(--venom-red)!important;color:#fff!important}
#landing .vfh-card:hover{border-color:rgba(229,9,20,.42)!important;box-shadow:0 15px 34px rgba(0,0,0,.14),0 0 0 1px rgba(229,9,20,.08)!important}
#landing .vfh-cta button{background:var(--venom-black)!important;border:1px solid rgba(229,9,20,.65)!important}
#landing .vfh-cta button:hover{background:var(--venom-red)!important}
#landing [class*="welcome"] [class*="status"],#landing [class*="signal"]{--accent:#e50914!important}
#landing .venom-int-app:hover{border-color:rgba(229,9,20,.28)!important}
/* Marketing CTA/status accents: preserve Spider-Tech blue only inside the tracker itself. */
.venom-home-red-accent{color:var(--venom-red)!important}
`;
document.head.appendChild(s);
})();

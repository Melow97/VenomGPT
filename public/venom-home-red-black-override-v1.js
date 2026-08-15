/* VENOM GPT — FINAL HOME RED/BLACK VISUAL OVERRIDE */
(()=>{
'use strict';
if(window.__VENOM_HOME_RED_BLACK__)return;window.__VENOM_HOME_RED_BLACK__=true;
const css=`
/* HOME / LANDING ONLY: eliminate legacy green/teal accents */
#landing .va-shell{background:linear-gradient(135deg,#080808 0%,#11100f 48%,#17120f 100%)!important;color:#f4eadb!important}
#landing .va-nav{background:rgba(8,8,8,.94)!important;border-color:#302721!important}
#landing .va-brand,#landing .va-navlinks a{color:#f4eadb!important}
#landing .va-brand span{color:#e52520!important}
#landing .va-btn{background:#11100f!important;color:#f5eadc!important;border-color:#5a4940!important}
#landing .va-btn:hover{border-color:#e52520!important;box-shadow:0 0 0 1px #e52520,0 8px 28px #e5252028!important}
#landing .va-primary{background:linear-gradient(135deg,#ff3b30,#c91515)!important;color:#fff!important;border-color:#ff3b30!important;box-shadow:0 10px 30px #e5252030!important}
#landing .va-kicker{color:#ff443b!important}
#landing .va-hero p,#landing .va-lead{color:#c7b9aa!important}
#landing .va-hero h1 span{color:#e52520!important;text-shadow:0 0 30px #e5252030!important}
#landing .va-art{border-color:#59463d!important;background:linear-gradient(145deg,#161313,#080808)!important;box-shadow:18px 24px 70px #000!important}
#landing .va-art:after{color:#ffffff08!important}
#landing .va-signal{border-color:#ff3129!important;box-shadow:0 0 0 12px #ff312922,0 0 40px #ff3129!important}
#landing .va-signal:after{color:#ff6a63!important}
#landing .va-section{color:#f4eadb!important}
#landing .va-card{background:linear-gradient(145deg,#151312,#0b0b0b)!important;border-color:#3b302b!important;color:#f4eadb!important;box-shadow:0 16px 45px #0008!important}
#landing .va-card:hover{border-color:#e52520!important;box-shadow:0 18px 45px #e5252022!important}
#landing .va-card p{color:#b8aa9b!important}
#landing .va-card .ico{filter:saturate(1.2)!important}
#landing .vh-tier-wrap,#landing #venom-home-features{background:transparent!important;color:#f4eadb!important}
#landing .vh-kicker,#landing .vfh-k{color:#ff443b!important}
#landing .vh-lead,#landing .vfh-lead{color:#c7b9aa!important}
#landing .vh-plan,#landing .vfh-card{background:linear-gradient(145deg,#171514,#0c0c0c)!important;border-color:#40342e!important;color:#f4eadb!important;box-shadow:0 18px 50px #0008!important}
#landing .vh-plan.plus{border-color:#e52520!important;box-shadow:0 20px 55px #e5252024!important}
#landing .vh-plan.pro{background:#050505!important;border-color:#e52520!important}
#landing .vh-badge{background:#321312!important;color:#ff625b!important}
#landing .vh-plan p,#landing .vh-desc{color:#b9ab9d!important}
#landing .vh-connect{background:#121110!important;border-color:#3d322d!important;color:#f4eadb!important}
#landing .vh-connect:hover{border-color:#e52520!important}
#landing .vh-note{background:#161311!important;color:#b9ab9d!important;border:1px solid #3d322d!important}
#landing .vh-note strong{color:#fff!important}
#landing .vfh-tab{background:#121110!important;color:#d9ccbe!important;border-color:#40342e!important}
#landing .vfh-tab.active{background:#e52520!important;color:#fff!important;border-color:#e52520!important}
#landing .vfh-card:hover{border-color:#e52520!important}
#landing .vfh-cta button{background:#e52520!important;color:#fff!important}
#landing a[href*="tracker"],#landing a[href*="features"]{color:#f4eadb!important}
`;
const s=document.createElement('style');s.id='venom-home-red-black-css';s.textContent=css;document.head.appendChild(s);
})();

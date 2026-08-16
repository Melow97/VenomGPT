/* VENOM GPT — FAST, NON-BLOCKING PRODUCTION BOOT */
(()=>{
  const VERSION='20260816-93';
  const load=src=>new Promise(resolve=>{
    const s=document.createElement('script');
    s.async=true;
    s.src=src+'?v='+VERSION;
    s.onload=resolve;
    s.onerror=()=>{console.warn('[VENOM BOOT] optional module failed:',src);resolve()};
    document.head.appendChild(s);
  });
  const finishLoader=()=>document.getElementById('venom-boot-loader')?.classList.add('done');
  const boot=async()=>{
    if(window.__VENOM_AUTHORITATIVE_BOOTED)return;
    window.__VENOM_AUTHORITATIVE_BOOTED=true;
    await load('/venom-authoritative-ui-v2.js');
    await load('/venom-welcome-professional-v1.js');
    await load('/venom-auth-ai-handoff-v1.js');
    finishLoader();
    Promise.all([
      '/venom-final-polish-v1.js','/venom-runtime-override-v1.js','/venom-runtime-hotfix-v4.js',
      '/venom-integrations-dropdown-v1.js','/spider-tech-cinematic-v1.js','/venom-feature-tiers-v1.js',
      '/venom-auth-final-override-v1.js','/venom-home-tiers-v2.js','/venom-home-features-hub-v1.js',
      '/venom-spider-seller-polish-v1.js','/venom-company-logo-v1.js','/venom-home-red-black-override-v1.js',
      '/venom-home-cream-warm-v1.js','/venom-auth-guarantee-v2.js','/venom-footer-brand-v1.js'
    ].map(load)).then(()=>console.info('[VENOM] enhancement layer ready'));
    setTimeout(finishLoader,1800);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();

/* Venom GPT premium UI polish: readable typography + theme-aware tracker */
(function(){
  const css = document.createElement('style');
  css.id = 'venom-readable-ui';
  css.textContent = `
    body{font-size:16px}
    .links a{font-size:16px}
    .nav button{font-size:14px;padding:13px 18px}
    .hero p{font-size:20px}
    .eyebrow{font-size:13px}
    .heroActions a{font-size:15px;padding:16px 22px}
    .status h4{font-size:13px}.status p{font-size:13px}
    .kicker{font-size:14px}
    .section p{font-size:18px}
    .card h3{font-size:20px}.card p{font-size:16px}
    .footer a{font-size:14px}.footer h4{font-size:13px}
    .authCard h1{font-size:48px}.authCard p{font-size:18px}.google{font-size:18px;padding:19px}.secure{font-size:13px}.error{font-size:14px}
    .account{font-size:15px}.badge{font-size:12px}.topbtn{font-size:14px;padding:11px 15px}
    .sideBtn{font-size:16px;padding:14px 15px}.side a{font-size:15px;padding:11px 12px}.title{font-size:13px}
    .dashHero h1{font-size:68px}.dashHero p{font-size:20px}.dashStatus h4{font-size:13px}.dashStatus p{font-size:13px}
    .dashBtns button{font-size:14px;padding:13px 16px}.dashCard h3{font-size:18px}.row{font-size:14px}
    .module h3{font-size:18px}.module p{font-size:15px}
    .upgrade h3{font-size:19px}.upgrade p{font-size:15px}.upgrade .money{font-size:42px}
    .chatTitle{font-size:18px}.chatMeta{font-size:13px}.chatBody{padding:40px}.welcome h2{font-size:58px}.welcome p{font-size:18px}
    .bubble{font-size:17px;line-height:1.65;padding:17px 20px}.composer textarea{font-size:18px;min-height:58px}.thinking{font-size:14px}
    #tracker h2{font-size:50px}
    #tracker .pro h3{font-size:17px}
    #tracker button{font-size:14px}
    @media(max-width:700px){.hero p,.section p{font-size:17px}.dashHero h1{font-size:50px}.welcome h2{font-size:40px}.authCard h1{font-size:38px}.side a{font-size:15px}}
  `;
  document.head.appendChild(css);

  const darkMap = "/assets/spider-tech-tracker-dark.svg";
  const lightMap = "/assets/spider-tech-tracker-light.svg";
  function setTrackerTheme(){
    const map=document.getElementById('map');
    if(!map) return;
    map.style.backgroundImage=`url(${document.body.classList.contains('light')?lightMap:darkMap})`;
    map.style.backgroundSize='cover';
    map.style.backgroundPosition='center';
  }
  const originalToggle=window.toggleTheme;
  window.toggleTheme=function(){
    if(typeof originalToggle==='function') originalToggle();
    else document.body.classList.toggle('light');
    setTrackerTheme();
  };
  document.addEventListener('click',e=>{
    if(e.target.closest('#tracker')) setTimeout(setTrackerTheme,0);
  });
  window.addEventListener('load',setTrackerTheme);
})();

window.addEventListener('DOMContentLoaded',()=>{const field=document.getElementById('venomPrompt');if(field)window.prompt=field;});

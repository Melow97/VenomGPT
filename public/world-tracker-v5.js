/* VENOM GPT WORLD TRACKER V5 — polished world map layer */
(()=>{
  const STYLE='vgWorldTrackerV5Style';
  function style(){
    if(document.getElementById(STYLE)) return;
    const s=document.createElement('style'); s.id=STYLE; s.textContent=`
      #tracker .vgMap{background:#07131a!important}
      #tracker .vgWorldLabels{opacity:.42!important}
      #tracker .vgWorldSignal{display:none!important}
      #tracker .vgNYCSignal{display:none!important}
      .vgLiveSpider{position:absolute;z-index:30;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:#efe4cc;border:2px solid #ff6843;box-shadow:0 0 0 5px #ff684322,0 5px 18px #0008;transform:translate(-50%,-50%);cursor:pointer;transition:left 1.4s ease,top 1.4s ease}
      .vgLiveSpider span{font-size:20px;line-height:1;filter:drop-shadow(0 1px 1px #0008)}
      .vgLiveSpider:after{content:'LIVE';position:absolute;left:38px;top:7px;color:#f5e7ce;background:#071014dd;border:1px solid #5a6f6d;border-radius:5px;padding:3px 5px;font:900 8px monospace;letter-spacing:.08em;white-space:nowrap}
      .vgSightPath{fill:none;stroke:#ff7049;stroke-width:2;stroke-dasharray:7 8;opacity:.38;vector-effect:non-scaling-stroke}
      .vgSpiderEdge{position:absolute;right:14px;bottom:48px;z-index:25;width:40px;height:40px;border-radius:50%;display:grid;place-items:center;background:#20282a;border:1px solid #d9d1bb;box-shadow:0 6px 18px #0007;pointer-events:none}
      .vgSpiderEdge span{font-size:21px}
      .vgLivePulse{position:absolute;width:50px;height:50px;border:2px solid #ff7049;border-radius:50%;transform:translate(-50%,-50%);animation:vgLivePulse 2s ease-out infinite;pointer-events:none;z-index:29}
      @keyframes vgLivePulse{0%{opacity:.65;transform:translate(-50%,-50%) scale(.35)}100%{opacity:0;transform:translate(-50%,-50%) scale(1.25)}}
    `; document.head.appendChild(s);
  }
  function install(){
    const map=document.querySelector('#tracker .vgMap');
    if(!map||map.dataset.v5==='1')return false;
    if(!map.querySelector('.vgWorldViewport'))return false;
    map.dataset.v5='1'; style();
    const viewport=map.querySelector('.vgWorldViewport');
    const canvas=map.querySelector('.vgWorldCanvas');
    if(!viewport||!canvas)return false;
    const edge=document.createElement('div');edge.className='vgSpiderEdge';edge.innerHTML='<span>🕷️</span>';map.appendChild(edge);
    const live=document.createElement('div');live.className='vgLiveSpider';live.innerHTML='<span>🕷️</span>';live.title='Fictional live Spider signal';viewport.appendChild(live);
    const pulse=document.createElement('div');pulse.className='vgLivePulse';viewport.appendChild(pulse);
    const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.classList.add('vgSightPath');path.setAttribute('d','M420 355 C470 320 515 330 560 300 S650 270 700 290 S760 350 820 320');
    const svg=canvas.querySelector('svg'); if(svg) svg.querySelector('#vgGlobalSignals')?.insertAdjacentElement('afterend',path);
    const route=[[-74,40.70],[-73.99,40.73],[-73.98,40.76],[-73.96,40.75],[-73.95,40.72],[-73.97,40.69],[-74.00,40.70]];
    const project=(lon,lat)=>[(lon+180)/360*1200,(90-lat)/180*700];
    let i=0;
    const move=()=>{
      const [x,y]=project(route[i][0],route[i][1]);
      const px=(x/1200)*100, py=(y/700)*100;
      live.style.left=px+'%'; live.style.top=py+'%'; pulse.style.left=px+'%'; pulse.style.top=py+'%';
      const c=document.getElementById('vgWorldCountry'); if(c)c.textContent='NEW YORK';
      i=(i+1)%route.length;
    };
    move(); setInterval(move,2400);
    live.addEventListener('click',()=>{const hud=document.getElementById('vgWorldMode');if(hud)hud.textContent='LIVE NYC SIGNAL';});
    return true;
  }
  function boot(){if(install())return;const obs=new MutationObserver(()=>{if(install())obs.disconnect()});obs.observe(document.body,{childList:true,subtree:true});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();

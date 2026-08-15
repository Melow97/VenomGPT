/* VENOM GPT HOME FINISH — cleaner retro NYC map + skyline landmarks */
(function(){
  const VERSION='20260815-10';
  function styles(){
    if(document.querySelector('link[data-venom-home-finish-css]'))return;
    const l=document.createElement('link');l.rel='stylesheet';l.href='/home-finish.css?v='+VERSION;l.setAttribute('data-venom-home-finish-css','1');document.head.appendChild(l);
  }
  function skyline(){
    const panel=document.querySelector('.vgPanel');if(!panel||panel.querySelector('.vgSkyline'))return;
    const wrap=document.createElement('div');wrap.className='vgSkyline';
    const buildings=[['ESB','empire',43,330],['MIDTOWN','tower',18,215],['CHRYSLER','spire',61,245],['HUDSON','block',76,165],['BROOKLYN','block',7,125]];
    buildings.forEach(([name,kind,left,h])=>{const b=document.createElement('div');b.className='vgBuilding '+kind;b.style.left=left+'%';b.style.height=h+'px';b.innerHTML='<span>'+name+'</span>';wrap.appendChild(b)});
    const title=document.createElement('div');title.className='vgCityLabel';title.textContent='NEW YORK // NIGHT SIGNAL';wrap.appendChild(title);panel.appendChild(wrap);
  }
  function cleanMap(){
    const map=document.querySelector('.vgMap');if(!map||map.dataset.cleaned)return;map.dataset.cleaned='1';
    ['.r1','.r2','.r3','.r4'].forEach(s=>map.querySelectorAll(s).forEach(e=>e.remove()));
    const roads=document.createElement('div');roads.className='vgStreetGrid';
    for(let i=0;i<13;i++){const s=document.createElement('i');s.style.left=(8+i*7)+'%';roads.appendChild(s)}
    for(let i=0;i<7;i++){const s=document.createElement('b');s.style.top=(12+i*12)+'%';roads.appendChild(s)}
    map.prepend(roads);
    const landmarks=[['TIMES SQ','46%','48%'],['EMPIRE STATE','41%','35%'],['CENTRAL PARK','23%','17%'],['BROOKLYN BR','67%','71%'],['FERRY','79%','58%']];
    const layer=document.createElement('div');layer.className='vgLandmarks';landmarks.forEach(([n,x,y])=>{const e=document.createElement('span');e.textContent=n;e.style.left=x;e.style.top=y;layer.appendChild(e)});map.appendChild(layer);
    const blocks=document.createElement('div');blocks.className='vgBlocks';for(let i=0;i<28;i++){const b=document.createElement('i');b.style.left=(5+(i%7)*12)+'%';b.style.top=(10+Math.floor(i/7)*20)+'%';blocks.appendChild(b)}map.appendChild(blocks);
  }
  function boot(){styles();skyline();cleanMap()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  new MutationObserver(boot).observe(document.documentElement,{childList:true,subtree:true});
})();

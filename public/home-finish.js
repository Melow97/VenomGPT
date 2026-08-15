/* VENOM GPT HOME FINISH — clean retro NYC map layer */
(function(){
  const VERSION='20260815-11';
  function styles(){
    if(document.querySelector('link[data-venom-home-finish-css]'))return;
    const l=document.createElement('link');
    l.rel='stylesheet';
    l.href='/home-finish.css?v='+VERSION;
    l.setAttribute('data-venom-home-finish-css','1');
    document.head.appendChild(l);
  }
  function skyline(){
    const panel=document.querySelector('.vgPanel');
    if(!panel||panel.querySelector('.vgSkyline'))return;
    const wrap=document.createElement('div');
    wrap.className='vgSkyline';
    const buildings=[
      ['ESB','empire',43,330],
      ['MIDTOWN','tower',18,215],
      ['CHRYSLER','spire',61,245],
      ['HUDSON','block',76,165],
      ['BROOKLYN','block',7,125]
    ];
    buildings.forEach(([name,kind,left,h])=>{
      const b=document.createElement('div');
      b.className='vgBuilding '+kind;
      b.style.left=left+'%';
      b.style.height=h+'px';
      b.innerHTML='<span>'+name+'</span>';
      wrap.appendChild(b);
    });
    const title=document.createElement('div');
    title.className='vgCityLabel';
    title.textContent='NEW YORK // NIGHT SIGNAL';
    wrap.appendChild(title);
    panel.appendChild(wrap);
  }
  function cleanMap(){
    const map=document.querySelector('.vgMap');
    if(!map||map.dataset.cleaned)return;
    map.dataset.cleaned='1';

    // Remove the old decorative road/grid layers that created distracting
    // crossing lines over the map. Keep the map readable and restrained.
    map.querySelectorAll('.r1,.r2,.r3,.r4,.vgStreetGrid,.vgBlocks').forEach(e=>e.remove());

    const landmarks=[
      ['TIMES SQ','46%','48%'],
      ['EMPIRE STATE','41%','35%'],
      ['CENTRAL PARK','23%','17%'],
      ['BROOKLYN BR','67%','71%'],
      ['FERRY','79%','58%']
    ];
    const layer=document.createElement('div');
    layer.className='vgLandmarks';
    landmarks.forEach(([n,x,y])=>{
      const e=document.createElement('span');
      e.textContent=n;
      e.style.left=x;
      e.style.top=y;
      layer.appendChild(e);
    });
    map.appendChild(layer);
  }
  function boot(){styles();skyline();cleanMap()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  new MutationObserver(boot).observe(document.documentElement,{childList:true,subtree:true});
})();

/* Spider-Tech visual bridge: keeps the strong home-map aesthetic on the live signed-in tracker too. */
(function(){
  const style=document.createElement('style');
  style.textContent=`
  .vt-city-layer{position:absolute;inset:0;z-index:2;pointer-events:none;opacity:.94}
  .vt-city-block{position:absolute;background:linear-gradient(145deg,#152e3b,#0b1d27);border:1px solid #2c6070;box-shadow:inset 0 0 0 1px #0a151d,0 0 9px #1bcbd418}
  .vt-city-block:after{content:"";position:absolute;inset:4px;background:repeating-linear-gradient(90deg,#62dfe708 0 3px,transparent 3px 8px),repeating-linear-gradient(0deg,#62dfe706 0 3px,transparent 3px 9px)}
  .vt-city-tower{position:absolute;background:linear-gradient(90deg,#09151d,#2c5260,#0a1820);border:1px solid #4d8792;box-shadow:0 0 15px #2be1dc18}
  .vt-city-tower:after{content:"";position:absolute;left:20%;right:20%;top:7%;height:3px;background:#73e9e4;box-shadow:0 10px #73e9e433,0 20px #73e9e422,0 30px #73e9e411}
  .vt-city-landmark{position:absolute;border:2px solid #e7bd68;background:linear-gradient(90deg,#211a10,#6d4d20,#211a10);box-shadow:0 0 20px #e7bd6826}
  .vt-city-landmark:before{content:"";position:absolute;left:38%;width:24%;height:70%;top:-70%;border-left:2px solid #e7bd68;border-right:2px solid #e7bd68}
  .vt-city-road{position:absolute;height:2px;background:#35cbd12e;box-shadow:0 0 5px #35cbd118;transform-origin:left center}
  .vt-city-road.major{height:4px;background:#5ce2e04c}
  .vt-city-label{position:absolute;color:#68dfe0aa;font:700 8px monospace;letter-spacing:1px;text-shadow:0 0 6px #2be1dc55}
  .vt-city-river{position:absolute;background:linear-gradient(90deg,#071a2b,#0b3550,#071a2b);border-left:1px solid #2b6b85;border-right:1px solid #2b6b85;opacity:.9}
  .vt-city-node{position:absolute;width:8px;height:8px;border-radius:50%;background:#2be1dc;border:2px solid #c8ffff;box-shadow:0 0 13px #2be1dc;z-index:4}
  .vt-controls .danger{display:none!important}
  .vt-controls{grid-template-columns:1fr 1fr!important}
  .vt-controls button:first-child{grid-column:1/-1}
  `;
  document.head.appendChild(style);

  function cityLayer(mapCanvas){
    if(!mapCanvas || mapCanvas.querySelector('.vt-city-layer')) return;
    const layer=document.createElement('div');layer.className='vt-city-layer';
    const blocks=[[6,18,10,9],[18,12,8,12],[29,19,12,8],[45,12,9,12],[57,20,10,8],[70,12,8,13],[81,22,11,9],[9,35,8,11],[20,31,12,9],[35,34,9,13],[47,30,8,9],[61,35,12,10],[76,32,8,13],[87,38,7,8],[7,52,12,9],[23,49,9,12],[34,53,12,8],[49,49,9,13],[64,51,10,8],[79,50,12,12],[88,61,7,9],[8,68,10,12],[22,65,11,9],[38,68,8,13],[51,64,12,9],[67,66,9,12],[80,70,12,8],[29,82,12,7],[57,82,11,7]];
    blocks.forEach(([x,y,w,h])=>{const b=document.createElement('i');b.className='vt-city-block';Object.assign(b.style,{left:x+'%',top:y+'%',width:w+'%',height:h+'%'});layer.appendChild(b)});
    [[52,28,2.5,15],[55,24,3,19],[60,31,2.2,12],[73,24,2.5,17],[41,40,2.5,13],[66,44,3,16]].forEach(([x,y,w,h])=>{const b=document.createElement('i');b.className='vt-city-tower';Object.assign(b.style,{left:x+'%',top:y+'%',width:w+'%',height:h+'%'});layer.appendChild(b)});
    const empire=document.createElement('i');empire.className='vt-city-landmark';Object.assign(empire.style,{left:'54%',top:'37%',width:'4%',height:'10%'});layer.appendChild(empire);
    const river=document.createElement('i');river.className='vt-city-river';Object.assign(river.style,{right:'4%',top:'3%',width:'10%',height:'94%',transform:'rotate(3deg)'});layer.appendChild(river);
    [[2,28,96,0,'major'],[2,46,94,0,'major'],[4,63,91,0,''],[8,79,85,0,''],[19,5,0,88,''],[36,5,0,91,'major'],[54,4,0,92,'major'],[72,5,0,90,''],[86,7,0,87,'major'],[4,21,84,28,''],[15,80,73,-34,''],[31,10,57,75,'']].forEach(([x,y,w,h,kind])=>{const r=document.createElement('i');r.className='vt-city-road '+kind;Object.assign(r.style,{left:x+'%',top:y+'%',width:(w||2)+'%',height:(h||2)+'%',transform:h?'rotate('+Math.atan2(h,w)*180/Math.PI+'deg)':'none'});layer.appendChild(r)});
    [['MIDTOWN',48,39],['TIMES SQ',51,45],['CENTRAL PARK',28,23],['BROOKLYN',62,75],['QUEENS',78,31],['LOWER MANHATTAN',38,72],['HARLEM',35,29],['HUDSON',7,54]].forEach(([t,x,y])=>{const l=document.createElement('span');l.className='vt-city-label';l.textContent=t;Object.assign(l.style,{left:x+'%',top:y+'%'});layer.appendChild(l)});
    [[47,43],[57,35],[68,57],[76,30],[33,68],[23,48],[82,70]].forEach(([x,y])=>{const n=document.createElement('i');n.className='vt-city-node';Object.assign(n.style,{left:x+'%',top:y+'%'});layer.appendChild(n)});
    mapCanvas.appendChild(layer);
  }
  function patchLiveTracker(){
    const map=document.querySelector('#vt-map .vt-map-canvas');
    if(map) cityLayer(map);
    const controls=document.querySelector('#vt-map')?.parentElement?.querySelector('.vt-controls');
    if(controls) controls.querySelectorAll('button').forEach(btn=>{if((btn.textContent||'').trim().toUpperCase()==='PAUSE')btn.remove()});
  }
  const observer=new MutationObserver(patchLiveTracker);
  observer.observe(document.body,{childList:true,subtree:true});
  window.addEventListener('load',patchLiveTracker);
  setTimeout(patchLiveTracker,300);setTimeout(patchLiveTracker,1000);setTimeout(patchLiveTracker,2500);
})();

/* Reference-matched Spider-Tech home map + post-OAuth workspace handoff. */
(function(){
const css=document.createElement('style');css.textContent=`
.vRetroPreview{position:relative}.vRetroPreviewHead b{color:#2be1dc}.vRetroPreviewMap{overflow:hidden;background:#071329 url('/assets/spider-retro-map.svg') center/cover;position:relative}.vHomeMapCanvas{position:absolute;inset:0;transform-origin:50% 50%;transition:transform .35s ease}.vHomeSignal{position:absolute;width:24px;height:24px;border-radius:50%;background:#ff4d32;border:3px solid #ffd1a1;box-shadow:0 0 0 9px #ff4d3228,0 0 28px #ff4d32;transition:left 1.1s ease,top 1.1s ease;z-index:5}.vHomeSignal:before,.vHomeSignal:after{content:"";position:absolute;inset:-15px;border:2px solid #ff4d32;border-radius:50%;animation:vHomePulse 1.7s infinite}.vHomeSignal:after{inset:-30px;animation-delay:.55s;opacity:.3}.vHomeMapHud{position:absolute;left:12px;top:12px;z-index:7;background:#07111ae8;border:1px solid #466b75;border-radius:8px;padding:9px 11px;color:#c8d7d8;font:9px/1.6 monospace}.vHomeMapHud b{color:#ff7058}.vHomeMapLegend{position:absolute;right:12px;top:12px;z-index:7;background:#07111ae8;border:1px solid #466b75;border-radius:8px;padding:8px 10px;color:#b9c8ca;font:9px/1.6 monospace}.vHomeMapZoom{position:absolute;right:12px;top:76px;z-index:8;display:flex;flex-direction:column;gap:4px}.vHomeMapZoom button{width:31px;height:31px;border:1px solid #477080;background:#071329e8;color:#eadfca;border-radius:6px;font-size:17px;font-weight:900;cursor:pointer}.vHomeMapZoom button:hover{border-color:#2be1dc;color:#2be1dc}.vHomeMapMetrics{position:absolute;left:0;right:0;bottom:0;height:43px;display:grid;grid-template-columns:1.8fr .7fr .8fr .8fr .7fr;background:#071014ed;border-top:1px solid #36565d;z-index:8}.vHomeMetric{padding:5px 8px;border-right:1px solid #36565d;color:#84999c;font:8px monospace}.vHomeMetric strong{display:block;color:#f0eadb;font-size:10px;margin-top:2px}.vHomeBars{display:flex;gap:2px;margin-top:3px}.vHomeBars i{height:6px;width:4px;background:#2be1dc}.vHomeBars i:nth-last-child(-n+3){opacity:.3}@keyframes vHomePulse{0%{transform:scale(.55);opacity:.9}80%,100%{transform:scale(1.35);opacity:0}}
`;
document.head.appendChild(css);
const route=[{x:58,y:48,lat:'40.7549',lon:'-73.9840',name:'MIDTOWN'},{x:54,y:43,lat:'40.7580',lon:'-73.9855',name:'TIMES SQUARE'},{x:57,y:57,lat:'40.7265',lon:'-73.9815',name:'EAST VILLAGE'},{x:73,y:36,lat:'40.7282',lon:'-73.7949',name:'QUEENS'},{x:67,y:72,lat:'40.6782',lon:'-73.9442',name:'BROOKLYN'}];let i=0,zoom=1,timer=null;
function enhance(){const map=document.querySelector('.vRetroPreviewMap');if(!map||map.dataset.enhanced)return;map.dataset.enhanced='1';map.innerHTML=`<div class="vHomeMapCanvas"><div class="vHomeSignal" id="v-home-signal" style="left:${route[0].x}%;top:${route[0].y}%"></div></div><div class="vHomeMapHud">SIGNAL <b>LIVE</b><br>CONFIDENCE <b>94%</b><br>MODE <b>COMMUNITY</b></div><div class="vHomeMapLegend">● ACTIVE SIGNAL<br>◆ ROUTE TRACE<br>○ NODE</div><div class="vHomeMapZoom"><button id="v-home-plus">+</button><button id="v-home-minus">−</button><button onclick="openTracker()">⌾</button></div><div class="vHomeMapMetrics"><div class="vHomeMetric">SIGNAL STRENGTH<div class="vHomeBars">${Array.from({length:16},(_,n)=>`<i style="opacity:${n<13?1:.3}"></i>`).join('')}</div></div><div class="vHomeMetric">ZOOM<strong id="v-home-zoom">1.0x</strong></div><div class="vHomeMetric">LAT<strong id="v-home-lat">${route[0].lat}</strong></div><div class="vHomeMetric">LON<strong id="v-home-lon">${route[0].lon}</strong></div><div class="vHomeMetric">VIEW<strong>CITY⌄</strong></div></div>`;document.getElementById('v-home-plus').onclick=()=>setZoom(.2);document.getElementById('v-home-minus').onclick=()=>setZoom(-.2);clearInterval(timer);timer=setInterval(move,3000)}
function setZoom(d){zoom=Math.max(.8,Math.min(2,zoom+d));const c=document.querySelector('.vHomeMapCanvas');if(c)c.style.transform='scale('+zoom+')';const z=document.getElementById('v-home-zoom');if(z)z.textContent=zoom.toFixed(1)+'x'}
function move(){i=(i+1)%route.length;const p=route[i],s=document.getElementById('v-home-signal');if(!s)return;s.style.left=p.x+'%';s.style.top=p.y+'%';const lat=document.getElementById('v-home-lat'),lon=document.getElementById('v-home-lon');if(lat)lat.textContent=p.lat;if(lon)lon.textContent=p.lon}
const observer=new MutationObserver(enhance);observer.observe(document.body,{childList:true,subtree:true});window.addEventListener('load',enhance);setTimeout(enhance,300);setTimeout(enhance,1200);

/* FINAL AUTH HANDOFF: runs after the main app and opens the AI workspace after OAuth. */
const SUPABASE_URL='https://dqqqagpsaaalsztblmsc.supabase.co';
const SUPABASE_KEY='sb_publishable_a5XQdHRe3daJPTfYnEMIRA_m-B5sksH';
let authClient=null;
function getAuthClient(){
  if(authClient)return authClient;
  if(!window.supabase||typeof window.supabase.createClient!=='function')throw new Error('Supabase browser client did not load');
  authClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  return authClient;
}
function showWorkspace(session){
  if(!session||!session.user)return;
  window.userInfo={...(window.userInfo||{}),id:session.user.id,email:session.user.email||''};
  const landing=document.getElementById('landing'),auth=document.getElementById('auth'),app=document.getElementById('app');
  if(landing)landing.style.display='none';
  if(auth)auth.style.display='none';
  if(app)app.style.display='block';
  const acct=document.getElementById('acct');if(acct)acct.textContent=session.user.email||'Workspace';
  const go=()=>{if(typeof window.home==='function'){try{window.home()}catch(e){console.error('Venom workspace render failed',e)}}};
  requestAnimationFrame(go);setTimeout(go,80);setTimeout(go,350);
}
async function finishAuth(){
  try{
    const c=getAuthClient();
    const {data,error}=await c.auth.getSession();
    if(error)throw error;
    if(data&&data.session){showWorkspace(data.session);return true}
    return false;
  }catch(e){console.error('Venom auth handoff:',e);const err=document.getElementById('err');if(err)err.textContent='AUTHENTICATED, BUT WORKSPACE COULD NOT OPEN · '+(e.message||e);return false}
}
window.login=async function(){
  const button=document.getElementById('google'),err=document.getElementById('err');
  if(button){button.disabled=true;button.textContent='CONNECTING TO GOOGLE…'}if(err)err.textContent='';
  try{
    const c=getAuthClient();
    const redirectTo=window.location.origin+'/';
    const {data,error}=await c.auth.signInWithOAuth({provider:'google',options:{redirectTo,queryParams:{prompt:'select_account'}}});
    if(error)throw error;
    if(data&&data.url)window.location.assign(data.url);
  }catch(e){console.error('Venom Google login:',e);if(err)err.textContent='GOOGLE SIGN-IN ERROR · '+(e.message||e);if(button){button.disabled=false;button.textContent='G  Continue with Google'}}
};
function installAuthListener(){
  try{
    const c=getAuthClient();
    c.auth.onAuthStateChange((event,session)=>{
      if(session&&(event==='INITIAL_SESSION'||event==='SIGNED_IN'||event==='TOKEN_REFRESHED'||event==='USER_UPDATED'))showWorkspace(session);
      if(event==='SIGNED_OUT'){const app=document.getElementById('app'),auth=document.getElementById('auth'),landing=document.getElementById('landing');if(app)app.style.display='none';if(auth)auth.style.display='block';if(landing)landing.style.display='none'}
    });
    finishAuth();
  }catch(e){console.error('Venom auth listener:',e)}
}
window.addEventListener('load',()=>setTimeout(installAuthListener,0));
setTimeout(installAuthListener,500);
})();

/* VENOM GPT — FINAL AUTH GUARANTEE V2 */
(()=>{
'use strict';
if(window.__VENOM_AUTH_GUARANTEE_V2__)return;window.__VENOM_AUTH_GUARANTEE_V2__=true;
const U='https://dqqqagpsaaalsztblmsc.supabase.co',K='sb_publishable_a5XQdHRe3daJPTfYnEMIRA_m-B5sksfH';
let sb;
const client=()=>sb||(sb=window.supabase.createClient(U,K,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,flowType:'pkce'}}));
const mark='venom-open-ai';
const showAI=()=>{
 const landing=document.getElementById('landing'),auth=document.getElementById('auth'),app=document.getElementById('app'),main=document.getElementById('main');
 if(landing)landing.style.display='none';if(auth)auth.style.display='none';if(app)app.style.display='block';if(main)main.style.display='block';document.body.classList.add('venom-ai-active');
};
const enterAI=async()=>{
 showAI();
 try{if(typeof window.applySession==='function'){const {data:{session}}=await client().auth.getSession();if(session)await window.applySession(session)}}catch(e){console.warn('[VENOM AUTH] session apply',e)}
 try{if(typeof window.venomRepairAI==='function')await window.venomRepairAI()}catch(e){console.warn('[VENOM AUTH] AI repair',e)}
 setTimeout(()=>{showAI();if(typeof window.venomOpenChat==='function')window.venomOpenChat();else if(typeof window.newChat==='function')window.newChat();else window.dispatchEvent(new CustomEvent('venom:open-ai'))},250);
};
window.login=async()=>{
 const button=document.getElementById('va-google')||document.getElementById('google');
 const err=document.getElementById('va-err')||document.getElementById('err');
 if(button){button.disabled=true;button.textContent='CONNECTING TO GOOGLE…'}
 sessionStorage.setItem(mark,'1');
 try{
  const {error}=await client().auth.signInWithOAuth({provider:'google',options:{redirectTo:window.location.origin+'/?venom_ai=1',queryParams:{prompt:'select_account'},skipBrowserRedirect:false}});
  if(error)throw error;
 }catch(e){sessionStorage.removeItem(mark);console.error('[VENOM AUTH]',e);if(err)err.textContent='GOOGLE SIGN-IN ERROR · '+(e?.message||String(e));if(button){button.disabled=false;button.textContent='G  Continue with Google'}}
};
async function check(){
 try{
  const c=client();
  const qs=new URLSearchParams(location.search);
  const wanted=qs.get('venom_ai')==='1'||sessionStorage.getItem(mark)==='1';
  const {data:{session}}=await c.auth.getSession();
  if(!session||!wanted)return;
  sessionStorage.removeItem(mark);
  showAI();
  if(history.replaceState)history.replaceState({},document.title,location.pathname||'/');
  await enterAI();
 }catch(e){console.error('[VENOM AUTH GUARANTEE]',e)}
}
window.addEventListener('load',()=>setTimeout(check,50));
document.addEventListener('DOMContentLoaded',()=>setTimeout(check,50),{once:true});
setTimeout(check,400);setTimeout(check,1200);
try{client().auth.onAuthStateChange((event,session)=>{if(session&&(event==='SIGNED_IN'||event==='INITIAL_SESSION'))setTimeout(check,60)})}catch(e){console.warn('[VENOM AUTH] listener',e)}
})();

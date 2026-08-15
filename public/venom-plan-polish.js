(()=>{
  const annual=()=>{
    if(typeof window.openPay!=='function')return;
    window.openPay();
    const modal=document.getElementById('vsePayment');
    if(!modal)return;
    const note=modal.querySelector('.vsePayBox .vseMuted');if(note)note.textContent='€230/year · save €10 vs twelve monthly payments.';
    const button=modal.querySelector('#vseRevolut');
    if(button){const replacement=button.cloneNode(true);replacement.textContent='CONTINUE WITH REVOLUT · €230/YEAR';button.replaceWith(replacement);replacement.onclick=async()=>{replacement.disabled=true;replacement.textContent='CREATING SECURE CHECKOUT…';try{const r=await fetch('/api/revolut-checkout',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({plan:'annual',currency:'EUR'})});const j=await r.json();if(!r.ok||!j.checkout_url)throw new Error(j.error||'Checkout unavailable');location.href=j.checkout_url}catch(e){replacement.disabled=false;replacement.textContent='CONTINUE WITH REVOLUT · €230/YEAR';alert(e.message)}}}
  };
  const wire=()=>{window.vseUpgrade=(plan)=>plan==='annual'?annual():(typeof window.openPay==='function'?window.openPay():null)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wire);else wire();
  new MutationObserver(wire).observe(document.documentElement,{childList:true,subtree:true});
})();
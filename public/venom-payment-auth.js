(()=>{
  if(window.__venomPaymentFetchPatched)return;window.__venomPaymentFetchPatched=true;
  const original=window.fetch.bind(window);
  window.fetch=async(input,init={})=>{
    const url=typeof input==='string'?input:input?.url||'';
    if(url.includes('/api/revolut-checkout')){
      try{
        const session=window.__venomSupabase?await window.__venomSupabase.auth.getSession():null;
        const token=session?.data?.session?.access_token;
        if(token){const headers=new Headers(init.headers||{});headers.set('Authorization','Bearer '+token);init={...init,headers}}
      }catch(_){}
    }
    return original(input,init);
  };
})();

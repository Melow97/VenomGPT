/* VENOM GPT WEB RESEARCH ROUTER — route freshness-sensitive prompts to web-enabled AI */
(()=>{
  'use strict';
  if(window.__venomWebResearchRouter)return;
  window.__venomWebResearchRouter=true;
  const native=window.fetch;
  const freshness=/\b(latest|today|tonight|yesterday|tomorrow|current|currently|right now|recent|recently|this week|this month|this year|news|breaking|price|prices|cost|stock|stocks|exchange rate|weather|forecast|score|scores|schedule|standings|release|released|version|update|updates|who is|what happened|look up|search for|find online|on the web|website|official site|opening hours|hours today)\b/i;
  function shouldBrowse(text){
    const t=String(text||'').trim();
    if(!t)return false;
    if(/^\s*(do not|don't|dont)\s+(browse|search|look online)/i.test(t))return false;
    return freshness.test(t)||/\bhttps?:\/\//i.test(t);
  }
  window.fetch=async function(input,init){
    try{
      const url=typeof input==='string'?input:input?.url||'';
      if(url.includes('/api/chat')&&init?.body){
        const body=JSON.parse(init.body);
        const messages=Array.isArray(body.messages)?body.messages:[];
        const last=[...messages].reverse().find(m=>m?.role==='user');
        body.web=shouldBrowse(last?.content);
        body.web_reason=body.web?'freshness-sensitive query':'standard chat';
        init={...init,body:JSON.stringify(body)};
      }
    }catch(e){console.warn('[VENOM WEB ROUTER]',e)}
    return native.call(this,input,init);
  };
})();

/* VENOM GPT WEB RESEARCH ROUTER — freshness routing + source presentation */
(()=>{
  'use strict';
  if(window.__venomWebResearchRouter)return;
  window.__venomWebResearchRouter=true;
  const native=window.fetch;
  const freshness=/\b(latest|today|tonight|yesterday|tomorrow|current|currently|right now|recent|recently|this week|this month|this year|news|breaking|price|prices|cost|stock|stocks|exchange rate|weather|forecast|score|scores|schedule|standings|release|released|version|update|updates|who is|what happened|look up|search for|find online|on the web|website|official site|opening hours|hours today)\b/i;
  function shouldBrowse(text){const t=String(text||'').trim();if(!t)return false;if(/^\s*(do not|don't|dont)\s+(browse|search|look online)/i.test(t))return false;return freshness.test(t)||/\bhttps?:\/\//i.test(t)}
  function withSources(reply,sources){const clean=(Array.isArray(sources)?sources:[]).filter(s=>s?.url).slice(0,8);if(!clean.length)return reply;const lines=clean.map((s,i)=>`${i+1}. ${s.title||s.url} — ${s.url}`).join('\n');return `${reply}\n\nSources\n${lines}`}
  window.fetch=async function(input,init){
    let shouldWeb=false;
    try{
      const url=typeof input==='string'?input:input?.url||'';
      if(url.includes('/api/chat')&&init?.body){
        const body=JSON.parse(init.body);
        const messages=Array.isArray(body.messages)?body.messages:[];
        const last=[...messages].reverse().find(m=>m?.role==='user');
        shouldWeb=shouldBrowse(last?.content);
        body.web=shouldWeb;
        body.web_reason=shouldWeb?'freshness-sensitive query':'standard chat';
        init={...init,body:JSON.stringify(body)};
      }
    }catch(e){console.warn('[VENOM WEB ROUTER]',e)}
    const response=await native.call(this,input,init);
    if(!shouldWeb||!response?.ok)return response;
    try{
      const data=await response.clone().json();
      if(data?.reply&&Array.isArray(data.sources)&&data.sources.length){
        data.reply=withSources(data.reply,data.sources);
        return new Response(JSON.stringify(data),{status:response.status,statusText:response.statusText,headers:new Headers(response.headers)});
      }
    }catch(e){console.warn('[VENOM WEB SOURCES]',e)}
    return response;
  };
})();

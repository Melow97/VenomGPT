/* VENOM GPT FINAL LOADER — approved V3 reference UI + V4 premium design system + hardened auth */
(function(){
  function load(src,attr,next){
    if(document.querySelector('script['+attr+']')){next&&next();return;}
    const s=document.createElement('script');s.src=src;s.setAttribute(attr,'1');s.onload=next||null;s.onerror=e=>console.error('[VENOM LOAD]',src,e);document.body.appendChild(s);
  }
  load('/ui-final.js?v=20260815-6','data-venom-final-ui',()=>
    load('/ui-v2.js?v=20260815-6','data-venom-v2',()=>
      load('/auth-hardening.js?v=20260815-6','data-venom-auth-hardening',()=>
        load('/ui-v3.js?v=20260815-6','data-venom-v3',()=>
          load('/design-v4.js?v=20260815-6','data-venom-design-v4',()=>{
            if(document.getElementById('app')?.style.display==='block'&&typeof window.home==='function')setTimeout(()=>window.home(),140);
          })
        )
      )
    )
  );
})();

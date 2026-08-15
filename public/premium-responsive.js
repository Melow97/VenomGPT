/* VENOM GPT — premium responsive shell
   Keeps the workspace balanced across monitors, tablets and phones. */
(function(){
  'use strict';
  const ID='venom-premium-responsive-css';
  if(document.getElementById(ID))return;
  const style=document.createElement('style');
  style.id=ID;
  style.textContent=`
    html,body{width:100%;max-width:100%;overflow-x:hidden}
    #app{min-height:100dvh;background:#070a0b}
    #app .appShell{min-height:100dvh;width:100%;max-width:100%;overflow:hidden}
    #app .layout{display:flex;min-height:calc(100dvh - 64px);width:100%;max-width:100%;overflow:hidden}
    #app .main{min-width:0;flex:1;overflow:auto;scroll-behavior:smooth}
    #app .top{height:64px;min-height:64px;box-sizing:border-box;padding:0 clamp(14px,2.2vw,30px);gap:12px}
    #app .top .brand{font-size:clamp(18px,1.8vw,24px);white-space:nowrap}
    #app .top .spacer{flex:1;min-width:8px}
    #app .account{max-width:26vw;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .vChatPage{width:min(1440px,100%);box-sizing:border-box;margin:0 auto;padding:clamp(18px,3vw,38px) clamp(14px,3vw,42px) 40px}
    .vChatTop{max-width:1380px;margin-left:auto;margin-right:auto}
    .vChatGrid{width:100%;max-width:1380px;margin:0 auto;grid-template-columns:minmax(0,1fr) clamp(230px,22vw,300px);align-items:stretch}
    .vConversation{min-width:0;min-height:min(760px,calc(100dvh - 190px));height:calc(100dvh - 190px);max-height:900px}
    .vMessages{min-height:0;overscroll-behavior:contain}
    .vActivity{min-width:0;height:100%}
    .vComposer{width:auto;max-width:1100px;margin-left:auto;margin-right:auto}
    .vHint{padding-bottom:12px}
    .vmsgBubble{overflow-wrap:anywhere}
    .vTopActions{flex-wrap:wrap}
    .vTopActions button,.vNewBtn{min-height:42px}
    .vHistory{width:min(900px,100%);margin:0 auto}
    .vHistoryRow{min-height:60px;box-sizing:border-box}
    .vms-sidebar{height:calc(100dvh - 64px);min-height:calc(100dvh - 64px);position:sticky;top:0;overflow-y:auto;overflow-x:hidden;scrollbar-width:thin}
    .vms-sidebar .vms-nav button{min-height:42px}
    .vms-connect-panel{max-height:min(70dvh,620px);overflow:auto}
    @media (min-width:1500px){
      .vChatGrid{grid-template-columns:minmax(0,1fr) 310px}
      .vChatPage{padding-left:48px;padding-right:48px}
    }
    @media (max-width:1100px) and (min-width:701px){
      .vms-sidebar{width:82px;flex-basis:82px;padding-left:8px;padding-right:8px}
      .vms-brand strong{font-size:18px}.vms-brand span,.vms-brand small,.vms-nav button span:last-child,.vms-section,.vms-profile>div:not(.vms-avatar),.vms-plus span:last-child{display:none}
      .vms-nav button{justify-content:center;padding:11px 8px}
      .vms-plus{margin-left:0;margin-right:0}
      .vChatGrid{grid-template-columns:minmax(0,1fr) 235px}
      .vChatPage{padding-left:22px;padding-right:22px}
      .vConversation{height:calc(100dvh - 175px)}
    }
    @media (max-width:700px){
      #app .top{height:58px;min-height:58px;padding:0 12px}
      #app .layout{min-height:calc(100dvh - 58px)}
      #app .account,#app .badge{display:none}
      #app .top .topbtn{min-width:40px;min-height:40px}
      .vms-sidebar{width:64px;flex-basis:64px;height:calc(100dvh - 58px);min-height:calc(100dvh - 58px);padding:10px 6px}
      .vms-brand{padding:6px 4px 12px;text-align:center}
      .vms-brand strong{font-size:16px;letter-spacing:-.08em}.vms-brand span{font-size:10px}.vms-brand small{display:none}
      .vms-nav button{justify-content:center;min-height:46px;padding:10px 6px;border-radius:10px}
      .vms-nav button span:last-child,.vms-section,.vms-profile>div:not(.vms-avatar),.vms-plus span:last-child{display:none}
      .vms-plus{margin:8px 0 0;padding:10px 6px!important;min-height:46px}
      .vms-connect-panel{left:72px;right:10px;bottom:10px;width:auto;max-height:72dvh}
      .vChatPage{padding:14px 10px 20px;min-height:calc(100dvh - 58px)}
      .vChatTop{gap:10px;margin-bottom:12px;align-items:center}
      .vEyebrow{font-size:9px;letter-spacing:1.2px}.vChatTop h1{font-size:25px;margin-top:4px}
      .vTopActions{gap:6px}.vTopActions button,.vNewBtn{padding:9px 10px;font-size:10px;border-radius:10px;min-height:38px}
      .vTopActions #vHistoryBtn{display:none}
      .vChatGrid{display:block;min-height:0}
      .vConversation{height:calc(100dvh - 142px);min-height:520px;max-height:none;border-radius:14px}
      .vConversationBar{padding:11px 13px;font-size:9px}
      .vConversationBar span:last-child{display:none}
      .vMessages{padding:16px 12px}
      .vWelcome{margin:10px 0 18px;padding:14px;gap:11px;border-radius:13px}.vSpiderBadge{width:36px;height:36px;border-radius:10px;font-size:18px}.vWelcome strong{font-size:16px}.vWelcome p{font-size:12px}
      .vmsg{max-width:92%;margin-bottom:14px}.vmsgBubble{font-size:14px;line-height:1.55;padding:11px 13px;border-radius:13px}.vmsgRole{font-size:9px}
      .vThinking{margin:0 10px 8px;padding:9px 11px;font-size:11px}
      .vComposer{margin:0 10px;border-radius:14px;padding:7px}.vComposer textarea{font-size:15px;min-height:23px;padding:9px}.vIcon,.vSend{width:38px;height:38px;border-radius:10px}.vHint{font-size:9px;padding:7px}
      .vActivity{display:none}
      .vHistory{gap:7px}.vHistoryRow{padding:12px;min-height:54px}
    }
    @media (max-width:380px){
      .vms-sidebar{width:58px;flex-basis:58px}.vms-nav button{min-height:42px}.vChatPage{padding-left:7px;padding-right:7px}.vChatTop h1{font-size:22px}.vConversation{height:calc(100dvh - 136px)}.vComposer{margin-left:6px;margin-right:6px}.vComposer .vIcon:nth-of-type(2){display:none}
    }
    @media (prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;transition:none!important}}
  `;
  document.head.appendChild(style);
})();
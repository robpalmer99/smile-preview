var bixgrowUrl = 'https://track.bixgrow.com';
var myDataSetting = null;
var gbRefParam = bgGetParameterByName('bg_ref');
var bgGroup = 0;
if (gbRefParam) {
    if (gbRefParam.indexOf(':') != -1) {
        let tempgbRefParam = gbRefParam.split(':');
        gbRefParam = tempgbRefParam[1];
        bgGroup = tempgbRefParam[0];
    }
}


let bgAdParameter = bgGetParameterByName('ad_id');
if(bgAdParameter){
    let xhttp = new XMLHttpRequest;
    xhttp.open("POST", bixgrowUrl+"/api/referral/friends/reward", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    let data = {
      shop : Shopify.shop,
      advocate_id:bgAdParameter,
      url: window.location.href,
      visitor_id: bgGetCookie('bgrf_visitor_id'),
      is_same_browser: bgGetCookie('bg_is_same_browser') ? true : false,
      locale: Shopify.locale
    }
    xhttp.send(JSON.stringify(data));
    xhttp.onload = function() {
      if (this.status === 200) {
        let obj = JSON.parse(this.responseText);
        if(Object.keys(obj).length > 0)
        {
          bgSetCookie('bgrf_visitor_id', obj.visitor_id, 30);
          myDataSetting = obj;
          if (obj.discount?.code) {
            createFriendRewardPopup(obj);
            autoAppliedCoupon(obj.discount.code);
          } else {
            createBeforeRedemFriendRewardPopup(obj);
          }
        }
      } else if (this.status == 400) {
        let errorObj = JSON.parse(this.responseText);
        if (errorObj.status == "INVALID_REFERRAL_LINK") {
          createInvalidReferralLinkPopup(errorObj.data);
        }
      }
    }
}

function createFriendRewardPopup(obj){
    let bgHead = document.head || document.getElementsByTagName('head')[0];
    let myBgModal = document.getElementById('myBgModal');
    if(myBgModal){
      myBgModal.remove();
    }
   let referralDiv = document.createElement("div");
   referralDiv.id = "myBgModal";
   referralDiv.classList.add('bg-modal');
   document.body.appendChild(referralDiv);
   let bgStyle = document.createElement("style");
   let bgCss = `.bg-modal{
    display:none;
    position:fixed;
    z-index:9999;
    padding-top:100px;
    left:0;
    top:0;
    width:100%;
    height:100%;
    overflow:scroll;
    background-color: rgb(0,0,0,0.25);
    -webkit-animation-name: bganimatefade;
    -webkit-animation-duration: 0.4s;
    animation-name: bganimatefade;
    animation-duration: 0.4s
   }
   .bg-modal-content{
    width: 500px;
    background: ${ obj.page_settings.appearance.background || '#fefefe'};
    margin:auto;
    padding:30px 24px 20px 25px;
    border-radius:16px;
    text-align:center;
    color:#1B283F;
    position: relative;
   }
   .bg-heading{
    font-size:20px;
    font-weight:700;
    margin-bottom: 8px;
    color: ${obj.page_settings.appearance.text || 'rgb(0, 0, 0)'}
   }
   .bg-content{
    font-size:14px;
    margin-bottom:24px;
    color: ${obj.page_settings.appearance.text || 'rgb(0, 0, 0)'}
   }
   .bg-input-wrapper{
    margin-bottom: 24px;
    position:relative;
    cursor:pointer;
   }
   .bg-input-wrapper .bg-input{
    padding:16px 18px;
    height:56px;
    width: 100%;
    background:#F7F7F7;
    border: 2px dashed #81868B;
    box-shadow:none;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    cursor: pointer;
    font-size:14px;
   }
   .bg-input:focus{
    outline: 0;
   }
   .bg-btn{
    border: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    white-space: nowrap;
    border-radius: 4px;
    width: 100%;
    padding: 10px 16px;
    color: rgba(255, 255, 255, 1);
    background: #1B283F;
    line-height:20px;
    font-size:14px;
    cursor:pointer;
   }
   .bg-btn-dark{
    background: ${obj.page_settings.appearance.button.background || '#1B283F' };
    color: ${obj.page_settings.appearance.button.text};
   }
   .bg-input-wrapper::after{
    content: attr(data-copy);
    position: absolute;
    display: flex;
    align-items: center;
    right: 18px;
    top: 0;
    height: 100%;
    font-size: 14px;
    color:#036ADA;
   }
   .bg-close{
    position:absolute;
    top:18px;
    right:21px;
    cursor:pointer;
   }
   .bg-powered-by-container{
    text-align: center;
    margin-bottom: 7px;
  }
  .bg-powered-by-text{
      color: #ffff;
      padding: 4px 19px;
      font-size: 14px;
      background: rgba(0,0,0,.15);
      font-weight: 600;
      border-radius: 15px;
      text-decoration: none;
  }
  @-webkit-keyframes bganimatefade {
    from {opacity:0} 
    to {opacity:1}
  }
  
  @keyframes bganimatefade {
    from {opacity:0}
    to {opacity:1}
  }
  .bg-discount-expired{
    color: #81868b;
    text-align: center;
    margin-top:5px;
    font-size:13px;
  }
  @media (max-width: 600px) {
    .bg-modal-content{
      width: 100%;
    }
  }
   `;


   bgStyle.type = 'text/css';
 if (bgStyle.styleSheet){
   bgStyle.styleSheet.cssText = css;
 } else {
  bgStyle.appendChild(document.createTextNode(bgCss));
 }
 bgHead.appendChild(bgStyle);
 let bgModalContent = `
 ${!obj.page_settings.appearance.is_hide_brand_bixgrow?`<div class="bg-powered-by-container">
 <span class="bg-powered-by-text">Powered by BixGrow</span>
 </div>`:''}
 <div class="bg-modal-content">
 <svg id="bg-close" class="bg-close" style="width:12px;height:12px" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
<path d="M7.06045 5.99999L11.7803 1.28068C12.0732 0.987705 12.0732 0.512692 11.7803 0.219735C11.4873 -0.0732451 11.0123 -0.0732451 10.7193 0.219735L5.99999 4.93953L1.28068 0.219735C0.987705 -0.0732451 0.512692 -0.0732451 0.219735 0.219735C-0.0732217 0.512716 -0.0732451 0.987728 0.219735 1.28068L4.93953 5.99999L0.219735 10.7193C-0.0732451 11.0123 -0.0732451 11.4873 0.219735 11.7803C0.512716 12.0732 0.987728 12.0732 1.28068 11.7803L5.99999 7.06045L10.7193 11.7803C11.0123 12.0732 11.4873 12.0732 11.7802 11.7803C12.0732 11.4873 12.0732 11.0123 11.7802 10.7193L7.06045 5.99999Z" fill="#1B283F"/>
</svg>
  <div class="bg-heading">${obj.page_settings.content.coupon_display_page.headline}</div>
  <div class="bg-content">${obj.page_settings.content.coupon_display_page.description}</div>
  <div id="bg-input-wrapper" class="bg-input-wrapper" data-copy="Copy">
  <input id="bg-input" class="bg-input" readonly value="${obj.discount.code}">
  </div>
  <button type="button" id="bg-btn-shop-now" class="bg-btn bg-btn-dark">${obj.page_settings.content.coupon_display_page.button}</button>
  ${obj.discount.price_rule.ends_at_time?`<div class="bg-discount-expired">${obj.discount.price_rule.ends_at_time} ${detectDateFormat(obj.discount.price_rule.ends_at)}</div>`:''}
 </div>`;
referralDiv.insertAdjacentHTML('beforeend',bgModalContent);
let bgClose = document.getElementById('bg-close');
bgClose.addEventListener('click',function($event){
  referralDiv.style.display = "none";
})
let myBtn = document.getElementById('bg-btn-shop-now');
myBtn.addEventListener('click',function(){
  referralDiv.style.display = "none";
});
let bgInputWrapper = document.getElementById('bg-input-wrapper');
bgInputWrapper.addEventListener('click',function($event){
  let bgInput = document.getElementById('bg-input');
  bgInput.select();
  document.execCommand('copy');
  bgInputWrapper.setAttribute('data-copy','Copied!');
  setTimeout(() => {
    bgInputWrapper.setAttribute('data-copy','Copy');
  }, 1500);

})
referralDiv.style.display = 'block';
}
function autoAppliedCoupon(discountCode){
  let couponCodePath = encodeURI("/discount/" + discountCode);
  couponCodePath = couponCodePath.replace("#", "%2523");
  let iframeBixgrow = document.createElement('iframe');
  iframeBixgrow.style.cssText = 'height: 0; width: 0; display: none;';
  iframeBixgrow.src = couponCodePath;
  iframeBixgrow.innerHTML = 'Your browser does not support iframes';
  let app = document.querySelector('body');
  app.prepend(iframeBixgrow);
}


function createInvalidReferralLinkPopup(obj) {
  let bgHead = document.head || document.getElementsByTagName("head")[0];
  let myBgModal = document.getElementById("myBgModal");
  if (myBgModal) {
    myBgModal.remove();
  }
  let referralDiv = document.createElement("div");
  referralDiv.id = "myBgModal";
  referralDiv.classList.add("bg-modal");
  document.body.appendChild(referralDiv);
  let bgStyle = document.createElement("style");
  let bgCss = `.bg-modal{
    display:none;
    position:fixed;
    z-index:9999;
    padding-top:100px;
    left:0;
    top:0;
    width:100%;
    height:100%;
    overflow:scroll;
    background-color: rgb(0,0,0,0.25);
    -webkit-animation-name: bganimatefade;
    -webkit-animation-duration: 0.4s;
    animation-name: bganimatefade;
    animation-duration: 0.4s
   }
   .bg-modal-content{
    width: 500px;
    background: ${obj.page_settings.appearance.background || "#fefefe"};
    margin:auto;
    padding:30px 24px 20px 25px;
    border-radius:16px;
    text-align:center;
    color:#1B283F;
    position: relative;
    width: 600px;
    border-radius: 0px;
    padding: 30px 40px;
   }
   .bg-heading{
    font-size:20px;
    font-weight:700;
    margin-bottom: 15px;
    color: ${obj.page_settings.appearance.text || "rgb(0, 0, 0)"};
    font-size: 38px;
    font-weight: 650;
    line-height: normal;
   }
   .bg-content{
    font-size:14px;
    margin-bottom:24px;
    color: ${obj.page_settings.appearance.text || "rgb(0, 0, 0)"};
    font-size: 21px;
    font-weight: 450;
    line-height: normal;
   }

   .bg-btn{
    border: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    white-space: nowrap;
    border-radius: 4px;
    width: 100%;
    padding: 13px 16px;
    color: rgba(255, 255, 255, 1);
    background: #1B283F;
    line-height:normal;
    font-size:21px;
    cursor:pointer;
   }
   .bg-btn-dark{
    background-color: ${obj.page_settings.appearance.button.background || "#1B283F"}!important;
    color: ${obj.page_settings.appearance.button.text};
   }

   .bg-close{
    position:absolute;
    top:18px;
    right:21px;
    cursor:pointer;
   }
   .bg-powered-by-container{
    text-align: center;
    margin-bottom: 7px;
  }

  @-webkit-keyframes bganimatefade {
    from {opacity:0}
    to {opacity:1}
  }

  @keyframes bganimatefade {
    from {opacity:0}
    to {opacity:1}
  }
  @media (max-width: 600px) {
    .bg-modal-content{
      width: 100%;
      border-radius: 0;
      padding:20px;
    }
    .bg-heading{
      font-size: 30px;
    }
    .bg-content{
      font-size: 18px;
    }
    .bg-btn{
      font-size: 18px;
    }
  }
   `;

  bgStyle.type = "text/css";
  if (bgStyle.styleSheet) {
    bgStyle.styleSheet.cssText = css;
  } else {
    bgStyle.appendChild(document.createTextNode(bgCss));
  }
  bgHead.appendChild(bgStyle);
  let bgModalContent = `
 <div class="bg-modal-content">
 <svg id="bg-close" class="bg-close" style="width:12px;height:12px" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
<path d="M7.06045 5.99999L11.7803 1.28068C12.0732 0.987705 12.0732 0.512692 11.7803 0.219735C11.4873 -0.0732451 11.0123 -0.0732451 10.7193 0.219735L5.99999 4.93953L1.28068 0.219735C0.987705 -0.0732451 0.512692 -0.0732451 0.219735 0.219735C-0.0732217 0.512716 -0.0732451 0.987728 0.219735 1.28068L4.93953 5.99999L0.219735 10.7193C-0.0732451 11.0123 -0.0732451 11.4873 0.219735 11.7803C0.512716 12.0732 0.987728 12.0732 1.28068 11.7803L5.99999 7.06045L10.7193 11.7803C11.0123 12.0732 11.4873 12.0732 11.7802 11.7803C12.0732 11.4873 12.0732 11.0123 11.7802 10.7193L7.06045 5.99999Z" fill="#1B283F"/>
</svg>
  <div class="bg-heading">${obj.page_settings.content.headline}</div>
  <div class="bg-content">${obj.page_settings.content.description}</div>
  <button type="button" id="bg-btn-shop-now" class="bg-btn bg-btn-dark">${obj.page_settings.content.button}</button>
 </div>`;
  referralDiv.insertAdjacentHTML("beforeend", bgModalContent);
  let bgClose = document.getElementById("bg-close");
  bgClose.addEventListener("click", function ($event) {
    referralDiv.style.display = "none";
  });
  let myBtn = document.getElementById("bg-btn-shop-now");
  myBtn.addEventListener("click", function () {
    referralDiv.style.display = "none";
  });
  referralDiv.style.display = "block";
}

function createBeforeRedemFriendRewardPopup(obj) {
  let bgHead = document.head || document.getElementsByTagName("head")[0];
  let myBgModal = document.getElementById("myBgModal");
  if (myBgModal) {
    myBgModal.remove();
  }
  let referralDiv = document.createElement("div");
  referralDiv.id = "myBgModal";
  referralDiv.classList.add("bg-modal");
  document.body.appendChild(referralDiv);
  let bgStyle = document.createElement("style");
  let bgCss = `.bg-modal{
  display:none;
  position:fixed;
  z-index:9999;
  padding-top:100px;
  left:0;
  top:0;
  width:100%;
  height:100%;
  overflow:scroll;
  background-color: rgb(0,0,0,0.25);
  -webkit-animation-name: bganimatefade;
  -webkit-animation-duration: 0.4s;
  animation-name: bganimatefade;
  animation-duration: 0.4s
 }
 .bg-modal-content{
  width: 500px;
  background: ${obj.page_settings.appearance.background || "#fefefe"};
  margin:auto;
  padding:30px 24px 20px 25px;
  border-radius:16px;
  text-align:center;
  color:#1B283F;
  position: relative;
  width: 600px;
  border-radius: 0px;
  padding: 30px 40px;
 }
 .bg-heading{
  font-size:20px;
  font-weight:700;
  margin-bottom: 15px;
  color: ${obj.page_settings.appearance.text || "rgb(0, 0, 0)"};
  font-size: 38px;
  font-weight: 650;
  line-height: normal;
 }
 .bg-content{
  font-size:14px;
  margin-bottom:24px;
  color: ${obj.page_settings.appearance.text || "rgb(0, 0, 0)"};
  font-size: 21px;
  font-weight: 450;
  line-height: normal;
 }
 .bg-input-wrapper{
  margin-bottom: 18px;
  position:relative;
  cursor:pointer;
 }
 .bg-input-wrapper .bg-input{
  padding:16px 18px;
  height:50px;
  width: 100%;
  background:#F7F7F7;
  border: 1px solid #81868B;
  box-shadow:none;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  font-size:18px;
  line-height: normal;
 }
 .bg-input-wrapper::after{
  content: attr(data-copy);
  position: absolute;
  display: flex;
  align-items: center;
  right: 18px;
  top: 0;
  height: 100%;
  font-size: 14px;
  color:#036ADA;
 }
 .bg-input:focus{
  outline: 0;
 }
 .bg-btn{
  border: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  white-space: nowrap;
  border-radius: 4px;
  width: 100%;
  padding: 13px 16px;
  color: rgba(255, 255, 255, 1);
  background: #1B283F;
  line-height:normal;
  font-size:21px;
  cursor:pointer;
 }
 .bg-btn-dark{
  background-color: ${obj.page_settings.appearance.button.background || "#1B283F"}!important;
  color: ${obj.page_settings.appearance.button.text};
 }

 .bg-close{
  position:absolute;
  top:18px;
  right:21px;
  cursor:pointer;
 }
 .bixgrow-spinner {
  display: none;
  width: 20px;
  height: 20px;
  border: 3px solid #FFF;
  border-bottom-color: transparent;
  border-radius: 50%;
  box-sizing: border-box;
  animation: rotation 0.5s linear infinite;
 }

 @keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
 }

 .bg-error-message{
  color:#d72c0d;
  font-size:12px;
  margin-top: 2px;
 }
 .bg-d-none{
  display: none !important;
 }
 .bg-text-left{
  text-align: left;
 }
 .bg-border-error{
  border: 1px solid #d72c0d !important;
 }
 .bixgrow-loading .bixgrow-spinner {
  display: inline-block;
 }
 .bixgrow-loading .bixgrow-button-text {
  display:none;
 }
 .bg-disabled{
  pointer-events: none !important;
 }
 .bg-checkbox{
  display: flex;
  align-items: center;
  gap: 3px;
  cursor: pointer;
  justify-content: center;
  margin-bottom: 18px;
 }
 .bg-checkbox__input{
  width: 20px !important;
  height: 20px !important;
  cursor: pointer;
 }
 .bg-checkbox__label{
  font-size: 13px;
  user-select: none;
 }
 .bg-checkbox--small .bg-checkbox__label{
  font-size: 12px !important;
 }
 .bg-checkbox--small .bg-checkbox__input{
  width: 16px !important;
  height: 16px !important;
  cursor: pointer;
 }
 .bg-powered-by-container{
  text-align: center;
  margin-bottom: 7px;
}
.bg-powered-by-text{
    color: #ffff;
    padding: 4px 19px;
    font-size: 14px;
    background: rgba(0,0,0,.15);
    font-weight: 600;
    border-radius: 15px;
    text-decoration: none;
}

@-webkit-keyframes bganimatefade {
  from {opacity:0}
  to {opacity:1}
}

@keyframes bganimatefade {
  from {opacity:0}
  to {opacity:1}
}
.bg-discount-expired{
  color: #81868b;
  text-align: center;
  margin-top:5px;
  font-size:13px;
}
@media (max-width: 600px) {
  .bg-modal-content{
    width: 100%;
    border-radius: 0;
    padding:20px;
  }
  .bg-heading{
    font-size: 30px;
  }
  .bg-content{
    font-size: 18px;
  }
  .bg-btn{
    font-size: 18px;
  }
}
 `;

  bgStyle.type = "text/css";
  if (bgStyle.styleSheet) {
    bgStyle.styleSheet.cssText = css;
  } else {
    bgStyle.appendChild(document.createTextNode(bgCss));
  }
  bgHead.appendChild(bgStyle);
  let bgModalContent = `
${
  !obj.page_settings.appearance.is_hide_brand_bixgrow
    ? `<div class="bg-powered-by-container">
<span class="bg-powered-by-text">Powered by BixGrow</span>
</div>`
    : ""
}
<div class="bg-modal-content">
<svg id="bg-close" class="bg-close" style="width:12px;height:12px" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
<path d="M7.06045 5.99999L11.7803 1.28068C12.0732 0.987705 12.0732 0.512692 11.7803 0.219735C11.4873 -0.0732451 11.0123 -0.0732451 10.7193 0.219735L5.99999 4.93953L1.28068 0.219735C0.987705 -0.0732451 0.512692 -0.0732451 0.219735 0.219735C-0.0732217 0.512716 -0.0732451 0.987728 0.219735 1.28068L4.93953 5.99999L0.219735 10.7193C-0.0732451 11.0123 -0.0732451 11.4873 0.219735 11.7803C0.512716 12.0732 0.987728 12.0732 1.28068 11.7803L5.99999 7.06045L10.7193 11.7803C11.0123 12.0732 11.4873 12.0732 11.7802 11.7803C12.0732 11.4873 12.0732 11.0123 11.7802 10.7193L7.06045 5.99999Z" fill="#1B283F"/>
</svg>
<div id="before-redeem">
<div class="bg-heading">${
    obj.page_settings.content.coupon_display_page.before_redeem_headline
  }</div>
<div class="bg-content">${
    obj.page_settings.content.coupon_display_page.before_redeem_description
  }</div>
<div class="bg-input-wrapper">
<input id="bg-input" class="bg-input" placeholder="${
    obj.page_settings.content.coupon_display_page.before_redeem_your_email
  }">
     <div id="bg-before-redeem-friend-reward-error-text" class="bg-error-message bg-text-left bg-d-none">${
       obj.page_settings.content.coupon_display_page.email_error_message
     }</div>
</div>
${obj.enable_marketing_consent_request == 1 ? `<label class="bg-checkbox">
<input type="checkbox" id="bgMyCheckbox" class="bg-checkbox__input">
<span class="bg-checkbox__label">${obj.marketing_consent_text}</span>
</label>` : ''}

<button type="button"  id="bg-clainm-discount-btn" onclick="handleClaimDiscount()"  class="bg-btn bg-btn-dark" style="display:flex;align-items:center;justify-content:center;">
<span class="bixgrow-button-text">  ${
    obj.page_settings.content.coupon_display_page.before_redeem_button
  }</span>
<span class="bixgrow-spinner"></span>
</button>
</div>

<div id="after-redeem" class="bg-d-none">
<div class="bg-heading">${
    obj.page_settings.content.coupon_display_page.headline
  }</div>
  <div class="bg-content">${
    obj.page_settings.content.coupon_display_page.description
  }</div>
  <div id="bg-input-wrapper" class="bg-input-wrapper" data-copy="${obj.page_settings.content.coupon_display_page.copy}">
  <input id="bg-after-redeem-input" class="bg-input" readonly value="" style="border: 2px dashed #81868B;">
  </div>
  <button type="button" id="bg-btn-shop-now" class="bg-btn bg-btn-dark">${
    obj.page_settings.content.coupon_display_page.button
  }</button>

</div>
</div>`;
  referralDiv.insertAdjacentHTML("beforeend", bgModalContent);
  let bgClose = document.getElementById("bg-close");
  bgClose.addEventListener("click", function ($event) {
    referralDiv.style.display = "none";
  });

  let myBtn = document.getElementById("bg-btn-shop-now");
  myBtn.addEventListener("click", function () {
    referralDiv.style.display = "none";
  });
  let bgInputWrapper = document.getElementById("bg-input-wrapper");
  bgInputWrapper.addEventListener("click", function ($event) {
    let bgInput = document.getElementById("bg-after-redeem-input");
    bgInput.select();
    document.execCommand("copy");
    bgInputWrapper.setAttribute("data-copy", obj.page_settings.content.coupon_display_page.copied);
    setTimeout(() => {
      bgInputWrapper.setAttribute("data-copy", obj.page_settings.content.coupon_display_page.copy);
    }, 1500);
  });
  referralDiv.style.display = "block";
}

async function handleClaimDiscount() {
  const advocateId = myDataSetting.advocate_id;
  const emailErrorMessage =
    myDataSetting.page_settings.content.coupon_display_page.email_error_message;
  const referralInvalidMessage =
    myDataSetting.page_settings.content.coupon_display_page.referral_invalid;

  const redeemBtn = document.getElementById("bg-clainm-discount-btn");
  const emailInputElement = document.getElementById("bg-input");
  const emailInput = emailInputElement.value.trim();
  const checkBox = document.getElementById("bgMyCheckbox");
  const checkBoxValue = checkBox ? (checkBox.checked ? 1 : 0) : 0;

  const errorNote = document.getElementById(
    "bg-before-redeem-friend-reward-error-text"
  );

  if (!validateEmail(emailInput)) {
    errorNote.textContent = emailErrorMessage;
    errorNote.classList.remove("bg-d-none");
    emailInputElement.classList.add("bg-border-error");
    return;
  } else {
    errorNote.classList.add("bg-d-none");
    emailInputElement.classList.remove("bg-border-error");
  }

  redeemBtn.classList.add("bg-disabled", "bixgrow-loading");

  const payload = {
    shop: Shopify.shop,
    email: emailInput,
    visitor_id: bgGetCookie("bgrf_visitor_id"),
    advocate_id: advocateId,
    enable_marketing_consent_request: checkBoxValue
  };

  try {
    const responseData = await bgReferralUseFetch(
      `${bixgrowUrl}/api/referral/friends/discount`,
      "POST",
      payload,
      { "Content-Type": "application/json", Accept: "application/json" }
    );
    if (responseData) {
      myDataSetting.discount = responseData.discount;
      myDataSetting.share_coupon = responseData.share_coupon;
      document.getElementById("bg-after-redeem-input").value =
        responseData.discount.code;
      document.getElementById("before-redeem").classList.add("bg-d-none");
      document.getElementById("after-redeem").classList.remove("bg-d-none");
      errorNote.classList.add("bg-d-none");
      emailInputElement.classList.remove("bg-border-error");
      redeemBtn.classList.remove("bg-disabled", "bixgrow-loading");
      autoAppliedCoupon(responseData.discount.code);
    }
  } catch (error) {
    if (error?.status == 422 && error.message == "referral_link_invalid") {
      errorNote.textContent = referralInvalidMessage;
      errorNote.classList.remove("bg-d-none");
      emailInputElement.classList.add("bg-border-error");
      redeemBtn.classList.remove("bg-disabled", "bixgrow-loading");
    }
  }
}

function validateEmail(emailValue) {
  let bixgrow_reg =
    /^([A-Za-z0-9_\-\.\+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (bixgrow_reg.test(emailValue) == false) {
    return false;
  }
  return true;
}

async function bgReferralUseFetch(
  url,
  method = "GET",
  params = null,
  headers = { "Content-Type": "application/json" },
) {
  const options = {
    method: method,
    headers: {
      ...headers,
    },
  };
  if (params) {
    if (method == "GET") {
      const queryString = new URLSearchParams(params).toString();
      url += "?" + queryString;
    } else {
      options.body = JSON.stringify(params);
    }
  }
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json();
    const error = new Error(
      errorData.message || response.statusText || "Request failed",
    );
    error.status = response.status;
    throw error;
  }
  const responseData = await response.json();
  return responseData;
}

function bgGetParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function bgSetCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function bgSetCookieByUnixTime(cname, cvalue, unixTime) {
    var d = new Date(unixTime * 1000);
    // d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function bgGetCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function bguuid() {
    var temp_url = URL.createObjectURL(new Blob());
    var uuid = temp_url.toString();
    URL.revokeObjectURL(temp_url);
    return uuid.split(/[:\/]/g).pop();
}

function bgUpdateCart(affiliateId) {

    var xhttp = new XMLHttpRequest;
    xhttp.open("POST", "/cart/update.js", !0);
    xhttp.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhttp.send("attributes[bg_affiliate_id]=".concat(encodeURIComponent(affiliateId)));
}

function bgPostEvent(data) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            bixgrowres = JSON.parse(this.responseText);
            if (bixgrowres.event_type == 'click' && typeof bixgrowres.visitor_id !== 'undefined') {
                bgSetCookieByUnixTime('bgvisitor_id', bixgrowres.visitor_id, bixgrowres.expire_at);
                bgSetCookieByUnixTime('bgaffilite_id', data.aff_id, bixgrowres.expire_at);
                bgSetCookieByUnixTime('bglast_click', new Date().getTime(), bixgrowres.expire_at);
                bgSetCookieByUnixTime('bgexpire_time', bixgrowres.expire_at, bixgrowres.expire_at);
                bgSetCookieByUnixTime('bggroups', bgGroup, bixgrowres.expire_at);
                bgSetCookieByUnixTime('bgclick_id', bixgrowres.click_id, bixgrowres.expire_at);
            }
        } else {
            if (data.event_type == 'add_to_cart') {
                clearInterval(bgSetInterval);
            }
        }
    };
    xhttp.open("POST", bixgrowUrl + "/api/bg_trackv2", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data));
}

if (gbRefParam) {
    if (bgGetCookie('bgvisitor_id') === "") {
        console.log(1);
        let payload = {
            aff_id: gbRefParam,
            event_type: 'click',
            referral_site: document.referrer,
            destination_url: window.location.href,
            visitor_id: bguuid(),
            // channel: bgGetParameterByName('chan')
        }
        bgPostEvent(payload);
    } else {
        if (bgGetCookie('bgaffilite_id') != gbRefParam) {
            console.log(2);
            let payload = {
                aff_id: gbRefParam,
                visitor_id: bgGetCookie('bgvisitor_id'),
                event_type: 'click',
                referral_site: document.referrer,
                destination_url: window.location.href,
                // channel: bgGetParameterByName('chan')
            }
            bgPostEvent(payload);
        } else {
            if (new Date().getTime() - bgGetCookie('bglast_click') > 60 * 1000) {
                console.log(3);
                let payload = {
                    aff_id: gbRefParam,
                    visitor_id: bgGetCookie('bgvisitor_id'),
                    event_type: 'click',
                    referral_site: document.referrer,
                    destination_url: window.location.href,
                    channel: bgGetParameterByName('chan')
                }
                bgPostEvent(payload);
            }
        }
    }

}

var bgSetInterval = setInterval(function () {

    let currentShopifyCart = bgGetCookie('cart');
    if (bgGetCookie('bgvisitor_id') !== "" && currentShopifyCart !== "" && (bgGetCookie('bgcart') != bgGetCookie('cart'))) {
        console.log('aaa');
        bgSetCookie('bgcart', currentShopifyCart, 100);
        clearInterval(bgSetInterval);
        let payload = {
            aff_id: bgGetCookie('bgaffilite_id'),
            visitor_id: bgGetCookie('bgvisitor_id'),
            event_type: 'add_to_cart',
            cart_token: currentShopifyCart,
            click_id: bgGetCookie('bgclick_id')
        }
        // bgPostEvent(payload);
    }
}, 1000);

if (Shopify && Shopify.Checkout && Shopify.Checkout.step === "thank_you") {

    let payload = {
        aff_id: bgGetCookie('bgaffilite_id'),
        visitor_id: bgGetCookie('bgvisitor_id'),
        click_id: bgGetCookie('bgclick_id'),
        event_type: 'checkout_finish',
        order_id: Shopify.checkout.order_id,
        shop: Shopify.shop
    }
    bgPostEvent(payload);


}

if (gbRefParam || bgGetCookie('bgaffilite_id')) {
    bixgrowAutomaticCouponCustomer();
}

function bixgrowAutomaticCouponCustomer() {
    let gbRefParamLink = bgGetParameterByName('bg_ref');
    if (gbRefParamLink) {
        if (gbRefParamLink.indexOf(':') != -1) {
            let tempgbRefParam = gbRefParamLink.split(':');
            gbRefParamLink = tempgbRefParam[1];
        }
    }
    let affiliate_id = bgGetHasCode(bgGetCookie('bgaffilite_id'));
    if (gbRefParamLink) {
        affiliate_id = gbRefParamLink;
    }
    let xhttp = new XMLHttpRequest;
    xhttp.open("GET", bixgrowUrl + "/api/automatic-coupon-customer?" + 'shop=' + Shopify.shop + '&affiliateId=' + affiliate_id, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();
    xhttp.onload = function () {
        let obj = JSON.parse(this.responseText);
        if (Object.keys(obj).length > 0) {
            let couponCodePath = encodeURI("/discount/" + obj.couponCode);
            couponCodePath = couponCodePath.replace("#", "%2523");
            var iframeBixgrow = document.createElement('iframe');
            iframeBixgrow.style.cssText = 'height: 0; width: 0; display: none;';
            iframeBixgrow.src = couponCodePath;
            iframeBixgrow.innerHTML = 'Your browser does not support iframes';
            let app = document.querySelector('body');
            app.prepend(iframeBixgrow);
            // let iframeDiscount = '<iframe src="' + couponCodePath + '" height=0 width=0 frameborder=0 marginheight=0 marginwidth=0 scrolling=no onload="scroll(0,0);" style="display: none"></iframe>';
            // document.write(iframeDiscount + '>Your browser does not support iframes</iframe>');
        }
    }
}

function bgGetHasCode(bgRef) {
    if (bgRef) {
        if (bgRef.indexOf(':') != -1) {
            return bgRef.split(':')[1];
        }
        return bgRef;
    }
    return '';
}

function detectDateFormat(dateString){
    let d = new Date(dateString);
    return d.toLocaleDateString();
  }

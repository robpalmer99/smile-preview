
    (function() {
      var preconnectOrigins = ["https://cdn.shopify.com"];
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills.QSVzdYsv.js","/cdn/shopifycloud/checkout-web/assets/c1/app.CUBUOQtX.js","/cdn/shopifycloud/checkout-web/assets/c1/esnext-vendor.BBoIVOQW.js","/cdn/shopifycloud/checkout-web/assets/c1/context-browser.Eq5uMdYA.js","/cdn/shopifycloud/checkout-web/assets/c1/addresses-is-address-empty.ZJ1ThpFy.js","/cdn/shopifycloud/checkout-web/assets/c1/helpers-credit-card-disabled.CM3LQmkz.js","/cdn/shopifycloud/checkout-web/assets/c1/proposal-delegated-payment-instrument.D8Rq5lsx.js","/cdn/shopifycloud/checkout-web/assets/c1/PayButton-helpers.Xs3mcmMx.js","/cdn/shopifycloud/checkout-web/assets/c1/graphql-PaymentSessionMutation.KqKA7ogg.js","/cdn/shopifycloud/checkout-web/assets/c1/shared-shop-theme.Bl1CDyC7.js","/cdn/shopifycloud/checkout-web/assets/c1/consent-manager-shared.D79dm3f4.js","/cdn/shopifycloud/checkout-web/assets/c1/shared-negotiation-input-redeemable.DoYPkwkm.js","/cdn/shopifycloud/checkout-web/assets/c1/shared-receipt-mapper-load-recovery.B00vMyvb.js","/cdn/shopifycloud/checkout-web/assets/c1/shared-receipt-eager-mappers.DcURE_8N.js","/cdn/shopifycloud/checkout-web/assets/c1/shared-report-graphql-error.DXFM-a8I.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-pay-normalizeBuyerDetails.z6w6H1D3.js","/cdn/shopifycloud/checkout-web/assets/c1/helpers-derivations.f29j39ws.js","/cdn/shopifycloud/checkout-web/assets/c1/redemption-promotions.C4GFMar5.js","/cdn/shopifycloud/checkout-web/assets/c1/hydrate.Tsur0pib.js","/cdn/shopifycloud/checkout-web/assets/c1/shared-permissions.DW7FOCqf.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShopPayExternalAppContext.YLtTu3k6.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-en.DpQGwsa3.js","/cdn/shopifycloud/checkout-web/assets/c1/OnePage.CkZ_VFLS.js","/cdn/shopifycloud/checkout-web/assets/c1/components-DeliveryTransition.Dys1ZJbh.js","/cdn/shopifycloud/checkout-web/assets/c1/localization-index.P2wbDjPJ.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPayButtonClassName.BGKzXWjH.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShowShopPayOptin.BPTq9EIX.js","/cdn/shopifycloud/checkout-web/assets/c1/AddressPresenter.Ce4uWLSc.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShouldRevealCustomization.1KSlt0eq.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-pay-installments-types._vopm3yK.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useForceShopPayUrl.z4AJBm7B.js","/cdn/shopifycloud/checkout-web/assets/c1/ChangeCompanyLocationLink.a6EWibK9.js","/cdn/shopifycloud/checkout-web/assets/c1/BillingAddressForm.BMqAGUql.js","/cdn/shopifycloud/checkout-web/assets/c1/shipping-methods-grouping.S_i1LuzE.js","/cdn/shopifycloud/checkout-web/assets/c1/amazon-pay-useAmazonPayPaymentLine.CMgi35Fb.js","/cdn/shopifycloud/checkout-web/assets/c1/PhoneField.D8EvZ0Pm.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useSuppressShopPayModalOnLoad.CwH45iIp.js","/cdn/shopifycloud/checkout-web/assets/c1/components-RedirectionNotice.module.qsrQCJ0v.js","/cdn/shopifycloud/checkout-web/assets/c1/Choice.18syyoW7.js","/cdn/shopifycloud/checkout-web/assets/c1/Checkbox.dqdh-9I_.js","/cdn/shopifycloud/checkout-web/assets/c1/ImpressionEventCapture.IVS9ZWTI.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayLogo.DdN9PLvG.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useWalletsTimeout.BmMXm9Gc.js","/cdn/shopifycloud/checkout-web/assets/c1/Page.B9pV9lua.js","/cdn/shopifycloud/checkout-web/assets/c1/cross-border-hooks.BN4C-Hww.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-pay-installments-monorail.wQxzDho3.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShopPayNewSignupLoginExperiment.CXtCCSeF.js","/cdn/shopifycloud/checkout-web/assets/c1/IncentiveBadge.DttARc72.js","/cdn/shopifycloud/checkout-web/assets/c1/Section-SectionStyleOverride.DC78UZTk.js","/cdn/shopifycloud/checkout-web/assets/c1/TransitionHeight.BCpWGRvL.js","/cdn/shopifycloud/checkout-web/assets/c1/AutocompleteField-hooks.Cs2Bn4N3.js","/cdn/shopifycloud/checkout-web/assets/c1/PendingShipping.B15tiX3F.js","/cdn/shopifycloud/checkout-web/assets/c1/StickyPayButton-StickyPayButton.module.DMBRqKer.js","/cdn/shopifycloud/checkout-web/assets/c1/Switch.DcsaOS_H.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-payment-button.Byb-1Rv8.js","/cdn/shopifycloud/checkout-web/assets/c1/useAddressMutationsWithNegotiation.CQZ3NdoZ.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentIcon.CEAvn1dM.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentLine.DOb0V3pD.js","/cdn/shopifycloud/checkout-web/assets/c1/Theme-ThemeOverride.DLuOqK2F.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useUpdateCheckoutAddress.8zTRFnp4.js","/cdn/shopifycloud/checkout-web/assets/c1/payment-usePaymentExemptionReason.lTG2U3gh.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShopPayProgressIntercepts.CTuACx9_.js","/cdn/shopifycloud/checkout-web/assets/c1/Section.CfudEpRb.js","/cdn/shopifycloud/checkout-web/assets/c1/negotiated-findSelectedDeliveryMethod.DhxHslog.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentErrorBanner.CpfGIpPc.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useGeneralPaymentErrorMessage.D4EkCdRM.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-usePreselectSpi.IsvB0pZz.js","/cdn/shopifycloud/checkout-web/assets/c1/Middot.OBjXYL_E.js","/cdn/shopifycloud/checkout-web/assets/c1/EstimatedDeliveryContent.B6SO5ZZV.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingMethodRateLabel.Doe-JTYM.js","/cdn/shopifycloud/checkout-web/assets/c1/shipping-methods-consolidated-included.Bra92G5_.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingLines.a_Lo3tMv.js","/cdn/shopifycloud/checkout-web/assets/c1/ShipmentBreakdown.BNMywNRQ.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandiseModal.BB8GJAb2.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingMethodSelector.DQZ35n22.js","/cdn/shopifycloud/checkout-web/assets/c1/TextArea.An2gFfWj.js","/cdn/shopifycloud/checkout-web/assets/c1/SubscriptionPriceBreakdown.CqzG7Z3N.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblems-StockProblemsLineItemList.Beyqm7Al.js","/cdn/shopifycloud/checkout-web/assets/c1/page-BelowTheFoldContent.BPpMeQUj.js","/cdn/shopifycloud/checkout-web/assets/c1/Captcha.CzAUNpY9.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayCaptcha.C5fpu37T.js","/cdn/shopifycloud/checkout-web/assets/c1/RememberMeSection.CAvXhS1Q.js","/cdn/shopifycloud/checkout-web/assets/c1/components-PaymentMethodProgressionHost.CYFvVPub.js","/cdn/shopifycloud/checkout-web/assets/c1/component-MobileOrderSummary.yAb3toN9.js","/cdn/shopifycloud/checkout-web/assets/c1/styles-floating-layer.module.BESFBxYZ.js","/cdn/shopifycloud/checkout-web/assets/c1/PayButtonSection.BnPVxMC6.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentButtons.yQkz3rTh.js","/cdn/shopifycloud/checkout-web/assets/c1/utils-useViolationsHandler.Cu7hKIy9.js","/cdn/shopifycloud/checkout-web/assets/c1/NotFound.3HRSCuDB.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentOptionSelector.NK2c1p5E.js","/cdn/shopifycloud/checkout-web/assets/c1/BillingAddressSelector.DUqZsdpg.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useStableHostMethodsReferences.DJyLKxes.js"];
      var styles = ["/cdn/shopifycloud/checkout-web/assets/c1/assets/app.Sxsz5knT.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/is-address-empty.DJksNKpk.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/previous.BfF3jg9W.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/OnePage.DxMZvmU_.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/DeliveryTransition.CyFbfl4F.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/StickyPayButton.CPXhWoNv.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useAddressMutationsWithNegotiation.BcTJoNaV.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Section.CU18S7Ap.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PaymentLine.D3bcP-mr.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PaymentIcon.gzvCNwz_.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useShopPayProgressIntercepts.CIy8uDiZ.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Choice.aPApdPe_.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/IncentiveBadge.Dlnp55te.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/BillingAddressForm.BdwN7V1K.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Switch.BS8yVgoP.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useShopPayButtonClassName.CpHF4L7Q.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PhoneField.uZEuHncj.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Middot.D7Ujmshx.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/index.BAKORI_U.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/ShippingLines.LcqrKXE1.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/EstimatedDeliveryContent.B_THySFF.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/RedirectionNotice.DG0OZ1cz.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/TransitionHeight.CuRoM9zv.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/BelowTheFoldContent.CmuzzmSI.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Captcha.CJQgLR0i.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/RememberMeSection.JBO5WNhc.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/MobileOrderSummary.2B5x30PG.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PayButtonSection.Bi0nhBOp.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PaymentOptionSelector.s-Kd_X2E.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PaymentMethodProgressionHost.C8No5WOn.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PaymentButtons.BwQxlzN-.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Checkbox.SrYMuQu4.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/floating-layer.DfWUBaTh.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/ShippingMethodSelector.B0hio2RO.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/SubscriptionPriceBreakdown.vTcdVGq4.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Page.BYM12A8B.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0532/1818/1308/files/output-onlinepngtools_x320.png?v=1614316233"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = preconnectOrigins.concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  
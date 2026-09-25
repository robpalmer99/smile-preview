const shareasaleURLTest = new RegExp(/\/\d+\/orders\/[a-f0-9]+/),
	shareasaleFirstTimeAccessed = !shareasaleURLTest.test(window.location.href),
	shareasaleScripts = document.getElementsByTagName('script'),
	shareasaleLocation = new URL(window.location.href),
	shareasaleTroubleshooting = shareasaleLocation.searchParams.get('troubleshooting');

var SAS = SAS || {};
SAS.Tracking = SAS.Tracking || {};

SAS.Tracking._getBrowserSearchBarUrl = function () {
	return document.location.search;
};

SAS.Tracking.getAnchorValue = function (regPattern) {
	var sAnchor = document.location.hash.substring(1);
	if (sAnchor) {
		aid = sAnchor.match(regPattern);
		return aid ? aid.toString().substr(4) : null;
	}
};

SAS.Tracking._getAWCValue = function () {
	var queryString = SAS.Tracking._getBrowserSearchBarUrl();

	var regex = /[\?&](awc|sscid)=(\d+_(\d+)_[0-9a-f]+)/gi;
	var result,
		maxTimestamp = 0,
		awc = false;
	while ((result = regex.exec(queryString))) {
		if (maxTimestamp < result[3]) {
			maxTimestamp = result[3];
			awc = result[2];
		}
	}

	if (awc) {
		return awc;
	}

	try {
		queryString = decodeURIComponent(decodeURIComponent(queryString));

		// Replace unicode encoding
		queryString = queryString.replace(/\\u003[Dd]/g, '=');
		queryString = queryString.replace(/\\u0026/g, '&');
		queryString = queryString.replace(/\\u003[Ff]/g, '?');

		// Replace semicolons with ampersands
		queryString = queryString.replace(/;/g, '&');

		// Handle array notation awc[n]= by replacing with awc=
		queryString = queryString.replace(/awc\[\d*\]/g, 'awc');
	} catch (error) {
		return SAS.Tracking.getAnchorValue(/awc=[0-9a-z_]+/i);
	}

	// If no AWC found in original, try processed URL
	if (!awc && queryString !== SAS.Tracking._getBrowserSearchBarUrl()) {
		while ((result = regex.exec(queryString))) {
			if (maxTimestamp < result[2]) {
				maxTimestamp = result[2];
				awc = result[1];
			}
		}
	}

	return awc || SAS.Tracking.getAnchorValue(/awc=[0-9a-z_]+/i);
};

SAS.Tracking.setCookie = function (sName, sValue, iTimestamp) {
	// calculate expiry
	var oDate = new Date();
	oDate.setTime(oDate.getTime() + 365 * 24 * 60 * 60 * 1000);

	if (iTimestamp) {
		oDate.setTime(iTimestamp * 1000);
	}

	var sExpires = '; expires=' + oDate.toGMTString();

	document.cookie = sName + '=' + sValue + sExpires + '; path=/;domain=' + location.hostname;
};

for (let x of shareasaleScripts) {
	if (x.src.includes('shareasale-tracking.js')) {
		var shareasaleTrackingURL = new URL(x.src),
			shareasaleMerchantID = shareasaleTrackingURL.searchParams.get('sasmid'),
			shareasaleStoreID = shareasaleTrackingURL.searchParams.get('scid'),
			shareasaleXtypeMode = shareasaleTrackingURL.searchParams.get('xtm'),
			shareasaleXtypeValue = shareasaleTrackingURL.searchParams.get('xtv'),
			shareasaleChannelDeduplication = shareasaleTrackingURL.searchParams.get('cd');
		break;
	}
}
let sas_m_awin_cookie = null,
	shareasaleChannel = null,
	sas_sscid = null,
	sas_trackingImageExists = null;

if (window.Shopify.checkout) {
	sas_m_awin_cookie = shareasaleGetCookie('sas_m_awin');
	shareasaleChannel = shareasaleGetCookie('source');
	sas_sscid = sas_m_awin_cookie ? JSON.parse(sas_m_awin_cookie).clickId : null;
	sas_trackingImageExists = shareasaleCheckForTracking();

	if ((shareasaleFirstTimeAccessed || shareasaleTroubleshooting) && !sas_trackingImageExists) {
		if (!sas_m_awin_cookie && Shopify.checkout.discount === null) {
			if (shareasaleTroubleshooting) {
				console.log('No SSCID located and no coupon used. Appending basic pixel');
			}
			appendBasicPixel();
		} else {
			shareasaleRun();
		}
		// set new customer cookie on first thank you page view
		setNewCustomerCookie();
	}
} else {
	// only try set cookie
	handlePageView();
}

function getOrderLabel() {
	try {
		return document.getElementsByClassName('os-order-number')[0].innerText.trim();
	} catch (e) {}
}

function filterCheckout(checkout) {
	if (checkout) {
		if (checkout.geolocatedAddress) {
			delete checkout.geolocatedAddress;
		}

		if (checkout.billing_address) {
			delete checkout.billing_address;
		}
		if (checkout.credit_card) {
			delete checkout.credit_card;
		}
		if (checkout.shipping_address) {
			delete checkout.shipping_address;
		}
		if (checkout.email) {
			delete checkout.email;
		}

		if (checkout.line_items && typeof checkout.line_items === 'object' && checkout.line_items.length) {
			for (var index = 0; index < checkout.line_items.length; index++) {
				var element = checkout.line_items[index];
				if (element.destination_location) {
					delete element.destination_location;
				}
			}
		}
	}
	return checkout;
}

function handlePageView() {
	try {
		const urlParams = new URLSearchParams(document.location.search);
		let sscid = urlParams.get('sscid');
		try {
			var awc = SAS.Tracking._getAWCValue();
			if (awc) {
				const aParts = awc.split('_');
				const sName = '_aw_m_' + aParts[0];
				SAS.Tracking.setCookie(sName, awc);
				//if sscid is not set, use awc as sscid to be used in the SaS cookie
				if (!sscid) {
					sscid = awc;
				}
			}
		} catch (error) {
			sscid = urlParams.get('sscid');
		}

		if (sscid) {
			let oDate = new Date();
			oDate.setTime(oDate.getTime() + 365 * 24 * 60 * 60 * 1000);
			var shareASaleCookie = {
				clickId: sscid,
			};
			const cookieString = `sas_m_awin=${JSON.stringify(
				shareASaleCookie
			)};expires=${oDate.toUTCString()};path=/;`; //domain=${domain}
			document.cookie = cookieString;
		}
	} catch (error) {}
}

/**
 * Runs shareasale tracking
 */
function shareasaleRun() {
	const shareasalePixelURL = createShareasalePixelURL({});
	if (shareasalePixelURL) {
		shareasalePixelAppend(shareasalePixelURL);		
	}
}
/**
 * Builds pixel URL for both advanced pixel and basic fallback pixel
 * @param {object} order Order data to buil pixel with
 * @returns string
 */
function createShareasalePixelURL(version) {
	if (!version) {
		version = 'shopify_app_1.2_pixel';
	}
	var sas_merchantID = shareasaleMerchantID,
		sas_currency = Shopify.checkout.presentment_currency,
		sas_skulist = [],
		sas_pricelist = [],
		sas_quantitylist = [],
		sas_shippingPrice = calculateAmountPaidForShipping(Shopify.checkout),
		sas_totalTax = Shopify.checkout.total_tax ? parseFloat(Shopify.checkout.total_tax) : 0,
		sas_subtotal = (parseFloat(Shopify.checkout.total_price) - sas_totalTax - sas_shippingPrice).toFixed(2),
		sas_couponcode = '';

	var sas_orderName = shareasaleGetOrderRef();
	var sas_newcustomer = getNewCustomerByCookie();

	if (Shopify.checkout.discount?.code && Shopify.checkout.discount.code !== 'null') {
		sas_couponcode = Shopify.checkout.discount.code;
	}

	Shopify.checkout.line_items.map((x) => {
		var discountAmount = 0;
		x.discount_allocations.forEach((discount) => {
			if (discount && discount.amount) {
				var amount = parseFloat(discount.amount);
				if (!isNaN(amount)) {
					discountAmount += amount;
				}
			}
		});
		var finalPrice = (parseFloat(x.price) - discountAmount).toFixed(2);
		sas_skulist.push(x.sku);
		sas_pricelist.push(finalPrice);
		sas_quantitylist.push(x.quantity);
	});

	var shareasalePixelURL = `https://shareasale.com/sale.cfm?transtype=sale&merchantID=${sas_merchantID}&amount=${sas_subtotal}&tracking=${sas_orderName}&currency=${sas_currency}&newcustomer=${sas_newcustomer}&skulist=${sas_skulist}&pricelist=${sas_pricelist}&quantitylist=${sas_quantitylist}&couponcode=${sas_couponcode}&v=${version}`;
	if (sas_sscid) {
		shareasalePixelURL += `&sscid=${sas_sscid}&sscidmode=6`;
	}
	// Append additional settings. Because booleans and null types will be addded to
	// the pixel as strings, check against these as well
	if (shareasaleStoreID && shareasaleStoreID !== 'null') {
		shareasalePixelURL += `&storeID=${shareasaleStoreID}`;
	}
	if (shareasaleXtypeValue && shareasaleXtypeValue !== 'null' && shareasaleXtypeMode !== 'disabled') {
		if (shareasaleXtypeMode === 'static') {
			shareasalePixelURL += `&xtype=${shareasaleXtypeValue}`;
		} else if (shareasaleXtypeMode === 'dynamic') {
			shareasalePixelURL += `&xtype=${window[shareasaleXtypeValue]}`;
		}
	}
	if (shareasaleChannel && shareasaleChannelDeduplication && shareasaleChannelDeduplication !== 'false') {
		if (
			!shareasaleChannel.match(/sas|shareasale/gi) &&
			!shareasaleChannel.match(/ppc|display|google|adwords|googleads/gi)
		) {
			shareasalePixelURL += `&autovoid=1&channel=${shareasaleChannel}`;
		} else {
			shareasalePixelURL += `&autovoid=0&channel=${shareasaleChannel}`;
		}
	}

	return shareasalePixelURL;
}
/**
 * Adds the pixel to the Thank You page
 * @param {string} url The src value for the tracking pixel
 */
function shareasalePixelAppend(url) {
	var shareasaleImage = new Image();
	shareasaleImage.setAttribute('data-hj-suppress', '');
	shareasaleImage.src = url;
	document.body.appendChild(shareasaleImage);
}
function shareasaleGetOrderRef() {
	var orderRef;
	try {
		// Look for valid orderId
		if (Shopify.checkout.order_id) {
			orderRef = Shopify.checkout.order_id;
		}

		if (!orderRef || orderRef === 'undefined') {
			var orderLabel = document.querySelector('.os-order-number');
			if (orderLabel !== null) {
				// splits e.g. 'order US213425' or 'Confirmation n° 9ECUG1QZI' and finds part with full order name
				const parts = orderLabel.innerText.trim().split(' ');
				orderRef = encodeURIComponent(findOrderNumberPart(parts));
			}
		}

		if (!orderRef || orderRef === 'undefined') {
			throw Error('order_ref_error');
		}
	} catch (err) {
		if (shareasaleTroubleshooting) {
			console.log('ShareASale: error getting orderRef from page. Using random number.');
		}
		//generate random number with 9 digits plus a 0 at the beginning
		// Known issue: those trans wil be hard to find by advertiser
		orderRef = generateRandomOrderRef();
	}
	return orderRef;
}
function findOrderNumberPart(partsArray) {
	for (var i = 1; i < partsArray.length; i++) {
		// works with order confirmation or name
		if (/[\w\#]{4,}/.test(partsArray[i])) {
			return partsArray[i];
		}
	}
}

function shareasaleGetCookie(cname) {
	var name = cname + '=';
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
	return '';
}

function getNewCustomerByCookie() {
	var ncCookie = shareasaleGetCookie('_sas_nc');
	return ncCookie ? 0 : 1;
}
function setNewCustomerCookie() {
	SAS.Tracking.setCookie('_sas_nc', '1');	
}

function fireShareasaleBeacon() {
	if (document.visibilityState === 'hidden') {
		navigator.sendBeacon(createShareasalePixelURL('shopify_app_1.2_beacon'));
	}
}
function appendBasicPixel() {
	const shareasaleBasicPixel = new Image();
	shareasaleBasicPixel.setAttribute('data-hj-suppress', '');
	shareasaleBasicPixel.src = createShareasalePixelURL('shopify_app_1.2_fallback');
	document.body.appendChild(shareasaleBasicPixel);
}

function shareasaleCheckForTracking() {
	try {
		if (document.querySelector("img[src*='shareasale.com/sale.cfm']")) {
			return true;
		} else {
			return false;
		}
	} catch (err) {
		return false;
	}
}
/**
 * Generates random number with 9 digits plus a 0 at the beginning
 */
function generateRandomOrderRef() {
	var randomNumber = Math.floor(100000000 + Math.random() * 900000000);
	return '0' + randomNumber;
}

function calculateAmountPaidForShipping(checkout) {
	var totalDiscount = 0;
	var shippingPrice = Shopify.checkout.shipping_rate?.price ? parseFloat(Shopify.checkout.shipping_rate.price) : 0;

	if (shippingPrice == 0 || !Shopify.checkout.discount) {
		return shippingPrice;
	}

	checkout.line_items.map((x) => {
		x.discount_allocations.forEach((discount) => {
			if (discount && discount.amount) {
				var amount = parseFloat(discount.amount);
				if (!isNaN(amount)) {
					totalDiscount += amount;
				}
			}
		});
	});
	// if total discount allocated to products is equal to total discount, shipping is not included in the discounts
	if (totalDiscount == parseFloat(Shopify.checkout.discount.amount)) {
		return shippingPrice;
	} else {
		return 0;
	}
}

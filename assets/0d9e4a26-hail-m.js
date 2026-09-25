
            if (typeof gsf_customer_privacy !== 'undefined') {
                    
        if (typeof gsf_analytics == 'undefined') {
            gsf_analytics = {};
        }
        if (typeof gsf_init == 'undefined') {
            gsf_init = {};
        }
        
        let fb_data_processing_options = {};
        window.dataLayer = window.dataLayer || [];
        
            let gsf_page_type = '';
            
                let gsf_pinterest_page_visit = true;
                
        
        function gtag(){dataLayer.push(arguments);}
        
        var gsfCustomGenerateProductItemsIds = function (items, type = 'google') {
            var gsf_pids = [];
            for (var gsf_item_i = 0; gsf_item_i < items.length; gsf_item_i++) { 
                var gsf_item = items[gsf_item_i];
                const gsf_variant_item = gsf_item.merchandise || gsf_item.variant || gsf_item;
                var gsf_items = {product_id: gsf_variant_item.product.id,variant_id: gsf_variant_item.id,sku: gsf_variant_item.sku};
                var gsf_pid = gsfCustomGenerateProductItemsId(gsf_items,type);
                if (gsf_pid) {
                    if (type == 'google_drms') {
                        gsf_pids.push({
                            'id': gsf_pid,
                            'value': gsf_variant_item.price.amount,
                            'currency': gsf_variant_item.price.currencyCode,
                            'google_business_vertical': 'retail'
                        });
                    } else if (type == 'google_drm') {
                        gsf_pids.push({
                            'id': gsf_pid,
                            'google_business_vertical': 'retail'
                        });
                    } else {
                        gsf_pids.push(gsf_pid);
                    }
                }
            }
            return gsf_pids;
        };
            
        var gsfCustomGenerateProductItemsId = function (items, channel = 'google') {
            var bing_sku_as_product_id = '-1';
            var gsf_item_pid = 'shopify_US' + '_' + items.product_id + '_' + items.variant_id;
            if (channel == 'bing' && bing_sku_as_product_id != -1) {
                if (parseInt('-1') === 1) {
                    gsf_item_pid = items.sku;
                } else if (parseInt('-1') === 2) {
                    gsf_item_pid = items.variant_id;
                }
            } else {              
                if (parseInt('1') === 1) {
                    gsf_item_pid = items.sku;
                } else if (parseInt('1') === 2) {
                    gsf_item_pid = items.variant_id;
                } else if (parseInt('1') === 3) {
                    gsf_item_pid = items.product_id + '_' + items.variant_id;
                }
            }
            return gsf_item_pid;                   
        };
        
        var gsfGetShopCurrency = function (items) {
            var gsf_shop_currency = '';
            if (typeof items != 'undefined' && items.shop_currency != '') {
                gsf_shop_currency = items.shop_currency;
            }                
            return gsf_shop_currency;
        };
        
        var gsfCustomGetShopProductData = function (items,type) {           
            var gsf_shop_pdata = '';
            var gsf_shop_pids = [];
            for (var i = 0; i < items.length; i++) {
                var gsf_item = items[i];
                if (type == 'name' || type == 'title') {                    
                    var gsf_shop_pdata = (type == 'title') ? gsf_item.product_title : gsf_item.name;
                } else if(type == 'category') {
                    var gsf_shop_pdata = gsf_item.category;
                } else if(type == 'product_id') {
                    var gsf_shop_pdata = gsf_item.product_id || '';
                } else if(type == 'variant_id') {
                    var gsf_shop_pdata = gsf_item.variant_id || '';
                } else if(type == 'sku') {
                    var gsf_shop_pdata = gsf_item.sku || '';
                } else if(type == 'vendor') {
                    var gsf_shop_pdata = gsf_item.brand || '';
                } else if(type == 'type') {
                    var gsf_shop_pdata = gsf_item.category || '';
                } else if(type == 'variant_title') {
                    var gsf_shop_pdata = gsf_item.variant || '';
                } else if(type == 'id') {                        
                    gsf_shop_pids.push(gsf_item.variant?.product?.id || gsf_item.product.id);
                } else if(type == 'v_id') {                        
                    gsf_shop_pids.push(gsf_item.variant_id);
                }              
            } 
            return (type == 'id' || type == 'v_id') ? gsf_shop_pids : gsf_shop_pdata;             
        };
        
        function gsfGetLineItems(items, channel = 'google') {
            var gsf_product_items = [];
            for (var gsf_item_i in items) {
                var gsf_item = items[gsf_item_i];
                var gsf_product_item = {};
                const gsf_variant = gsf_item.merchandise || gsf_item.variant || gsf_item;
                const gsf_product = gsf_item.merchandise?.product || gsf_item.variant?.product || gsf_item.product;
                
                var gsf_items = {
                    product_id: gsf_product.id,
                    variant_id: gsf_variant.id,
                    sku: gsf_variant.sku
                };
    
                //checkout_started, payment_info_submitted, checkout_completed
                if (channel == 'google') {
                    var gsf_p_item_id = gsfCustomGenerateProductItemsId(gsf_items);
                    if (gsf_item.variant.product) {
                        gsf_product_item.id = gsf_p_item_id;              
                    }
                    if (gsf_item.variant.price) {
                        gsf_product_item.price = gsf_item.variant.price.amount;
                    }          
                    if (gsf_item.quantity) {
                        gsf_product_item.quantity = gsf_item.quantity;
                    }
                } else if (channel == 'bing') {
                    var gsf_p_item_id = gsfCustomGenerateProductItemsId(gsf_items, 'bing');
                    if (gsf_item.variant.product) {
                        gsf_product_item.id = gsf_p_item_id;              
                    }
                    if (gsf_item.variant.price) {
                        gsf_product_item.price = gsf_item.variant.price.amount;
                    }          
                    if (gsf_item.quantity) {
                        gsf_product_item.quantity = gsf_item.quantity;
                    }
                } else if (channel == 'pinterest') {                                        
                    if (gsf_product) {
                        gsf_product_item.product_id = gsf_product.id;              
                        gsf_product_item.product_name = gsf_product.title;              
                        gsf_product_item.product_brand = gsf_product.vendor;              
                        gsf_product_item.product_category = gsf_product.type;              
                    }                    
                    if (gsf_variant) {
                        gsf_product_item.product_variant_id = gsf_variant.id;              
                        gsf_product_item.product_variant = gsf_variant.title;
                    }
                    if (gsf_variant.price) {
                        gsf_product_item.product_price = gsf_variant.price.amount;
                    }
                    if (gsf_item.quantity) {
                        gsf_product_item.product_quantity = gsf_item.quantity;
                    }
                } else if (channel == 'google_analytics') {
                    var gsf_p_item_id = gsfCustomGenerateProductItemsId(gsf_items);                        
                    if (gsf_variant.product) {
                        gsf_product_item.item_id = gsf_p_item_id;              
                        gsf_product_item.item_name = gsf_product.title;              
                        gsf_product_item.item_brand = gsf_product.vendor;              
                        gsf_product_item.item_category = gsf_product.type;              
                    }                    
                    if (gsf_variant) {                                      
                        gsf_product_item.item_variant = gsf_variant.title;
                    }
                    if (gsf_variant.price) {
                        gsf_product_item.price = gsf_variant.price.amount;
                    }
                    if (gsf_item.quantity) {
                        gsf_product_item.quantity = gsf_item.quantity;
                    }
                }
                gsf_product_items.push(gsf_product_item);
            }
            return gsf_product_items;
        }
        

        function gsfGetItemsDiscounts(items) {
            var gsf_items_discount = [];
            for (var gsf_item_i in items) {
                var gsf_item = items[gsf_item_i];
                var gsf_item_discount = {};
                
                var gsf_discount_allocations = gsf_item.discountAllocations;
                for (var gsf_item_j in gsf_discount_allocations) {
                    var gsf_discount_allocation = gsf_discount_allocations[gsf_item_j];
                    if (gsf_discount_allocation.amount) {
                        gsf_item_discount = gsf_discount_allocation.amount;
                    }
                }
                if (Object.keys(gsf_item_discount).length > 0) {
                    gsf_items_discount.push(gsf_item_discount);
                }
            }
            return gsf_items_discount;
        }
        function gsfCallAWS(gsf_aws_data, gsf_aws_url) {
            var gsf_aws_data_payload = JSON.stringify({'MessageBody': gsf_aws_data});
            fetch(gsf_aws_url, {
                method: 'PUT',
                body: gsf_aws_data_payload
            }).then(response => {
                //console.log('AWS this_responseText: ', JSON.stringify(response));
            }).catch((exception) => {
                console.log('error:', exception.message);
            });
        }
        
            function gsfCallCustomPurchase (event, fbp, fbc, shopify_sa_p) {

                let gsf_custom_purchase_log = {};

                var is_submit_subtotal = 0;
                var bing_is_submit_subtotal = 0;
                var ga4_is_submit_subtotal = 0;

                var gsf_shopify_data = event.data || '';
                var gsf_shopify_data_checkout = gsf_shopify_data.checkout || '';

                var gsf_shopify_order = gsf_shopify_data_checkout.order || '';
                var gsf_shopify_order_id = gsf_shopify_order.id || '';
                var gsf_shopify_order_customer = gsf_shopify_order.customer || '';
                var gsf_shopify_order_customer_id = gsf_shopify_order_customer.id || '';

                var gsf_shopify_total_price = gsf_shopify_data_checkout.totalPrice || '';
                var gsf_shopify_total_price_amount = gsf_google_total_price = gsf_bing_total_price = gsf_ga4_total_price = gsf_shopify_total_price.amount || 0;
                var gsf_shopify_total_price_currency = gsf_shopify_total_price.currencyCode || '';

                var gsf_shopify_subtotal_price = gsf_shopify_data_checkout.subtotalPrice || '';
                var gsf_shopify_subtotal_price_amount = gsf_shopify_subtotal_price.amount || 0;
                var gsf_shopify_subtotal_price_currency = gsf_shopify_subtotal_price.currencyCode || '';

                if (is_submit_subtotal) {
                    gsf_google_total_price = gsf_shopify_subtotal_price_amount;
                }
                if (bing_is_submit_subtotal) {
                    gsf_bing_total_price = gsf_shopify_subtotal_price_amount;
                }
                if (ga4_is_submit_subtotal) {
                    gsf_ga4_total_price = gsf_shopify_subtotal_price_amount;
                }

                var gsf_shopify_line_items = gsf_shopify_data_checkout.lineItems || '';

                var gsf_shopify_total_tax = gsf_shopify_data_checkout.totalTax || '';
                var gsf_shopify_total_tax_amount = gsf_shopify_total_tax.amount || '';

                var gsf_shopify_shipping_line = gsf_shopify_data_checkout.shippingLine || '';
                var gsf_shopify_shipping_line_price = gsf_shopify_shipping_line.price || '';
                var gsf_shopify_shipping_line_price_amount = gsf_shopify_shipping_line_price.amount || '';

                var gsf_shopify_discount_codes = gsf_shopify_data_checkout.discountApplications.map((discount) => {
                    if (1 || discount.type === 'DISCOUNT_CODE' || discount.type === 'AUTOMATIC') {
                        return discount.title;
                    }
                });
                
                var gsf_shopify_discounts = gsfGetItemsDiscounts(gsf_shopify_line_items);
                
                    var gsf_pinterest_purchase_event_data =  {
                        value: gsf_shopify_total_price_amount,
                        currency: gsf_shopify_total_price_currency,
                        order_id: gsf_shopify_order_id,
                        line_items: gsfGetLineItems(gsf_shopify_line_items, 'pinterest'),
                    };
                    if (gsf_shopify_discount_codes.length > 0 && typeof gsf_shopify_discount_codes[0] != 'undefined' && gsf_shopify_discount_codes[0]) {
                        gsf_pinterest_purchase_event_data.promo_code = gsf_shopify_discount_codes[0];
                    }
                    pintrk('track', 'checkout', gsf_pinterest_purchase_event_data);
                    gsf_custom_purchase_log['pinterest'] = gsf_pinterest_purchase_event_data;
                    
                    var gsf_google_analytics_purchase_event_data =  {
                        
                        send_to: 'G-G71EKHW7GX',
                        
                        transaction_id: gsf_shopify_order_id,
                        value: gsf_ga4_total_price,
                        currency: gsf_shopify_total_price_currency,
                        tax: gsf_shopify_total_tax_amount,
                        shipping: gsf_shopify_shipping_line_price_amount,
                        
                        items: gsfGetLineItems(gsf_shopify_line_items, 'google_analytics'),
                        
                    };
                    if (gsf_shopify_discount_codes.length > 0 && typeof gsf_shopify_discount_codes[0] != 'undefined' && gsf_shopify_discount_codes[0]) {
                        gsf_google_analytics_purchase_event_data.coupon = gsf_shopify_discount_codes[0];
                    }
                    gtag('event', 'purchase', gsf_google_analytics_purchase_event_data);
                    gsf_custom_purchase_log['ga4'] = gsf_google_analytics_purchase_event_data;
                    
                    if (JSON.stringify(gsf_custom_purchase_log) !== '{}') {
                        gsf_custom_purchase_log = {
                            ...gsf_custom_purchase_log,
                            shopify_store: 'b89a2e45863f106b74d48604925c1b398668b758f843621fe25e12306c518ca358b66112a47b419564f286ddc8bc1762d3bb24ba68b8216435f534cbf5c859cb',
                            order_id: gsf_shopify_order_id.toString(),
                            shop_domain: gsf_init.data.shop.myshopifyDomain,
                            event_data: event,
                            event_status: 'success',
                            user_agent: gsf_init.context.navigator.userAgent,
                            init_data: gsf_init
                        };
                        fetch('https://conversions-gsf.simpshopifyapps.com/store-event-logs', {
                            method: 'POST',
                            body: JSON.stringify(gsf_custom_purchase_log),
                            keepalive: true,
                        }).catch(exception => {
                            console.log('purchase_log error:', exception.message);
                        });
                    }
                    
            }
            
            function gsfCallCustomBeginCheckout (event, gsf_fbp, gsf_fbc) {
                const gsf_event_data = event?.data || '';
                const gsf_checkout_token = gsf_init.data?.cart?.id;
                
                const currency = event.data.checkout.currencyCode;
                const total_price = event.data.checkout.totalPrice?.amount;
                const product_id = event.data.checkout.lineItems.map((lineItems) => {
                    return lineItems.variant.product.id;
                });
                const variant_id = event.data.checkout.lineItems.map((lineItems) => {
                    return lineItems.variant.id;
                });
                const first_name = gsf_init.data?.customer?.firstName || event?.data?.checkout?.billingAddress?.firstName || '';
                const last_name = gsf_init.data?.customer?.lastName || event?.data?.checkout?.billingAddress?.lastName || '';
                const email = gsf_init.data?.customer?.email || event?.data?.checkout?.email || '';
                const phone = gsf_init.data?.customer?.phone || event.data.checkout.billingAddress.phone;
                const gsf_custom_customer_data = {email, phone, first_name, last_name};
                const province = event.data.checkout.billingAddress.province || event.data.checkout.shippingAddress.province;
                const city = event.data.checkout.billingAddress.city || event.data.checkout.shippingAddress.city;
                const zip = event.data.checkout.billingAddress.zip || event.data.checkout.shippingAddress.zip;
                const country = event.data.checkout.billingAddress.country || event.data.checkout.shippingAddress.country;
                const gsf_custom_customer_address_data = {province, phone, city, zip, country};
                
                var gsf_shopify_line_items = event.data.checkout.lineItems || '';
                const gsf_cart_total_quantity = gsf_init.data?.cart?.totalQuantity;
                
                    var gsf_google_analytics_begin_checkout_event_data =  {
                        send_to: 'G-G71EKHW7GX',
                        currency: currency,
                        value: total_price,
                        items: gsfGetLineItems(gsf_shopify_line_items, 'google_analytics'),
                    };
                    
                        gtag('event', 'begin_checkout', gsf_google_analytics_begin_checkout_event_data);
                           
                    var gsf_pinterest_begin_checkout_event_data = {
                        currency: currency,
                        value: total_price,
                        order_quantity: gsf_cart_total_quantity,
                        lead_type: 'begincheckout',
                        line_items: gsfGetLineItems(gsf_shopify_line_items, 'pinterest'),
                    };
                    pintrk('track', 'lead', gsf_pinterest_begin_checkout_event_data);
                    
            }
            
            function gsfCallCustomAddToCart (event, gsf_fbp, gsf_fbc, gsf_checkout_token) {
            const gsf_cart_line = event?.data?.cartLine;
            
            const gsf_currency_code = gsf_cart_line?.cost?.totalAmount?.currencyCode;
            const gsf_total_price = gsf_cart_line?.cost?.totalAmount?.amount;
            
            const gsf_cart_line_merchandise = gsf_cart_line?.merchandise;
            const gsf_variant_id = gsf_cart_line_merchandise?.id;
            const gsf_variant_sku = gsf_cart_line_merchandise?.sku;
            const gsf_variant_title = gsf_cart_line_merchandise?.title;
            const gsf_variant_price_amount = gsf_cart_line_merchandise?.price?.amount;
            const gsf_variant_price_currency_code = gsf_cart_line_merchandise?.price?.currencyCode;
            const gsf_product_id = gsf_cart_line_merchandise?.product?.id;
            const gsf_product_title = gsf_cart_line_merchandise?.product?.title;
            const gsf_product_vendor = gsf_cart_line_merchandise?.product?.vendor;
            const gsf_product_type = gsf_cart_line_merchandise?.product?.type;
            const gsf_cart_total_quantity = gsf_cart_line?.quantity;

            const gsf_first_name = gsf_init.data?.customer?.firstName || '';
            const gsf_last_name = gsf_init.data?.customer?.lastName || '';
            const gsf_email = gsf_init.data?.customer?.email || '';
            const gsf_phone = gsf_init.data?.customer?.phone || ''; 
                
            const gsf_province = gsf_cart_line?.billingAddress?.province || gsf_cart_line?.shippingAddress?.province || '';
            const gsf_city = gsf_cart_line?.billingAddress?.city || gsf_cart_line?.shippingAddress?.city || '';
            const gsf_zip = gsf_cart_line?.billingAddress?.zip || gsf_cart_line?.shippingAddress?.zip || '';
            const gsf_country = gsf_cart_line?.billingAddress?.country || gsf_cart_line?.shippingAddress?.country || '';
            const gsf_custom_customer_data = {email: gsf_email, phone: gsf_phone, first_name: gsf_first_name, last_name: gsf_last_name};
            const gsf_custom_customer_address_data = {province: gsf_province, phone: gsf_phone, city: gsf_city, zip: gsf_zip, country: gsf_country};
            
            var gsf_line_items = {
                product_id: gsf_product_id,
                variant_id: gsf_variant_id,
                sku: gsf_variant_sku,
            };        
                      
                var gsf_google_analytics_add_to_cart_event_data =  {
                    
                    send_to: 'G-G71EKHW7GX',
                    
                    currency: gsf_currency_code,
                    value: gsf_total_price,
                    items: [{
                        item_id: gsfCustomGenerateProductItemsId(gsf_line_items),
                        item_name: gsf_product_title,
                        item_brand: gsf_product_vendor,
                        item_category: gsf_product_type,
                        item_sku: gsf_variant_sku,
                        item_variant_id: gsf_variant_id,
                        item_variant: gsf_variant_title,
                        price: gsf_variant_price_amount,
                        currency: gsf_variant_price_currency_code,
                        quantity: gsf_cart_total_quantity,
                        
                    }],
                };        
                gtag('event', 'add_to_cart', gsf_google_analytics_add_to_cart_event_data);
                  
                var gsf_pinterest_add_to_cart_event_data = {
                    currency: gsf_currency_code,
                    value: gsf_total_price,
                    order_quantity: gsf_cart_total_quantity,
                    line_items: [{
                        product_id: gsf_product_id,
                        product_name: gsf_product_title,
                        product_category: gsf_product_type,
                        product_variant_id: gsf_variant_id,
                        product_variant: gsf_variant_title,   
                        product_price: gsf_variant_price_amount,
                        product_quantity: gsf_cart_total_quantity,
                        product_brand: gsf_product_vendor,
                    }],
                };
                pintrk('track', 'addtocart', gsf_pinterest_add_to_cart_event_data);
                
            }
            function gsfMakeRandomID(gsf_length) {
                var gsf_random_ID = '';
                const gsf_characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                const gsf_characters_length = gsf_characters.length;
                let gsf_counter = 0;
                while (gsf_counter < gsf_length) {
                    gsf_random_ID += gsf_characters.charAt(Math.floor(Math.random() * gsf_characters_length));
                    gsf_counter += 1;
                }
                return gsf_random_ID;
            }
            
            function gsfCallCustomViewSearchResults(event) {
                
                gtag('event', 'search', {
                    
                    send_to: 'G-G71EKHW7GX',
                    
                    search_term: event.data.searchResult.query,
                    
                });
                
                pintrk('track', 'search', {
                    search_query: event.data.searchResult.query
                });
                
            }

            function gsfCallCustomViewItemList(event) {
                
                let gsf_shopify_collection_id = event.data.collection.id;
                if (gsf_shopify_collection_id == '') {
                    gsf_shopify_collection_id = event.data.collection.title;
                    gsf_shopify_collection_id = gsf_shopify_collection_id.toLowerCase().replace(/ /g,'_');
                }
                gtag('event', 'view_item_list', {
                    
                    send_to: 'G-G71EKHW7GX',
                    
                    item_list_id: gsf_shopify_collection_id,
                    item_list_name: event.data.collection.title,
                    
                    items: gsfGetLineItems(event.data.collection.productVariants, 'google_analytics'),
                    
                });
                
                pintrk('track', 'viewcategory');  
                
            }

            function gsfCallCustomViewItem(event, gsf_fbp, gsf_fbc) {
                const gsf_line_item = event?.data?.productVariant;

                const gsf_variant_id = gsf_line_item?.id;
                const gsf_product_id = gsf_line_item?.product?.id;
                const gsf_product_title = gsf_line_item?.product?.title;
                const gsf_product_type = gsf_line_item?.product?.type;

                const gsf_item_price = gsf_line_item?.price?.amount
                const gsf_currency_code = gsf_line_item?.price?.currencyCode
                
                const gsf_google_analytics_items = gsfGetLineItems([gsf_line_item], 'google_analytics');
                
                gtag('event', 'view_item', {
                
                    send_to: 'G-G71EKHW7GX',
                    
                    'value': gsf_item_price,
                    'currency': gsf_currency_code,
                    'items': gsf_google_analytics_items
                });
                
            }
            
            function gsfCallAllStandardEvents(event) {
                
                if (gsf_pinterest_page_visit) {
                    if (event.name == 'product_viewed') {
                        const gsf_line_item = event?.data?.productVariant;

                        const gsf_variant_id = gsf_line_item?.id;
                        const gsf_product_id = gsf_line_item?.product?.id;
                        const gsf_product_title = gsf_line_item?.product?.title;
                        const gsf_product_type = gsf_line_item?.product?.type;

                        const gsf_item_price = gsf_line_item?.price?.amount
                        const gsf_currency_code = gsf_line_item?.price?.currencyCode
                        pintrk('track', 'pagevisit', {
                            currency: gsf_currency_code,
                            value: gsf_item_price,
                            line_items: gsfGetLineItems([gsf_line_item], 'pinterest'),
                        });
                    } else {
                        pintrk('track', 'pagevisit');
                    }
                    gsf_pinterest_page_visit = false;
                }
                
            }
            
            function gsfCallCustomViewCart(event) {
                if (event.data.cart) {
                    var gsf_shopify_line_items = event.data.cart.lines || '';
                    gtag('event', 'view_cart', {
                        send_to: 'G-G71EKHW7GX',
                        currency: event.data.cart.cost.totalAmount.currencyCode,
                        value: event.data.cart.cost.totalAmount.amount,
                        items: gsfGetLineItems(gsf_shopify_line_items, 'google_analytics'),
                    });
                }
            }
            function gsfCallCustomShippingInfo(event) {
                var gsf_shopify_line_items = event.data.checkout.lineItems || '';
                gtag('event', 'add_shipping_info', {
                    send_to: 'G-G71EKHW7GX',
                    value: event.data.checkout.totalPrice?.amount,
                    currency: event.data.checkout.currencyCode,
                    items: gsfGetLineItems(gsf_shopify_line_items, 'google_analytics'),
                    shipping_tier: event.data.checkout.delivery?.selectedDeliveryOptions[0]?.title || '',
                });
            }
            function gsfCallCustomPaymentInfo(event) {
                var gsf_shopify_line_items = event.data.checkout.lineItems || '';
                gtag('event', 'add_payment_info', {
                    send_to: 'G-G71EKHW7GX',
                    value: event.data.checkout.totalPrice?.amount,
                    currency: event.data.checkout.currencyCode,
                    items: gsfGetLineItems(gsf_shopify_line_items, 'google_analytics'),
                });
            }
            
        let product_added_to_cart_event_id = '';
        function gsfCustomInitTrackerJSCode () {
            let shopify_sa_p = '';
            
                let event_data = {};
                
            gsf_analytics.subscribe('all_standard_events', async (event) => {
            
                    event_data = event;
                    setTimeout(function () {
                        gsfCallAllStandardEvents(event_data)
                    });
                    
                let fbp = fbc = '';
                let gsf_checkout_token = gsf_init.data?.cart?.id;
                if (typeof gsf_browser !== 'undefined') {
                    
                    if (typeof(gsf_checkout_token) == 'undefined' || gsf_checkout_token == '') {
                        gsf_checkout_token = await gsf_browser.cookie.get('cart');
                    }
                }
                switch (event.name) {
                    
                    case 'search_submitted':
                        gsfCallCustomViewSearchResults(event);
                        break;
                    case 'collection_viewed':
                        gsfCallCustomViewItemList(event);
                        break;
                    case 'product_viewed':
                        gsfCallCustomViewItem(event, fbp, fbc);
                        break;
                    
                        case 'product_added_to_cart':
                            if (product_added_to_cart_event_id != event.id) {
                                product_added_to_cart_event_id = event.id;
                                gsfCallCustomAddToCart(event, fbp, fbc, gsf_checkout_token);
                            }
                            break;
                        
                        case 'checkout_started':
                            gsfCallCustomBeginCheckout(event, fbp, fbc);
                            break;
                        
                    case 'cart_viewed':
                        gsfCallCustomViewCart(event);
                        break;
                    case 'checkout_shipping_info_submitted':
                        gsfCallCustomShippingInfo(event);
                        break;
                    case 'payment_info_submitted':
                        gsfCallCustomPaymentInfo(event);
                        break;
                    
                    case 'checkout_completed':
                        
                        gsfCallCustomPurchase(event, fbp, fbc, shopify_sa_p);
                        break;
                    
                }
            
            });
        }
        function gsfCustomInitTrackerJS () {
            var gsf_is_thank_you_page = true;
            
                gsf_is_thank_you_page = true;
                 
                if (gsf_is_thank_you_page) {
                var gsf_script = document.createElement('script');
                 gsf_script.src = 'https://www.googletagmanager.com/gtag/js?id=G-G71EKHW7GX'; 
                document.head.append(gsf_script);
                gtag('js', new Date());
                gtag('set', 'page_location', gsf_init.context.document.location.href);
                 gtag('config', 'G-G71EKHW7GX' ); 
                    setTimeout(() => {
                        gtag('event', 'user_engagement', {
                            engagement_time_msec: 10000,
                        });
                    }, 10000);
                    
                }
                
                if (gsf_is_thank_you_page) {!function(e) {
                        if(!window.pintrk) {
                        window.pintrk = function () {
                        window.pintrk.queue.push(Array.prototype.slice.call(arguments))
                        };
                        var n=window.pintrk;n.queue=[],n.version='3.0';
                        var t=document.createElement('script');t.async=!0,t.src=e;
                        var r=document.getElementsByTagName('script')[0];
                        r.parentNode.insertBefore(t,r)
                        }
                    }
                    ('https://s.pinimg.com/ct/core.js');
                    pintrk('load', '2614383672214');
                    pintrk('page');
                    }
                    
        }

        function gsfCustomInitTrackerFunction () {
            gsfCustomInitTrackerJS();
            gsfCustomInitTrackerJSCode();
        }
        
        (function() {
            gsfCustomInitTrackerFunction();
        })();
         
        function gsfSetCookie(name, value, minutes) {
           var cookie = name + '=' + value + ';';
           if (minutes) {
             var expires = new Date(new Date().getTime() + parseInt(minutes) * 1000 * 60);
             cookie += 'expires=' + expires.toGMTString() + ';';
           } else {
             cookie += 'expires=0;';
           }
           cookie += 'path=/;';
           document.cookie = cookie;
         }
        function gsfGetCookie(cookie_name) {
           if (document.cookie.length > 0) {
             var cookie_start = document.cookie.indexOf(cookie_name + '=');
             if (cookie_start !== -1) {
               cookie_start = cookie_start + cookie_name.length + 1;
               var cookie_end = document.cookie.indexOf(';', cookie_start);
               if (cookie_end === -1) {
                 cookie_end = document.cookie.length;
               }
               return unescape(document.cookie.substring(cookie_start, cookie_end));
             }
           }
           return '';
        }
            }
            
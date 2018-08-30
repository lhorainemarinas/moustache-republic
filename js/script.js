jQuery(document).ready(function () {

    var $ = jQuery,
        $window = $(window),
        $document = $(document),
        $body = $("body"),
        docHeight = $document.innerHeight(),
        winWidth = $window.innerWidth(),
        winHeight = $window.innerHeight(),
        scrolled = $(window).scrollTop();

    /**
     * --------------------------------------------------------------------------
     * EVENTS
     * --------------------------------------------------------------------------
     */

    $window.on('resize', function () {
        updateOnResize();
    });

    $window.on('load', function () {
        
    });

    var updateOnResize = debounce(function () {
        updateValueOnResize();
        updateStyleOnResize();
    }, 250);

    function updateValueOnResize() {
        winWidth = $window.innerWidth();
        winHeight = $window.innerHeight();
    }

    function updateStyleOnResize() {
        
    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    /**
     * --------------------------------------------------------------------------
     * TOGGLE CART SUMMARY
     * --------------------------------------------------------------------------
     */
   
    $(".cart-wrap").mouseenter(function(){
        $(".cart-summary").stop(true,true).slideDown("fast");
    });

    $(".cart-wrap").mouseleave(function () {
        $(".cart-summary").stop(true,true).slideUp("fast");
    });

    /**
     * --------------------------------------------------------------------------
     * ADD TO CART SUMMARY
     * --------------------------------------------------------------------------
     */

    $('#addCart').click(function (event) {
        event.preventDefault();
        if ($("input[name=prod-size]:checked").length > 0) {
            var clicked_id = $("input[name=prod-size]:checked")[0].id,
                clicked_size = $("label[for='" + clicked_id + "']").html(),
                prod_name = $(".prod-details h2")[0].innerText,
                prod_price = $(".prod-details .prod-price")[0].innerText,
                cart_empty = $(".cart-summary .cart-item").length,
                update_item = 0,
                default_item_value = 1,
                cart_items = $(".cart-summary .cart-item").map(function () { return $(this).data('size'); }).get(),
                cart_ids = cart_items.join();

            selected_size = $('[data-size="' + clicked_id + '"]');

            if (selected_size.length > 0) {
                var value = selected_size.find('.cart-prod-val'),
                    val = parseInt(value.html()) + 1;

                value.html(val)

            } else {
                html = '<div class="cart-item row" data-size="' + clicked_id + '"><div class="cart-prod-img col-md-4"><img src="images/classic-tee.jpg"></div><div class="cart-prod-details col-md-8"><p class="cart-prod-title">' + prod_name + '</p><p class="cart-prod-price"><span class="cart-prod-val">' + default_item_value + '</span>x ' + prod_price + '</p><p class="cart-prod-size">Size: <span class="cart-prod-size-val">' + clicked_size + '</span></p></div></div>';

                $(".cart-summary").append(html);
            }

            $(".empty-cart").hide();
        }
        else {
            $(".prod-variants .prod-sizes label").addClass("error");
            $(".prod-variants .prod-sizes label").click(function () {
                $(".prod-variants .prod-sizes label").removeClass("error");
            });
        }
    });

});
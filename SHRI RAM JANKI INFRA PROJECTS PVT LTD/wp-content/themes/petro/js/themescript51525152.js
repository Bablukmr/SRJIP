jQuery(document).ready(function($){
  'use strict';


  // Woocommerce

   $('body').on('added_to_cart',function(e, fragments, data){

        var item_count = (fragments['cart_content_count']) ? fragments['cart_content_count'] : 0;
        $('.shop-cart .cart-count').html('<span>'+item_count+'</span>');
    });

  // smooth scroll anchor

     var url_test=location.hash;

     if(url_test!=''){
        lets_Scroll($(url_test));
     }


    $("a[href*='#']:not([href='#'])").on("click", function(e) {

        if($(this).closest('.woocommerce-tabs').length || $(this).data('toggle')=='tab' || $(this).data('toggle')=='collapse' || $(this).data('slide')=='next' || $(this).data('slide')=='prev'
          || $(this).is('#cancel-comment-reply-link')  || $(this).is('.comment-reply-link') || $(this).is('.woocommerce-review-link') || $(this).is('.ui-tabs-anchor') 
          || typeof $(this).data('vc-container')=='string' || $(this).closest('.vc_tta-tabs-list').length || $(this).closest('.wpb_accordion_section').length || $(this).closest('.nav-tabs').length){
          return;
        }
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

            var target = $(this.hash);
            if(target.length){
              e.preventDefault();
              lets_Scroll(target);
            }
        }

    });


    function lets_Scroll(target){

           var scroll,navbar=$('#top-bar'),offset=0;
           var ua = window.navigator.userAgent;
           var msie = ua.indexOf("MSIE ");

            var target = target.length ? target : $("[id=" + this.hash.slice(1) + "]");
            scroll = target.offset().top;

            if(navbar.length){
               offset=navbar.outerHeight(true)+parseInt($('html').css('margin-top'));
            }

            if (target.length) {

                if (typeof document.body.style.transitionProperty === 'string' && !msie) {

                    var avail = $(document).height() - $(window).height();

                    if (scroll > avail) {
                        scroll = avail;
                    }


                    $("body").css({
                        "margin-top" : ( $(window).scrollTop() - scroll + offset) + "px",
                        "transition" : "1s ease-in-out"
                    }).data("transitioning", true);

                } else {
                    $("html, body").animate({
                        scrollTop: scroll-offset
                    }, 1000);
                    return;
                }
            }

        $("body").on("transitionend webkitTransitionEnd msTransitionEnd oTransitionEnd", function (e) {
        if (e.target == e.currentTarget && $(this).data("transitioning") === true) {
            $(this).removeAttr("style").data("transitioning", false);
            $("html, body").scrollTop(scroll-offset);
             return;
          }
        });
    } 


  /* =================================
  MAGNIFIC POPUP
  =================================== */

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,

      fixedContentPos: false
    });


  /* optin widget */

  if($('.widget.petro_optin').length){

    $('.widget.petro_optin').each(function(){
      var opt = $(this),$form=$('.optin-code form',opt);



            $('.optin-submit',opt).click(function(e){

              e.preventDefault();
              var name = $('input[name=optin_name]',opt).val(),email = $('input[name=optin_email]',opt).val();

              if(email!=''){
                   var findName = $form.find("input[name*=name], input[name*=NAME], input[name*=Name]").not("input[type=hidden]").val(name);
                   var findEmail = $form.find("input[name*=email], input[name*=EMAIL], input[type=email], input[name=eMail]").not("input[type=hidden]").val(email);
                   $form.submit();
                }
            });



    });


  }

 $(window).resize(function(){
  //  collapse-in

    var winWide = $(window).width();

    if( winWide <= 768){
      $('body').addClass('mobile');
  
    }
    else{

      $('body').removeClass('mobile');
    }


  /**
   * scroll to top
   */

    if($("#toTop").length){
     $(window).scroll(function () {

        var winHeight = $(window).height();

        if($('#wpadminbar').length){
          winHeight -= $('#wpadminbar').outerHeight();
        }

        if ($(this).scrollTop() > winHeight) {
          $("#toTop").fadeIn();
        } else {
          $("#toTop").fadeOut();
        }
      });

     $("#toTop").click(function () {
        $("body,html").animate({
          scrollTop: 0
        },
        800);
     });
    }


    if($('.top-heading.sticky').length){

      var tbar = ($('.navigation-bar-inner').length) ? $('.top-heading .navigation-bar') : $('.top-heading .icon-bar');
      var theight = tbar.outerHeight(true);

       tbar.affix({
        offset: {
          top:function(){
            var offsetTop =  2 + $('.top-heading').outerHeight(true) - theight;

            return (this.top = offsetTop);
          }
        }
      });

    }
  

 });


 // top bar search

 $('.icon-bar-inner .search-btn').click(function(e){
    e.preventDefault();

     var parent = $(this).closest('.icon-bar-inner');
     parent.toggleClass('search-open');

      $('body').click(function(event){
            if (!$(event.target).is(".search-btn, .icon-bar-inner .search-form *")){
              parent.removeClass('search-open');
            }
      });

 });



  $(window).resize();
  $(window).scroll();
});
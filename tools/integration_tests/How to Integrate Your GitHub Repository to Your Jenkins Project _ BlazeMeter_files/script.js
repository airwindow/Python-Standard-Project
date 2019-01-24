/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */
// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - https://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {
    // To understand behaviors, see https://drupal.org/node/756722#behaviors


    Drupal.behaviors.blazeng_custom_behavior = {
        attach: function (context, settings) {

            function track(category, label, action) {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push(
                    {
                        'ga_category': category,
                        'ga_label': label,
                        'ga_action': action
                    }
                );
            }

            var base = Drupal.settings.blazemeter.blazemeter_bza_url;
            var cookieName = Drupal.settings.blazemeter.blazemeter_cookie;



            jQuery(document).on("click", "#edit-submit--3", function () {
                var form = jQuery(this).closest("form");
                var pageUrl = window.location.href;
                var formId = "77725711-d16b-4337-933c-b1d949ccf632";
                var pageTitle = jQuery("title").text();
                sendDataToHubspotThroughTheServer(form, formId, pageUrl, pageTitle);
            });

            jQuery('html').keydown(function (eventObject) {
                if (eventObject.keyCode == 13 && jQuery("#edit-firstname").is(":focus")
                    || eventObject.keyCode == 13 && jQuery("#edit-lastname").is(":focus")
                    || eventObject.keyCode == 13 && jQuery("#edit-email").is(":focus")) {
                    jQuery("#edit-submit--3").click();
                    return false;
                }
            });

            function sendDataToHubspotThroughTheServer(form, formId, pageUrl, pageTitle) {
                var firstName = form.find("#edit-firstname").val();
                var lastName = form.find("#edit-lastname").val();
                var email = form.find("#edit-email").val();
                var url = "/sites/all/themes/blazeng/templates/additional_templates/_send_data_to_hubspot_register_form.php";
                if (validateEmail(email)) {
                    jQuery.ajax({
                        type: "POST",
                        url: url,
                        data: {
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            formId: formId,
                            pageUrl: pageUrl,
                            pageTitle: pageTitle
                        }
                    });
                }
            }


            loadUser();
            jQuery('#billing').show();
            jQuery('.billed-annually').addClass("active");
            jQuery('.starts-from').hide();
            $("#pro-test-number").addClass('pro-tests');
            $("#basic-test-number").addClass('basic-tests');

            var urlObject = url.parse(document.location.href);

            if (urlObject) {
                var queryObject = url.get(urlObject.query);

                if (queryObject["op"] == "Sign Up") {

                    setTimeout(function () {

                        var popupError = $('<div class="popupError">' + queryObject["error[error][0]"] + '</div>');
                        $('.popup-holder .title').after(popupError);

                        $("#edit-firstname").val(queryObject["firstname"]);
                        $("#edit-lastname").val(queryObject["lastname"]);
                        $("#edit-field-comp-0-value").val(queryObject["field_comp[0][value]"]);

                        $('#signup-popup').fadeIn();
                        $('div.fade').css({
                            'display': 'block',
                            'opacity': 1
                        });

                    }, 200);

                }
            }

            function loadUser() {

                var cookieValue = readCookie(cookieName);
                if (cookieValue.length > 0) {
                    var regex = /<\/?[^<]+(>|$)|[\/>]/ig;
                    var regex2 = /[<>=;/\\"]/ig;

                    cookieValue = JSON.parse(cookieValue);
                    uid = cookieValue.uid;
                    var accountId = cookieValue.account_id;
                    var subscriptionId = cookieValue.subscription_id;

                    var name = cookieValue.name;

                    while (name.match(regex2)) {
                        name = name.replace(regex, "").replace(regex2, "");
                    }

                    var plan = cookieValue.plan;
                    var nb = cookieValue.nb;
                    var email = cookieValue.email;

                    if (uid != 0) {

                        var freePlanCard = jQuery("#free-plan");
                        jQuery(".plan-block.most-popular").addClass("free-out");
                        freePlanCard.remove();


                        name = name.length > 0 ? name : email;
                        $("#sign-block").html("<div class='welcome'><span>Hello " + name + ".</span><a class='backToTests' href=\"" + base + "\">Back to your Tests</a><a class='logout' href=\"" + base + "/app/logout\">Logout</a></div>");
                        $("#sign-block").removeClass('not-logged');
                        $(".signup-link").hide();
                        $('.frontregi').hide();
                        $(".pricing-heading h1").text("Want to get more from your tests? Upgrade Now.");
                        $(".signup-btn").not(".main-signup-btn").hide();
                        $(".main-signup-btn").text("Get Started");

                        jQuery("#test_wizard_part1, #test_wizard_part2, #test_wizards_wrapper").hide();
                        jQuery("#features_page_wrapper #test_wizard_part2, #features_page_wrapper #test_wizards_wrapper").show();
                        jQuery("#blogs_top_banner_default").show();

                        var courses_link = "http://info.blazemeter.com/request-a-demo-getstarted1";
                        var jmeter_courses_link = "http://info.blazemeter.com/jmeter-training-course";
                        var webinar_link = "http://info.blazemeter.com/webinar";
                        var jmeter_academy_link = "/jmeter-tutorial";

                        //all get started buttons
                        var getStartedText = "Get Started";
                        jQuery(".get_started_button, .features_page_get_started_link, .api-get-started-link, .get_started_link, .middle-start-free, .bottom-start-free").html(getStartedText).addClass('button_for_register_users');
                        jQuery("#home_form_submit").html(getStartedText).addClass("for_loggedin").closest("form").attr("action", base + "/app");
                        jQuery(".api-get-started-button").addClass('api_button_for_register_users');

                        var blog_post_category = jQuery(".new_blog_blog_post_category").find("a").text();
                        var blog_url = window.location.pathname;

                        //blog side button
                        if (blog_url == "/blog" || blog_url == "/jmeter" || blog_post_category == "JMeter") {
                            jQuery(".new_blog_get_started_button").html("Start Learning").addClass('button_for_register_users');
                            jQuery(".new_blog_aside_start_testing p:first").addClass("learning_academy_text").html("JMeter&trade;<br>Academy<span id='blog_aside_second_line'>LEARN JMETER<br>IN 5 HOURS</span>").parent().find(".button_for_register_users").addClass("learning_academy");
                        } else {
                            jQuery(".new_blog_get_started_button").html("Register Now").addClass('button_for_register_users');
                            jQuery(".new_blog_aside_start_testing p:first").html("LIVE WEBINAR<span id='blog_aside_second_line'>Master BlazeMeter in 30 Minutes</span>").parent().find(".button_for_register_users").addClass("register_webinar");
                        }


                        jQuery(".section-pricing .cta-background.last .pricing-section-holder h2").text("5 Day Free JMeter Course").parent().find(".button_for_register_users").addClass("jmeter_courses");
                        jQuery("a.button_for_register_users:not('#free-info .button_for_register_users, .jmeter_courses, .node-type-api-testing .button_for_register_users')").attr("href", courses_link);
                        jQuery("a.jmeter_courses").attr("href", jmeter_courses_link);
                        if (base.length > 0) {
                            jQuery("#free-info .button_for_register_users").attr("href", base + '/app');
                        }
                        jQuery(document).on('click', '.button_for_register_users:not("#free-info .button_for_register_users, .jmeter_courses, .register_webinar, .learning_academy, .node-type-api-testing .button_for_register_users")', function () {
                            redirect_on_cources(courses_link);
                            return false;
                        });

                        jQuery(document).on("click", "#free-info .get_started_button.button_for_register_users", function () {
                            window.location.href = $(this).attr("href");
                        });

                        jQuery(document).on('click', '.register_webinar', function () {
                            redirect_on_cources(webinar_link);
                            return false;
                        });

                        jQuery(document).on('click', '.learning_academy', function () {
                            redirect_on_cources(jmeter_academy_link);
                            return false;
                        });

                        jQuery(document).on('click', '.jmeter_courses', function () {
                            redirect_on_cources(jmeter_courses_link);
                            return false;
                        });

                        jQuery(".hero").on("click", ".button_for_register_users", function () {
                            redirect_on_cources(courses_link);
                            return false;
                        });

                        jQuery('a:contains("Start Testing Now"), a:contains("GET STARTED")').bind("click", function () {
                            location.replace(base + '/app');
                            return false;
                        });

                        jQuery(".api-get-started-button.api_button_for_register_users, .api-get-started-link.button_for_register_users").unbind("click");

                        var formForRegisteredUsers = jQuery("#home_form, .section-features #input_test_form2, .input_test_form_blog_body, .input_test_form2_blog_body");
                        formForRegisteredUsers.attr("action", base + "/app");

                        jQuery(".features_page_inner_right").css({
                            "text-align": "center"
                        }).html("<img src='/new_images/features_page/substitution_image.png' alt=''>");


                        jQuery("#switch-free, #switch-basic, #switch-pro").addClass("recolor_plan_button");

                        jQuery(".page-blog .blog-sidebar, .node-type-blog .blog-sidebar").css("background-color", "white");
                        $("#billing").show();
                        $("#pro-test-number").addClass('pro-tests');
                        $("#basic-test-number").addClass('basic-tests');
                        $(".starts-from").css('display', 'none');
                        $('#switch-basic, #switch-pro, #switch-ondemand').removeClass('signup-btn');
                        $('#switch-basic, #switch-pro, #switch-ondemand').attr('href', '#');
                        $('.row-hidden, .pricing-section1 .row-hidden').show();
                        $('.row-start-testing').not("#free-start-testing").hide();
                        $('#free-start-testing a').text("Start Testing Now");
                        // Show "You are already signed up"
                        $(".dev-signed").show();
                        jQuery(".signup-button-holder").html('');
                        jQuery(".step__register .link-holder").html('<a class="signup">You are logged in</a>');
                        if (nb == false) {
                            $('#switch-basic.basic-annually, #switch-pro.pro-annually, #switch-ondemand').css('display', 'block');
                            $('#switch-basic, #switch-pro, #switch-ondemand').addClass('signed-up');
                        } else {
                            retrieveUserCard(plan, accountId);
                        }
                    }
                } else {
                    if (base.length > 0) {
                        var app_link = base + '/app';
                        jQuery("a.get_started_button, a.new_blog_get_started_button, a.bottom-start-free").attr("href", app_link);
                    }
                }
            }

            (function () {
                var localeLanguage = jQuery("#block-locale-language-content");
                var localeHtml = localeLanguage.wrap("<p>").parent().html();
                localeLanguage.unwrap();
                jQuery("#header_language_nav").html(localeHtml);
            })();

            function redirect_on_cources(courses_link) {
                location.href = courses_link;
            }

            function readCookie(c_name) {
                if (document.cookie.length > 0) {
                    c_start = document.cookie.indexOf(c_name + "=");
                    if (c_start != -1) {
                        c_start = c_start + c_name.length + 1;
                        c_end = document.cookie.indexOf(";", c_start);
                        if (c_end == -1) {
                            c_end = document.cookie.length;
                        }
                        return unescape(document.cookie.substring(c_start, c_end));
                    }
                }
                return "";
            }

            function loadPricingButtons(plan, buttonClass) {
                var sales_url = document.location.origin;
                sales_url = sales_url = "/contact-us#sales";
                $('#switch-basic.basic-monthly, #switch-pro.pro-monthly, #switch-ondemand').css('display', 'block');
                switch (plan) {
                    case 'FREETIER':
                    case 'freetier':
                    case null:
                    case 'FREE-TIER':
                    case "Free-Trial":
                        $('#switch-basic, #switch-pro, #switch-ondemand').addClass(buttonClass);
                        break;
                    case 'BASIC-MONTHLY':
                        $('#switch-basic.basic-monthly').off();
                        $('#switch-basic.basic-monthly').removeClass('main-btn');
                        $('#switch-basic.basic-monthly').removeClass('plan-switch');
                        $('#switch-basic.basic-monthly').html('Your Current Plan');
                        $('#switch-basic.basic-monthly').addClass('current-plan');
                        $('#switch-basic.basic-monthly').removeAttr('href');
                        $('#switch-basic.basic-annually').addClass(buttonClass);
                        $('#switch-pro.pro-annually').addClass(buttonClass);
                        $('#switch-pro.pro-monthly').addClass(buttonClass);
                        $(".billed-annually").click();
                        setTimeout(function () {
                            $(".billed-annually").click();
                        }, 500);
                        break;
                    case 'BASIC-ANNUAL':
                    case 'BASIC':
                        $('#switch-basic.basic-annually').off();
                        $('#switch-basic.basic-annually').removeClass('main-btn');
                        $('#switch-basic.basic-annually').removeClass('plan-switch');
                        $('#switch-basic.basic-annually').html('Your Current Plan');
                        $('#switch-basic.basic-annually').addClass('current-plan');
                        $('#switch-basic.basic-annually').removeAttr('href');
                        $('#switch-basic.basic-monthly').html('Contact Us').addClass('contact-us');
                        $('#switch-basic.basic-monthly').attr('href', sales_url);
                        $('#switch-pro.pro-annually').addClass(buttonClass);
                        $('#switch-pro.pro-monthly').html('Contact Us').addClass('contact-us');
                        $('#switch-pro.pro-monthly').attr('href', sales_url);
                        $(".billed-annually").click();
                        setTimeout(function () {
                            $(".billed-annually").click();
                        }, 500);
                        break;
                    case 'PRO-MONTHLY':
                    case 'PRO VUH Monthly':
                        $('#switch-pro.pro-monthly').off();
                        $('#switch-pro.pro-monthly').removeClass('main-btn');
                        $('#switch-pro.pro-monthly').removeClass('plan-switch');
                        $('#switch-pro.pro-monthly').html('Your Current Plan');
                        $('#switch-pro.pro-monthly').addClass('current-plan');
                        $('#switch-pro.pro-monthly').removeAttr('href');
                        $('#switch-pro.pro-annually').addClass(buttonClass);
                        $('#switch-basic.basic-annually').addClass(buttonClass);
                        $('.basic-monthly').html('Contact Us').addClass('contact-us');
                        $('.basic-monthly').attr('href', sales_url);
                        $(".billed-annually").click();
                        setTimeout(function () {
                            $(".billed-annually").click();
                        }, 500);
                        break;
                    case 'PRO-ANNUAL':
                    case 'PRO':
                    case 'Pro Annual VUH':
                        $('#switch-pro.pro-annually').off();
                        $('#switch-pro.pro-annually').removeClass('main-btn');
                        $('#switch-pro.pro-annually').removeClass('plan-switch');
                        $('#switch-pro.pro-annually').html('Your Current Plan');
                        $('#switch-pro.pro-annually').addClass('current-plan');
                        $('#switch-pro.pro-annually').removeAttr('href');
                        $('#switch-pro.pro-monthly').html('Contact Us').addClass('contact-us');
                        $('#switch-basic.basic-annually').html('Contact Us').addClass('contact-us');
                        $('.basic-annually, .basic-monthly').html('Contact Us').addClass('contact-us');
                        $('.basic-annually, .basic-monthly').attr('href', sales_url);
                        $('#switch-pro.pro-monthly').attr('href', sales_url);
                        $('#switch-basic.basic-annually').attr('href', sales_url);
                        $(".billed-annually").click();
                        setTimeout(function () {
                            $(".billed-annually").click();
                        }, 500);
                        break;
                    default:
                        $('#switch-basic, #switch-pro, #switch-ondemand').html('Contact Us').addClass('contact-us');
                        $('#switch-basic, #switch-pro, #switch-ondemand').attr('href', sales_url);
                }
                jQuery("a:contains('Contact Us')").bind("click", function () {
                    window.location.replace($(this).attr("href"));
                    return false;

                });
                jQuery('.billed-annually').addClass("active");
                jQuery('.billed-monthly').removeClass("active");
            }

            function retrieveUserCard(plan, accountId) {
                var xmlhttpUC = new XMLHttpRequest();
                xmlhttpUC.onreadystatechange = function () {
                    if (xmlhttpUC.readyState == 4) {
                        var response = JSON.parse(xmlhttpUC.response);
                        if (xmlhttpUC.status == 200) {
                            if (jQuery.isEmptyObject(response.result.data[0]) == false) {
                                $(".last-cc-number").val(response.result.data[0].last4);
                                loadPricingButtons(plan, 'has-card');
                            } else {
                                loadPricingButtons(plan, 'signed-up');
                            }
                        } else if (xmlhttpUC.status == 403) {
                            window.GLOB = {
                                accountStatus: "standard"
                            }
                        }
                    }
                };
                var apiUrl = "/api/v4/accounts/" + accountId;
                xmlhttpUC.open("GET", base + apiUrl + "/cards", true);
                xmlhttpUC.setRequestHeader('Content-type', 'application/json');
                xmlhttpUC.withCredentials = true;
                xmlhttpUC.send();
            }

            /* Leadership popup */

            //final width --> this is the quick view image slider width
            //maxQuickWidth --> this is the max-width of the quick-view panel

            var sliderFinalWidth = 400;
            var maxQuickWidth = 1000;

            //open the quick view panel
            $('.member-item-link a').on('click', function (event) {
                var selectedImage = $(this).parent().parent().parent().find('img');
                //console.log(selectedImage);
                //var slectedImageUrl = selectedImage.attr('src');
                var slectedImageUrl = selectedImage.attr('src');


                $('body').addClass('overlay-layer');
                animateQuickView(selectedImage, sliderFinalWidth, maxQuickWidth, 'open');

                //update the visible slider image in the quick view panel
                //you don't need to implement/use the updateQuickView if retrieving the quick view data with ajax
                //updateQuickView(slectedImageUrl);
                $('.cd-quick-view').removeClass('selected');
                $(this).parent().parent().parent().find('.cd-quick-view').addClass('selected');
            });

            //close the quick view panel
            $('body').on('click', function (event) {
                if ($(event.target).is('.cd-close') || $(event.target).is('body.overlay-layer')) {
                    closeQuickView(sliderFinalWidth, maxQuickWidth);
                }
            });
            $(document).keyup(function (event) {
                //check if user has pressed 'Esc'
                if (event.which == '27') {
                    closeQuickView(sliderFinalWidth, maxQuickWidth);
                }
            });

            //quick view slider implementation
            $('.cd-slider-navigation a').on('click', function () {
                updateSlider($(this));
            });

            //center quick-view on window resize
            $(window).on('resize', function () {
                if ($('.cd-quick-view').hasClass('is-visible')) {
                    window.requestAnimationFrame(resizeQuickView);
                }
            });

            function updateSlider(navigation) {
                var sliderConatiner = navigation.parents('.cd-slider-wrapper').find('.cd-slider'),
                    activeSlider = sliderConatiner.children('.selected').removeClass('selected');
                if (navigation.hasClass('cd-next')) {
                    (!activeSlider.is(':last-child')) ? activeSlider.next().addClass('selected') : sliderConatiner.children('li').eq(0).addClass('selected');
                } else {
                    (!activeSlider.is(':first-child')) ? activeSlider.prev().addClass('selected') : sliderConatiner.children('li').last().addClass('selected');
                }
            }

            function updateQuickView(url) {
                $('.cd-quick-view .cd-slider li').removeClass('selected').find('img[src="' + url + '"]').parent('li').addClass('selected');
            }

            function resizeQuickView() {
                var quickViewLeft = ($(window).width() - $('.cd-quick-view').width()) / 2,
                    quickViewTop = ($(window).height() - $('.cd-quick-view').height()) / 2;
                $('.cd-quick-view').css({
                    "top": quickViewTop,
                    "left": quickViewLeft,
                });
            }

            function closeQuickView(finalWidth, maxQuickWidth) {
                var close = $('.cd-close'),
                    activeSliderUrl = close.siblings('.cd-slider-wrapper').find('.selected img').attr('src'),
                    selectedImage = $('.empty-box').find('img');
                //update the image in the gallery
                if (!$('.cd-quick-view').hasClass('velocity-animating') && $('.cd-quick-view').hasClass('add-content')) {
                    selectedImage.attr('src', activeSliderUrl);
                    animateQuickView(selectedImage, finalWidth, maxQuickWidth, 'close');
                } else {
                    closeNoAnimation(selectedImage, finalWidth, maxQuickWidth);
                }
            }

            function animateQuickView(image, finalWidth, maxQuickWidth, animationType) {
                //store some image data (width, top position, ...)
                //store window data to calculate quick view panel position
                var parentListItem = image.parent('.member-item-image'),
                    topSelected = image.offset().top - $(window).scrollTop(),
                    leftSelected = image.offset().left,
                    widthSelected = image.width(),
                    heightSelected = image.height(),
                    windowWidth = $(window).width(),
                    windowHeight = $(window).height(),
                    finalLeft = (windowWidth - finalWidth) / 2,
                    finalHeight = finalWidth * heightSelected / widthSelected,
                    finalTop = (windowHeight - finalHeight) / 2,
                    quickViewWidth = (windowWidth * .8 < maxQuickWidth) ? windowWidth * .8 : maxQuickWidth,
                    quickViewLeft = (windowWidth - quickViewWidth) / 2;

                if (animationType == 'open') {
                    //hide the image in the gallery
                    parentListItem.addClass('empty-box');
                    //place the quick view over the image gallery and give it the dimension of the gallery image
                    $('.cd-quick-view').css({
                        "top": topSelected,
                        "left": leftSelected,
                        "width": widthSelected,
                    }).velocity({
                        //animate the quick view: animate its width and center it in the viewport
                        //during this animation, only the slider image is visible
                        'top': finalTop + 'px',
                        'left': finalLeft + 'px',
                        'width': finalWidth + 'px',
                    }, 1000, [400, 20], function () {
                        //animate the quick view: animate its width to the final value
                        $('.cd-quick-view').addClass('animate-width').velocity({
                            'left': quickViewLeft + 'px',
                            'width': quickViewWidth + 'px',
                        }, 300, 'ease', function () {
                            //show quick view content
                            $('.cd-quick-view').addClass('add-content');
                        });
                    }).addClass('is-visible');
                } else {
                    //close the quick view reverting the animation
                    $('.cd-quick-view').removeClass('add-content').velocity({
                        'top': finalTop + 'px',
                        'left': finalLeft + 'px',
                        'width': finalWidth + 'px'
                    }, 300, 'ease', function () {
                        $('body').removeClass('overlay-layer');
                        $('.cd-quick-view').removeClass('animate-width').velocity({
                            "top": topSelected,
                            "left": leftSelected,
                            "width": widthSelected,
                        }, 500, 'ease', function () {
                            $('.cd-quick-view').removeClass('is-visible');
                            parentListItem.removeClass('empty-box');
                        });
                    });
                }
            }

            function closeNoAnimation(image, finalWidth, maxQuickWidth) {
                if ($(".cd-quick-view")[0]) {
                    var parentListItem = image.parent('member-item-image'),
                        topSelected = image.offset().top - $(window).scrollTop(),
                        leftSelected = image.offset().left,
                        widthSelected = image.width();

                    //close the quick view reverting the animation
                    $('body').removeClass('overlay-layer');
                    parentListItem.removeClass('empty-box');
                    $('.cd-quick-view').velocity("stop").removeClass('add-content animate-width is-visible').css({
                        "top": topSelected,
                        "left": leftSelected,
                        "width": widthSelected
                    });
                }
            }


            var lnk = jQuery("#main_header a");
            var hashes = String(window.location.href.slice(window.location.href.indexOf('?') + 1).split('&'));
            var count_get_chars = hashes.length;
            var loc = window.location.href;
            var count_url_chars = loc.length;
            var clear_loc = loc.substring(0, (count_url_chars) - (count_get_chars + 1));

            var screen_width = jQuery(window).width();
            jQuery(window).resize(function () {
                screen_width = jQuery(window).width();
            });


            for (var j = 0; j < lnk.length; j++) {
                if(!jQuery(lnk[j]).hasClass("language-link")){
                    if(lnk[j].href.indexOf("/ja/") != -1){
                        lnk[j].href = lnk[j].href.replace('/ja', '');
                    }

                    if (
                        lnk [j].href == document.URL
                        || lnk [j].href == clear_loc
                        || (lnk[j].href.indexOf(window.location.pathname) != -1 && window.location.pathname != "/")) {
                        jQuery(lnk [j]).addClass('top_main_menu_current_link');
                    }
                }
            }


            jQuery(".section-usecases .features-groups .group-switch a, .features_page_text_links").removeAttr("style");

            jQuery(".get_started_button_second_main_slide").on('click', function () {
                location.href = "http://info.blazemeter.com/testing_opensourcetools?utm_source=hpbanner&utm_medium=BM&utm_campaign=webinar_mar9_stopwaitingstarttesting";
                return false;
            });


            jQuery('article, .blog-content, .region-header, #main__content--responsive, #main__content, .mobile-menu-flap-wrapper').on('click', function () {
                jQuery(".top_main_menu").removeClass('visible');
                jQuery("#main_mobile_hamburger").removeClass('move_hamburger');
                jQuery("#logo_image img").removeClass('hidden_main_logo');
                jQuery(".wrapper_mobile_hamburger").removeClass('moved');
            });


            jQuery('body').on('click', '#main_mobile_hamburger', function () {
                jQuery(".top_main_menu").toggleClass('visible');
                jQuery("#main_mobile_hamburger").toggleClass('move_hamburger');
                jQuery("#logo_image img").toggleClass('hidden_main_logo');
                jQuery(".wrapper_mobile_hamburger").toggleClass('moved');
            });

            jQuery(".top_main_menu_desctop li a:contains('Request a demo'), .top_main_menu_mobile li a:contains('Request a demo')").attr("target", "_blank").addClass("live-demo");

        }
    };

})(jQuery, Drupal, this, this.document);
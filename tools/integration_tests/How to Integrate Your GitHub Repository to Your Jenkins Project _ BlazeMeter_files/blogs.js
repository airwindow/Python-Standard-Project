jQuery(document).ready(function () {

    jQuery(".node-type-blog .node-blog-author").prependTo(".sidebars.blog-sidebar").show();
    var screen_height = jQuery(window).height();
    var screen_width = jQuery(window).width();

    //rebuild_layout2();
    var rebuild = false;

    var blogPosts = jQuery(".blog_post").not(".page-blogs-on-author .blog_post");
    var newBlogAsideHolder = jQuery("#new_blog_aside_holder");
    var subscrbLayout = jQuery("#subscrb_block").html();
    var advBlock = jQuery("#adv_block").html();
    var isExistOrLast = blogPosts[4] !== undefined ? blogPosts[4] : blogPosts[blogPosts.length >= 2 && blogPosts.length <= 4 ? 1 : 0];
    jQuery("<div class='blog_post adv_block' id='subscribe_block'></div>").insertAfter(isExistOrLast);
    jQuery(document).find("#subscribe_block").append(subscrbLayout);
    newBlogAsideHolder.html(subscrbLayout).css({visibility: "visible"});
    isExistOrLast = blogPosts[11] !== undefined ? blogPosts[11] : blogPosts[blogPosts.length - 1];
    jQuery("<div class='blog_post adv_block'>" + advBlock + "</div>").insertAfter(isExistOrLast);
    blogPosts = jQuery(".blog_post").not(".page-blogs-on-author .blog_post");
    var count_blogs = blogPosts.size();
    var count = 0;
    for (var i = 1; i < count_blogs; i += 3) {
        var blogsInLine = blogPosts.slice(i, i + 3);
        blogsInLine.wrapAll("<div class='new_blog_grouping_blogs'></div>");
        var highestItems = heightBlogsInline(blogsInLine);
        jQuery.each(blogsInLine, function (index, value) {
            var block = jQuery(value);
            if (block.hasClass("adv_block")) {
                block.find(".adv_inner_bottom").css({
                    minHeight: highestItems.highestSummary + highestItems.highestTitle - 8
                });


                if (count > 0) {
                    var bottomSecondBlock = block.find(".adv_inner_bottom");
                    jQuery(bottomSecondBlock).css({
                        minHeight: highestItems.highestSummary + highestItems.highestTitle + 88
                    })
                }
                count++;
            }
        });
    }



    function heightBlogsInline(blogsInLine) {
        var highestBlog = 0;
        var hightestSummary = 0;
        var highestTitle = 0;
        var contentHoldersInline = [];
        var contentTitlesInline = [];
        jQuery.each(blogsInLine, function (index, value) {
            var blogHeight = jQuery(value).height();
            var postContentHolder = jQuery(value).find(".post_content_holder");
            var postTitle = jQuery(value).find(".post_title");
            contentHoldersInline.push(postContentHolder);
            contentTitlesInline.push(postTitle);
            var summaryHight = postContentHolder.height();
            var titleHeight = postTitle.height();
            if (blogHeight > highestBlog) {
                highestBlog = blogHeight;
            }

            if (summaryHight > hightestSummary) {
                hightestSummary = summaryHight;
            }

            if (titleHeight > highestTitle) {
                highestTitle = titleHeight;
            }
        });

        blogsInLine.css({
            minHeight: highestBlog
        });


        contentHoldersInline.forEach(function (holder) {
            jQuery(holder).css({
                minHeight: hightestSummary
            });
        });

        contentTitlesInline.forEach(function (title) {
            jQuery(title).css({
                minHeight: highestTitle
            })
        });

        return {
            highestBlog: highestBlog,
            highestTitle: highestTitle,
            highestSummary: hightestSummary
        }
    }

    var subscribeForm = jQuery(".subscribe_form");
    var emailField = jQuery("#subscription_email_input");
    subscribeForm.submit(function (e) {
        e.preventDefault();
        var userEmail = emailField.val();
        var loader = jQuery(".subscribe_form_loader");
        if (validateEmail(userEmail)) {
            jQuery.ajax({
                url: "/blog",
                type: "POST",
                data: {
                    userEmail: userEmail
                },
                dataType: "json",
                beforeSend: function () {
                    loader.show();
                },
                success: function (data) {
                    if (data.updated.length > 0) {
                        var popup = jQuery(".subscr_thanks_opacity_layer");
                        showPopup(popup);
                        emailField.val("");
                        emailField.removeClass("error");
                        setErrorMessage("");
                    } else {
                        var message = data.discarded.length > 0 ? "You are already subscribed" : "";
                        message = data.invalidEmails.length > 0 ? "You must enter a valid email address" : message;
                        setErrorMessage(message, emailField);
                    }
                    loader.hide();
                }
            })
        } else {
            var message = userEmail.length == 0 ? "Email field is required" : "You must enter a valid email address";
            setErrorMessage(message, emailField);
        }
    });

    function setErrorMessage(message, emailField) {
        jQuery(".subscribe_form_error_message").text(message);
        if (emailField) {
            emailField.addClass("error");
        }
    }

    function showPopup(popup) {
        popup.fadeIn("fast").css({display: "flex"});
        popup.on("click", function (e) {
            var target = jQuery(e.target);
            if (target.hasClass("subscr_thanks_opacity_layer") || target.hasClass("subscr_close_popup")) {
                closePopup(popup);
            }
        });
    }

    function closePopup(popup) {
        popup.fadeOut("fast");
    }

    var longDoubleNameFix = jQuery(".new_blog_author_name:contains('Aleksey Merzlyakov and Sergey Horban')");
    jQuery.each(longDoubleNameFix, function (index, value) {
        var formattedName = "";
        var longName = jQuery(value).text();
        var limitLengthName = longName.indexOf("Sergey Horban");
        for (var a = 0; a < longName.length; a++) {
            formattedName += longName[a];
            if (a == limitLengthName - 1) {
                formattedName += "<br>";
            }
        }
        longDoubleNameFix.html(formattedName);
    });
    
    var blogs_category = jQuery("#new_blog_menu .field-content");
    blogs_category.find("a:contains('All')").attr("href", "/blog");
    blogs_category.find("a:contains('Authentication Testing')").attr("href", "/authentication-testing");
    blogs_category.find("a:contains('API Testing')").attr("href", "/api-testing");
    blogs_category.find("a:contains('JMeter')").attr("href", "/jmeter");
    blogs_category.find("a:contains('JMeter vs LoadRunner')").attr("href", "/jmeter-vs-loadrunner");
    blogs_category.find("a:contains('DevOps')").attr("href", "/devops-0");
    blogs_category.find("a:contains('Continuous Integration')").attr("href", "/continuous-integration");
    blogs_category.find("a:contains('Performance Testing')").attr("href", "/performance-testing");
    blogs_category.find("a:contains('Jenkins')").attr("href", "/jenkins-ci");
    blogs_category.find("a:contains('Testing Hacks')").attr("href", "/perfomance-short-cuts");
    blogs_category.find("a:contains('Selenium')").attr("href", "/selenium");
    blogs_category.find("a:contains('Software Testing')").attr("href", "/software-testing");
    blogs_category.find("a:contains('Mobile Testing')").attr("href", "/mobile-testing");
    blogs_category.find("a:contains('Black Friday')").attr("href", "/black-friday-performance-testing");
    blogs_category.find("a:contains('Load Testing')").attr("href", "/load-testing");
    blogs_category.find("a:contains('Testing Behind Firewalls')").attr("href", "/load-testing-behind-firewalls");
    blogs_category.find("a:contains('Swagger/Open API')").attr("href", "/swagger");
    blogs_category.find("a:contains('Gatling')").attr("href", "/gatling");
    blogs_category.find("a:contains('Locust')").attr("href", "/locust");
    blogs_category.find("a:contains('Live Streaming')").attr("href", "/live-streaming");
    blogs_category.find("a:contains('BlazeMeter')").attr("href", "/blazemeter");
    blogs_category.find("a:contains('Agile')").attr("href", "/agile");
    blogs_category.find("a:contains('Best Practices')").attr("href", "/performance-testing-best-practices");
    blogs_category.find("a:contains('GUI Testing')").attr("href", "/gui-testing");
    blogs_category.find("a:contains('Mainframe Testing')").attr("href", "/mainframe-testing-tutorial");


    var lnk = jQuery("#new_blog_menu a");
    var hashes = String(window.location.href.slice(window.location.href.indexOf('?') + 1).split('&'));
    var count_get_chars = hashes.length;
    var loc = window.location.href;
    var count_url_chars = loc.length;
    var clear_loc = loc.substring(0, (count_url_chars) - (count_get_chars + 1));

    var new_blog_post_category = jQuery(".new_blog_blog_post_category a").text();
    var new_blog_nav_category = jQuery(".node-type-blog .slick-track").find("a:contains(" + new_blog_post_category + ")")
        .filter(function () {
            return jQuery(this).text() === new_blog_post_category
        });

    if (new_blog_post_category == new_blog_nav_category.text()) {
        new_blog_nav_category.addClass('blog_category_active');
    }


    for (var j = 0; j < lnk.length; j++) {
        if (lnk [j].href == document.URL || lnk [j].href == clear_loc) {
            jQuery(lnk [j]).addClass("blog_category_active");
        }
    }

    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    jQuery("#blog_search_form").submit(function () {
        var search_val = jQuery("#search_blog_field").val();
        if (search_val.length > 0) {
            createCookie("new_search_text_cookie", search_val);
            search_val = encodeURI(search_val);
            location.href = "/search/node/" + search_val + "%20type%3Ablog";
        }
        return false;
    });

    jQuery('html').keydown(function (eventObject) {
        if (eventObject.keyCode == 13 && jQuery("#blog_search_form input[type='text']").is(":focus")) {
            jQuery("#search_blog_button").click();
            return false;
        }
    });

    jQuery(".new_blog_hamburger").on('click', function () {
        jQuery(".new_blog_menu").slideToggle("fast");
        jQuery(".new_blog_hamburger img").toggleClass("new_blog_hamburger_rotate_trangle");
    });


    var blog_post_category = jQuery(".new_blog_blog_post_category").find("a").text();
    var blog_url = window.location.pathname;
    var test_wizard_part1 = jQuery("#test_wizard_part1");
    test_wizard_part1.css({
        "visibility": "visible"
    });
    var test_wizard_part2 = jQuery("#test_wizard_part2");
    test_wizard_part2.css({
        "visibility": "visible"
    });
    if (blog_url == "/blog") {

    } else if (blog_post_category == "Testing Hacks" || blog_url == "/perfomance-short-cuts") {

    } else if (blog_post_category == "Performance Testing" || blog_url == "/performance") {

    } else if (blog_post_category == "Continuous Integration" || blog_url == "/continuous-integration") {

    } else if (blog_post_category == "JMeter" || blog_url == "/jmeter") {
        test_wizard_part1.hide();
        test_wizard_part2.show();
    } else if (blog_post_category == "Jenkins" || blog_url == "/jenkins-ci") {

    } else if (blog_post_category == "DevOps" || blog_url == "/devops-0") {

    } else if (blog_post_category == "Selenium" || blog_url == "/selenium") {

    } else if (blog_post_category == "Black Friday" || blog_url == "/black-friday-performance-testing") {

    } else if (blog_post_category == "API Testing" || blog_url == "/api-testing") {
        addAssertField();
        apiTestWizardChangeText();
        positionAssertTestButton(screen_width);
    } else if (blog_post_category == "Swagger/Open API" || blog_url == "/swagger") {
        addAssertField();
        apiTestWizardChangeText();
        positionAssertTestButton(screen_width);
    }

    function addAssertField(){
        jQuery(document).find(".user_assert_holder").not(".test_wizards_wrapper_blog_body .user_assert_holder").append(assertLayout());
    }

    function apiTestWizardChangeText(){
        var banner = jQuery("#blogs_top_banner");
        var testBannerTitle = banner.find("#test_wizards_wrapper h2");
        var inputField = banner.find(".input_test_url");
        inputField.val("https://api.demoblaze.com/entries");
        testBannerTitle.html("Test your API now! <span id='typewriter'></span>");
        banner.addClass("api_test_wizard");
    }


    function positionAssertTestButton(screen_width) {
        var button = jQuery("#input_test_submit");
        var assert = jQuery(".user_assert_holder");
        if (blog_post_category == "Authentication Testing" || blog_url == "/authentication-testing" || blog_post_category == "Swagger/Open API" || blog_url == "/swagger") {
            if (screen_width < 786) {
                button.insertAfter(assert);
            } else {
                button.insertBefore(assert);
            }
        }
    }

    function assertLayout() {
        return '<span class="user_assert_info_text">Assert:</span>' +
            ' <input class="user_assert" name="initialTestAssertionContainsText" placeholder="Your assertion" type="text" />' +
            ' <span class="user_assert_info_text">is found in response</span> ' +
            '<input checked="checked" class="user_default_url" name="initialTestIsFunctional" style="display: none;" type="checkbox" />';
    }

    jQuery(".node-type-blog .single-post-content img").not("#voxsnap-player img, .recommended_small_images img, .test_wizard_part1_blog_body img, .test_wizard_part2_blog_body img, .inf_top img, .inf_footer_wrapper img, .inf_error_holder img").css({
        "height": "auto",
        "width": "100%",
        "max-width": "100%"
    }).wrap("<span class='new_blog_image_holder'></span>").parent().prepend("<img class='increase' src='/new_images/new_blog/increase.png' alt='Increase image'>").parent().removeAttr("class").css({
        "display": "inline-block",
        "width": "100%",
        "text-align": "center",
        "position": "relative"
    });


    jQuery(".node-type-blog .single-post-content table").wrap("<div class='table_wrapper'></div>");

    jQuery(".node-type-blog .single-post-content iframe").attr({
        "width": "100%"
    }).wrap("<div class='iframe_wrapper'></div>").parent().addClass("iframe_center");


    var increase_opacity_holder = jQuery(".increase_opacity_holder");
    var increase_image = jQuery(".increase_image");
    var increase_opacity_layer = jQuery(".increase_opacity_layer");
    var increase_image_start_width = null;
    var blogContent = jQuery(".blog-content");
    var top_point = blogContent.offset().top;
    var blogSideBar = jQuery(".blog-sidebar");
    var widthBlogSideBar = blogSideBar.width();

    if (blogContent.height() < blogSideBar.height()) {
        blogContent.css({minHeight: blogSideBar.height() + 200})
    }

    function widthStickySideBar() {
        newBlogAsideHolder.css({width: widthBlogSideBar});
    }


    function appendBrackets(){
        var brackets = jQuery(".with_brackets");
        jQuery.each(brackets, function (index, value) {
            var block = jQuery(value);
            var blockHeight = block.outerHeight();
            console.log(blockHeight);
            block.find(".bracket").remove();
            block.prepend("<img style='min-width: 50px; position: absolute; left: 0; top: 0; height: " + blockHeight + "px' class='bracket left_bracket' src='/new_images/new_blog/left_bracket.svg'>");
            block.append("<img style='min-width: 50px; position: absolute; right: 0; top: 0; height: " + blockHeight + "px' class='bracket right_bracket' src='/new_images/new_blog/right_bracket.svg'>");
        });
    }

    appendBrackets();

    jQuery(window).resize(function () {
        widthStickySideBar();
        widthBlogSideBar = blogSideBar.width();
        screen_width = jQuery(window).width();
        screen_height = jQuery(window).height();
        top_point = jQuery(".blog-content").offset().top;
        rebuild_layout();
        center_image(increase_opacity_holder);
        //rebuild_layout2();
        positionAssertTestButton(screen_width);
        appendBrackets()
    });



    jQuery(window).on("orientationchange", function () {
        repeated_center();
    });


    var url_current_image = null;
    jQuery(document).on("click", ".increase", function () {
        url_current_image = jQuery(this).next("img").attr("src");
        increase_image.attr("src", url_current_image).css({
            "max-height": jQuery(window).height()
        });
        increase_opacity_holder.fadeIn("fast");
        increase_opacity_layer.fadeIn("fast");
        increase_image_start_width = increase_image.width();
        repeated_center();
        if (screen_width > 768) {
            stop_scrolling();
        }
        return false;
    });

    jQuery(document).on("click", ".node-type-blog ol li .increase, .small_image .increase", function () {
        jQuery(".increase_close").addClass("small");
    });


    jQuery(document).on("click", ".increase_opacity_layer, .increase_close", function () {
        increase_opacity_holder.fadeOut("fast");
        increase_opacity_layer.fadeOut("fast");
        increase_image.removeAttr("style").removeClass("zoom_image");
        setTimeout(function () {
            jQuery(".increase_close").removeClass("small");
        }, 500);
        start_scrolling();
    });


    jQuery(document).on("click", ".increase_image", function () {
        jQuery(this).toggleClass("zoom_image");
        if (jQuery(this).hasClass("zoom_image")) {
            increase_image.css({
                "width": increase_image_start_width * 1.5,
                "max-height": jQuery(window).height()
            });
            repeated_center();
        } else {
            increase_image.css({
                "width": increase_image_start_width,
                "max-height": jQuery(window).height()
            });
            repeated_center()
        }
    });


    function repeated_center() {
        var last_width = center_image(increase_opacity_holder).image_width;
        var center_interval = setInterval(function () {
            if (center_image(increase_opacity_holder).image_width !== last_width) {
                last_width = center_image(increase_opacity_holder).image_width;
            } else {
                clearInterval(center_interval);
            }
        }, 10);
    }


    function center_image(img) {
        var image_height = img.height();
        var image_width = img.width();
        screen_height = jQuery(window).height();
        var window_width = jQuery(window).width();
        var center_top = screen_height / 2 - image_height / 2;
        var center_left = window_width / 2 - image_width / 2;
        if (center_top <= 0) {
            img.css({
                "top": 0,
                "left": center_left,
                "max-height": screen_height
            })
        } else {
            if (center_left <= 3) {
                img.css({
                    "top": center_top,
                    "left": 0,
                    "max-height": screen_height
                })
            } else {
                img.css({
                    "top": center_top,
                    "left": center_left,
                    "max-height": screen_height
                })
            }
        }

        return {
            "image_width": image_width,
            "image_height": image_height
        }
    }


    var isSummomeAppeared = false;

    var summome_height = 34;
    var navHolder = jQuery("#nav_holder");
    var header = jQuery("#main_header");
    jQuery(document).on('DOMNodeInserted', function (e) {
        var element = e.target;
        if (jQuery(element).hasClass("sumome-smartbar-popup")) {
            navHolder.css({
                marginTop: summome_height + header.height() + 10
            });
            isSummomeAppeared = true;
        }

    });

    jQuery(document).on('DOMNodeRemoved', function (e) {
        var removed_element = e.target;
        if (jQuery(removed_element).hasClass("smartbar-popup")) {
            navHolder.css({
                marginTop: "initial"
            });
            isSummomeAppeared = false;
        }

    });


    function stickySidebar(sticker, stopper) {
        widthStickySideBar();
        var offsetTop = 60;
        var offsetBottom = 100;
        var stickerPosition = sticker.offset().top;
        var stopperPosition = stopper.offset().top;
        var windowHeight = jQuery(window).height();
        var stickerHight = sticker.height();
        jQuery(window).scroll(function () {
            if (!rebuild) {
                var st = jQuery(this).scrollTop();
                stopperPosition = stopper.offset().top;
                windowHeight = jQuery(window).height();
                if (stickerPosition <= st + offsetTop ) {
                    if (st + stickerHight + offsetTop >= stopperPosition - offsetBottom) {
                        sticker.css({
                            position: 'fixed',
                            top: -((st + stickerHight) - stopperPosition + offsetBottom)
                        });
                    } else {
                        sticker.css({
                            position: 'fixed',
                            top: offsetTop
                        });
                    }

                } else {
                    sticker.css({
                        position: 'absolute',
                        top: 'initial'
                    })
                }
            } else {
                sticker.removeAttr("style");
            }
        })
    }


    var sticker = newBlogAsideHolder;
    var stopper = jQuery("#footer");
    stickySidebar(sticker, stopper);

    // check if operating system is Mac or Ios and rebuilding
    // page from another screen size because Mac and Ios not include scrollbar
    var platform = navigator.platform;
    var isMac = platform.indexOf('Mac') > -1;
    var iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    var isIos = iosPlatforms.indexOf(platform) !== -1;
    var rebuild_screen_size = 1235;
    if(isMac || isIos) {
        rebuild_screen_size = 1250;
    }

    function rebuild_layout() {
        if (screen_width <= rebuild_screen_size) {
            jQuery(".sidebars.blog-sidebar").insertBefore(".node-type-blog .blog-content-center");
            jQuery(".node-type-blog .region-sidebar-first").insertAfter(".node-type-blog .send-us-a-pitch-block");
            jQuery(".page-blogs-on-author .region-sidebar-first").appendTo(".page-blogs-on-author .blog-content");
            jQuery(".page-blogs-on-author .node-blog-author").prependTo(".page-blogs-on-author .blog-content-center");
            rebuild = true;
        } else {
            jQuery(".node-type-blog .sidebars.blog-sidebar").insertAfter(".node-type-blog .blog-content-center");
            jQuery(".node-type-blog .region-sidebar-first").insertAfter(".node-type-blog .node-blog-author");
            jQuery(".page-blogs-on-author .region-sidebar-first").appendTo(".sidebars.blog-sidebar");
            jQuery(".page-blogs-on-author .node-blog-author").prependTo(".block-nodeblock.first");
            rebuild = false;
        }
    }

    setTimeout(rebuild_layout, 0);

    function stop_scrolling() {
        var x = window.scrollX;
        var y = window.scrollY;
        var menu = jQuery("#new_blog_menu");
        var menuY = menu.offset().top;
        var height = menu.height();
        window.onscroll = function () {
            window.scrollTo(x, y);
            menu.css({
                "top": menuY - height + 62
            })
        };
    }

    function start_scrolling() {
        window.onscroll = function () {
        };
    }

    var recomendations_links = jQuery(".node-type-blog .recomendations-block .block-title a");
    var rec_default_image = '/new_images/new_blog/default_image.png';
    var rec_default_author = "BlazeMeter";
    jQuery.each(recomendations_links, function (index, value) {
        var current_element = jQuery(value);
        current_element.attr("target", "_blank").addClass("title_link");
        var recomendation_link_primary = current_element.attr("href");
        var check_link = recomendation_link_primary.indexOf("/shiftleft") != -1 || recomendation_link_primary.indexOf("/blog") != -1;
        var recomendation_link = null;
        if (check_link) {
            var isBlogLink = recomendation_link_primary.indexOf("/blog");
            var isShiftLink = recomendation_link_primary.indexOf("/shiftleft");
            var strIndex = isBlogLink != -1 ? isBlogLink : isShiftLink;
            var internal_link = recomendation_link_primary.substring(strIndex);
            var protocol = location.protocol;
            var domain = location.hostname;
            recomendation_link = protocol + "//" + domain + internal_link;
        } else {
            recomendation_link = recomendation_link_primary;
        }
        jQuery("<div class='rec_image_holder'></div>").insertBefore(current_element);
        if (check_link) {
            var imageHolder = current_element.prev(".rec_image_holder");
            imageHolder.load(recomendation_link + " .blog_post_top_image_holder img, .date_holder", function (response, status, xhr) {
                if (status == "error") {
                    current_element.prev(".rec_image_holder").append("<a class='image_wrap_link' target='_blank' href='" + recomendation_link_primary + "'><img src=" + rec_default_image + "></a>");
                } else {
                    if (current_element.prev(".rec_image_holder").find("img").length > 0) {
                        current_element.attr("href", recomendation_link).prev(".rec_image_holder").find("img").wrap("<a class='image_wrap_link' target='_blank' href=" + recomendation_link + "></a>");
                    } else {
                        current_element.prev(".rec_image_holder").append("<a class='image_wrap_link' target='_blank' href='" + recomendation_link_primary + "'><img src=" + rec_default_image + "></a>");
                    }

                }

                var postDate = imageHolder.find(".date_holder");
                var author = imageHolder.parent().find(".rec_author");
                postDate.insertBefore(author);
            });
        } else {
            var recommended_small_images = jQuery(".recommended_small_images img").get(index);
            if (recommended_small_images) {
                var rec_image = jQuery(recommended_small_images).attr("src");
                current_element.prev(".rec_image_holder").append("<a target='_blank' href='" + recomendation_link_primary + "'><img src=" + rec_image + "></a>");
            } else {
                current_element.prev(".rec_image_holder").append("<a target='_blank' href='" + recomendation_link_primary + "'><img src=" + rec_default_image + "></a>");
            }
        }

        jQuery("<div class='rec_author'></div>").insertAfter(current_element);
        if (check_link) {
            current_element.next(".rec_author").load(recomendation_link + " .new_blog_top_author_photo_name", function (response, status, xhr) {
                if (status == "error") {
                    jQuery(this).text(rec_default_author);
                }
            });
        } else {
            var recommended_author = jQuery(".recommended_authors .field-item").get(index);
            if (recommended_author) {
                var rec_author = jQuery(recommended_author).text();
                var author_id = jQuery(".author_blog_taxonomy_hidden_name:contains('" + rec_author + "')").attr("author_taxonomy_id");
                if (author_id != undefined) {
                    current_element.next(".rec_author").html("<a href='/blogs-on-author/" + author_id + "'>" + rec_author + "</a>");
                } else {
                    current_element.next(".rec_author").html(rec_author);
                }
            } else {
                current_element.next(".rec_author").text(rec_default_author);
            }
        }

    });

    setTimeout(function () {
        jQuery.each(jQuery('.author_blog_hidden_name'), function (index, value) {
            var hidden_name = jQuery(value).text();
            var image = jQuery(value).prev().find("img").attr("src");
            jQuery(".recomendations-block .new_blog_top_author_photo_name:contains(" + hidden_name + ")").parent().prev().find("img").attr("src", image)
        });

        jQuery.each(jQuery(".author_blog_taxonomy_hidden_name"), function (index, value) {
            var hidden_name = jQuery(value).text();
            var taxonomy_id = jQuery(value).attr("author_taxonomy_id");
            jQuery(".recomendations-block .new_blog_top_author_photo_name:contains(" + hidden_name + ")").wrapInner("<a href='/blogs-on-author/" + taxonomy_id + "'></a>");
        });

        var rec_blog_posts = jQuery(".rec_block_holder");
        var rec_count_blogs = rec_blog_posts.size();
        for (var i = 0; i < rec_count_blogs; i += 3) {
            rec_blog_posts.slice(i, i + 3).wrapAll("<div class='rec_blog_grouping_blogs'></div>");
        }

        //var groupingPosts = jQuery(document).find(".rec_blog_grouping_blogs");
        //jQuery.each(groupingPosts, function(index, value){
        //   console.log(value);
        //});

        var max_height = 0;
        var rec_titles = jQuery(".rec_image_holder + a");
        jQuery.each(rec_titles, function (index, value) {
            var rec_height_title = jQuery(value).height();
            if (rec_height_title > max_height) {
                max_height = rec_height_title;
            }
        });

        rec_titles.css({
            "min-height": max_height + 15
        });

        jQuery("#hidden_authors").remove();

    }, 2500);


    var player;

    function onYouTubeIframeAPIReady() {
        var inf_exists = jQuery(".inf_youtube").length > 0;
        if (inf_exists) {
            var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            if (isSafari) {
                setTimeout(function () {
                    player = new YT.Player('inf_youtube', {
                        events: {
                            'onReady': onPlayerReady
                        }
                    });
                }, 100);
            } else {
                player = new YT.Player('inf_youtube', {
                    events: {
                        'onReady': onPlayerReady
                    }
                });
            }
        }

    }

    function onPlayerReady() {
        player.playVideo();
        // Mute!
        player.mute();
    }

    onYouTubeIframeAPIReady();


    jQuery(".recomendations-block .view-content").children().addClass("rec_block_holder");


    jQuery(".blog_body_download_file").bind("click", function (e) {

        e.preventDefault();
        jQuery(this).wrap("<div class='downloaded_files_wrapper'></div>");
        var jmxFiles = jQuery("#hidden_files").find("a");
        if (jmxFiles.length == 1) {
            var pathToSingleJmxFile = jQuery(jmxFiles[0]).attr("href");
            download(pathToSingleJmxFile);
        } else {
            var linkChoice = [];
            var countFiles = jmxFiles.length;
            for (var i = 0; i < countFiles; i++) {
                var pathToJmxFile = jQuery(jmxFiles[i]).attr("href");
                linkChoice[i] = "<p><a class='choice_file' href='" + pathToJmxFile + "'>" + baseName(pathToJmxFile) + "</a></p>";
            }

            var list_files_holder = jQuery(".list_files_holder");
            if (list_files_holder.length == 0) {
                jQuery("<div class='list_files_holder'></div>").insertAfter(jQuery(this)).append(linkChoice).slideToggle("fast");
            } else {
                list_files_holder.slideToggle("fast");
            }
        }
        return false;
    });

    jQuery(document).on("click", ".choice_file", function (e) {
        e.preventDefault();
        var pathToSelectedFile = jQuery(this).attr("href");
        download(decodeURIComponent(pathToSelectedFile));
        return false;
    });

    function download(pathToJmxFile) {
        var pathToDownload = "/sites/all/themes/blazeng/download.php?file=" + pathToJmxFile;
        window.open(pathToDownload);
    }

    function baseName(str) {
        var base = String(str).substring(str.lastIndexOf('/') + 1);
        if (base.lastIndexOf(".") != -1)
            base = base.substring(0);
        return base;
    }

    function blackFridayLayout() {
        var blackFridayLink = 'http://info.blazemeter.com/request-a-demo-post-black-friday';
        return '' +
            '<div id="black_friday_header">' +
            '<div id="black_friday_header_inner_holder">' +
            '<div id="black_friday_logo">' +
            '<a class="tm_black_friday_link" target="_blank" href="' + blackFridayLink + '" target="_blank">' +
            '<img src="/new_images/main_b_images/black_friday.png" align="Black friday">' +
            '</a>' +
            '</div>' +
            '<div class="timer_holder">' +
            '<div class="days_block timer_block">' +
            '<div class="number_holder">' +
            '<p class="days number">0</p>' +
            '<span class="colon">:</span>' +
            '</div>' +
            '<p class="days_text timer_text">DAYS</p>' +
            '</div>' +
            '<div class="hours_block timer_block">' +
            '<div class="number_holder">' +
            '<p class="hours number">0</p>' +
            '<span class="colon">:</span>' +
            '</div>' +
            '<p class="hours_text timer_text">HOURS</p>' +
            '</div>' +
            '<div class="minutes_block timer_block">' +
            '<p class="minutes number">0</p>' +
            '<p class="minutes_text timer_text">MINUTES</p>' +
            '</div>' +
            '<div class="bf_get_ready_button_holder">' +
            '<a class="bf_get_ready_button" href="http://info.blazemeter.com/request-a-demo-post-black-friday" target="_blank">Get Ready</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    }

});

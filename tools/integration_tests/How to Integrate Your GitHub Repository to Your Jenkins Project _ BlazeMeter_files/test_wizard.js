jQuery(document).ready(function () {

    var current_test = null;

    var screen_height = jQuery(window).height();
    jQuery(window).resize(function () {
        screen_height = jQuery(window).height();
        detectTop();
    });

    jQuery('html').keydown(function (eventObject) {
        if (eventObject.keyCode == 13 && jQuery(".input_test_url, .user_assert").is(":focus")) {
            current_test = jQuery("#test_wizard_part1");
            return validTestWizard(".input_test_url");
        }
        if (eventObject.keyCode == 13 && jQuery(".input_test_url_blog_body").is(":focus")) {
            current_test = jQuery(".input_test_url_blog_body:focus").closest(".test_wizard_part1_blog_body");
            if(current_test){
                var assert = current_test.find(".user_assert_holder");
                if(assert.length > 0){
                    jQuery("#twenty_vu").hide();
                }
            }

            var input_test_url_blog_body = current_test.find(".input_test_url_blog_body");
            return validTestWizard(input_test_url_blog_body);
        } else if (eventObject.keyCode == 13 && jQuery("#jmx_file").is(":focus")) {
            current_test = jQuery("#test_wizard_part2");
            return false;
        } else if (eventObject.keyCode == 13 && jQuery("#jmx_file_blog_body").is(":focus")) {
            current_test = jQuery(".test_wizard_part2_blog_body");
            return false;
        } else {
            return true;
        }
    });


    var bounce = jQuery(".bounce");
    var input_test_url = jQuery(".input_test_url, .input_test_url_blog_body");

    input_test_url.keyup(function () {
        var letter = jQuery(this).val();
        if (letter.length > 0) {
            bounce.hide();
        } else {
            bounce.show();
        }
    });

    var isUserAssert = jQuery(".user_assert_holder").children().length > 0;
    var typedText = isUserAssert ? "Enter Your <span id='url_accent'>GET</span> request and click Start" : "Enter Your <span id='url_accent'>URL</span> to Get Started";
    jQuery("#typewriter").typed({
        strings: [typedText],
        typeSpeed: 50,
        contentType: 'html',
        startDelay: 1500,
        callback: function () {
            jQuery("#url_accent").addClass("animate");
        }
    });

    var extension = ".jmx";
    jQuery("#jmx_file").on('change', function () {
        var file_name = jQuery(this).val();
        var file_name_length = file_name.length;
        var upload_text = jQuery("#upload_text");
        var upload_image = jQuery("#upload_image");
        var input_test_submit2 = jQuery("#input_test_submit2");
        var err_msg = jQuery("#input_test_form2 .error_msg");
        file_name = file_name.substring(file_name.lastIndexOf("\\") + 1, file_name_length);


        if (file_name.endsWith(extension)) {
            err_msg.hide();
        } else {
            err_msg.show();
        }

        if (file_name_length == 0) {
            file_name = "Upload Your JMeter File";
            upload_image.addClass("flash");
            input_test_submit2.removeClass("flash");
            err_msg.hide();
        } else if (!file_name.endsWith(extension)) {
            upload_image.addClass("flash");
            input_test_submit2.removeClass("flash");
            err_msg.show();
        } else {
            upload_image.removeClass("flash");
            input_test_submit2.addClass("flash");
        }
        upload_text.html(file_name);
    });

    var jmxFileBlogBody = jQuery(".jmx_file_blog_body");
    var countJmxBlogBodyWidgets = jmxFileBlogBody.length;
    for (var i = 0; i < countJmxBlogBodyWidgets; i++) {
        var id = "jmx_blog_body_" + i;
        jQuery(jmxFileBlogBody[i]).attr("id", id);
        jQuery(jmxFileBlogBody[i]).prev("label").attr("for", id);

        jQuery(jmxFileBlogBody[i]).on('change', function () {
            var file_name = jQuery(this).val();
            var file_name_length = file_name.length;
            var currentForm = jQuery(this).closest("form");
            var upload_text = currentForm.find(".upload_text_blog_body");
            var upload_image = currentForm.find(".upload_image_blog_body");
            var input_test_submit2 = currentForm.find(".input_test_submit2_blog_body");
            var err_msg = currentForm.find(".error_msg");
            file_name = file_name.substring(file_name.lastIndexOf("\\") + 1, file_name_length);


            if (file_name.endsWith(extension)) {
                err_msg.hide();
            } else {
                err_msg.show();
            }

            if (file_name_length == 0) {
                file_name = "Upload Your JMeter File";
                upload_image.addClass("flash");
                input_test_submit2.removeClass("flash");
                err_msg.hide();
            } else if (!file_name.endsWith(extension)) {
                upload_image.addClass("flash");
                input_test_submit2.removeClass("flash");
                err_msg.show();
            } else {
                upload_image.removeClass("flash");
                input_test_submit2.addClass("flash");
            }
            upload_text.html(file_name);
        });
    }


    function validateURL(textval) {
        var urlregex = /^(https?:\/\/)?([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2,}))(:[0-9]+)*(\/?($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
        return urlregex.test(textval);
    }

    jQuery("#input_test_submit").on("click", function () {
        current_test = jQuery("#test_wizard_part1");
        var checkBoxChecked = current_test.find(".user_default_url:checked");
        var nameCheckboxField = current_test.find(".user_default_url").attr("name");
        if (checkBoxChecked.length == 0) {
            current_test.find("input[type='hidden'][name=" + nameCheckboxField + "]").remove();
            if (nameCheckboxField !== undefined) {
                current_test.find("#input_test_form").append("<input type='hidden' name='" + nameCheckboxField + "' value='false' />");
            }
        } else {
            jQuery("#twenty_vu").hide();
            jQuery("#arrangement_time").hide();
            checkBoxChecked.attr("value", "true");
            current_test.find("input[type='hidden'][name=" + nameCheckboxField + "]").remove();
        }
        return validTestWizard(".input_test_url");
    });

    jQuery(".input_test_submit_blog_body").on("click", function () {
        current_test = jQuery(this).closest(".test_wizard_part1_blog_body");
        var input_test_url_blog_body = jQuery(this).closest(".test_wizards_wrapper_blog_body").find(".input_test_url_blog_body");
        var assert = current_test.find(".user_assert_holder");
        if(assert.length > 0){
            jQuery("#twenty_vu").hide();
        }

        return validTestWizard(input_test_url_blog_body);
    });


    function validTestWizard(selector) {
        var user_url = jQuery(selector).val();
        var error_mesage = jQuery(selector).closest(".test_wizard").find(".error_mesage");
        if (user_url.length > 0 && validateURL(user_url)) {
            error_mesage.fadeOut("fast");
            if (typeof uid != 'undefined') {
                jQuery(selector).closest("form").submit();
            } else {
                startTest();
            }

            return false;
        } else {
            error_mesage.fadeIn("fast");
            return false;
        }
    }

    jQuery(".input_test_url, .input_test_url_blog_body").focusout(function () {
        jQuery(".error_mesage").fadeOut("fast");
    });

    jQuery("#input_test_submit2").on("click", function () {
        var file_val = jQuery("#jmx_file").val();
        current_test = jQuery("#test_wizard_part2");
        if (file_val.endsWith(extension)) {
            var featuresPage = jQuery(".section-features");
            if (typeof uid != 'undefined' && featuresPage.length > 0) {
                jQuery(".section-features #input_test_form2").submit();
            } else {
                startTest();
            }

            return false;
        }
        return false;
    });

    jQuery(".input_test_submit2_blog_body").on("click", function () {
        var jmxForm = jQuery(this).closest("form");
        var file_val = jmxForm.find(".jmx_file_blog_body").val();
        current_test = jQuery(".test_wizard_part2_blog_body");
        if (file_val.endsWith(extension)) {
            var featuresPage = jQuery(".section-features");
            if (typeof uid != 'undefined' && featuresPage.length > 0) {
                jQuery(".section-features #input_test_form2").submit();
            } else if (typeof uid != 'undefined') {
                jQuery(this).closest("form").submit();
            } else {
                startTest();
            }

            return false;
        }
        return false;
    });


    function detectTop() {
        var hs_form = jQuery(".hs-form");
        var confirm_popup = jQuery(".tw_close_confirm_holder");
        var hs_form_offset_top;
        if(hs_form.length > 0){
            hs_form_offset_top = hs_form.offset().top;
        }

        var confirm_popup_offset_top = confirm_popup.offset().top;
        var progress = jQuery("#tw_fake_test_inner_holder");
        var progress_offset = progress.offset().top;
        var sumome_smartbar_popup = jQuery("#sumome-smartbar-popup");
        var sumome_height = 0;
        if (sumome_smartbar_popup.length > 0) {
            sumome_height = sumome_smartbar_popup.height();
        } else {
            sumome_height = 0;
        }
        // if (screen_height < 800) {
        //     hs_form.css({
        //         "top": 0
        //     });
        //
        //     confirm_popup.css({
        //         "top": 0 - (sumome_height / 2)
        //     });
        // } else {
            hs_form.css({
                "top": 0
            });

            confirm_popup.css({
                "top": 0
            });
        // }
        return {
            "form_offset": hs_form_offset_top,
            "progress": progress_offset,
            "confirm_popup": confirm_popup_offset_top
        }
    }

    var duration = "slow";
    jQuery(document).on('DOMNodeInserted', ".hbspt-form .submitted-message", function () {
        var current_status = jQuery(".tw_current_status");
        var opacity_layer = jQuery(".hbspt-form");
        opacity_layer.fadeOut(duration);
        current_status.html("Creating Your Account.<br>Redirecting<span class='points'>.</span>");
        var count = 0;
        var points = jQuery(".points");
        setInterval(function () {
            points.append(".");
            count++;
            if (count == 5) {
                points.html("");
                count = 0;
            }
        }, 500);

        setTimeout(function () {
            if(current_test){
                current_test.find(".input_test_form").submit();
            }
        }, 2000);
    });


    function startTest() {
        fake_test_wizard();
    }

    function fake_test_wizard() {
        var fake_test_process = jQuery("#tw_fake_test_process");
        var page_wrapper = jQuery(".content-wrapper");
        var progress_bar_info = jQuery(".progress-bar-info");
        var width_progressbar = 25;
        var opacity_layer = jQuery(".hbspt-form");
        var hs_form = jQuery(".hs-form");
        var test_form_hidden_email = current_test.find(".user_email");
        var confirm_opacity_layer = jQuery(".tw_close_confirm");
        var confirm_close_holder = jQuery(".tw_close_confirm_holder");
        var popup_form = jQuery(".tw_pupup_form");
        jQuery.each(popup_form, function (index, value) {
            var exist_form = jQuery(value).find(".hs-form");
            if (exist_form.length == 0) {
                var lost_form = jQuery("body > .hs-form");
                jQuery(this).append(lost_form);
            }
        });

        hs_form.append("<div class='close'>&#10005;</div>");
        jQuery(document).find(".tw_terms").remove();
        hs_form.append("<div class='tw_terms'>At BlazeMeter, your time and privacy are just as important to us as they are to you. We use the information you provide to us under our legitimate interests to make sure you hear about topics of interest to you. If we got it wrong you can update your preferences by <a href='https://info.blazemeter.com/unsubscribe'>clicking here.</a> If you’d like to know more about how we use your personal information, you can read our <a href='https://www.ca.com/us/legal/privacy.html'>privacy statement here.</a></div>");
        fake_test_process.fadeIn(duration, function () {
            progress_bar_info.css({
                "width": width_progressbar + "%"
            });
            var percent = 0;
            var percentage = setInterval(function () {
                percent++;
                if (percent <= width_progressbar) {
                    progress_bar_info.text(percent + "%");
                } else {
                    clearInterval(percentage);
                }
            }, 2000 / width_progressbar);
        }).css("display", "flex");

        page_wrapper.fadeOut(duration);

        var delay = 1900;

        setTimeout(function () {
            if (current_test.attr("id") == "test_wizard_part1") {
                jQuery("#tw_pupup_form2").css("z-index", -9);
                jQuery("#tw_pupup_form_taurus").css("z-index", -9);
                jQuery("#tw_pupup_form_blog_body").css("z-index", -9);
                jQuery("#tw_pupup_form1").css("z-index", 9999);
            } else if (current_test.attr("id") == "test_wizard_part2" || current_test.hasClass("test_wizard_part2_blog_body")) {
                jQuery("#tw_pupup_form1").css("z-index", -9);
                jQuery("#tw_pupup_form_taurus").css("z-index", -9);
                jQuery("#tw_pupup_form_blog_body").css("z-index", -9);
                jQuery("#tw_pupup_form2").css("z-index", 9999);
            } else if (current_test.attr("id") == "taurus") {
                jQuery("#tw_pupup_form1").css("z-index", -9);
                jQuery("#tw_pupup_form2").css("z-index", -9);
                jQuery("#tw_pupup_form_blog_body").css("z-index", -9);
                jQuery("#tw_pupup_form_taurus").css("z-index", 9999);
            } else if (current_test.hasClass("test_wizard_part1_blog_body")) {
                jQuery("#tw_pupup_form1").css("z-index", -9);
                jQuery("#tw_pupup_form2").css("z-index", -9);
                jQuery("#tw_pupup_form_blog_body").css("z-index", 9999);
                jQuery("#tw_pupup_form_taurus").css("z-index", -9);
            }
            opacity_layer.fadeIn(duration).css({
                "display": "flex"
            });
            hs_form.css({
                "top": 0,
                "opacity": 1
            });
        }, delay);

        var progress_bar = jQuery("#tw_fake_test_inner_holder");
        if (screen_height < 800) {
            progress_bar.css({
                "top": 0
            })
        }
        setTimeout(function () {
            detectTop();
        }, delay);


        var user_email_keyup = "";
        var email_field = jQuery(".hs-form input[type='email']");
        email_field.on('input', function () {
            user_email_keyup = jQuery(this).val();
            test_form_hidden_email = current_test.find(".user_email");
            test_form_hidden_email.val(user_email_keyup);
        });


        var isClicked = false;
        hs_form.on('submit', function () {
            //e.preventDefault();
            var error_messages = jQuery(".hs-error-msgs");
            var user_email = jQuery(".hs-form input[type='email']").val();
            if (user_email_keyup == "") {
                if(current_test){
                    test_form_hidden_email = current_test.find(".user_email");
                    test_form_hidden_email.val(user_email);
                }

            }
            //var form = jQuery(this).closest("form");
            var userAssert = jQuery(".user_assert");
            if(userAssert.length > 0){
                var formFields = jQuery(this).find(".hs-form-field");
                var fieldsData = {};
                jQuery.each(formFields, function (index, value) {
                    var input = jQuery(value).find("input");
                    var fieldName = input.attr("name");
                    fieldsData[fieldName] = input.val();
                });
                if (current_test.hasClass("test_wizard_part1_blog_body")){
                    if(!isClicked){
                        sendDataToHubspot("208250", "493596b0-78f6-4964-bb7a-628958288a7d", fieldsData);
                        isClicked = true;
                    }
                } else {
                    if(!isClicked){
                        sendDataToHubspot("208250", "b7768506-c5a9-4e10-a966-cc03d9e8a9c3", fieldsData);
                        isClicked = true;
                    }

                }

            }

            return false;
        });

        var close = hs_form.find(".close");
        close.on("click", function () {
            detectTop();
            confirm_close_holder.removeAttr("style");
            confirm_opacity_layer.fadeIn("fast", function () {
                confirm_close_holder.css({
                    "top": -hs_form.height(),
                    "opacity": 1
                });
                detectTop();
            }).css({
                "display": "flex"
            });
            setTimeout(function () {
                detectTop();
            }, 1000);
        });

        jQuery(".confirm_button").on("click", function () {
            if (this.id == "abort") {
                confirm_opacity_layer.fadeOut(duration);
                opacity_layer.fadeOut(duration);
                fake_test_process.fadeOut(duration);
                page_wrapper.fadeIn(duration);
                setTimeout(function () {
                    hs_form.removeAttr("style");
                    confirm_close_holder.removeAttr("style");
                    progress_bar_info.removeAttr("style");
                    progress_bar_info.text(0 + "%");
                    current_test = null;
                }, 1000);
            } else if (this.id == "continue") {
                confirm_opacity_layer.fadeOut("fast");
            }
        });
    }


    var run_taurus = jQuery("#run_taurus_submit");
    run_taurus.on("click", function () {
        current_test = jQuery("#taurus");
        var configs = jQuery(".configs");
        var clone_configs = configs.clone();
        clone_configs.find(".editor_comment").remove();
        var string_yaml_style = clone_configs.text();
        var shield_string = escapeString(string_yaml_style);
        var urls = jQuery(".url_value .editable");
        var count_valid_urls = 0;
        var urls_length = urls.length;
        var same_urls = false;
        for (var i = 0; i < urls_length; i++) {
            if (validateURL(jQuery(urls[i]).text())) {
                jQuery(urls[i]).removeClass("not_valid");
                count_valid_urls++;
            } else {
                jQuery(urls[i]).addClass("not_valid");
            }
        }

        for (var k = 0; k < urls_length - 1; k++) {
            for (var h = k + 1; h < urls.length; h++) {
                if (jQuery(urls[k]).text() == jQuery(urls[h]).text()) {
                    jQuery(urls[k]).addClass("not_valid");
                    jQuery(urls[h]).addClass("not_valid");
                    same_urls = true;
                }
            }
        }

        var quote = '"';
        var editable_fields = jQuery(".editable");
        for (var j = 0; j < editable_fields.length; j++) {
            var editable_value = escapeString(jQuery(editable_fields[j]).text());
            shield_string = shield_string.replace(editable_value, quote + editable_value + quote);
        }

        if (count_valid_urls == urls.length && !same_urls) {
            var taurus_parameters = jQuery("#taurus_parameters");
            taurus_parameters.val(shield_string);
            startTest();
        }

    });

    function escapeString(string) {
        var shield_string = replaceAll(string, /\\/, "\\\\");
        shield_string = replaceAll(shield_string, "\"", "\\\"");
        return shield_string;
    }

    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

});

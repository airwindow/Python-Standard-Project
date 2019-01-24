function track(a, b, c) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: a + "-" + c,
        ga_category: a,
        ga_label: b,
        ga_action: c
    })
}
jQuery(function () {

    jQuery("#slack_authorize_link").on("click", function () {
        track("Slack Authorize", "Slack Authorize Button Click", "Slack Authorize Button");
        mixpanel.track("slack-authorize", {
            Originating_page: window.location.pathname,
            Originating_call_to_action: "Slack Authorize Button"
        });
    });

    jQuery("#subscribe_block .subscribe_submit").on("click", function () {
        track("Subscribe Blog", "Subscribe Blog Button Click", "Subscribe Blog Button");
        mixpanel.track("api-functional-testing", {
            Originating_page: window.location.pathname,
            Originating_call_to_action: "Subscribe Blog Button"
        });
    });

    jQuery(".api-get-started-button").bind("click", function(){
        track("Api Testing CTA Button", "Api Testing CTA Button Click", "Api Testing CTA Button");
        mixpanel.track("api-functional-testing", {
            Originating_page: window.location.pathname,
            Originating_call_to_action: "Api Testing CTA Button"
        });
    });

    jQuery(document).on("click", ".section-jmeter-tutorial .ta-signup-right-part form input[type='submit']", function(){
        setTimeout(function(){
            if(jQuery(".submitted-message").length > 0){
                track("JMeter Academy Submit Form", "JMeter Academy Submit Form Click", "JMeter Academy Submit Form Button");
                mixpanel.track("jmeter-academy-submit-form", {
                    Originating_page: window.location.pathname,
                    Originating_call_to_action: "JMeter Academy Submit Form"
                });
            }
        }, 1000);
    });

    jQuery("#free-info .main-btn.get_started_button").click(function(e){
        e.preventDefault();
        if(jQuery(".billed-annually").hasClass("active")){
            track("Free plan annual", "Free Plan annual Button Click", "Free Plan annual button pricing");
            mixpanel.track("free-plan-annual-pricing", {
                Originating_page: window.location.pathname,
                Originating_call_to_action: "Free Plan annual button pricing"
            });
        }

        if(jQuery(".billed-monthly").hasClass("active")){
            track("Free plan monthly", "Free Plan monthly Button Click", "Free Plan monthly button pricing");
            mixpanel.track("free-plan-monthly-pricing", {
                Originating_page: window.location.pathname,
                Originating_call_to_action: "Free Plan monthly button pricing"
            });
        }
    });

    jQuery("#basic-info .main-btn.get_started_button").click(function(e){
        e.preventDefault();
        if(jQuery(".billed-annually").hasClass("active")){
            track("Basic plan annual", "Basic Plan annual Button Click", "Basic Plan annual button pricing");
            mixpanel.track("basic-plan-annual-pricing", {
                Originating_page: window.location.pathname,
                Originating_call_to_action: "Basic Plan annual button pricing"
            });
        }

        if(jQuery(".billed-monthly").hasClass("active")){
            track("Basic plan monthly", "Basic Plan monthly Button Click", "Basic Plan monthly button pricing");
            mixpanel.track("basic-plan-monthly-pricing", {
                Originating_page: window.location.pathname,
                Originating_call_to_action: "Basic Plan monthly button pricing"
            });
        }
    });

    jQuery("#pro-info .main-btn.get_started_button").click(function(e){
        e.preventDefault();
        if(jQuery(".billed-annually").hasClass("active")){
            track("Pro plan annual", "Pro Plan annual Button Click", "Pro Plan annual button pricing");
            mixpanel.track("pro-plan-annual-pricing", {
                Originating_page: window.location.pathname,
                Originating_call_to_action: "Pro Plan annual button pricing"
            });
        }

        if(jQuery(".billed-monthly").hasClass("active")){
            track("Pro plan monthly", "Pro Plan monthly Button Click", "Pro Plan monthly button pricing");
            mixpanel.track("pro-plan-monthly-pricing", {
                Originating_page: window.location.pathname,
                Originating_call_to_action: "Pro Plan monthly button pricing"
            });
        }
    });

    jQuery(".enterprise-demo").click(function(){
        track("Enterprise plan monthly", "Enterprise Plan monthly Button Click", "Enterprise Plan monthly button pricing");
        mixpanel.track("enterprise-plan-monthly-pricing", {
            Originating_page: window.location.pathname,
            Originating_call_to_action: "Enterprise Plan monthly button pricing"
        });
    });

    jQuery("#input_test_submit, #input_test_submit2, .input_test_submit_blog_body").bind("click", function(){
        track("Signup", "Signup Button Click", "Start testing button test wizard");
        mixpanel.track("sign-up-impression", {
            Originating_page: window.location.pathname,
            Originating_call_to_action: "Start testing button test wizard"
        })
    });

    jQuery(document).on("click", ".hs_submit .hs-button", function(){
        track("Submit", "Submit Button Click", "Submit button test wizard");
        mixpanel.track("sign-up-submit", {
            Format: "email",
            Originating_page: window.location.pathname,
            Originating_call_to_action: "Start testing button test wizard"
        })
    });

    jQuery(".auth-block .signup-btn").bind("click", function () {
        track("Signup", "Signup Button Click", "Start testing button nav bar");
        mixpanel.track("sign-up-impression", {
            Originating_page: window.location.pathname,
            Originating_call_to_action: "Navigation bar"
        })
    });

    jQuery("#main_e_top_inner_left_container .get_started_button").bind("click", function () {
        track("Signup", "Signup Button Click", "Start testing button HP 3rd ");
        mixpanel.track("sign-up-impression", {
            Originating_page: window.location.pathname,
            Originating_call_to_action: "Start testing button HP 3rd "
        })
    });

    jQuery("#main_b_start_testing_now").bind("click", function () {
        track("Signup", "Signup Button Click", "Start testing button HP 1st ");
        mixpanel.track("sign-up-impression", {
            Originating_page: window.location.pathname,
            Originating_call_to_action: "Start testing button HP 1st "
        })
    });

    jQuery(".pricing .signup-btn").bind("click", function () {
        track("Signup", "Signup Button Click", "Start testing button Pricing");
        mixpanel.track("sign-up-impression", {
            Originating_page: window.location.pathname,
            Originating_call_to_action: "Start testing button Pricing "
        })
    });

    jQuery(".page-blog .get_started_button").bind("click", function () {
        track("Signup", "Signup Button Click", "Start testing button Blog 1st");
        mixpanel.track("sign-up-impression", {
            Originating_page: window.location.pathname,
            Originating_call_to_action: "Start testing button Blog top banner"
        })
    });

    jQuery(".btn-Google").bind("click", function () {
        track("Signup", "Signup Form", "Google + Signup click");
        mixpanel.track("sign-up-submit", {Format: "Google"})
    });

    jQuery("#signup-popup .form-submit").bind("click", function () {
        mixpanel.track("sign-up-submit", {Format: "email"})
    });

    jQuery(".section-contact-us #edit-submit--3").bind("click", function () {
        track("Contact Us", "Sales", "Form Submited")
    });

    jQuery("#edit-submit--4").bind("click", function () {
        track("Contact Us", "Support", "Form Submited")
    });

    jQuery("#edit-submit--5").bind("click", function () {
        track("Contact Us", "Press", "Form Submited")
    });

    jQuery("#blazemeter-site-commercial-register-c #edit-email").bind("focusout", function () {
        var a = jQuery(this).val();
        a.length > 0 && track("Signup", "Signup Form", "Insert Email")
    });

    jQuery("#blazemeter-site-commercial-register-c #edit-firstname").bind("focusout", function () {
        var a = jQuery(this).val();
        a.length > 0 && track("Signup", "Signup Form", "Insert First Name")
    });

    jQuery("#blazemeter-site-commercial-register-c #edit-lastname").bind("focusout", function () {
        var a = jQuery(this).val();
        a.length > 0 && track("new user set password", "user-set-password", "user-set-password")
    });

    jQuery("#blazemeter-site-commercial-register-c #edit-password").bind("focusout", function () {
        var a = jQuery(this).val();
        a.length > 0 && track("Signup", "Signup Form", "Insert Password")
    });
});
jQuery(document).ready(function(){

    var widget_test_wizard = jQuery(".test_wizard_part1_blog_body .url_test_from_wrapper");
    view_widget_test(widget_test_wizard);
    jQuery(window).resize(function(){
        view_widget_test(widget_test_wizard);
    });


    function view_widget_test(widget_test_wizard){
        var widget_test_width = widget_test_wizard.width();
        if(widget_test_width < 450){
            jQuery(".test_wizard_part1_blog_body .input_test_url_blog_body, .input_test_submit_blog_body, " +
                ".test_wizard_part1_blog_body .text_field_wrapper_blog_body, .input_test_submit_blog_body").addClass("small");
        }else{
            jQuery(".test_wizard_part1_blog_body .input_test_url_blog_body, .input_test_submit_blog_body, " +
                ".test_wizard_part1_blog_body .text_field_wrapper_blog_body, .input_test_submit_blog_body").removeClass("small");
        }
    }
});
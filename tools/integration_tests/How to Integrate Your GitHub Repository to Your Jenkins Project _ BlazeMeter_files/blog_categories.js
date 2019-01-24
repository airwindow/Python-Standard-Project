jQuery(document).ready(function () {
    var slickTrack = jQuery(".slick-track");
    var activeLink = jQuery(".blog_category_active");
    var slickConfig = {
        slidesToScroll: 5,
        variableWidth: true,
        initialSlide: 0,
        centerMode: false,
        draggable: false,
        responsive: [
            {
                breakpoint: 500,
                settings: {
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToScroll: 1
                }
            }
        ]
    };

    slickTrack.slick(slickConfig);
    setTimeout(function () {
        var slickPrevNav = jQuery(document).find(".slick-prev");
        var indexActiveLink = activeLink.closest(".slick-slide").data("slick-index");
        if(indexActiveLink > 1){
            slickPrevNav.css({
                opacity: 1
            });
        }

        var isBlogsOnAuthor = jQuery("body").hasClass("section-blogs-on-author");
        if(!isBlogsOnAuthor){
            slickTrack.slick("slickGoTo", indexActiveLink);
        }

        jQuery(document).on("click", ".slick-next", function(){
            slickPrevNav.css({
                opacity: 1
            });
        });
    }, 1);

    slickTrack.css({visibility: "visible"});
});
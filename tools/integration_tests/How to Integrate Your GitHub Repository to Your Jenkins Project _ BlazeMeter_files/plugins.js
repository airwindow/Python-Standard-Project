'use strict';
/*jshint devel:true, loopfunc: true */
/*global jQuery:false, skrollr: false */
//Search bar size
(function ($, window, document, undefined) {
    var pluginName = 'searchBarSize',
        defaults = {};

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var $this = this;
            if ($(window).width() < 992) return;
            this.setSizeAndMargin();
            $(window).resize(function () {
                $this.setSizeAndMargin();
            });

            $(this.element).fadeIn();
        },
        setSizeAndMargin: function () {
            var sB = $(this.element),
                container = sB.parents('.navbar-container'),
                containerInner = sB.parents('.navbar-holder'),
                containerPT = (~~container.outerWidth() - ~~container.width()) / 2,
                containerWidth = ~~container.outerWidth(),
                navBarWidth = ~~sB.parents('#navbar').width(),
                right,
                maxWidth,
                newWidth;

            right = ((navBarWidth - containerWidth) / 2 + containerPT) - 10;
            maxWidth = right;
            if (maxWidth > 250) {
                newWidth = 250;
                containerInner.css('padding-right', 0);
            } else if (maxWidth < 150) {
                var paddingRight = 150 - maxWidth;
                newWidth = 150;
                containerInner.css('padding-right', paddingRight);
                if ($(window).width() < 992) {
                    containerInner.css('padding-right', 0);
                }
            } else {
                newWidth = maxWidth;
                containerInner.css('padding-right', 0);
            }
            // newWidth = ((100 + right) > 250) ? 250 : (100 + right);
            sB.css({
                'width': newWidth,
                'right': '-' + right + 'px'
            });

        }
    };

    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });

        return this;
    };

})(jQuery, window, document);
//Main slider
(function ($, window, document, undefined) {
    var pluginName = 'mainSlider',
        defaults = {};

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var $this = this;
            this.ratio = 2.55;
            this.setSliderSize();

            $(window).resize(function () {
                $this.setSliderSize();
            });

            if (this.settings.slide) {
                this.startSlideShow();
            }

            $(window).trigger('resize');
        },
        setSliderSize: function () {
            var windowWidth = $(window).width(),
                windowHeight = $(window).height(),
                textHolder = $(this.element).find('.text-holder'),
                textHolderHeight = textHolder.height(),
                navBarHeight = $('#navbar').height(),
                scaledHeight = windowWidth / this.ratio,
                availableSpaceForSlider = windowHeight * (3 / 4),
                sliderHeight = (availableSpaceForSlider < scaledHeight) ? scaledHeight : availableSpaceForSlider,
                points = {
                    'min': 400,
                    'h425': 425,
                    'h450': 450,
                    'h475': 475,
                    'h500': 500,
                    'h525': 525
                },
                sliderHeightClass = '',
                minSliderHeight = 0;

            //If less than 400, set height 400px;
            minSliderHeight = navBarHeight + textHolderHeight;
            if (sliderHeight <= (minSliderHeight + 80)) {
                sliderHeight = minSliderHeight + 80;
                if (sliderHeight < 400) {
                    sliderHeight = 400;
                }
            } else if (sliderHeight < 400) {
                sliderHeight = 400;
            }

            $(this.element).css('height', sliderHeight);
        },

        startSlideShow: function () {
            var $this = this;

            function changeSlides(a) {
                var holder = $($this.element),
                    slides = holder.find('.slide'),
                    interval = 4500;
                slides.eq(a).transition({
                    left: 0,
                    opacity: 1
                }, 1000, 'easeOutQuad', function () {
                    var n = $(this);
                    setTimeout(function () {
                        n.transition({
                            left: '-150%',
                            opacity: 0
                        }, 750, 'easeInQuad').transition({
                            left: '150%',
                            opacity: 0
                        }, 0), changeSlides((a + 1) % slides.length);
                    }, interval);
                });
            }

            changeSlides(0);
        }
    };


    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });

        return this;
    };

})(jQuery, window, document);


//Cup smoke
(function ($, window, document, undefined) {
    var pluginName = 'cupSmoke',
        defaults = {};

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            this.makeSmoke();
        },
        makeSmoke: function () {
            var a = 0;
            for (; a < 15; a += 1) {
                setTimeout(
                    function b() {
                        //creative 'smoke' div
                        var a = Math.random() * 1e3 + 4e3,
                            c = $('<div />', {
                                'class': 'smoke',
                                css: {
                                    top: Math.random() * 100 - 110,
                                    right: -20
                                }
                            });
                        $(c).appendTo('.smoke-inner');
                        $.when($(c).animate({}, {
                            duration: a / 4,
                            easing: 'linear',
                            queue: false,
                            complete: function () {
                                $(c).animate({}, {
                                    duration: a / 3,
                                    easing: 'linear',
                                    queue: false
                                });
                            }
                        }), $(c).animate({
                            right: 300,
                            top: 60
                        }, {
                            duration: a,
                            easing: 'linear',
                            queue: false
                        })).then(function () {
                            $(c).remove();
                            b();
                        });
                    },
                    Math.random() * 3e3
                );
            }
        }
    };

    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });

        return this;
    };

})(jQuery, window, document);


//Testimonials slider
(function ($, window, document, undefined) {
    var pluginName = 'testimonialsSlider',
        defaults = {};

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var $this = this;
            this.splitTestimonialsToSlides();
            $(window).resize(function () {
                $this.checkWindowSize();
                $this.setMarginsForLogos();
            });

            this.logosActions();
            this.controlsActions();
        },
        checkWindowSize: function () {
            var containerWidth = $('.testimonials-logos-frame').width();
            if (typeof window.containerWidth == 'undefined') return;
            var $this = this,
                previousSize = $this.windowSize(window.containerWidth),
                currentSize = $this.windowSize(containerWidth);
            if (previousSize !== currentSize) {
                $this.splitTestimonialsToSlides();
            }
        },

        windowSize: function (size) {
            if (size < 992) {
                return 's';
            } else {
                return 'b';
            }
        },

        splitTestimonialsToSlides: function () {
            var $this = this,
                testimonialsBlock = $($this.element),
                container = $('.testimonials-logos-frame'),
                containerWidth = container.width(),
                tlogos = container.find('.t-logo'),
                maxTestimonials = 0;
            window.containerWidth = containerWidth;

            container.append(tlogos);
            var slides = container.find('.testimonials-logos-slide');
            if (slides.length) {
                slides.remove();
            }
            if (containerWidth < 992) {
                maxTestimonials = 3;
            } else {
                maxTestimonials = 5;
            }

            for (var i = 0; i < tlogos.length; i += maxTestimonials) {
                var slideTestimonials = tlogos.slice(i, i + maxTestimonials);
                slideTestimonials.wrapAll('<div class="testimonials-logos-slide"><div class="slide-holder"></div></div>');

                $('.testimonials-logos-slide').each(function (index) {
                    var sl = $(this);
                    if (index === 0) {
                        sl.addClass('active').css('left', 0);
                    } else {
                        sl.css({'left': '150%', 'opacity': 0});
                    }

                });
            }
            container.css('visibility', 'visible');

            testimonialsBlock.find('.testimonial').fadeOut();

            this.addControls();
            this.setActiveTestimonial();
            this.setMarginsForLogos();
        },


        setTestimonialsBlockHeight: function () {
            var holder = $(this.element),
                frame = holder.find('.testimonials-frame'),
                activeTestimonial = frame.find('.active'),
                someSpace = (frame.width() < 768) ? 20 : 40;

            frame.css('height', (activeTestimonial.height() + someSpace));
        },

        setActiveTestimonial: function () {
            var holder = $(this.element),
                frame = holder.find('.testimonials-frame'),
                logosframe = holder.find('.testimonials-logos-section'),
                logosframeWidth = logosframe.width(),
                visibleItems,
                medianItem;

            if (logosframeWidth < 992) {
                visibleItems = 3;
                medianItem = 2;
            } else {
                visibleItems = 5;
                medianItem = 3;
            }
            frame.find('.testimonial').removeClass('active').fadeOut();
            holder.find('.t-logo').removeClass('active');

            frame.find('.testimonial').eq(medianItem - 1).addClass('active').fadeIn();
            holder.find('.t-logo').eq(medianItem - 1).addClass('active');
            holder.find('.slider-controls .point').eq(0).addClass('active');

            this.setTestimonialsBlockHeight();
        },

        setMarginsForLogos: function () {
            var holder = $(this.element),
                frame = holder.find('.testimonials-logos-section'),
                frameWidth = frame.width(),
                slides = holder.find('.testimonials-logos-slide'),
                slidesHolder = slides.find('.slide-holder'),
                items = frame.find('.t-logo'),
                activeItem = frame.find('.t-logo.active'),
                activeSlide = activeItem.parents('.testimonials-logos-slide'),
                itemWidth = activeItem.outerWidth(),
                visibleItems = 0,
                medianItem = 0;

            if (frameWidth < 992) {
                visibleItems = 3;
                medianItem = 2;
            } else {
                visibleItems = 5;
                medianItem = 3;
            }

            var marginLeft = (frameWidth - visibleItems * itemWidth) / (visibleItems - 1);
            items.each(function () {
                $(this).css('margin-left', marginLeft);
            });

            //set margin for holder
            var slideIndex = slides.index(activeSlide);
            var index = activeSlide.find('.t-logo').index(activeItem);
            if ((index + 1) == medianItem) {
                activeSlide.find('.slide-holder').css('left', '-' + marginLeft + 'px');
            } else {
                var diff = medianItem - (index + 1);
                activeSlide.find('.slide-holder').css('left', diff * (marginLeft + itemWidth) - marginLeft);
            }

        },


        addControls: function () {
            var controls = $(this.element).find('.slider-controls-holder');
            if (controls.length) {
                controls.remove();
            }

            var pointsLen = $(this.element).find('.testimonials-logos-frame').children().length;
            var controlsBlock = $(
                '<div class="slider-controls-holder">' +
                '<div class="slider-controls">' +
                '</div>' +
                '</div>');
            for (var i = 0; i < pointsLen; i++) {
                var point = $('<div class="point"></div>');
                controlsBlock.find('.slider-controls').append(point);
            }
            $(this.element).append(controlsBlock);
        },

        controlsActions: function () {
            var $this = this;
            $(document).on('click', '.point', function (event) {
                if ($(event.currentTarget).hasClass('active')) return;
                var index = $('.slider-controls .point').index(this);
                $this.goToSlide(index);
            });
        },

        logosActions: function () {
            var $this = this;
            $(document).on('mouseover', '.t-logo', function (event) {
                if ($(event.currentTarget).hasClass('active')) return;

                var index = $('.t-logo').index(this);
                $this.goToTestimonial(index);
            });
        },

        goToTestimonial: function (index) {
            var holder = $(this.element),
                frame = holder.find('.testimonials-frame'),
                testimonials = frame.find('.testimonial'),
                activeTestimonial = frame.find('.testimonial.active'),
                block = holder.find('.testimonials-logos-slide'),
                items = block.find('.t-logo');

            activeTestimonial.fadeOut().removeClass('active');
            testimonials.eq(index).fadeIn().addClass('active');

            items.removeClass('active');
            items.eq(index).addClass('active');

            this.setTestimonialsBlockHeight();
            this.setMarginsForLogos();
        },

        goToSlide: function (index) {
            var holder = $(this.element),
                frame = holder.find('.testimonials-frame'),
                logosFrame = holder.find('.testimonials-logos-section'),
                logosFrameWidth = logosFrame.width(),
                testimonials = frame.find('.testimonial'),
                activeTestimonial = frame.find('.testimonial.active'),
                slides = holder.find('.testimonials-logos-slide'),
                items = slides.find('.t-logo'),
                visibleItems = 0,
                medianItem = 0;

            if (logosFrameWidth < 992) {
                visibleItems = 3;
                medianItem = 2;
            } else {
                visibleItems = 5;
                medianItem = 3;
            }

            //set new testimonial
            items.removeClass('active');

            slides.filter('.active').removeClass('active').css({'left': '-150%', 'opacity': 0}).delay(800).queue(
                function (next) {
                    $(this).css({'left': '150%'});
                    next();
                });
            var activeSlide = slides.eq(index).addClass('active').css({'left': 0, 'opacity': 1});

            var nextLogo = activeSlide.find('.t-logo').eq(medianItem - 1);
            nextLogo.addClass('active');

            var nextLogoIndex = logosFrame.find('.t-logo').index(nextLogo);
            activeTestimonial.fadeOut().removeClass('active');
            frame.find('.testimonial').eq(nextLogoIndex).fadeIn().addClass('active');


            $('.slider-controls .point').removeClass('active');
            $('.slider-controls .point').eq(index).addClass('active');

            this.setTestimonialsBlockHeight();
            this.setMarginsForLogos();
        }
    };


    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });

        return this;
    };

})(jQuery, window, document);


//Testimonials slider
(function ($, window, document, undefined) {
    var pluginName = 'parallaxAnimations',
        defaults = {};

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        skr: '',
        init: function () {
            var $this = this;
            this.feature1Animations();
            this.feature2Animations();
            this.otherFeaturesAnimations();
            this.benefitsAnimations();
            this.testimonialsAnimations();
            this.skr = skrollr.init({forceHeight: false, smoothScrollingDuration: 400});
            window.windowWidth = $(window).width();

            //Update after window resize
            var doit;

            function resizedw() {
                $this.checkWindowSize();
            }

            window.onresize = function () {
                clearTimeout(doit);
                doit = setTimeout(function () {
                    resizedw();
                }, 100);
            };
        },
        checkWindowSize: function () {
            var $this = this;
            var windowWidth = $(window).width();
            if (typeof window.windowWidth == 'undefined') return;

            var $this = this,
                previousSize = $this.windowSize(window.windowWidth),
                currentSize = $this.windowSize(windowWidth);

            if (previousSize !== currentSize) {
                window.windowWidth = $(window).width();

                $this.feature1Animations();
                $this.feature2Animations();
                $this.otherFeaturesAnimations();
                $this.benefitsAnimations();
                $this.testimonialsAnimations();
                $this.skr.destroy();
                $this.skr = skrollr.init({forceHeight: false, smoothScrollingDuration: 400});
            }
        },

        windowSize: function (size) {
            if (size >= 1400) {
                return 'xl';
            } else if (size < 1400 && size >= 1200) {
                return 'lg';
            } else if (size < 1200 && size >= 992) {
                return 'md';
            } else if (size < 992 && size >= 768) {
                return 'sm';
            } else if (size < 768) {
                return 'xs';
            }
        },

        feature1Animations: function () {
            var holder = $(this.element).find('.feature-img1');

            var feature1 = holder.find('.feature1-img');
            feature1.attr('data-anchor-target', '.feature-img1');
            feature1.attr('data-bottom-top', 'transform: translateY(80%);');
            feature1.attr('data-center', 'transform: translateY(0%);');

        },
        feature2Animations: function () {
            var holder = $(this.element).find('.feature2'),
                el1 = holder.find('.el1'),
                el2 = holder.find('.el2'),
                el3 = holder.find('.el3');

            el1.attr('data-anchor-target', '.feature2-img-section');
            el1.attr('data-bottom-top', 'transform: translateY(70%);');
            el1.attr('data-center', 'transform: translateY(0%);');

            el2.attr('data-anchor-target', '.feature2-img-section');
            el2.attr('data-bottom-top', 'transform: translateY(80%);');
            el2.attr('data-center', 'transform: translateY(0%);');

            el3.attr('data-anchor-target', '.feature2-img-section');
            el3.attr('data-bottom-top', 'transform: translateY(-50%);');
            el3.attr('data-center', 'transform: translateY(0%);');

        },
        otherFeaturesAnimations: function () {
            var holder = $(this.element).find('.other-features'),
                feature3 = holder.find('.f3 .elem'),
                feature4 = holder.find('.f4 .elem'),
                feature5 = holder.find('.f5 .elem');

            feature3.attr('data-anchor-target', '.other-features .f3');
            feature3.attr('data-100-bottom', 'transform: translateY(120%);');
            feature3.attr('data-center-bottom', 'transform: translateY(0%);');

            feature4.attr('data-anchor-target', '.other-features .f4');
            feature4.attr('data-100-bottom', 'transform:rotate(0deg);');
            feature4.attr('data-top', 'transform:rotate(720deg);');

            feature5.attr('data-anchor-target', '.other-features .f5');
            feature5.attr('data-100-bottom', 'transform: translateY(120%);');
            feature5.attr('data-center-bottom', 'transform: translateY(0%);');

        },
        benefitsAnimations: function () {
            var holder = $(this.element).find('.benefits'),
                block = holder.find('.benefits-holder'),
                blockWidth = block.width(),
                b1 = holder.find('.b1'),
                b2 = holder.find('.b2'),
                b3 = holder.find('.b3'),
                b4 = holder.find('.b4'),
                margin1,
                margin2;

            switch (blockWidth) {
                case 1400:
                    margin1 = 525;
                    margin2 = 175;
                    break;
                case 1200:
                    margin1 = 455;
                    margin2 = 155;
                    break;
                case 992:
                    margin1 = 375;
                    margin2 = 125;
                    break;
                case 768:
                    margin1 = 285;
                    margin2 = 95;
                    break;
                default:
                    margin1 = 100;
                    margin2 = 100;
                    break;
            }


            b1.attr('data-anchor-target', '.benefit .b1');
            b1.attr('data-50-bottom', 'transform: translateX(' + margin1 + 'px);');
            b1.attr('data-center', 'transform: translateX(0px);');

            b2.attr('data-anchor-target', '.benefit .b2');
            b2.attr('data-50-bottom', 'transform: translateX(' + margin2 + 'px);');
            b2.attr('data-center', 'transform: translateX(0px);');

            b3.attr('data-anchor-target', '.benefit .b3');
            b3.attr('data-50-bottom', 'transform: translateX(-' + margin2 + 'px);');
            b3.attr('data-center', 'transform: translateX(0px);');

            b4.attr('data-anchor-target', '.benefit .b4');
            b4.attr('data-50-bottom', 'transform: translateX(-' + margin1 + 'px);');
            b4.attr('data-center', 'transform: translateX(0px);');

            holder.find('.icons-block').each(function (index) {
                var ic = $(this);
                ic.attr('data-20-bottom', 'opacity: 0;');
                ic.attr('data-center', 'opacity: 1;');
            });
        },
        testimonialsAnimations: function () {
            var holder = $(this.element).find('.testimonials-frame');

            holder.find('.q1').each(function () {
                var q = $(this);

                q.attr('data-anchor-target', '.testimonials-frame');
                q.attr('data-center-top', 'transform: translateX(-250%);');
                q.attr('data-center', 'transform: translateX(0%);');
            });
            holder.find('.q2').each(function () {
                var q = $(this);

                q.attr('data-anchor-target', '.testimonials-frame');
                q.attr('data-center-top', 'transform: translateX(250%);');
                q.attr('data-center', 'transform: translateX(0%);');
            });
            holder.find('.testimonial').each(function () {
                var t = $(this);

                t.css('opacity', 1);

                t.attr('data-anchor-target', '.testimonials-frame');
                t.attr('data-bottom-top', 'transform: translateY(100%); opacity:0;');
                t.attr('data-center', 'transform: translateY(0%); opacity:1;');
            });
        }
    };


    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });

        return this;
    };

})(jQuery, window, document);

//featuresAndBenefitsSectionsSizes
(function ($, window, document, undefined) {
    var pluginName = 'featuresAndBenefitsSectionsSizes',
        defaults = {};

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var $this = this;
            this.features = $(this.element).find('.other-features .feature');
            this.benefits = $(this.element).find('.benefits-frame .benefit');

            $this.changeSizes();
            $(window).resize(function () {
                $this.changeSizes();
            });
        },

        changeSizes: function () {
            var $this = this,
                windowWidth = $(window).width(),
                featureHeaderMaxHeight = 0,
                featureContentMaxHeight = 0,
                benefitHeaderMaxHeight = 0,
                benefitContentMaxHeight = 0;

            this.features.each(function () {
                var feature = $(this),
                    featureHeaderHeight = feature.find('.heading-holder').css('height', 'auto').height(),
                    featureContentHeight = feature.find('p').css('height', 'auto').height();

                featureHeaderMaxHeight = (featureHeaderHeight > featureHeaderMaxHeight) ? featureHeaderHeight : featureHeaderMaxHeight;
                featureContentMaxHeight = (featureContentHeight > featureContentMaxHeight) ? featureContentHeight : featureContentMaxHeight;
            });

            this.benefits.each(function () {
                var benefit = $(this),
                    benefitHeaderHeight = benefit.find('h3').css('height', 'auto').height(),
                    benefitContentHeight = benefit.find('p').css('height', 'auto').height();

                benefitHeaderMaxHeight = (benefitHeaderHeight > benefitHeaderMaxHeight) ? benefitHeaderHeight : benefitHeaderMaxHeight;
                benefitContentMaxHeight = (benefitContentHeight > benefitContentMaxHeight) ? benefitContentHeight : benefitContentMaxHeight;
            });

            if (windowWidth < 768) {
                $this.features.each(function () {
                    $(this).find('.heading-holder').css('height', 'auto');
                    $(this).find('p').css('height', 'auto');
                });
                $this.benefits.each(function () {
                    $(this).find('h3').css('height', 'auto');
                    $(this).find('p').css('height', 'auto');
                });
            } else {
                $this.features.each(function () {
                    $(this).find('.heading-holder').css('height', featureHeaderMaxHeight);
                    $(this).find('p').css('height', featureContentMaxHeight);
                });
                $this.benefits.each(function () {
                    $(this).find('h3').css('height', benefitHeaderMaxHeight);
                    $(this).find('p').css('height', benefitContentMaxHeight);
                });
            }
        }
    };


    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });

        return this;
    };

})(jQuery, window, document);

//Semi-transparent navigation bar
(function ($, window, document, undefined) {
    var pluginName = 'navBar',
        defaults = {};

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var $this = this;
            $this.fadeNav();
            $(window).scroll(function () {
                $this.fadeNav();
            });
        },

        fadeNav: function () {
            var offset = this.getScrollXY();
            offset[1] > 0 ? $(this.element).addClass('semi-transparent') : $(this.element).removeClass('semi-transparent');
        },

        getScrollXY: function () {
            var scrOfX = 0,
                scrOfY = 0;
            if (typeof(window.pageYOffset) == 'number') {
                //Netscape compliant
                scrOfY = window.pageYOffset;
                scrOfX = window.pageXOffset;
            } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
                //DOM compliant
                scrOfY = document.body.scrollTop;
                scrOfX = document.body.scrollLeft;
            } else if (document.documentElement && (document.documentElement.scrollLeft ||
                document.documentElement.scrollTop)) {
                //IE6 standards compliant mode
                scrOfY = document.documentElement.scrollTop;
                scrOfX = document.documentElement.scrollLeft;
            }

            return [scrOfX, scrOfY];
        }
    };


    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });

        return this;
    };

})(jQuery, window, document);


//Page animations
(function ($, window, document, undefined) {
    var pluginName = 'pageAnimations',
        defaults = {};

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            $('.feature1-img').css('visibility', 'hidden');
            $('.feature2-img').css('visibility', 'hidden');
            $(window).scroll(function () {
                var viewport = $(window),
                    viewportTop = viewport.scrollTop(),
                    viewportBottom = viewport.scrollTop() + viewport.height();

                //Show elements when it's 20% visible on screen
                $('.feature1-img').each(function () {
                    var neededVisibleHeight = (~~$(this).height()) * 0.2,
                        elementPos = $(this).offset().top,
                        pointToShow = elementPos + neededVisibleHeight;
                    //&& ($(window).width() > 767)
                    if (pointToShow > viewportTop && pointToShow < viewportBottom) {
                        $(this).addClass('slowlySlideUp');
                        setTimeout(function () {
                            $('.magnifier').css('visibility', 'visible');
                        }, 3050);
                    }
                });
                $('.feature2-img').each(function () {
                    var neededVisibleHeight = (~~$(this).height()) * 0.2,
                        elementPos = $(this).offset().top,
                        pointToShow = elementPos + neededVisibleHeight;
                    if (pointToShow > viewportTop && pointToShow < viewportBottom) {
                        $(this).addClass('slowlySlideFromMiddleToTop');
                    }
                });
            });
        }
    };

    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });

        return this;
    };

})(jQuery, window, document);

//Benefits
(function ($, window, document, undefined) {
    var pluginName = 'benefitsActions',
        defaults = {};

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var holder = $(this.element),
                benefits = holder.find('.benefit'),
                bubbles = holder.find('.bubble');


            benefits.on('click', function (event) {
                var benefit = $(event.currentTarget);
                benefits.find('.circle').removeClass('has-dot');
                benefit.find('.circle').addClass('has-dot');
            });
            bubbles.each(function () {
                var bl = $(this);

                bl.hover(function (event) {
                    var trigger = $(event.currentTarget);
                    holder.find('.bubble').not(trigger).addClass('small');
                }, function () {
                    holder.find('.bubble').removeClass('small');
                });

            });
        }
    };

    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });

        return this;
    };

})(jQuery, window, document);


//Cutsomers slider
(function ($, window, document, undefined) {
    var pluginName = 'customersSlider',
        defaults = {};

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var $this = this;

            $(window).load(function () {
                $this.carouselSize = $this.detectCarouselSize();
                var holder = $($this.element),
                    carousel = $(
                        '<div class="carousel">' +
                        '<div class="carousel-holder">' +
                        '<div class="carousel-inner">' +
                        '<div class="carousel-list">' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="carousel-nav-left"></div>' +
                        '<div class="carousel-nav-right"></div>');
                holder.append(carousel);

                $this.makeSlides();
                $this.controls();

                $(window).resize(function () {
                    var newState = $this.detectCarouselSize();

                    if (newState !== $this.carouselSize) {
                        $this.carouselSize = newState;
                        $this.makeSlides();
                        $this.current = 0;
                    } else {
                        $this.setMarginsForSlides();
                    }
                });
            });
        },

        current: 0,

        carouselSize: 'state8',

        breakpoints: {
            state1: {
                changePoint: 480,
                visibleItems: 1
            },
            state2: {
                changePoint: 640,
                visibleItems: 2
            },
            state3: {
                changePoint: 768,
                visibleItems: 3
            },
            state4: {
                changePoint: 900,
                visibleItems: 4
            },
            state5: {
                changePoint: 1050,
                visibleItems: 5
            },
            state6: {
                changePoint: 1200,
                visibleItems: 6
            },
            state7: {
                changePoint: 1350,
                visibleItems: 7
            },
            state8: {
                changePoint: 'more',
                visibleItems: 8
            }
        },

        clickBlockingDuration: 150,
        sliderStopwatch: 150,

        detectCarouselSize: function () {
            var $this = this,
                size = $(window).width(),
                state;

            if (size <= $this.breakpoints.state1.changePoint) {
                state = 'state1';
            } else if (size > $this.breakpoints.state1.changePoint && size <= $this.breakpoints.state2.changePoint) {
                state = 'state2';
            } else if (size > $this.breakpoints.state2.changePoint && size <= $this.breakpoints.state3.changePoint) {
                state = 'state3';
            } else if (size > $this.breakpoints.state3.changePoint && size <= $this.breakpoints.state4.changePoint) {
                state = 'state4';
            } else if (size > $this.breakpoints.state4.changePoint && size <= $this.breakpoints.state5.changePoint) {
                state = 'state5';
            } else if (size > $this.breakpoints.state5.changePoint && size <= $this.breakpoints.state6.changePoint) {
                state = 'state6';
            } else if (size > $this.breakpoints.state6.changePoint && size <= $this.breakpoints.state7.changePoint) {
                state = 'state7';
            } else {
                state = 'state8';
            }

            return state;
        },
        makeSlides: function () {
            var holder = $(this.element),
                list = holder.find('.carousel-list'),
                items = holder.find('.customers-items .item'),
                listWidth = holder.find('.carousel').width(),
                itemsPerSlide = this.breakpoints[this.carouselSize].visibleItems;

            //Set list width
            holder.find('.carousel-list').css('width', listWidth).empty();
            for (var i = 0; i < items.length; i += itemsPerSlide) {
                var slideItems = items.slice(i, i + itemsPerSlide).clone();
                list.append(slideItems);
                slideItems.wrapAll('<div class="slide" style="width: ' + listWidth + 'px; left:150%; opacity: 0;"></div>');
                list.find('.slide').first().css({
                    'left': 0,
                    'opacity': 1
                });
            }
            this.setMarginsForSlides();
        },
        setMarginsForSlides: function () {
            var holder = $(this.element),
                list = holder.find('.carousel-list'),
                listWidth = holder.find('.carousel').width(),
                slides = list.find('.slide');

            holder.find('.carousel-list').css('width', listWidth);

            slides.each(function () {
                var slide = $(this),
                    slideWidth = listWidth,
                    items = slide.find('.item'),
                    itemsWidth = 0;

                slide.css({
                    'padding-left': 0,
                    'padding-right': 0,
                    'width': slideWidth
                });
                items.each(function () {
                    itemsWidth += $(this).width();
                });
                var marginLeft = (slideWidth - itemsWidth) / (items.length - 1);
                marginLeft = (marginLeft > 90) ? 90 : marginLeft;

                items.each(function (index) {
                    if (index === 0) return;
                    // Shorten margin on last item to prevent it from dropping out of slide container
                    else if (index == (items.length - 1)) $(this).css('margin-left', marginLeft - 1);
                    else $(this).css('margin-left', marginLeft);
                });

                var itemsAndMargins = itemsWidth + marginLeft * (items.length - 1),
                    slidePadding = (slideWidth - itemsAndMargins) / 2;

                slide.css({
                    'padding-left': slidePadding,
                    'padding-right': slidePadding
                });
            });
        },
        controls: function () {
            var $this = this,
                holder = $(this.element),
                list = holder.find('.carousel-list');

            $(document).on('click', '.carousel-nav-left', function () {
                // Initially, there was a transition event counter implemented to track and
                // manage rapid slide transitions. Unfortunately it doesn't work reliably
                // across browsers so we implement this watchdog mechanism instead
                if ($this.sliderStopwatch != $this.clickBlockingDuration) return;
                setTimeout(function () {
                    $this.sliderStopwatch += $this.clickBlockingDuration;
                }, $this.clickBlockingDuration);
                $this.sliderStopwatch = 0;
                var next = $this.current - 1;
                var slides = list.find('.slide');
                if (next < 0) next = slides.length - 1;
                $this.goToSlide(next, true);
            });

            $(document).on('click', '.carousel-nav-right', function () {
                if ($this.sliderStopwatch != $this.clickBlockingDuration) return;
                setTimeout(function () {
                    $this.sliderStopwatch += +$this.clickBlockingDuration;
                }, $this.clickBlockingDuration);
                $this.sliderStopwatch = 0;
                var next = $this.current + 1;
                var slides = list.find('.slide');
                if (next >= slides.length) next = 0;
                $this.goToSlide(next, false);
            });
        },
        goToSlide: function (next, left) {
            var $this = this,
                holder = $(this.element),
                list = holder.find('.carousel-list'),
                slides = list.find('.slide'),
            // Delay between outgoing and incoming slide.
                delayBetweenTransitions = 150;

            // Outgoing slide
            if (left) {
                slides.eq($this.current).transition({
                    left: '150%',
                    opacity: 0
                }, 500, 'easeInQuad');
            }
            else {
                slides.eq($this.current).transition({
                    left: '-150%',
                    opacity: 0
                }, 500, 'easeInQuad');
            }
            // Incoming slide
            setTimeout(function () {
                $this.transitionInProgress++;
                if (left) {
                    slides.eq(next).css('left', '-150%');
                    slides.eq(next).transition({
                        left: '0',
                        opacity: 1
                    }, 667, 'easeOutQuad');
                }
                else {
                    slides.eq(next).css('left', '150%');
                    slides.eq(next).transition({
                        left: '0',
                        opacity: 1
                    }, 667, 'easeOutQuad');
                }
            }, delayBetweenTransitions);

            $this.current = next;
        }
    };

    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });

        return this;
    };

})(jQuery, window, document);


//Team section
(function ($, window, document, undefined) {
    var pluginName = 'teamSection',
        defaults = {};

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var $this = this;


            $(window).load(function () {
                $this.splitMembersToRows();
                $this.membersActions();
                $($this.element).find('.t-overlay').fadeOut();

                $(window).resize(function () {
                    $this.checkWindowSize();
                    $this.setImagesSizesInRows();
                });
            });
        },

        checkWindowSize: function () {
            var containerWidth = $(window).width();
            if (typeof window.windowWidth == 'undefined') return;
            var $this = this,
                previousSize = $this.windowSize(window.windowWidth),
                currentSize = $this.windowSize(containerWidth);
            if (previousSize !== currentSize) {
                $this.splitMembersToRows();
            }
        },

        windowSize: function (size) {
            if (size >= 1920) {
                return 5;
            } else if (size >= 1200 && size < 1920) {
                return 4;
            } else if (size >= 768 && size < 1200) {
                return 3;
            } else {
                return 1;
            }
        },


        splitMembersToRows: function () {
            var $this = this,
                holder = $(this.element),
                members = holder.find('.member'),
                maxMembers = 5,
                windowWidth = $(window).width();

            holder.append(members);
            var rows = holder.find('.team-row, .summary-row');
            if (rows.length) {
                rows.remove();
            }

            if (windowWidth >= 1920) {
                maxMembers = 5;
            } else if (windowWidth >= 1200 && windowWidth < 1920) {
                maxMembers = 4;
            } else if (windowWidth >= 768 && windowWidth < 1200) {
                maxMembers = 3;
            } else {
                maxMembers = 1;
            }

            window.windowWidth = $(window).width();


            for (var i = 0; i < members.length; i += maxMembers) {
                var rowMembers = members.slice(i, i + maxMembers);
                rowMembers.wrapAll('<div class="team-row"><div class="team-row-holder"></div></div>');
            }

            holder.find('.team-row').each(function () {
                var row = $(this),
                    content = '';

                if (maxMembers == 1) {
                    content = row.find('.summary-info').clone();
                }
                var s = $('<div class="summary-row"><div class="summary-row-holder"><div class="opener"><div class="opener-holder">&nbsp;</div></div><div class="summary-row-content">' + content + '</div></div></div>');
                s.find('.summary-row-content').append(content);
                s.insertAfter(row);
            });

            holder.find('.photo').removeClass('active').addClass('grey');
            this.setImagesSizesInRows();
        },

        setImagesSizesInRows: function () {
            var $this = this,
                holder = $(this.element),
                rows = holder.find('.team-row'),
                maxMembers = 5,
                windowWidth = $(window).width();


            if (windowWidth >= 1920) {
                maxMembers = 5;
            } else if (windowWidth >= 1200 && windowWidth < 1920) {
                maxMembers = 4;
            } else if (windowWidth >= 768 && windowWidth < 1200) {
                maxMembers = 3;
            } else {
                maxMembers = 1;
            }

            rows.each(function () {
                var row = $(this),
                    members = row.find('.member'),
                    rowWidth = row.width(),
                    imagesWidth = 0;

                if (members.length < maxMembers) {
                    rowWidth = rowWidth * (members.length / maxMembers);
                    row.find('.team-row-holder').css('width', rowWidth);
                }

                members.each(function () {
                    var photo = $(this).find('.photo'),
                        photoWidth = photo[0].naturalWidth,
                        photoHeight = photo[0].naturalHeight;

                    imagesWidth += (photoWidth);
                });
                var ratio = imagesWidth / rowWidth;
                members.each(function () {
                    var photo = $(this).find('.photo'),
                        photoWidth = photo[0].naturalWidth,
                        photoHeight = photo[0].naturalHeight;

                    var newWidth = Math.floor(photoWidth / ratio),
                        newHeight = Math.ceil(photoHeight / ratio) - 2;

                    $(this).css({
                        'width': newWidth,
                        'height': newHeight
                    });
                });
            });
        },

        setSizes: function (ratio) {

        },

        membersActions: function () {
            var $this = this,
                holder = $(this.element),
                members = holder.find('.member');

            members.each(function () {
                var member = $(this);
                member.hover(function () {
                    $(this).find('.photo').removeClass('grey');
                }, function () {
                    var photo = $(this).find('.photo');
                    if (!photo.hasClass('active')) {
                        photo.addClass('grey');
                    }

                });

                member.on('click', function (event) {
                    var trigger = $(event.currentTarget),
                        info = trigger.find('.summary-info').clone(),
                        parentRow = trigger.parents('.team-row'),
                        summaryRow = parentRow.next(),
                        targetBlock = summaryRow.find('.summary-row-content'),
                        posL = trigger.position().left;

                    targetBlock.empty().append(info);
                    summaryRow.find('.opener').css('left', posL + 50);
                    holder.find('.summary-row').hide();
                    summaryRow.show();

                    holder.find('.photo').removeClass('active').addClass('grey');
                    trigger.find('.photo').addClass('active').removeClass('grey');
                });
            });

            $(document).on('click', '.summary-row .opener', function () {
                holder.find('.photo').removeClass('active').addClass('grey');
                holder.find('.summary-row').hide();
            });
        }
    };

    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });

        return this;
    };

})(jQuery, window, document);


//Responsive Customers Table
(function ($, window, document, undefined) {
    var pluginName = 'customersTable',
        defaults = {};

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var $this = this;
            this.emptyBlocks();

            $(window).resize(function () {
                $this.checkWindowSize();
            });
        },

        checkWindowSize: function () {
            var windowWidth = $(window).width();
            if (typeof window.windowWidth == 'undefined') return;
            var $this = this,
                previousSize = $this.blocksInRow(window.windowWidth),
                currentSize = $this.blocksInRow(windowWidth);
            if (previousSize !== currentSize) {
                $this.emptyBlocks();
            }
        },

        blocksInRow: function (size) {
            if (size >= 1200) {
                return 5;
            } else if (size >= 992 && size < 1400) {
                return 4;
            } else if (size >= 768 && size < 992) {
                return 3;
            } else if (size >= 480 && size < 768) {
                return 2;
            } else {
                return 1;
            }
        },

        emptyBlocks: function () {
            var $this = this,
                holder = $(this.element);

            window.windowWidth = $(window).width();
            holder.find('.empty-block').remove();

            var blocks = holder.find('.client-logo-block'),
                len = blocks.length,
                blocksInRow = this.blocksInRow(window.windowWidth),
                rows = Math.ceil(len / blocksInRow),
                needToAdd = (blocksInRow * rows - len);
            if (needToAdd > 0) {
                for (var i = 0; i < needToAdd; i++) {
                    holder.append('<div class="client-logo-block empty-block"><div class="holder"><div class="inner"></div></div></div>');
                }
            }

        }
    };

    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });

        return this;
    };

})(jQuery, window, document);


//Signup Popup
(function ($, window, document, undefined) {
    var pluginName = 'signUpPopup',
    /*
     defaults = {
     'first_name': ['First Name', 'Please enter your first name'],
     'last_name': ['Last Name', 'Please enter your last name'],
     'email': ['Email', 'Please enter your email'],
     'password': ['Password', 'Please enter your password'],
     };
     */
        defaults = {
            'edit-firstname': ['First Name', 'Please enter your first name'],
            'edit-lastname': ['Last Name', 'Please enter your last name'],
            'edit-email': ['Email', 'Please enter your email'],
            'edit-password': ['Password', 'Please enter your password'],
        };

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var $this = this,
                popup = $(this.element);

            var fade = $('<div class="fade"></div>');
            $('body').append(fade);

            function testinput(re, str) {
                if (str.search(re) != -1) {
                    return true;
                } else {
                    return false;
                }
            }

            var location = window.location.href;
            var signup = "/#signup";
            if (testinput(signup, location)) {
                event.preventDefault();
                fade.css({
                    'display': 'block',
                    'opacity': 1
                });
                popup.fadeIn();
                $this.centerizePopup();
            }


            $('.signup-btn:not(".signup-btn.middle-start-free, .signup-btn#become-partner, .plan-switch")').on('click', function (event) {
                event.preventDefault();
                fade.css({
                    'display': 'block',
                    'opacity': 1
                });
                popup.fadeIn();
                $this.centerizePopup();
                return false;
            });

            $(document).on('click',
                '.get_started_button:not(".get_started_button.button_for_register_users"), ' +
                '.features_page_get_started_link:not(".features_page_get_started_link.button_for_register_users"), ' +
                '.get_started_link:not(".get_started_link.button_for_register_users"), ' +
                '.new_blog_get_started_button:not(".new_blog_get_started_button.button_for_register_users"), ' +
                '.bottom-start-free:not(.bottom-start-free.button_for_register_users), ' +
                '.main_mobile_menu_start_testing_now', function (event) {
                    event.preventDefault();
                    fade.css({
                        'display': 'block',
                        'opacity': 1
                    });
                    popup.fadeIn();
                    $this.centerizePopup();
                    return false;
                });

            $('.api-get-started-button, .api-get-started-link').bind('click', function (event) {
                event.preventDefault();
                fade.css({
                    'display': 'block',
                    'opacity': 1
                });
                popup.fadeIn();
                $this.centerizePopup();
                var blazeApiLink = $(this).attr("href");
                popup.find(".api-additional-form-field").remove();
                popup.find("form").attr("action", blazeApiLink).append("<input class='api-additional-form-field' type='hidden' name='campaign' value='blazeapi'>");
                return false;
            });

            $(".hero").on('click', '.get_started_button:not(".get_started_button.button_for_register_users")', function (event) {
                event.preventDefault();
                fade.css({
                    'display': 'block',
                    'opacity': 1
                });
                popup.fadeIn();
                $this.centerizePopup();
                return false;
            });

            $('.popup .close-popup').on('click', function (event) {
                event.preventDefault();
                fade.css({
                    'display': 'none',
                    'opacity': 0
                });
                popup.fadeOut();
                return false;
            });

            if (window.location.pathname == '/pricing' || window.location.pathname == '/pricing2' || window.location.pathname == '/pricing3' || window.location.pathname == '/pricing4') {
                var current_year10 = new Date().getFullYear() + 10;
                for (i = new Date().getFullYear(); i <= current_year10; i++) {
                    $('#yearpicker').append($('<option />').val(i).html(i));
                }
                var d = new Date();
                var n = d.getMonth() + 1;
                if (n < 10) {
                    n = '0' + n;
                }
                jQuery(".payment-exp-month").val(n);
            }

            var pricing_page = 'https://blazemeter.com/';

            //jQuery.getJSON('https://www.linkedin.com/countserv/count/share?url=' + pricing_page + '&callback=?', function (linkdindata) {
            //    jQuery('#social-linkedin-box').text(linkdindata.count);
            //});


            var createJson = {
                "method": "pos.plusones.get",
                "id": "p",
                "params": {
                    "nolog": true,
                    "id": "http://blazemeter.com",
                    "source": "widget",
                    "userId": "@viewer",
                    "groupId": "@self"
                },
                "jsonrpc": "2.0",
                "key": "p",
                "apiVersion": "v1"
            };
            createJson = JSON.stringify(createJson);
            var xmlhttp = new XMLHttpRequest();
            var apikey = 'AIzaSyCKSbrvQasunBoV16zDH9R33D88CeLr9gQ';
            var url = "https://clients6.google.com/rpc?key=" + apikey;

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status === 200) {
                        var response = JSON.parse(xmlhttp.response);
                        var counter = response.result.metadata.globalCounts.count;
                        jQuery('#social-gplus-box').text(counter);
                    }
                }
            };
            xmlhttp.open("POST", url, true);
            xmlhttp.setRequestHeader('Content-type', 'application/json');
            xmlhttp.send(createJson);

            $(document).on('click', ".plan-switch:not('.plan-switch.contact-us')", function (event) {
                event.preventDefault();

                jQuery('.payment-amount').removeClass('custom-plan');

                var button_clicked = $(this).attr('id');
                if (button_clicked == 'switch-basic') {
                    if ($('.billed-annually').hasClass('active')) {
                        var basicAnnual = 'BASIC-ANNUAL';
                        window.GLOB = {
                            planName: basicAnnual
                        };
                        $('.plan-selected').val(basicAnnual);
                        $('.original-amount').val('99');
                        var price_pro_ann = $('.price .swap.swap-basic').attr('data-annual') + '9';
                        changePopupPrices(price_pro_ann, $('.billed-annually').hasClass('active'));
                    } else {
                        var basicMonthly = 'BASIC-MONTHLY';
                        window.GLOB = {
                            planName: basicMonthly
                        };
                        $('.plan-selected').val(basicMonthly);
                        $('.original-amount').val('149');
                        var price_pro_monthly = $('.price .swap.swap-basic').attr('data-monthly') + '9';
                        changePopupPrices(price_pro_monthly, $('.billed-annually').hasClass('active'));
                    }
                    $('.payment-plan-name').html('<span class="plan">PLAN</span> BASIC');
                    $('.subscribed').text("You're subscribed to the Basic plan!");
                } else if (button_clicked == 'switch-pro') {
                    if ($('.billed-annually').hasClass('active')) {
                        //var proAnnual = 'PRO-ANNUAL';
                        var proAnnual = 'Pro Annual VUH';
                        window.GLOB = {
                            planName: proAnnual
                        };
                        $('.plan-selected').val(proAnnual);
                        $('.original-amount').val('499');
                        var price_pro_ann = $('.price .swap.swap-pro').attr('data-annual') + '9';
                        changePopupPrices(price_pro_ann, $('.billed-annually').hasClass('active'));
                    } else {
                        //var proMonthly = 'PRO-MONTHLY';
                        var proMonthly = 'PRO VUH Monthly';
                        window.GLOB = {
                            planName: proMonthly
                        };
                        $('.plan-selected').val(proMonthly);
                        $('.original-amount').val('649');
                        var price_pro_monthly = $('.price .swap.swap-pro').attr('data-monthly') + '9';
                        changePopupPrices(price_pro_monthly, $('.billed-annually').hasClass('active'));
                    }
                    $('.payment-plan-name').html('<span class="plan">PLAN</span> PRO');
                    $('.subscribed').text("You're subscribed to the Pro plan!");
                } else if (button_clicked == 'switch-ondemand') {
                    $('.plan-selected').val('ON-DEMAND');
                    $('#plan-actions span').text('Billed Once');
                    $('.payment-plan-name').html('<span class="plan">PLAN</span> ON DEMAND');
                    $('.subscribed').text("You're subscribed to the On Demand plan!");
                    $('.payment-amount').html('$1499');
                    $('.original-amount').val('1499');
                    $('.plan-amount').val('149900');
                    var demand_amount = 1499;
                    var formatted_amount = formatAmount(demand_amount);
                    $('.payment-button').text('Pay ' + formatted_amount);
                }

                if ($(this).hasClass('has-card')) {
                    var blockId = jQuery(this).closest(".plan-block .plan-block-info").attr("id");
                    resetUpgradeBlock(blockId);
                }
                else {
                    fade.css({
                        'display': 'block',
                        'opacity': 1
                    });
                    $('.payment_popup').fadeIn();
                }

            });

            function resetUpgradeBlock(blockId) {
                if (blockId == 'basic-info') {
                    jQuery('#basic-info').hide();
                    jQuery('#basic-charge-card').prop('checked', true);
                    jQuery('input[type=checkbox][name=charge-type]').parent().show();
                    jQuery('#basic-payment').show();
                    jQuery("#basic-charge-coupon").prop("checked", false);
                    jQuery('#basic-payment .payment-charge-coupon').hide();
                    jQuery('#pro-info').show();
                    jQuery('#pro-payment').hide();
                } else if (blockId == 'pro-info') {
                    jQuery('#pro-info').hide();
                    jQuery('#pro-charge-card').prop('checked', true);
                    jQuery('input[type=checkbox][name=charge-type]').parent().show();
                    jQuery('#pro-payment').show();
                    jQuery("#pro-charge-coupon").prop("checked", false);
                    jQuery('#pro-payment .payment-charge-coupon').hide();
                    jQuery('#basic-info').show();
                    jQuery('#basic-payment').hide();
                }
                jQuery('.coupon-success').text('');
                jQuery('.payment-error').text('');
                jQuery('input[name=charge-type]').prop('disabled', false);
                jQuery('.remove-coupon-charge').click();
            };

            function changePopupPrices(amount, annually) {
                if (annually == true) {
                    $('.payment-amount').html('$' + amount + '/<small>mo</small>');
                    $('#plan-actions span').text('Billed Annually');
                    $('.plan-amount').val(amount * 100);
                    var formatted_amount = formatAmount(amount * 12);
                    $('.payment-button').text('Pay $' + formatted_amount + '/Year');
                } else {
                    $('.payment-amount').html('$' + amount + '/<small>mo</small>');
                    $('.plan-amount').val(amount * 100);
                    $('#plan-actions span').text('');
                    var formatted_amount = formatAmount(amount);
                    $('.payment-button').text('Pay $' + formatted_amount + '/mo');
                }
            };

            $('.stripe-coupon').on('click', function (event) {
                event.preventDefault();
                $('.payment-coupon').show();
                $('.payment-coupon-button').css('display', 'inline-block');
                $(".payment-coupon").prop('disabled', false);
                return false;
            });

            $('.close-payment-popup').on('click', function (event) {
                event.preventDefault();
                window.planinfo = {};
                jQuery('.fade').css({
                    'display': 'none',
                    'opacity': 0
                });
                $('.payment_popup').fadeOut();
                var not_first_click = false;
                jQuery('.payment-error').text('');
                jQuery('.coupon-success').text('');
                jQuery('.payment-coupon-inp').val('');
                jQuery('.check-coupon').click();
                jQuery(".payment-coupon-button.remove-coupon").click();
                if (jQuery('#coupon_code').is(':checked')) {
                    jQuery('.check-coupon').click();
                }
                jQuery('.credit-card-error').removeClass('credit-card-error');
                //if(jQuery(this).hasClass('.close-payed-popup')) {
                //    window.location.replace(blazemeter_bza_url+'/app');
                //}
            });

            jQuery('.close-payment-popup.close-payed-popup').on('click', function () {
                window.location.href = blazemeter_bza_url + '/app';
            });

            $('.back-to').on('click', function (event) {
                jQuery('.payment-coupon-inp').val('');
                jQuery('.check-coupon').click();
                jQuery(".payment-coupon-button.remove-coupon").click();
                if (jQuery('#coupon_code').is(':checked')) {
                    jQuery('.check-coupon').click();
                }
                jQuery('.pay-popup').show();
                jQuery('.payed-popup').hide();
                jQuery('.fade').css({
                    'display': 'none',
                    'opacity': 0
                });
                $('.payment_popup').fadeOut();
                location.reload();
            });
            $('.popup .close-popup').on('click', function (event) {
                event.preventDefault();
                fade.css({
                    'display': 'none',
                    'opacity': 0
                });
                popup.fadeOut();
            });

            //$(document).on('click', '.cta-video-link a, #mobile-recording-video', function(event) {
            //    event.preventDefault();
            //    fade.css({
            //        'display': 'block',
            //        'opacity': 1
            //    });
            //    $('#youtube-popup').fadeIn();
            //    $this.centerizePopup();
            //});
            $('.cta-video-link a').on('click', function (event) {
                event.preventDefault();
                fade.css({
                    'display': 'block',
                    'opacity': 1
                });
                $('#youtube-popup').fadeIn();
                $this.centerizePopup();
            });

            $('.resource-header-img').on('click', function (event) {
                event.preventDefault();
                fade.css({
                    'display': 'block',
                    'opacity': 1
                });
                $('#youtube-popup').fadeIn();
                //$this.centerizePopup();
            });

            $('.close-youtube-popup a').on('click', function (event) {
                event.preventDefault();
                fade.css({
                    'display': 'none',
                    'opacity': 0
                });
                setTimeout(function () {
                    $('#youtube-popup iframe').attr('src', $('#youtube-popup iframe').attr('src'));
                }, 500);
                $('#youtube-popup').fadeOut();
            });

            $("#blazemeter-site-commercial-register").submit(function (event) {
                var valid = $this.validateInput();
                if (!validateEmail($('#blazemeter-site-commercial-register #edit-mail').val())) {
                    $('#blazemeter-site-commercial-register #edit-mail').val('');
                    $('#blazemeter-site-commercial-register .form-item-mail').addClass('form-error');
                    $('#blazemeter-site-commercial-register #edit-mail').attr('Placeholder', 'Please enter valid e-mail');
                    return false;
                }
                if (valid) {
                    $('#blazemeter-site-commercial-register .main-btn').hide();
                    // $('.progress-button').show();
                    $('.progress-button').trigger('click');
                    $('.popup .close-popup').hide();
                    return true;
                }
                event.preventDefault();
                return false;

            });

            // front page signup
            $("#blazemeter-site-commercial-register-c").submit(function (event) {
                var regex = /<\/?[^>]+(>|$)|[\/>]/g;

                var valid = $this.validateInput();
                var pass = $('#blazemeter-site-commercial-register-c #edit-password').val();
                var firstName = $('#blazemeter-site-commercial-register-c #edit-firstname').val();
                var lastName = $('#blazemeter-site-commercial-register-c #edit-lastname').val();
                var email = $('#blazemeter-site-commercial-register-c #edit-email').val();

                if(firstName.match(regex)){
                    $('#blazemeter-site-commercial-register-c #edit-firstname').val('');
                    $('#blazemeter-site-commercial-register-c .form-item-firstName').addClass('form-error');
                    $('#blazemeter-site-commercial-register-c #edit-firstname').attr('placeholder', "Please enter valid First Name");
                    valid = false;
                }

                if(lastName.match(regex)){
                    $('#blazemeter-site-commercial-register-c #edit-lastname').val('');
                    $('#blazemeter-site-commercial-register-c .form-item-lastName').addClass('form-error');
                    $('#blazemeter-site-commercial-register-c #edit-lastname').attr('placeholder', "Please enter valid Last Name");
                    valid = false;
                }

                if (!validateEmail(email)) {
                    $('#blazemeter-site-commercial-register-c #edit-email').val('');
                    $('#blazemeter-site-commercial-register-c .form-item-email').addClass('form-error');
                    $('#blazemeter-site-commercial-register-c #edit-email').attr('Placeholder', 'Please enter valid e-mail');
                    valid = false;
                }

                if (valid) {
                    $('.progress-button').trigger('click');
                    $('.popup .close-popup').hide();
                    return true;
                }
                event.preventDefault();
                return false;
            });

            $("#blazemeter-site-commercial-register-e").submit(function (event) {
                var valid = $this.validateInput();
                if (!validateEmail($('#blazemeter-site-commercial-register-e #edit-email').val())) {
                    $('#blazemeter-site-commercial-register-e #edit-email').val('');
                    $('#blazemeter-site-commercial-register-e .form-item-email').addClass('form-error');
                    $('#blazemeter-site-commercial-register-e #edit-email').attr('Placeholder', 'Please enter valid e-mail');
                    valid = false;
                }

                if (valid) {
                    // $('#blazemeter-site-commercial-register-c .main-btn').hide();
                    // $('.progress-button').show();
                    $('.progress-button').trigger('click');
                    $('.popup .close-popup').hide();
                    return true;
                }
                event.preventDefault();
                return false;
            });

            $('input').keypress(function (e) {
                if (e.which == 13) {
                    $(this).closest("form").submit();
                    e.preventDefault();
                    return false;
                }
            });

            function validateEmail(emailAddress) {
                var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
                return pattern.test(emailAddress);
            }

            function formatAmount(nStr) {
                return nStr;
                /*nStr += '';
                 var x = nStr.split('.');
                 var x1 = x[0];
                 var x2 = x.length > 1 ? '.' + x[1] : '';
                 var rgx = /(\d+)(\d{3})/;
                 while (rgx.test(x1)) {
                 x1 = x1.replace(rgx, '$1' + ',' + '$2');
                 }
                 var amount = x1 + x2;
                 return amount;*/
            }

            $(document).on('keyup', '.popup-form-row[data-field="required"] input', function (event) {
                var input = $(event.currentTarget),
                    inputId = input.attr('id');
                if (input.parent().hasClass('error') && $.trim(input.val()).length) {
                    input.parent().removeClass('error');
                    input.attr('placeholder', $this.settings[inputId][0]);
                }
            });

            $(window).resize(function () {
                if (popup.is(':visible')) {
                    $this.centerizePopup();
                }
            });
        },
        centerizePopup: function () {
            var popup = $(this.element),
                popupHeight = popup.height(),
                windowHeight = $(window).height();
            var popupTop = (windowHeight - popupHeight) / 2;
            if (popupTop < 0) popupTop = 0;

            // popup.css('top', popupTop + $(window).scrollTop());
            popup.css('top', popupTop);
        },
        validateInput: function () {
            var $this = this,
                popup = $(this.element),
                fields = popup.find('input.required'),
                errors = [];

            fields.each(function () {
                var field = $(this);
                if (!$.trim(field.val()).length) {
                    errors.push(field.attr('id'));
                }
            });

            if (!errors.length) {
                return true;
            } else {
                $this.showErrors(errors);
                return false;
            }
        },

        showErrors: function (errors) {
            var $this = this,
                popup = $(this.element);
            $.each(errors, function (index, error) {
                // console.log(error);
                var input = popup.find('#' + error);
                if (!input.length) return;
                input.parent().addClass('form-error');
                // console.log($this.settings[error]);
                var msg = $this.settings[error][1];
                input.attr('placeholder', msg);
            });
        }


    };

    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });

        return this;
    };

})(jQuery, window, document);


//Signup Popup B
(function ($, window, document, undefined) {
    var pluginName = 'signUpPopupB',
    /*
     defaults = {
     'first_name': ['First Name', 'Please enter your first name'],
     'last_name': ['Last Name', 'Please enter your last name'],
     'email': ['Email', 'Please enter your email'],
     'password': ['Password', 'Please enter your password'],
     };
     */
        defaults = {
            'edit-firstname': ['First Name', 'First Name'],
            'edit-lastname': ['Last Name', 'Last Name'],
            'edit-email': ['Email', 'Please enter your email'],
            'edit-password': ['Password', 'Please enter your password'],
        };

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var $this = this,
                popup = $(this.element);

            $("#blazemeter-site-commercial-register-b").submit(function (event) {
                var valid = $this.validateInput();
                if (!validateEmail($('#blazemeter-site-commercial-register-b #edit-mail').val())) {
                    $('#blazemeter-site-commercial-register-b #edit-mail').val('');
                    $('#blazemeter-site-commercial-register-b .form-item-mail').addClass('form-error');
                    $('#blazemeter-site-commercial-register-b #edit-mail').attr('Placeholder', 'Please enter valid e-mail');
                    return false;
                }
                if (valid) {
                    var siteUrl = $("input[name=siteUrl]").val();
                    if (siteUrl == 'aws_signup') {
                        var xmlhttp = new XMLHttpRequest();
                        var portalID = $("input[name=portalID]").val();
                        var formGUID = $("input[name=formGUID]").val();
                        var firstname = $('#blazemeter-site-commercial-register-b #edit-firstname').val();
                        var lastname = $('#blazemeter-site-commercial-register-b #edit-lastname').val();
                        var email = $('#blazemeter-site-commercial-register-b #edit-mail').val();
                        xmlhttp.open("POST", "https://forms.hubspot.com/uploads/form/v2/" + portalID + "/" + formGUID, false);
                        var params = "firstname=" + encodeURIComponent(firstname) + "&lastname=" + encodeURIComponent(lastname) + "&email=" + email + "&siteUrl=" + encodeURIComponent(siteUrl);
                        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        xmlhttp.send(params);
                    }
                    return true;
                }
                event.preventDefault();
                return false;


            });

            function validateEmail(emailAddress) {
                var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
                return pattern.test(emailAddress);
            };

            $(document).on('keyup', '.popup-form-row[data-field="required"] input', function (event) {
                var input = $(event.currentTarget),
                    inputId = input.attr('id');
                if (input.parent().hasClass('error') && $.trim(input.val()).length) {
                    input.parent().removeClass('error');
                    input.attr('placeholder', $this.settings[inputId][0]);
                }
            });
        },
        validateInput: function () {
            var $this = this,
                popup = $(this.element),
                fields = popup.find('input.required'),
                errors = [];

            fields.each(function () {
                var field = $(this);
                if (!$.trim(field.val()).length) {
                    errors.push(field.attr('id'));
                }
            });

            if (!errors.length) {
                return true;
            } else {
                $this.showErrors(errors);
                return false;
            }
        },


        showErrors: function (errors) {
            var $this = this,
                popup = $(this.element);
            $.each(errors, function (index, error) {
                // console.log(error);
                var input = popup.find('#' + error);
                if (!input.length) return;
                input.parent().addClass('form-error');
                // console.log($this.settings[error]);
                var msg = $this.settings[error][1];
                input.attr('placeholder', msg);
            });
        }


    };

    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });

        return this;
    };

})(jQuery, window, document);

//Signup Popup
(function ($, window, document, undefined) {
    var pluginName = 'signUpPopupCompetitor',
        defaults = {
            'edit-firstname': ['First Name', 'Please enter your first name'],
            'edit-lastname': ['Last Name', 'Please enter your last name'],
            'edit-email': ['Email', 'Please enter your email'],
            'edit-password': ['Password', 'Please enter your password'],
        };

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var $this = this,
                popup = $(this.element);

            var fade = $('<div class="fade"></div>');
            $('body').append(fade);

            $(document).on('click', '.signup-btn-competitor', function (event) {
                event.preventDefault();
                fade.css({
                    'display': 'block',
                    'opacity': 1
                });
                popup.fadeIn();
                $this.centerizePopup();
            });
            $(document).on('click', '.popup .close-popup', function (event) {
                event.preventDefault();
                fade.css({
                    'display': 'none',
                    'opacity': 0
                });
                popup.fadeOut();
            });

            $("#blazemeter-site-competitor-register").submit(function (event) {
                var valid = $this.validateInput();
                //console.log(valid);
                if (valid) {
                    fade.css({
                        'display': 'none',
                        'opacity': 0
                    });
                    popup.fadeOut();
                    //alert('Account created!');
                    return true;
                }
                event.preventDefault();
                return false;


            })

            $(document).on('keyup', '.popup-form-row[data-field="required"] input', function (event) {
                var input = $(event.currentTarget),
                    inputId = input.attr('id');
                if (input.parent().hasClass('error') && $.trim(input.val()).length) {
                    input.parent().removeClass('error');
                    input.attr('placeholder', $this.settings[inputId][0]);
                }
            });

            $(window).resize(function () {
                if (popup.is(':visible')) {
                    $this.centerizePopup();
                }
            });
        },
        centerizePopup: function () {
            var popup = $(this.element),
                popupHeight = popup.height(),
                windowHeight = $(window).height();
            var popupTop = (windowHeight - popupHeight) / 2;
            if (popupTop < 0) popupTop = 0;

            // popup.css('top', popupTop + $(window).scrollTop());
            popup.css('top', popupTop);
        },
        validateInput: function () {
            var $this = this,
                popup = $(this.element),
                fields = popup.find('input.required'),
                errors = [];

            fields.each(function () {
                var field = $(this);
                if (!$.trim(field.val()).length) {
                    errors.push(field.attr('id'));
                }
            });

            if (!errors.length) {
                return true;
            } else {
                $this.showErrors(errors);
                return false;
            }
        },

        showErrors: function (errors) {
            var $this = this,
                popup = $(this.element);
            $.each(errors, function (index, error) {
                // console.log(error);
                var input = popup.find('#' + error);
                if (!input.length) return;
                input.parent().addClass('form-error');
                // console.log($this.settings[error]);
                var msg = $this.settings[error][1];
                input.attr('placeholder', msg);
            });
        }


    };

    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });

        return this;
    };

})(jQuery, window, document);


//Custom selects
(function ($, window, document, undefined) {
    var pluginName = 'customSelects',
        defaults = {};

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            this.replaceSelects();
        },
        replaceSelects: function () {
            var $this = this,
                elem = $(this.element),
                elemWidth = elem.width(),
                options = elem.find('option'),
                randId = Math.floor(Math.random() * (99999999999 - 11111111) + 11111111);
            elem.wrap('<div class="bzm-select-holder" data-id="' + randId + '"></div>');

            if (!options.length) return;

            var valueHolder = $('<div class="value-holder"><div class="val" data-val="' + options.eq(0).attr('value') + '">' + options.eq(0).text() + '</div><div class="trigger-ico-holder"><div class="trigger-ico"></div></div></div>');
            var list = $('<ul class="bzm-select-options" data-id="' + randId + '" style="width:' + elemWidth + 'px;"></ul>');

            options.each(function () {
                var opt = $(this);
                list.append('<li class="select-option" data-value="' + opt.attr('value') + '">' + opt.text() + '</li>');
            });
            elem.parents('.bzm-select-holder').append(valueHolder).append(list);

            $(document).on('click', '.bzm-select-holder[data-id="' + randId + '"] .value-holder', function (event) {
                event.preventDefault();
                var trigger = $(event.currentTarget),
                    triggerOffset = trigger.offset(),
                    optsList = trigger.next('.bzm-select-options');

                if (trigger.hasClass('opened')) {
                    var list = $('body > .bzm-select-options[data-id="' + randId + '"]'),
                        holder = $('.bzm-select-holder[data-id="' + randId + '"]');
                    holder.find('.value-holder').removeClass('opened');
                    list.fadeOut();
                    holder.append(list);
                    trigger.removeClass('opened');
                    $('.dd-layer').remove();
                } else {
                    trigger.addClass('opened');
                    $('body').append(optsList);
                    $this.ddPosition();
                    optsList.fadeIn();
                }
            });

            $(document).on('mousedown', function (event) {
                event.stopPropagation();
                event.stopImmediatePropagation();
                var trigger = $(event.target);
                if (!trigger.parents('.bzm-select-options').length && (typeof event.toElement !== 'undefined')) {
                    event.stopPropagation();
                    $('body > .bzm-select-options').each(function () {
                        var id = $(this).attr('data-id'),
                            holder = $('.bzm-select-holder[data-id="' + id + '"]');
                        holder.append($(this));
                        holder.find('.value-holder').removeClass('opened');
                        $('.dd-layer').remove();
                    });
                }
            });

            $(document).on('click', '.bzm-select-options[data-id="' + randId + '"] li', function (event) {
                event.preventDefault();
                var trigger = $(event.currentTarget),
                    list = trigger.parents('.bzm-select-options'),
                    id = trigger.parents('.bzm-select-options').attr('data-id'),
                    val = trigger.attr('data-value'),
                    valText = trigger.text(),
                    holder = $('.bzm-select-holder[data-id="' + id + '"]'),
                    valueHolder = holder.find('.value-holder'),
                    valFrame = valueHolder.find('.val'),
                    sel = holder.find('.bzm-select');

                valFrame.attr('data-val', val).text(valText);

                sel.val(val);
                list.fadeOut()
                holder.append(list);
                valueHolder.removeClass('opened');
                $('.dd-layer').remove();
            });
        },
        ddPosition: function () {
            var $this = this,
                dd = $('body > .bzm-select-options'),
                id = dd.attr('data-id'),
                holder = $('.bzm-select-holder[data-id="' + id + '"]'),
                valueHolder = holder.find('.value-holder'),
                valueHolderOffset = valueHolder.offset();

            var ddLayer = $('<div class="dd-layer"></div>');

            $('body').append(ddLayer);
            ddLayer.css('height', $(document).height());

            dd.css({
                'top': valueHolderOffset.top + valueHolder.outerHeight(),
                'left': valueHolderOffset.left,
                'width': valueHolder.outerWidth()
            });
        }
    };

    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });

        return this;
    };

})(jQuery, window, document);


//Tabs
(function ($, window, document, undefined) {
    var pluginName = 'tabs',
        defaults = {};

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var $this = this,
                holder = $(this.element),
                tabsNav = holder.find('.bz-tabs-nav'),
                tabs = tabsNav.find('a'),
                tabsContHolder = holder.find('.bz-tabs-content');

            tabs.on('click', function (event) {
                event.preventDefault();
                var trigger = $(event.currentTarget),
                    id = trigger.attr('href');
                if (trigger.parents('li').hasClass('active')) {
                    return;
                }
                tabsNav.find('li').removeClass('active');
                trigger.parents('li').addClass('active');

                tabsContHolder.find('.tab-content').hide();
                tabsContHolder.find(id).fadeIn();
            });
        }
    };

    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });

        return this;
    };

})(jQuery, window, document);


//Resize textarea
(function ($, window, document, undefined) {
    var pluginName = 'resizeTextarea',
        defaults = {};

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var $this = this,
                elem = $(this.element),
                handler = elem.parents('.form-row').find('.resizer'),
                maxH = 220,
                minH = 100;

            var startY,
                currentY,
                interval;


            handler.on('mousedown', function (event) {
                var textarea = $(event.currentTarget).parents('.form-row').find('.textarea-resize-vertical');
                var tH = textarea.outerHeight();

                function handleMouseMove(event) {
                    event = event || window.event;
                    currentY = event.clientY;
                }

                function getMousePosition() {
                    if (currentY) {
                        if (startY != currentY) {
                            var diff = currentY - startY;
                            if ((tH + diff) < maxH && (tH + diff) > minH) {
                                textarea.css('height', tH + diff);
                            }
                        }
                    }
                }

                window.onmousemove = handleMouseMove;
                interval = setInterval(getMousePosition, 10);


                event = event || window.event;
                startY = event.clientY;
                event.preventDefault();
                event.stopPropagation();
            });
            $(document).on('mouseup', function () {
                clearInterval(interval);
            });
        }
    };

    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });

        return this;
    };

})(jQuery, window, document);


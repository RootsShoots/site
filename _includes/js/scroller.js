(function ($) {

    var transitionEvent = (function () {
        var el = document.createElement('div');
        var transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        }
        for (var t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    });

    function Slider (el, options) {
        this.$el = $(el);
        this.children = this.$el.children();
        if (this.children.length < 2) return;
        this.paused = false;
        this.container = this.$el.wrap('<div class="slider-container"></div>');
        this.$el.css('width', this.children.length * 100 + "%");
        this.children.css('width', 100 / this.children.length + "%");
        this.timer = 0;
        var defaults = { interval: 4000 };
        $.extend(this, defaults, options);
        this.bind();
        this.startTimer();
    }

    Slider.prototype.bind = function () {
        var that = this;
        that.container.on('mouseover', function () {
            that.toggle(false);
        });
        that.container.on('mouseout', function () {
            that.toggle(true);
        });
        that.$el.on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function (e) {
            that.tidyUp();
        });
    };

    Slider.prototype.startTimer = function () {
        var that = this;
        that.timer = setTimeout(function () {
            that.step();
        }, this.interval);
    };

    Slider.prototype.toggle = function (isMoving) {
        if (isMoving) {
            this.paused = false;
            this.startTimer();
        } else {
            this.paused = true;
            clearTimeout(this.timer);
            this.timer = 0;
        }
    };

    Slider.prototype.step = function (override) {
        if (this.paused) return;
        var that = this;
        that.$el.addClass('transition');
        that.$el.css('left', '-100%');
        if (!transitionEvent) {
            this.tidyUp();
        }
    };

    Slider.prototype.tidyUp = function () {
        this.$el.removeClass('transition');
        this.$el.append(this.children.eq(0).remove());
        this.$el.css('left', 0);
        this.children = this.$el.children();
        this.startTimer();
    };

    window.Slider = Slider;

    $(function () {
        $('[data-slider]').each(function (i, el) {
            new Slider(el);
        });
    });

})(jQuery);

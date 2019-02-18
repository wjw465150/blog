    function RandomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    // 水平�?�?��??件
    (function ($) {
        $.fn.extend({
            Scroll: function (opt, callback) {
                //�??�?��??�?�??
                if (!opt) var opt = {};
                var _btnRight = $("#" + opt.right); //Shawphy:�??�?��??�?�
                var _btnLeft = $("#" + opt.left); //Shawphy:�??左�??�?�
                var timerID;
                var _this = this.eq(0).find("ul:first");
                var lineW = _this.find("li:first").width(), //�?��??�??表宽度
											line = opt.line ? parseInt(opt.line, 10) : parseInt(this.width() / lineW, 10), //�?次�?�?��??�?�?��?�?认为�?�?�?�?��?�容�?��?度
											speed = opt.speed ? parseInt(opt.speed, 10) : 500; //�?��?��??度�?�?��?��?大�?�??度�?�?��?毫�?�?
                timer = opt.timer //?parseInt(opt.timer,10):3000; //�?�?��??�?��?��?��??�?毫�?�?
                if (line == 0) line = 1;
                var rightWidth = 0 - line * lineW;
                //�?�?��?��?�
                var scrollRight = function () {
                    _btnRight.unbind("click", scrollRight);
                    _this.animate({
                        marginLeft: rightWidth
                    }, speed, function () {
                        for (i = 1; i <= line; i++) {
                            _this.find("li:first").appendTo(_this);
                        }
                        _this.css({ marginLeft: 0 });
                        _btnRight.bind("click", scrollRight);
                    });

                }
                //Shawphy:�??左翻页�?��?�
                var scrollLeft = function () {
                    _btnLeft.unbind("click", scrollLeft);
                    for (i = 1; i <= line; i++) {
                        _this.find("li:last").show().prependTo(_this);
                    }
                    _this.css({ marginLeft: rightWidth });
                    _this.animate({
                        marginLeft: 0
                    }, speed, function () {
                        _btnLeft.bind("click", scrollLeft);
                    });
                }
                //Shawphy:�?��?��?��?�
                var autoPlay = function () {
                    if (timer) timerID = window.setInterval(scrollRight, timer);
                };
                var autoStop = function () {
                    if (timer) window.clearInterval(timerID);
                };
                //鼠�?�?件�?�?
                _this.hover(autoStop, autoPlay);
                autoPlay();
                var i = 0;
                var rd = RandomNum(0, 10);
                while (i++ < rd) {
                    scrollRight();
                }
                _btnRight.css("cursor", "pointer").click(scrollRight).hover(autoStop, autoPlay);
                _btnLeft.css("cursor", "pointer").click(scrollLeft).hover(autoStop, autoPlay);

            }
        })
    })(jQuery);
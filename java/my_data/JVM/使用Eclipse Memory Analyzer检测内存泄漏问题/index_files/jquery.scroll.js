    function RandomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    // æ°´å¹³æ»?å?¨æ??ä»¶
    (function ($) {
        $.fn.extend({
            Scroll: function (opt, callback) {
                //å??æ?°å??å§?å??
                if (!opt) var opt = {};
                var _btnRight = $("#" + opt.right); //Shawphy:å??å?³æ??é?®
                var _btnLeft = $("#" + opt.left); //Shawphy:å??å·¦æ??é?®
                var timerID;
                var _this = this.eq(0).find("ul:first");
                var lineW = _this.find("li:first").width(), //è?·å??å??è¡¨å®½åº¦
											line = opt.line ? parseInt(opt.line, 10) : parseInt(this.width() / lineW, 10), //æ¯?æ¬¡æ»?å?¨ç??è¡?æ?°ï¼?é»?è®¤ä¸ºä¸?å±?ï¼?å?³ç?¶å®¹å?¨é«?åº¦
											speed = opt.speed ? parseInt(opt.speed, 10) : 500; //å?·å?¨é??åº¦ï¼?æ?°å?¼è¶?å¤§ï¼?é??åº¦è¶?æ?¢ï¼?æ¯«ç§?ï¼?
                timer = opt.timer //?parseInt(opt.timer,10):3000; //æ»?å?¨ç??æ?¶é?´é?´é??ï¼?æ¯«ç§?ï¼?
                if (line == 0) line = 1;
                var rightWidth = 0 - line * lineW;
                //æ»?å?¨å?½æ?°
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
                //Shawphy:å??å·¦ç¿»é¡µå?½æ?°
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
                //Shawphy:è?ªå?¨æ?­æ?¾
                var autoPlay = function () {
                    if (timer) timerID = window.setInterval(scrollRight, timer);
                };
                var autoStop = function () {
                    if (timer) window.clearInterval(timerID);
                };
                //é¼ æ ?äº?ä»¶ç»?å®?
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
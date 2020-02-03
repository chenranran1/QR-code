//下拉首页的foot-----link
jQuery(function() {
    var $label = jQuery('.link-roll-box p'),
        $optionItem = jQuery('.link-roll-box ul li');
    $label.each(function() {
        jQuery(this).on('click', function(e) {
            var e = e || window.event;
            if (e.stopPropagation) {
                e.stopPropagation()
            } else {
                e.cancelBubble = true
            }
            var index = $label.index(jQuery(this));
            jQuery(this).stop().siblings('ul').slideToggle();
            for (var i = 0, max = $label.length; i < max; i++) {
                if (index != i) $label.eq(i).stop().siblings('ul').slideUp();
            }
        });
    });
    $optionItem.on('click', function() {
        var text = $(this).text();
        $(this).parent().siblings('p').text(text)
    })
    jQuery(document).on('click', function() {
        $label.siblings('ul').slideUp();
    });
});

//头条+banner轮播+专题自动播放
/*
 * 所有拓展组件，在同个页面引用时，其按钮等等选择器class 不能相同，否则将会冲突
 *
 * */
(function($) {
    function bannerRollLR(option) {
        var len = option.len || banBox.children().length, //显示几个的数量
            aniTime = option.aniTime || 500, //过渡时间
            moveTime = option.moveTime || 3000, //间隔滑动时间
            banBox = option._this, //移动的容器

            type = option.type || 'left',
            banBtnL = option.prev ? $(option.prev) : null, //左按钮
            banBtnR = option.next ? $(option.next) : null; //右按钮
        // banBtnL.show();
        // banBtnR.show();
        var i = 0,
            cloneArr = [];
        // moveM = (banBox.parent().width())/len;
        banBox.each(function() {
            for (var i = 0; i < len; i++) {
                cloneArr.push(banBox.children().eq(i).clone());
            }
        })
        for (var j = 0; j < cloneArr.length; j++) {
            banBox.append(cloneArr[j]);
        }
        var sizeChild = banBox.children().length;
        var moveM = banBox.children().outerWidth(true); //获取内外边距
        banBox.css({ width: sizeChild * moveM * 1.2 })

        function movel() {
            if (banBox.is(":animated")) return;
            i++;
            if (i == sizeChild - (len - 1)) {
                banBox.css({ left: 0 });
                i = 1;
            }
            banBox.stop().animate({ left: -i * moveM }, aniTime)
        }

        function mover() {
            if (banBox.is(":animated")) return;
            i--;
            if (i == -1) {
                banBox.css({ left: -(sizeChild - len) * moveM });
                i = sizeChild - (len + 1);
            }
            banBox.stop().animate({ left: -i * moveM }, aniTime)
        }
        // 左按钮
        // 添加三个变量12.10
        var tmr;
        var tml;
        var t;
        var bj;
        if (type == 'left') {
            bj = false;
        } else {
            bj = true;
        }
        if (banBtnL) {
            banBtnL.click(function() {
                clearInterval(t);
                clearInterval(tmr);
                clearInterval(tml);
                movel();
                tml = setInterval(movel, moveTime);
                bj = false;
            });
        }
        // 右按钮
        if (banBtnR) {
            banBtnR.click(function() {
                clearInterval(t);
                clearInterval(tml);
                clearInterval(tmr);
                mover();
                tmr = setInterval(mover, moveTime);
                bj = true;
            })
        }
        // 定时器
        if (type == 'left') {
            t = setInterval(movel, moveTime);
        } else {
            t = setInterval(mover, moveTime);
        }
        // 对banner定时器的操作
        banBox.parent().hover(function() {
            clearInterval(t);
            clearInterval(tml);
            clearInterval(tmr);
        }, function() {
            if (bj == false) {
                t = setInterval(movel, moveTime);
            } else {
                t = setInterval(mover, moveTime);
            }
        })

    }
    //所有 class均为jquery选择器
    //切换
    /*
     * option参数说明：没有特殊说明类型则为string
     * text:切换文本的class，如果没有则不填写
     * prev 切换btn class，如果没有则不填写
     * next 切换btn class ，如果没有则不填写
     * num  通过num切换，如果没有则不填写，num的length必须与切换对象length相同
     * className 当前选中num的className(不是选择器)，默认:cur
     * callback 类型：function 每次切换完成调用，如果没有则不填写
     * index 类型：number 切换开始位置
     * time  类型 number  切换过渡时间，默认：300;
     * autoPlay 类型 boolean 是否轮播,默认:true；
     * playTime 类型 number 自动播放时间，默认:4000,
     * direction 自动播放的顺序  默认：next
     * type 切换方向top或left,默认：left
     * space 类型：number 切换item中的间距 默认：0
     * */
    function simpleSwitch(option) {
        var $banner = option._this,
            $text = option.text ? $(option.text) : null,
            $prev = option.prev ? $(option.prev) : null,
            $next = option.next ? $(option.next) : null,
            $num = option.num ? $(option.num) : null,
            callBack = option.callback;
        var len = $banner.length,
            index = option.index || 0,
            time = option.time || 300,
            playTime = option.playTime || 4000,
            type = option.type || 'left',
            direction = option.type || 'next',
            autoPlay = option.autoPlay == undefined || option.autoPlay == true ? true : false,
            className = option.className || 'cur';
        type = type == 'top' ? 'top' : 'left';
        var pw = type == 'top' ? $banner.parent().height() : $banner.parent().width(),
            cw = type == 'top' ? $banner.height() : $banner.width();
        option.space = option.space || 0;
        cw += option.space;
        var css = {};
        if (cw * len <= pw) return;
        init();

        function init() {
            $banner.each(function() {
                var _i = $(this).index();
                $(this).show();
                css[type] = (_i - index) * cw;
                $(this).css(css);
            });
            if ($num) {
                $num.eq(index).addClass(className).siblings().removeClass(className)
            };
            if ($text) {
                $text.eq(index).show(0).siblings().hide();
            }
        }

        function nextMove() {
            for (var i = 0; i < len; i++) {
                var $item = $banner.eq(i);
                if ($item.position()[type] <= -cw) {
                    var perLeft = 0;
                    if (i == 0) {
                        perLeft = $banner.eq(len - 1).position()[type];
                    } else {
                        perLeft = $banner.eq(i - 1).position()[type];
                    }
                    css[type] = perLeft + cw;
                    $item.css(css);
                }
                var nowLeft = $item.position()[type];
                css[type] = nowLeft - cw;
                $item.animate(css, time)
            }
        }

        function prevMove() {
            for (var i = 0; i < len; i++) {
                var $item = $banner.eq(i);
                if ($item.position()[type] >= pw) {
                    var perLeft = 0;
                    if (i == len - 1) {
                        perLeft = $banner.eq(0).position()[type];
                    } else {
                        perLeft = $banner.eq(i + 1).position()[type];
                    }
                    css[type] = perLeft - cw;
                    $item.css(css);
                }
                var nowLeft = $item.position()[type];
                css[type] = nowLeft + cw;
                $item.animate(css, time)
            }
        }

        function bannerPlay() {
            if ($banner.is(":animated")) return;
            index++;
            index = index >= len ? 0 : index;
            if (direction == 'next') {
                nextMove();
            } else {
                prevMove()
            }
            toNextShow();
        }
        if (autoPlay) {
            var play = setInterval(bannerPlay, playTime);
        };

        function toNextShow() {
            if ($num) {
                $num.eq(index).addClass(className).siblings().removeClass(className)
            };
            if ($text) {
                $text.eq(index).show(0).siblings().hide();
            }
            if (!autoPlay) return;
            clearInterval(play);
            play = null;
            play = setInterval(bannerPlay, playTime);
            if (callBack) callBack();
        }
        if ($next) {
            $next.click(function() {
                if ($banner.is(":animated")) return;
                index--;
                index = index < 0 ? len - 1 : index;
                nextMove();
                toNextShow();
            })
        }
        if ($prev) {
            $prev.click(function() {
                if ($banner.is(":animated")) return;
                index++;
                index = index >= len ? 0 : index;
                prevMove();
                toNextShow();
            })
        }
        if ($num) {
            $num.mouseenter(function() {
                if ($banner.is(":animated")) return;
                var nextIndex = $num.index($(this));
                $banner.each(function() {
                    var _i = $(this).index();
                    $(this).show();
                    css[type] = (_i - index) * cw;
                    $(this).css(css);
                });
                for (var i = 0; i < len; i++) {
                    var $item = $banner.eq(i);
                    var nowLeft = $item.position()[type];
                    css[type] = nowLeft + -cw * (nextIndex - index);
                    $item.animate(css, time)
                }
                index = nextIndex;
                toNextShow();
            })
        }
    }


    // 淡入淡出切换
    /*
     * 参数配置如上
     * */
    function SwitchFade(option) {
        var $banner = option._this,
            $text = option.text ? $(option.text) : null,
            $num = option.num ? $(option.num) : null,
            index = option.index || 0,
            len = $banner.length,
            time = option.time || 300,
            playTime = option.playTime || 4000,
            className = option.className || 'cur';
        $banner.hide();
        $banner.eq(index).show();

        function SwitchTransform() {
            $banner.stop().eq(index).fadeIn(time).siblings().fadeOut(time);
            $num.eq(index).addClass(className).siblings().removeClass(className);
        }

        function SwitchPlay() {
            if ($banner.is(":animated")) return;
            index++;
            index = index >= len ? 0 : index;
            SwitchTransform();
        }
        var play = setInterval(SwitchPlay, playTime);
        $num.hover(function() {
            clearInterval(play);
            play = null;
            index = $num.index($(this));
            SwitchTransform();
        }, function() {
            play = setInterval(SwitchPlay, playTime);
        });
        if (option.prev) {
            var $left = $(option.prev);
            $left.click(function() {
                index--;
                index = index < 0 ? len - 1 : index;
                clearInterval(play);
                play = null;
                play = setInterval(bannerPlay, playTime);
            })
        }
        if (option.next) {
            var $next = $(option.next);
            $next.click(function() {
                index++;
                index = index >= len ? 0 : index;
                SwitchTransform();
                clearInterval(play);
                play = null;
                play = setInterval(SwitchPlay, playTime);
            })
        }
    }

    //滚动
    /*
     * option={
     * type: 方向 top或 left 默认 left
     * space：间距 默认 15
     * direction   prev或者next 默认 next
     * time 滚动时间 默认25,时间越大滚动越慢
     *
     * }
     * */
    function simpleRoll(option) {
        function RollNext() {
            for (var i = 0; i < len; i++) {
                var $item = $photo.eq(i);
                if ($item.position()[type] <= -cw) {
                    var perLeft = 0;
                    if (i == 0) {
                        perLeft = $photo.eq(len - 1).position()[type];
                    } else {
                        perLeft = $photo.eq(i - 1).position()[type];
                    }
                    var _css = {};
                    _css[type] = perLeft + cw;
                    $item.css(_css)
                }
                var nowLeft = $item.position()[type];
                (function($item, nowLeft) {
                    setTimeout(function() {
                        var _css = {};
                        _css[type] = nowLeft - 1;
                        $item.css(_css)
                    }, 5)
                })($item, nowLeft)
            }
        }

        function RollPrev() {
            for (var i = 0; i < len; i++) {
                var $item = $photo.eq(i);
                if ($item.position()[type] >= Width) {
                    var perLeft = 0;
                    if (i == len - 1) {
                        perLeft = $photo.eq(0).position()[type];
                    } else {
                        perLeft = $photo.eq(i + 1).position()[type];
                    }
                    var _css = {};
                    _css[type] = perLeft - cw;
                    $item.css(_css);
                }
                var nowLeft = $item.position()[_css];
                (function($item, nowLeft) {
                    setTimeout(function() {
                        var _css = {};
                        _css[type] = nowLeft + 1;
                        $item.css(_css)
                    }, 5)
                })($item, nowLeft)
            }
        }
        var $photo = option._this,
            direction = option.direction || 'next',
            $parent = $photo.parent(),
            len = $photo.length,
            space = option.space || 15,
            cw = $photo.width() + space,
            play = null,
            playFun = null,
            time = option.time || 25,
            type = option.type == 'top' || "left";
        var Width = option.type == 'top' ? $parent.height() : $parent.width();
        $photo.each(function() {
            var index = $(this).index();
            var _css = {};
            _css[type] = index * cw;
            $(this).css(_css)
        });
        if (cw * len <= Width) return $photo;
        if (direction == 'next') {
            playFun = RollNext
        } else {
            playFun = RollPrev
        }
        play = setInterval(playFun, time);
        $photo.hover(function() {
            clearInterval(play);
            play = null
        }, function() {
            play = setInterval(playFun, time);
        })
    }
    $.fn.extend({
        SwitchFade: function(option) {
            var option = option || {};
            option._this = $(this);
            SwitchFade(option)
        },
        simpleSwitch: function(option) {
            var option = option || {};
            option._this = $(this);
            simpleSwitch(option)
        },
        simpleRoll: function(optioin) {
            var option = optioin || {};
            option._this = $(this);
            simpleRoll(option)
        },
        bannerRollLR: function(optioin) {
            var option = optioin || {};
            option._this = $(this);
            bannerRollLR(option)
        },
    });
})(jQuery);

//tab
jQuery(function() {
    var $panel = jQuery('.tabPanel .panel');
    $panel.mouseenter(function() {
        var index = jQuery(this).parent().children('.panel').index(this);
        jQuery(this).parent().siblings('.tabContent').children('.tabItem').eq(index).show().siblings().hide();
        jQuery(this).addClass('cur').siblings('.panel').removeClass('cur')
    });
});
if (typeof exports === "object") { module.exports = jQuery; }
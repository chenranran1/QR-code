/*
 * @Description:  公共js交互效果
 * @Author: pyc 
 * @Date: 2018-03-12 14:53:35 
 * @Last Modified by: ln
 * @Last Modified time: 2018-11-07 17:05:32
 */
var listData, lineData, pieData, multiple;
var defaultLineOption, defaultPieOption; //默认的折线图配置+饼状图配置
var lineStatus, pieStatus; //折线图状态+饼状图状态
initStatus();
drawList(listSelector['预警信息'], listData['预警信息']);
// drawListDetail(listSelector["最新合成"], listDataDetail["最新合成"]);
// drawListDetail(listSelector["实时预警"], listDataDetail["实时预警"]);
// drawListDetail(listSelector["已布控人员"], listDataDetail["已布控人员"]);


/**
 * [initStatus description]初始化状态
 * @return {[type]} [description]
 */
function initStatus() {
    multiple = {
        "全县": 1,
        "全区": 2,
        "全市": 3,
        "当天": 1,
        "一周内": 2,
        "当月": 3,
    };
    lineData = {
        "legend": ["接警数", "出警数", "发案数"],
        "series": [{
                "name": "接警数",
                "data": [300, 350, 300, 400, 420, 280, 420],
                "type": "line",
                "symbolSize": 8
            },
            {
                "name": "出警数",
                "data": [200, 250, 200, 300, 320, 180, 320],
                "type": "line",
                "symbolSize": 8
            },
            {
                "name": "发案数",
                "data": [100, 180, 150, 160, 200, 120, 150],
                "type": "line",
                "symbolSize": 8
            }
        ]
    };
    pieData = { //饼图数据
            "1": {
                "innside": [{
                    "value": 500,
                    "name": "案发情况"
                }],
                "outSide": [{
                        "value": 50,
                        "name": "盗窃车内物品案"
                    },
                    {
                        "value": 60,
                        "name": "入室行窃"
                    },
                    {
                        "value": 90,
                        "name": "抢劫"
                    },
                    {
                        "value": 50,
                        "name": "抢夺"
                    },
                    {
                        "value": 100,
                        "name": "摩托车盗窃"
                    },
                    {
                        "value": 75,
                        "name": "诈骗案"
                    },
                    {
                        "value": 75,
                        "name": "盗骑车"
                    }
                ]
            },
            "2": {
                "innside": [{
                    "value": 1000,
                    "name": "案发情况"
                }],
                "outSide": [{
                        "value": 200,
                        "name": "盗窃车内物品案"
                    },
                    {
                        "value": 200,
                        "name": "入室行窃"
                    },
                    {
                        "value": 200,
                        "name": "抢劫"
                    },
                    {
                        "value": 180,
                        "name": "抢夺"
                    },
                    {
                        "value": 130,
                        "name": "摩托车盗窃"
                    },
                    {
                        "value": 350,
                        "name": "诈骗案"
                    },
                    {
                        "value": 200,
                        "name": "盗骑车"
                    }
                ]
            },
            "3": {
                "innside": [{
                    "value": 1500,
                    "name": "案发情况"
                }],
                "outSide": [{
                        "value": 300,
                        "name": "盗窃车内物品案"
                    },
                    {
                        "value": 200,
                        "name": "入室行窃"
                    },
                    {
                        "value": 200,
                        "name": "抢劫"
                    },
                    {
                        "value": 300,
                        "name": "抢夺"
                    },
                    {
                        "value": 200,
                        "name": "摩托车盗窃"
                    },
                    {
                        "value": 100,
                        "name": "诈骗案"
                    },
                    {
                        "value": 200,
                        "name": "盗骑车"
                    }
                ]
            }

        },
        listData = { //列表信息
            '预警信息': [{
                img: 'redIcon.png',
                title: '棉纺厂下岗员工群体红色预警',
                time: "2017-05-16"
            }, {
                img: 'redIcon.png',
                title: '群体罢工事件红色预警',
                time: "2017-05-16"
            }, {
                img: "yellowIcon.png",
                title: "本地重点人员苏丹橙色预警",
                time: "2017-05-16"
            }, {
                img: "yellowIcon.png",
                title: "全国重点人员叶宇红橙色预警",
                time: "2017-05-16"
            }, {
                img: "yellowIcon.png",
                title: "公安部重点人员李文强橙色预警",
                time: "2017-05-16"
            }, {
                img: "yellowIcon.png",
                title: "本地重点人员苏丹橙色预警",
                time: "2017-05-16"
            }, {
                img: "yellowIcon.png",
                title: "全国重点人员叶宇红橙色预警",
                time: "2017-05-16"
            }, {
                img: "yellowIcon.png",
                title: "公安部重点人员李文强橙色预警",
                time: "2017-05-16"
            }, {
                img: "yellowIcon.png",
                title: "公安部重点人员王三清橙色预警",
                time: "2017-05-16"
            }],
            '待办事项': [{
                img: 'arrowIcon.png',
                title: '棉纺厂下岗员工群体红色预警',
                time: "2017-05-16"
            }, {
                img: 'arrowIcon.png',
                title: '群体罢工事件红色预警',
                time: "2017-05-16"
            }, {
                img: "arrowIcon.png",
                title: "本地重点人员苏丹橙色预警",
                time: "2017-05-16"
            }, {
                img: "arrowIcon.png",
                title: "全国重点人员叶宇红橙色预警",
                time: "2017-05-16"
            }, {
                img: "arrowIcon.png",
                title: "公安部重点人员李文强橙色预警",
                time: "2017-05-16"
            }, {
                img: "arrowIcon.png",
                title: "本地重点人员苏丹橙色预警",
                time: "2017-05-16"
            }, {
                img: "arrowIcon.png",
                title: "全国重点人员叶宇红橙色预警",
                time: "2017-05-16"
            }, {
                img: "arrowIcon.png",
                title: "公安部重点人员李文强橙色预警",
                time: "2017-05-16"
            }, {
                img: "arrowIcon.png",
                title: "公安部重点人员王三清橙色预警",
                time: "2017-05-16"
            }],
        };
    listDataDetail = {
        "最新合成": [{
            "id": 1,
            "title": "关于****合成案件的作战",
            "type": "案件",
            "unit": "泸州市数警支队",
            "date": "2018-4-6",
            "status": "市局刑侦支队回复"
        }, {
            "id": 2,
            "title": "关于****合成案件的作战",
            "type": "案件",
            "unit": "泸州市数警支队",
            "date": "2018-4-6",
            "status": "市局刑侦支队回复"
        }, {
            "id": 3,
            "title": "关于****合成案件的作战",
            "type": "案件",
            "unit": "泸州市数警支队",
            "date": "2018-4-6",
            "status": "市局刑侦支队回复"
        }, {
            "id": 4,
            "title": "关于****合成案件的作战",
            "type": "案件",
            "unit": "泸州市数警支队",
            "date": "2018-4-6",
            "status": "市局刑侦支队回复"
        }, {
            "id": 5,
            "title": "关于****合成案件的作战",
            "type": "案件",
            "unit": "泸州市数警支队",
            "date": "2018-4-6",
            "status": "市局刑侦支队回复"
        }],
        "实时预警": [{
            "id": 1,
            "title": "关于****合成案件的作战",
            "type": "案件",
            "unit": "泸州市数警支队",
            "date": "2018-4-6",
            "status": "市局刑侦支队回复"
        }, {
            "id": 2,
            "title": "关于****合成案件的作战",
            "type": "案件",
            "unit": "泸州市数警支队",
            "date": "2018-4-6",
            "status": "市局刑侦支队回复"
        }, {
            "id": 3,
            "title": "关于****合成案件的作战",
            "type": "案件",
            "unit": "泸州市数警支队",
            "date": "2018-4-6",
            "status": "市局刑侦支队回复"
        }, {
            "id": 4,
            "title": "关于****合成案件的作战",
            "type": "案件",
            "unit": "泸州市数警支队",
            "date": "2018-4-6",
            "status": "市局刑侦支队回复"
        }, {
            "id": 5,
            "title": "关于****合成案件的作战",
            "type": "案件",
            "unit": "泸州市数警支队",
            "date": "2018-4-6",
            "status": "市局刑侦支队回复"
        }],
        "已布控人员": [{
            "id": 1,
            "title": "关于****合成案件的作战",
            "type": "案件",
            "unit": "泸州市数警支队",
            "date": "2018-4-6",
            "status": "市局刑侦支队回复"
        }, {
            "id": 2,
            "title": "关于****合成案件的作战",
            "type": "案件",
            "unit": "泸州市数警支队",
            "date": "2018-4-6",
            "status": "市局刑侦支队回复"
        }, {
            "id": 3,
            "title": "关于****合成案件的作战",
            "type": "案件",
            "unit": "泸州市数警支队",
            "date": "2018-4-6",
            "status": "市局刑侦支队回复"
        }, {
            "id": 4,
            "title": "关于****合成案件的作战",
            "type": "案件",
            "unit": "泸州市数警支队",
            "date": "2018-4-6",
            "status": "市局刑侦支队回复"
        }, {
            "id": 5,
            "title": "关于****合成案件的作战",
            "type": "案件",
            "unit": "泸州市数警支队",
            "date": "2018-4-6",
            "status": "市局刑侦支队回复"
        }]
    };
    listSelector = {
        '预警信息': '.yjxx',
        '待办事项': '.dbsx',
        "最新合成": '.zxhc',
        "实时预警": ".ssyj",
        "已布控人员": ".ybkry",
    };
    defaultLineOption = { // 默认图表的配置项和数据
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: [],
            textStyle: {
                color: '#fff'
            },
            bottom: 0,
            itemWidth: 30, //图示的宽度
            itemHeight: 18, //图示的高度
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            axisLabel: {
                textStyle: {
                    color: '#fff'
                },
            }
        },
        yAxis: {
            type: 'value',
            splitLine: { show: true }, //去除网格线
            axisLabel: {
                textStyle: {
                    color: '#fff'
                },
            }
        },
        series: []
    };

    defaultPieOption = {
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        series: [{
                name: '案发情况',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, '30%'],
                label: {
                    normal: {
                        show: true,
                        position: 'center',
                        color: '#fff',
                        fontSize: 18,
                    },
                },
                labelLine: {
                    normal: {
                        show: true,
                    }
                },
                data: [],
            },
            {
                type: 'pie',
                radius: ['40%', '55%'],
                label: {
                    normal: {
                        formatter: '{title|{b}}',
                        // 这里是文本块的样式设置：
                        width: 100,
                        height: 25,
                        borderWidth: 3,
                        borderColor: '#183b5b',
                        borderRadius: 50,
                        lineHeight: 25,
                        align: "center",
                        rich: {
                            title: {
                                color: '#fff',
                                lineHeight: 25,
                                align: "center",
                            },
                        }
                    }
                },
                data: [],
            }
        ]
    };

}
/**
 * [initLine description]绘制折线图
 * @param  {[obj]} option   [description]折线图的配置项
 * @param  {[str]} key      [description]决定使用哪个数据
 * @param  {[num]} multiple [description]倍数，模拟下拉框点击后折线图的变化
 * @param  {[num]} sort [description] 渲染dom的位置
 * @return {[type]}         [description]
 */
function initLine(option, key, multiple, sort) {
    var myLineChart = echarts.init($('.tabItem .line')[sort] || $('.tabItem .line')[0]);
    option.legend.data = lineData.legend;
    option.series = lineData.series;
    myLineChart.setOption(option);
    // 自适应容器宽高
    window.onresize = myLineChart.resize;
    window.addEventListener("resize", myLineChart.resize, false);
}
/**
 * [initPie description]绘制饼状图
 * @param  {[type]} option   [description]
 * @param  {[type]} key      [description]
 * @param  {[type]} multiple [description]
 * @return {[type]}          [description]
 */
function initPie(option, key, multiple, sort) {
    var myPieChart = echarts.init($('.tabItem .pie')[sort] || $('.tabItem .pie')[0]);
    option.series[0].data = pieData[multiple].innside; //内圈的数据
    option.series[1].data = pieData[multiple].outSide; //外圈的数据
    myPieChart.setOption(option);
    // 自适应容器宽高
    window.onresize = myPieChart.resize;
    window.addEventListener("resize", myPieChart.resize, false);
}
/**
 * [initPie description]绘制柱状图
 * @param  {[type]} option   [description]
 * @param  {[type]} key      [description]
 * @param  {[type]} multiple [description]
 * @return {[type]}          [description]
 */
function initBar(option) {
    var myBarChart = echarts.init($(".tabItem .bar")[0]);
    myBarChart.setOption(option);
    // 自适应容器宽高
    window.onresize = myBarChart.resize;
    window.addEventListener("resize", myBarChart.resize, false);
}
/**
 * [initPie description]绘制区域图
 * @param  {[type]} option   [description]
 * @param  {[type]} key      [description]
 * @param  {[type]} multiple [description]
 * @return {[type]}          [description]
 */
function initArea(option) {
    var myBarChart = echarts.init($(".tabItem .area")[0]);
    myBarChart.setOption(option);
    // 自适应容器宽高
    window.onresize = myBarChart.resize;
    window.addEventListener("resize", myBarChart.resize, false);
}
/**
 * [initPie description]绘制雷达图
 * @param  {[type]} option   [description]
 * @param  {[type]} key      [description]
 * @param  {[type]} multiple [description]
 * @return {[type]}          [description]
 */
function initRadar(option) {
    var myRadarChart = echarts.init($(".tabItem .radar")[0]);
    myRadarChart.setOption(option);
    // 自适应容器宽高
    window.onresize = myRadarChart.resize;
    window.addEventListener("resize", myRadarChart.resize, false);
}
/**
 * [labelFun description]下拉框公用方法
 * @param  {[dom]} label [description]label集合
 * @return {[type]}      [description]
 */
function labelFun(label) {
    label.each(function() {
        jQuery(this).on('click', function(e) {
            var e = e || window.event;
            if (e.stopPropagation) {
                e.stopPropagation();
            } else {
                e.cancelBubble = true;
            }
            var index = label.index(jQuery(this));
            jQuery(this).stop().toggleClass('selected').siblings('.option').slideToggle();
            for (var i = 0, max = label.length; i < max; i++) {
                if (index != i) label.eq(i).stop().removeClass('selected').siblings('.option').slideUp();
            }
        });
    });
}
/**
 * [drawList description]绘制列表
 * @param  {[str]}  selector [description]选择器
 * @param  {[array]} data    [description]列表数据
 * @return {[type]}          [description]
 */
function drawList(selector, data) {
    if ($(selector).find('ul').length) { //置空dom
        $(selector).find('ul').eq(0).remove();
    }
    var htmlStr = "<ul>";
    for (var i = 0; i < data.length; i++) {
        htmlStr += "<li>" +
            "<img img src='./images/" + data[i].img + "'>" +
            "<a href='javascript:void(0)'>" + data[i].title + "</a>" +
            "<span>" + data[i].time + "</span>" +
            "</li>";
    }
    htmlStr += "</ul>";
    $(selector).append(htmlStr);
}

/**
 * [drawListDetail description]绘制详细列表
 * @param  {[str]}  selector [description]选择器
 * @param  {[array]} data    [description]列表数据
 * @return {[type]}          [description]
 */
function drawListDetail(selector, data) {
    if ($(selector).find('ul').length) { //置空dom
        $(selector).find('ul').eq(0).remove();
    }
    // console.log(data);
    var htmlStr = "<ul>";
    for (var i = 0; i < data.length; i++) {
        htmlStr += "<li>" + "<span>" + data[i].id + "</span>" +
            "<span>" + data[i].title + "</span>" +
            "<span>" + data[i].type + "</span>" +
            "<span>" + data[i].unit + "</span>" +
            "<span>" + data[i].date + "</span>" +
            "<span>" + data[i].status + "</span>" +
            "</li>";
    }

    htmlStr += "</ul>";
    $(selector).append(htmlStr);
    // console.log(htmlStr);
}

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
 * indy动态数字变化
 * lendy 总长度
 * */
function simpleSwitch() {

}

function simpleSwitch1(option) {
    var $banner = option._this,
        $text = option.text ? $(option.text) : null,
        $prev = option.prev ? $(option.prev) : null,
        $next = option.next ? $(option.next) : null,
        $num = option.num ? $(option.num) : null,
        $indy = option.indy ? $(option.indy) : null,
        $lendy = option.lendy ? $(option.lendy) : null,
        callBack = option.callback;
    var len = $banner.length,
        index = option.index || 0,
        time = option.time || 300,
        playTime = option.playTime || 4000,
        type = option.type || 'left',
        direction = option.direction || 'next',
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
        if ($lendy) {
            $lendy.text(len);
        }
        $banner.each(function() {
            var _i = $(this).index();
            $(this).show();
            css[type] = (_i - index) * cw;
            $(this).css(css);
        });
        if ($num) {
            $num.eq(index).addClass(className).siblings().removeClass(className);
        };
        if ($indy) {
            $indy.text(index + 1);
        }
        if ($text) {
            $text.eq(index).show(0).siblings().hide();
        }
    }

    function nextMove() {
        if (!$banner.is(":visible")) return;
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
        if (!$banner.is(":visible")) return;
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
            // console.log(nowLeft)
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
            prevMove();
        }
        toNextShow();
    }
    if (autoPlay) {
        var play = setInterval(bannerPlay, playTime);
    };

    function toNextShow() {
        if ($num) {
            if (direction == 'next') {
                $num.eq(index).addClass(className).siblings().removeClass(className);
            } else {
                $num.eq(len - index).addClass(className).siblings().removeClass(className);
            }
        };
        if ($text) {
            if (direction == 'next') {
                $text.eq(index).show(0).siblings().hide();
            } else {
                $text.eq(len - index).show(0).siblings().hide();
            }
        }
        if ($indy) {
            if (direction == 'next') {
                $indy.text(index + 1);
            } else {
                $indy.text(len - index + 1);
            }

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
            // 12.10修改
            prevMove();
            toNextShow();
        })
    }
    if ($prev) {
        $prev.click(function() {
            if ($banner.is(":animated")) return;
            index++;
            index = index >= len ? 0 : index;
            // 12.10修改
            nextMove();
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
    $banner.hover(function() {
        clearInterval(play);
        play: null
    }, function() {
        play = setInterval(bannerPlay, playTime);
    })
}

/**
   * [dropDownFun description]
   * tagSiblings:.drop-down .tag的兄弟元素
   * optionItem：下拉子选项
   * optionBool:是否是获取当前元素的值给.tag元素，默认是fasle（默认）当前元素，true是子元素
   * cur:当前添加的样式,不传递默认为空
   * @return {[type]}        [description]
   */
  function dropDownFun(option){
    var $label=option._this,
    cur = option.cur?option.cur:'',
    $tagSiblings = option.tagSiblings,
    $optionBool = option.optionBool?option.optionBool:false,
    $optionItem=option.optionItem;
    $label.each(function(){
      $(this).on('click',function(e){
        var e=e||window.event;
        if(e.stopPropagation){
          e.stopPropagation()
        }else{
          e.cancelBubble=true
        }
        var index= $label.index($(this));
        $(this).stop().toggleClass(cur).siblings($tagSiblings).slideToggle();
        for(var i=0,max=$label.length;i<max;i++){
          if(index!=i)$label.eq(i).stop().removeClass(cur).siblings($tagSiblings).slideUp();
        }
      });
    });
    $(document).on('click',$optionItem,function(){
      // 注意是获取当前元素还是子元素
      var text= $optionBool==false ? $(this).children().text(): $(this).text();
      $(this).parents($tagSiblings).siblings($label).text(text);
    });
    $(document).on('click',function(){
      $label.stop().removeClass(cur).siblings($tagSiblings).slideUp();
    });
  }


$.fn.extend({
    simpleSwitch: function(option) {
        var option = option || {};
        option._this = $(this);
        // console.log(this)
        simpleSwitch(option);
    },
    dropDownFun:function(optioin){
        var  option=optioin ||{};
        option._this=$(this);
        dropDownFun(option)
    }
});

// if (typeof exports === "object") { module.exports = jQuery; }
// function requestListData(key) {
//     $.ajax({
//         type: 'GET',
//         url: './data/listData.json',
//         dataType: "json",
//         success: function(data, status) {
//             console.log(data[key]);
//             return data[key];
//         }
//     });
// }
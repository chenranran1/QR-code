"use strict"
$(function() {

    initStatus();
    
    //饼图和雷达图
//    initPie(pieOptions(), pieStatus, 1);
//    initRadar(radarOptions());

    function initStatus() {
        pieStatus = "案件情况";
    }

    /**
     * [pieOptions description]饼状图配置项
     * @return {[type]} [description]
     */
    function pieOptions() {
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{b}: {c} ({d}%)"
            },
            visualMap: {
                show: false,
                inRange: {
                    color: ['#67A6CC', '#335CAE', '#328792']
                        // color: ['#315CB0', '#4A3461', '#AA737B']
                }
            },
            series: [{
                    name: '',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],
                    center: ['40%', '50%'],
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
                    itemStyle: {
                        normal: {
                            color: '#004881'
                        }
                    },
                    data: [],
                },
                {
                    type: 'pie',
                    radius: ['40%', '55%'],
                    center: ['40%', '50%'],
                    label: {
                        normal: {
                            formatter: '{title|{b}}',
                            // 这里是文本块的样式设置：
                            width: 0,
                            height: 25,
                            align: "left",
                            rich: {
                                title: {
                                    color: '#fff',
                                    lineHeight: 25,
                                    align: "center",
                                },
                            }
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: 1,
                            borderColor: '#000'
                        }
                    },
                    data: [],
                }
            ]
        };
        return option;
    }

    /**
     * [pieOptions description]雷达图配置项
     * @return {[type]} [description]
     */
    function radarOptions() {
        var option = {

            title: {
                // text: '雷达图'
            },
            tooltip: {
                trigger: 'axis'
            },
            // legend: {
            //     x: 'center',
            //     data: ['某软件']
            // },
            radar: [{
                    indicator: [
                        { text: '人', max: 100 },
                        { text: '车', max: 100 },
                        { text: '电', max: 100 },
                        { text: '网', max: 100 },
                        { text: '像', max: 100 }
                    ],
                    // center: ['47%', '47%', '57%' , '10%'],
                    ceter: ['0'],
                    radius: '65%'
                },

            ],
            series: [{
                    type: 'radar',
                    tooltip: {
                        trigger: 'item'
                    },
                    itemStyle: { normal: { areaStyle: { type: 'default' } } },
                    data: [{
                        value: [60, 73, 85, 40, 80],
                        name: '统计展示'
                    }]
                },


            ]


        };
        return option;
    }
    //左侧模块收缩和展开
    $('.photo-group').on("click", function() {
        $('#left').animate({
            "left": "0px"
        }, 1000);
        $('.like').animate({
            "opacity": "1"
        }, 1000);
    })
        //关闭左侧数据

    $('.close').on("click", function() {
        $('#left').animate({
            "left": "-4.10rem"
        }, 1000);
        $('.like').animate({
            "opacity": "0"
        }, 1000);
    });

    //切换搜索框状态
    $(".sw_searchTop>ul>li:nth-child(1)").click(function() {
        $(".sw_searchTop .inputB input").toggle(1000);
        $(".sw_searchTop .dropdown").toggle(1000);
    });
    //选择不同日期按钮的状态切换
    $(".m-leftN .date li").click(function() {
        $(this).addClass('cur').siblings().removeClass('cur');
    });
    //消息弹框
    var $container = $(".m-rightN .message");
    $(".m-rightN .bg4 .title").click(function() {
    });

    for (var i = 0; i < $container.length; i++) {
    }

    $(".bg1 ul li").simpleSwitch({
        playTime: 2000,
        type: 'top',
        space: 6,
    })
    $(".bg2 ul li").simpleSwitch({
        playTime: 2000,
        type: 'top',
        space: 6
    });
    $(".bg3 ul li").simpleSwitch({
        playTime: 500,
        type: 'top',
        space: 6,
    });
    $(".bg4 ul li").simpleSwitch({
        playTime: 2000,
        type: 'top',
        space: 6,
    });
    
});

/**
 * 控制层
 */
var indexApp = angular.module('indexApp', [
    'ui.router',
    'oc.lazyLoad',
    'ngAnimate',
    'ngSanitize',
    'ngResource',
    'mgcrea.ngStrap'
]);

indexApp.controller('indexCtrl', indexCtrl);

function indexCtrl($rootScope, $scope, $http, $compile,$modal) {

    $scope.isTest = true;       //是否测试
    $scope.isPolling = false;   //是否轮询
    $scope.isLoad = true;       //是否已加载iframe

    $scope.warningList = [];    //预警对象集合
    $scope.normalWarningList = [];  //路人预警对象集合
    $scope.detailWarning = {};  //预警详情查看对象
    $scope.detailLevel = null;  //查看详情的预警级别（用于展示不同样式）
    //预警查询参数对象（alertLevelCode查询条件需要排除路人预警）
    $scope.warningQueryModel = {
        start:0,
        limit:5,
        alertLevelCode:''
    };
    //路人预警查询参数对象
    $scope.normalWarningQueryModel = {
        start:0,
        limit:5,
        cameraIds:[],
        alertLevelCode:'NORMAL'
    };
    //统计查询参数
    $scope.countQueryModel = {
        cameraId: '',
        interval: 'today'
    }
    $scope.cameraList = [];       //摄像头对象集合
    $scope.cameraName = "";       //摄像头名字（保留，仅用于展示）
    $scope.warningNums = [];       //各个底库差生的报警数组
    $scope.shot = 0;               //路人抓拍数量
    $scope.eventList = [];          //事件预警数组

    //iframe地址前后缀
    $scope.preUrl = "http://80.75.89.81:11180/#/largeScaleSurveillance/drawer?surveillance_id=0@GAW_LZ81_1561087758&camera_id="; //URL前缀
    $scope.firstSufUrl = "@GAW_LZ81_1561087758"; //第一次进入页面URL后缀
    $scope.sufUrl = "@GAW_LZ81_1561087758"; //统一URL后缀

    //需要跳转的url前缀
    $scope.newPreUrl = "http://80.75.89.81:11180/#/realtime/capture?camera_id=";
    $scope.clusterId = "GAW_LZ81_1561087758";

    /**
     * 初始化调用方法
     */
    $scope.init = function () {

        //初始化日期查询条件
        dateUtil.initDateOptions($scope);
        //获取当前登录用户的信息
        $scope.getUserInfo();
        //获取clusterId
        $scope.getClusterId();
        //获取预警列表
        $scope.getWarningList();
        //获取路人预警列表（只查询当前摄像头下的路人列表）
        //$scope.getNormalWarningList();
        //获取每个底库报警数
        $scope.doCount();
        //获取事件预警列表
        $scope.getEventList();

        var sessionid = $scope.getUrlParameter('session_id');
        if(sessionid){
            $scope.firstSufUrl = $scope.firstSufUrl + "&session_id=" + sessionid;
        }
        //获取所有摄像头（该请求完成后还需要请求：路人抓拍数量和路人抓拍列表两个接口）
        $scope.getAllCamera();
    };

    /**
     * 查询跳转按钮，跳转新页面
     */
    $scope.go = function(){

    	$http.get("/test").then(function (resp) {
            var data = resp;
        });
    }
    
    /**
     * 获取当前登录用户信息
     */
    $scope.getUserInfo = function(){

        $scope.username = "张三";
        $scope.unitname = "泸州市公安局";
        var url = "http://80.75.89.81:8095/user";
        if (!$scope.isTest){
            $http.get(url).then(function (resp) {
                var data = resp.data;
                $scope.username = data.name;
            });
        }
    }

    /**
     * 获取clusterId
     */
    $scope.getClusterId = function(){
        var url = "http://80.75.89.81:8095/yitu/clusterId";
        if (!$scope.isTest){
            $http.get(url).then(function (resp) {
                var data = resp.data;
                $scope.clusterId = data;
            });
        }
    }

    /**
     * 获取预警列表
     */
    $scope.getWarningList = function () {
        var url = "http://80.75.89.81:8095/alert";
        $scope.getStartAndEndByInterval($scope.warningQueryModel);
        if(!$scope.isTest){
            $http.post(url,$scope.warningQueryModel).then(function (resp) {
                var data = resp.data;
                if(data.results.length > 0){
                    $scope.warningList = data.results;
                }
                //每隔2s查询一次
                if($scope.isPolling){
                    setTimeout(function () {
                        $scope.getWarningList();
                    }, 2000);
                }
            });
        }else{
            var data = {
                "total": 1,
                "results": [
                    {
                        "cameraId":"1",
                        "cameraName": "市政府门口左侧",
                        "faceImageUri": "../../images/default/test.jpg",
                        "pictureUri": "../../images/default/test.jpg",
                        "survName": "云墙布控",
                        "timestamp": 1566892168,
                        "hitFaceImageUri": "../../images/default/test.jpg",
                        "hitName": "橙色名字",
                        "hitPersonId": "510521198007075642",
                        "hitRepoName": "涉恐布控库",
                        "hitSimilarity": 91.05421899866174,
                        "alertLevelCode":"NORMAL"
                    },
                    {
                        "cameraId":"2",
                        "cameraName": "市政府门口左侧",
                        "faceImageUri": "../../images/default/test.jpg",
                        "pictureUri": "../../images/default/test.jpg",
                        "survName": "云墙布控",
                        "timestamp": 1566892168,
                        "hitFaceImageUri": "../../images/default/test.jpg",
                        "hitName": "黄色2",
                        "hitPersonId": "51382219989912343",
                        "hitRepoName": "涉稳布控库",
                        "hitSimilarity": 92.05421899866174,
                        "alertLevelCode":"YELLOW"
                    },
                    {
                        "cameraId":"1",
                        "cameraName": "市政府门口左侧",
                        "faceImageUri": "../../images/default/test.jpg",
                        "pictureUri": "../../images/default/test.jpg",
                        "survName": "云墙布控",
                        "timestamp": 1566892168,
                        "hitFaceImageUri": "../../images/default/test.jpg",
                        "hitName": "蓝色3",
                        "hitPersonId": "510521198007075642",
                        "hitRepoName": "涉军布控库",
                        "hitSimilarity": 93.05421899866174,
                        "alertLevelCode":"BLUE"
                    },
                    {
                        "cameraId":"2",
                        "cameraName": "市政府门口左侧",
                        "faceImageUri": "../../images/default/test.jpg",
                        "pictureUri": "../../images/default/test.jpg",
                        "survName": "云墙布控",
                        "timestamp": 1566892168,
                        "hitFaceImageUri": "../../images/default/test.jpg",
                        "hitName": "橙色4",
                        "hitPersonId": "510521198007075642",
                        "hitRepoName": "上访布控库",
                        "hitSimilarity": 94.05421899866174,
                        "alertLevelCode":"RED"
                    },
                    {
                        "cameraId":"1",
                        "cameraName": "市政府门口左侧",
                        "faceImageUri": "../../images/default/test.jpg",
                        "pictureUri": "../../images/default/test.jpg",
                        "survName": "云墙布控",
                        "timestamp": 1566892168,
                        "hitFaceImageUri": "../../images/default/test.jpg",
                        "hitName": "黄色5",
                        "hitPersonId": "510521198007075642",
                        "hitRepoName": "涉毒布控库",
                        "hitSimilarity": 95.05421899866174,
                        "alertLevelCode":"YELLOW"
                    },
                    {
                        "cameraId":"2",
                        "cameraName": "市政府门口左侧",
                        "faceImageUri": "../../images/default/test.jpg",
                        "pictureUri": "../../images/default/test.jpg",
                        "survName": "云墙布控",
                        "timestamp": 1566892168,
                        "hitFaceImageUri": "../../images/default/test.jpg",
                        "hitName": "蓝色6",
                        "hitPersonId": "510521198007075642",
                        "hitRepoName": "盗窃布控库",
                        "hitSimilarity": 96.05421899866174,
                        "alertLevelCode":"BLUE"
                    },
                    {
                        "cameraId":"1",
                        "cameraName": "市政府门口左侧",
                        "faceImageUri": "../../images/default/test.jpg",
                        "pictureUri": "../../images/default/test.jpg",
                        "survName": "云墙布控",
                        "timestamp": 1566892168,
                        "hitFaceImageUri": "../../images/default/test.jpg",
                        "hitName": "橙色7",
                        "hitPersonId": "510521198007075642",
                        "hitRepoName": "扒窃布控库",
                        "hitSimilarity": 97.05421899866174,
                        "alertLevelCode":"RED"
                    },
                    {
                        "cameraId":"2",
                        "cameraName": "市政府门口左侧",
                        "faceImageUri": "../../images/default/test.jpg",
                        "pictureUri": "../../images/default/test.jpg",
                        "survName": "云墙布控",
                        "timestamp": 1566892168,
                        "hitFaceImageUri": "../../images/default/test.jpg",
                        "hitName": "黄色8",
                        "hitPersonId": "510521198007075642",
                        "hitRepoName": "抢劫布控库",
                        "hitSimilarity": 98.05421899866174,
                        "alertLevelCode":"YELLOW"
                    },
                    {
                        "cameraId":"3",
                        "cameraName": "市政府门口左侧",
                        "faceImageUri": "../../images/default/test.jpg",
                        "pictureUri": "../../images/default/test.jpg",
                        "survName": "云墙布控",
                        "timestamp": 1566892168,
                        "hitFaceImageUri": "../../images/default/test.jpg",
                        "hitName": "蓝色9",
                        "hitPersonId": "510521198007075642",
                        "hitRepoName": "抢夺布控库",
                        "hitSimilarity": 99.05421899866174,
                        "alertLevelCode":"BLUE"
                    },
                    {
                        "cameraId":"3",
                        "cameraName": "市政府门口左侧",
                        "faceImageUri": "../../images/default/test.jpg",
                        "pictureUri": "../../images/default/test.jpg",
                        "survName": "云墙布控",
                        "timestamp": 1566892168,
                        "hitFaceImageUri": "../../images/default/test.jpg",
                        "hitName": "橙色0",
                        "hitPersonId": "510521198007075642",
                        "hitRepoName": "其他布控库",
                        "hitSimilarity": 99.05421899866174,
                        "alertLevelCode":"RED"
                    }
                ]
            };
            if(data.results.length > 0){
                $scope.warningList = data.results;
            }
        }
    };

    /**
     * 获取路人预警列表
     */
    $scope.getNormalWarningList = function () {
        var url = "http://80.75.89.81:8095/alert";
        $scope.getStartAndEndByInterval($scope.normalWarningQueryModel);

        var cameraId = $scope.countQueryModel.cameraId;
        $scope.normalWarningQueryModel.cameraIds = [];
        $scope.normalWarningQueryModel.cameraIds.push(cameraId);

        if(!$scope.isTest){
            $http.post(url,$scope.normalWarningQueryModel).then(function (resp) {
                var data = resp.data;
                if(data.results.length > 0){
                    $scope.normalWarningList = data.results;
                }
                //每隔2s查询一次
                if($scope.isPolling){
                    setTimeout(function () {
                        $scope.getNormalWarningList();
                    }, 2000);
                }
            });
        }else{
            var data = {
                "total": 1,
                "results": [
                    {
                        "cameraId":"1",
                        "cameraName": "市政府门口左侧",
                        "faceImageUri": "../../images/default/test.jpg",
                        "pictureUri": "../../images/default/test.jpg",
                        "survName": "云墙布控",
                        "timestamp": 1566892168,
                        "hitFaceImageUri": "../../images/default/test.jpg",
                        "hitName": "路人1",
                        "hitPersonId": "510521198007075642",
                        "hitRepoName": "涉恐",
                        "hitSimilarity": 91.05421899866174,
                        "alertLevelCode":"RED"
                    },
                    {
                        "cameraId":"2",
                        "cameraName": "市政府门口左侧",
                        "faceImageUri": "../../images/default/test.jpg",
                        "pictureUri": "../../images/default/test.jpg",
                        "survName": "云墙布控",
                        "timestamp": 1566892168,
                        "hitFaceImageUri": "../../images/default/test.jpg",
                        "hitName": "路人2",
                        "hitPersonId": "510521198007075642",
                        "hitRepoName": "涉稳布控库",
                        "hitSimilarity": 92.05421899866174,
                        "alertLevelCode":"YELLOW"
                    },
                    {
                        "cameraId":"3",
                        "cameraName": "市政府门口左侧",
                        "faceImageUri": "../../images/default/test.jpg",
                        "pictureUri": "../../images/default/test.jpg",
                        "survName": "云墙布控",
                        "timestamp": 1566892168,
                        "hitFaceImageUri": "../../images/default/test.jpg",
                        "hitName": "路人3",
                        "hitPersonId": "510521198007075642",
                        "hitRepoName": "涉军布控库",
                        "hitSimilarity": 93.05421899866174,
                        "alertLevelCode":"NORMAL"
                    },
                    {
                        "cameraId":"4",
                        "cameraName": "市政府门口左侧",
                        "faceImageUri": "../../images/default/test.jpg",
                        "pictureUri": "../../images/default/test.jpg",
                        "survName": "云墙布控",
                        "timestamp": 1566892168,
                        "hitFaceImageUri": "../../images/default/test.jpg",
                        "hitName": "路人3",
                        "hitPersonId": "510521198007075642",
                        "hitRepoName": "涉军布控库",
                        "hitSimilarity": 93.05421899866174,
                        "alertLevelCode":"NORMAL"
                    },
                    {
                        "cameraId":"5",
                        "cameraName": "市政府门口左侧",
                        "faceImageUri": "../../images/default/test.jpg",
                        "pictureUri": "../../images/default/test.jpg",
                        "survName": "云墙布控",
                        "timestamp": 1566892168,
                        "hitFaceImageUri": "../../images/default/test.jpg",
                        "hitName": "路人3",
                        "hitPersonId": "510521198007075642",
                        "hitRepoName": "涉军布控库",
                        "hitSimilarity": 93.05421899866174,
                        "alertLevelCode":"NORMAL"
                    }
                ]
            };
            if(data.results.length > 0){
                $scope.normalWarningList = data.results;
            }
        }
    };

    /**
     * 跳转云墙电子档案
     * @param warning
     */
    $scope.goElecFile = function(warning){
        var idcard = warning.hitPersonId;
        var url = "http://10.68.0.239/lz2/html/KeyPersonnelArchives/index.html#/record?idcard=" + idcard;
        window.open(url);
    }

    /**
     * 预警详情弹框
     */
    $scope.toDetailModal = function(index,type){

        if(type == 1){
            $scope.detailWarning = $scope.warningList[index];
        }else{
            $scope.detailWarning = $scope.normalWarningList[index];
        }
        //相似度处理
        $scope.detailWarning.hitSimilarity = $scope.detailWarning.hitSimilarity.toString();
        var title = "相似度：";
        title += $scope.detailWarning.hitSimilarity.substr(0,5);
        $scope.openDetailModal(title);
    }
    /**
     * 打开预警详情弹框
     */
    $scope.openDetailModal = function(title){
        $scope.model = $modal({
            title : title,
            scope : $scope,
            templateUrl : './modal/warningDetailModal.html',// modal 模板地址
            show : true,
            backdrop : 'static',// 点背景旁白不会关闭
            onShow: function() {
                // 设置框的大小
                $(".modal-dialog").width($(window).width() * 0.86);
                var csstype = "max-height";
                var cssOption = {};
                cssOption[csstype] = $(window).height();
                $(".modal-body").css(cssOption);
            },
            onHide : function() {},
        });
        $scope.model.$promise.then($scope.model.show);
    }

    /**
     * 获取所有摄像头
     */
    $scope.getAllCamera = function(){

        var url = "http://80.75.89.81:8095/camera";
        var survIds = null;   //布控任务id数组
        if (!$scope.isTest){
            $http.post(url,{survIds:survIds}).then(function (resp) {
                var data = resp.data;
                if(data.length > 0){
                    $scope.cameraList = data;
                    $scope.countQueryModel.cameraId = $scope.cameraList[0].id;
                    var url = $scope.preUrl + $scope.countQueryModel.cameraId + $scope.firstSufUrl;
                    document.getElementById("myIframe").src = url;
                    $scope.doShot();
                    $scope.getNormalWarningList();
                }
            });
        }else{
            var camera1 = {};
            camera1.id = '1';
            camera1.name = '西外社区西环街21号';
            $scope.cameraList.push(camera1);
            var camera2 = {};
            camera2.id = '2';
            camera2.name = '七化建小区24栋';
            $scope.cameraList.push(camera2);
            var camera3 = {};
            camera3.id = '3';
            camera3.name = '3号摄像头';
            $scope.cameraList.push(camera3);
            //取第一个对象主键作为相关查询的参数
            if($scope.cameraList .length > 0){
                $scope.countQueryModel.cameraId = $scope.cameraList[0].id;
                $scope.doShot();
                $scope.getNormalWarningList();
            }
        }
    }

    /**
     * 选择摄像头变化
     */
    $scope.cameraChange = function(){
        $scope.changeIframe();
        $scope.doShot();
        $scope.getNormalWarningList();
    }

    /**
     * 点击列表后面的摄像头
     * @param cameraId
     */
    $scope.changeCamera = function(cameraId){
        $scope.countQueryModel.cameraId = cameraId + '';
        $("#mySelect").val(cameraId);
        $scope.changeIframe();
        $scope.doShot();
        $scope.getNormalWarningList();
    }

    /**
     * 切换iframe地址
     */
    $scope.changeIframe = function(){
        $scope.isLoad = !$scope.isLoad;
        document.getElementById("myIframe").src = '';
        var url = $scope.preUrl + $scope.countQueryModel.cameraId + $scope.sufUrl;
        document.getElementById("myIframe").src = url;
        if(!$scope.isLoad){
            setTimeout(function () {
                $scope.changeIframe();
            }, 100);
        }
    }

    /**
     * 时间间隔变化
     * @param interval
     */
    $scope.intervalChange = function(interval){
        $scope.countQueryModel.interval = interval;
        $scope.doCount();
        $scope.doShot();
    }

    /**
     * 统计各个底库报警数
     */
    $scope.doCount = function(){
        $scope.getStartAndEndByInterval($scope.countQueryModel,$scope.countQueryModel.interval);
        var url = "http://80.75.89.81:8095/alert/count";
        if (!$scope.isTest){
            $http.post(url,$scope.countQueryModel).then(function (resp) {
                var data = resp.data;
                //不确定大小的数组
                $scope.warningNums = data;
                //暂时根据库名来设置颜色
                for(var i in $scope.warningNums){
                    var warningNum = $scope.warningNums[i];
                    if(warningNum.name.indexOf("在逃") != -1){
                        warningNum.alertLevelCode = 'RED';
                    }else if(warningNum.name.indexOf("刑事") != -1){
                        warningNum.alertLevelCode = 'YELLOW';
                    }else if(warningNum.name.indexOf("重点") != -1){
                        warningNum.alertLevelCode = 'YELLOW';
                    }else if(warningNum.name.indexOf("涉恐") != -1){
                        warningNum.alertLevelCode = 'YELLOW';
                    }else if(warningNum.name.indexOf("涉稳") != -1){
                        warningNum.alertLevelCode = 'YELLOW';
                    }
                }
            });
        }else{
            var warning1 = {};
            warning1.id = '3501';
            warning1.name = '拓尔思专用布控库拓尔思专用布控库';
            warning1.count = 235432;
            warning1.alertLevelCode = 'BLUE';
            $scope.warningNums.push(warning1);
            var warning2 = {};
            warning2.id = '3501';
            warning2.name = '行动要抓获人员';
            warning2.count = 9;
            warning2.alertLevelCode = 'RED';
            $scope.warningNums.push(warning2);
            var warning3 = {};
            warning3.id = '3501';
            warning3.name = '情报行动大队临控';
            warning3.count = 27;
            warning3.alertLevelCode = 'BLUE';
            $scope.warningNums.push(warning3);
            var warning4 = {};
            warning4.id = '3501';
            warning4.name = '测试';
            warning4.count = 183;
            $scope.warningNums.push(warning4);
            var warning5 = {};
            warning5.id = '3501';
            warning5.name = '路人库';
            warning5.count = 121389;
            warning5.alertLevelCode = 'BLUE';
            $scope.warningNums.push(warning5);
            var warning6 = {};
            warning6.id = '3501';
            warning6.name = '在逃库';
            warning6.count = 1542;
            //warning6.alertLevelCode = 'RED';
            $scope.warningNums.push(warning6);
            var warning7 = {};
            warning7.id = '3501';
            warning7.name = '扒窃库';
            warning7.count = 972;
            warning7.alertLevelCode = 'YELLOW';
            $scope.warningNums.push(warning7);
            var warning8 = {};
            warning8.id = '3501';
            warning8.name = '涉毒库';
            warning8.count = 2684;
            warning8.alertLevelCode = 'YELLOW';
            $scope.warningNums.push(warning8);
            //暂时根据库名来设置颜色
            for(var i in $scope.warningNums){
                var warningNum = $scope.warningNums[i];
                if(warningNum.name.indexOf("在逃") != -1){
                    warningNum.alertLevelCode = 'RED';
                }else if(warningNum.name.indexOf("前科") != -1){
                    warningNum.alertLevelCode = 'YELLOW';
                }
            }
        }
    }

    /**
     * 统计路人抓拍数量
     */
    $scope.doShot = function(){

        //获取当前摄像头名称（可能用于展示）
        for (var i in $scope.cameraList){
            var camera = $scope.cameraList[i];
            if(camera.id == $scope.countQueryModel.cameraId){
                $scope.cameraName = camera.name;
                break;
            }
        }

        $scope.getStartAndEndByInterval($scope.countQueryModel,$scope.countQueryModel.interval);
        //目前只将摄像头作为单条件查询
        $scope.countQueryModel.cameraIds = [];
        $scope.countQueryModel.cameraIds.push($scope.countQueryModel.cameraId);
        var url = "http://80.75.89.81:8095/shot";
        if(!$scope.isTest){
            $http.post(url,$scope.countQueryModel).then(function (resp) {
                var data = resp.data;
                $scope.shot = data;
            });
        }else{
            $scope.shot = 12334;
        }
    }

    /**
     * 获取事件信息的列表
     */
    $scope.getEventList = function(){

        var url = "http://80.75.89.81:8095/camera";
        var params = null;   //参数
        var isTest = $scope.isTest;
        isTest = true;
        if (!isTest){
            $http.post(url,{}).then(function (resp) {
                var data = resp.data;
                $scope.eventList = data;
            });
        }else{
            //摄像头主键需要硬编码
            var event1 = {};
            event1.type = '聚集';
            event1.address = '市政府门口';
            event1.time = 1566994568;
            event1.cameraId = '0';
            $scope.eventList.push(event1);
            var event2 = {};
            event2.type = '斗殴';
            event2.address = '江阳区超市门口';
            event2.time = 1566995568;
            event2.cameraId = '8';
            $scope.eventList.push(event2);
            var event3 = {};
            event3.type = '偷窃';
            event3.address = '市政府右侧';
            event3.time = 1566997568;
            event3.cameraId = '1';
            $scope.eventList.push(event3);
        }
    }

    /**
     * 底部照片滚动
     * @param mul
     * @param flag
     */
    $scope.scroll = function (mul, flag) {
        var time_ctrl;
        var gallery = $('#gallery').html();
        if (flag) return;
        var timer = 1,
            distance = -131, //移动距离
            item_width = 131; //图片宽度
        var items = $('#gallery li.item').length;
        if (items < 8) return;
        var container_width = $('#devil').width();
        var r = parseInt(items / mul) > parseInt(container_width / item_width);
        // debugger;
        if (!r) { //完全展示情况
            if (mul == 2) {
                clearInterval(time_ctrl);
                $('#gallery').html(gallery);
                setTimeout(function () {
                    $('#gallery').css('marginLeft', 0);
                }, 1100);
            }
            return;
        } else {
            if (time_ctrl) return;//正在执行就退出
            //$('#gallery').append(gallery);
            time_ctrl = setInterval(function () {
                if (timer > items / 2) {
                    $('#gallery').css('margin-left', 0);
                    timer = 1;
                }
                $('#gallery').animate({
                    'margin-left': timer * distance + 'px'
                }, 1000);
                timer++;
            }, 2000);
            $("#gallery .item").hover(function () {
                clearInterval(time_ctrl);
            }, function () {
                time_ctrl = setInterval(function () {
                    if (timer > items / 2) {
                        $('#gallery').css('margin-left', 0);
                        timer = 1;
                    }
                    $('#gallery').animate({
                        'margin-left': timer * distance + 'px'
                    }, 1000);
                    timer++;
                }, 2000);
            })
        }
    };
}


/**
 * app初始化后的操作
 */
indexApp.run(function ($rootScope, $state, $stateParams, $location, $anchorScroll, $modal) {
    // 把常用的对象注入到rootScope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$location = $location;
    $rootScope.$anchorScroll = $anchorScroll;
    $rootScope.$modal = $modal;
    $rootScope.getUrlParameter = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = decodeURI(window.location.search.substr(1)).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
});


/**
 * indexApp基础配置
 */
indexApp.config(function ($httpProvider) {
    //http请求处理
    //$httpProvider.defaults.headers.post = {'Content-Type': 'application/x-www-form-urlencoded'};
    $httpProvider.defaults.headers.post = {'Content-Type': 'application/json;charset=UTF-8'};
    /**
     *
     * @param obj
     * @returns {string}
     *
     *
    $httpProvider.defaults.transformRequest = function (obj) {
        var str = [];
        for (var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
    };
     */
    // 注册 ajax 全局处理拦截器
    $httpProvider.interceptors.push("httpLoginInterceptor");
});


/**
 * ajax拦截器, 处理session过期后ajax异常问题
 */
indexApp.factory("httpLoginInterceptor", function ($q) {
    return {
        request: function (config) {
            return config || $q.when(config);
        },
        requestError: function (rejection) {
            return $q.reject(rejection);
        },
        response: function (response) {
            return response || $q.when(response);
        },
        responseError: function (rejection) {
            switch (rejection.status) {
                case 404: {
                    alert("您访问的页面不存在!");
                    break;
                }
                case 666: {
                    alert("您还未登录或已登录超时，请重新登录！");
                    window.location.href = "../../login.html";
                    break;
                }
                default:
                    break;
            }
            return $q.reject(rejection.status);
        }
    };
});

/**
 * 指令工具
 */
indexApp.directive('dateFormat', ['$filter', function ($filter) {
    var dateFilter = $filter('date');
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            function formatter(value) {
                return dateFilter(value, 'yyyy-MM-dd HH:mm:ss'); //format;
            }

            function parser(value) {
                return value;
            }

            ctrl.$formatters.push(formatter);
            ctrl.$parsers.unshift(parser);
        }
    };
}]).directive("stringFormat", ['$filter', function ($filter) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            function formatter(value) {
                return value += ""; //format
            }

            function parser(value) {
                return value;
            }

            ctrl.$formatters.push(formatter);
            ctrl.$parsers.unshift(parser);
        }
    };
}]);


/**
 * 过滤器工具
 */
indexApp.filter('trustHtml', function ($sce) {
    /**
     * 解析内容中的html
     * @param input
     */
    return function (input) {
        return $sce.trustAsHtml(input);
    };
}).filter('todate', function () {
	/**
	 * 转换成日期
	 */
    return function (input) {
    		if(!input) return '';
        return new Date(input.replace(/-/g, "/"));
    };
})
.filter('cutstring', function () {
    /**
     * 截取字符串
     * @param input
     * @param maxlen  最大长度
     * @param suffix  截取后的后缀
     */
    return function (input, maxlen, suffix) {
        if (!input) return '';
        if (!maxlen) maxlen = 100;
        if (!suffix) suffix = "";
        return input.length > maxlen ? input.substring(0, maxlen) + suffix : input;
    };
}).filter('convert', function ($sce) {
    /**
     * 值转换
     * @param input
     * @param options     选项json对象
     * @param otherwise  未找到对应值返回的结果
     * @param trustHtml  是否解析html
     */
    return function (input, options, otherwise, trustHtml) {
        if (!options) options = {};
        var output = options[input] || (otherwise || input);
        return trustHtml ? $sce.trustAsHtml(output) : output;
    };
}).filter('similar', function () {
    /**
     * 截取相似度
     */
    return function (input) {
        var similarStr = input.toString();
        return similarStr.substr(0,5);
    };
});

/**
 * 定义一个指令,在ng-repeat执行完成后进行操作
 */
indexApp.directive('repeatFinish', function () {
    return {
        link: function (scope, element, attr) {
            if (scope.$last == true) {
                function simpleSwitch(option) {
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
                        $banner.each(function () {
                            var _i = $(this).index();
                            $(this).show();
                            css[type] = (_i - index) * cw;
                            $(this).css(css);
                        });
                        if ($num) {
                            $num.eq(index).addClass(className).siblings().removeClass(className);
                        }
                        ;
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
                            console.log(nowLeft)
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
                    }
                    ;

                    function toNextShow() {
                        if ($num) {
                            if (direction == 'next') {
                                $num.eq(index).addClass(className).siblings().removeClass(className);
                            } else {
                                $num.eq(len - index).addClass(className).siblings().removeClass(className);
                            }
                        }
                        ;
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

                        $next.click(function () {
                            if ($banner.is(":animated")) return;
                            index--;
                            index = index < 0 ? len - 1 : index;
                            // 12.10修改
                            prevMove();
                            toNextShow();
                        })
                    }
                    if ($prev) {
                        $prev.click(function () {
                            if ($banner.is(":animated")) return;
                            index++;
                            index = index >= len ? 0 : index;
                            // 12.10修改
                            nextMove();
                            toNextShow();
                        })
                    }
                    if ($num) {
                        $num.mouseenter(function () {
                            if ($banner.is(":animated")) return;
                            var nextIndex = $num.index($(this));
                            $banner.each(function () {
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
                    $banner.hover(function () {
                        clearInterval(play);
                        play: null
                    }, function () {
                        play = setInterval(bannerPlay, playTime);
                    })
                }

                $.fn.extend({
                    simpleSwitch: function (option) {
                        var option = option || {};
                        option._this = $(this);
                        simpleSwitch(option);
                    }
                });
                scope.scroll(1);
                $(".bg1 ul li").simpleSwitch({
                    playTime: 3000,
                    type: 'top',
                    space: 6
                });
                $(".bg2 ul li").simpleSwitch({
                    playTime: 2000,
                    type: 'top',
                    space: 6
                });
                $(".bg3 ul li").simpleSwitch({
                    playTime: 2000,
                    type: 'top',
                    space: 6
                });
                $(".bg4 ul li").simpleSwitch({
                    playTime: 2000,
                    type: 'top',
                    space: 6
                });

                function toggleLiPos(container, num) {
                    var $num = $(container).children('ul').children('li');
                    if ($num.length <= num) {
                        $(container).children('ul').children('li').css('position', 'unset');
                    }
                }

                toggleLiPos('.bg1', 3);
                toggleLiPos('.bg2', 3);
                toggleLiPos('.bg3', 3);
                toggleLiPos('.bg4', 2);
            }
        }
    }
});
indexApp.directive('repeatItemFinish', function () {
    return {
        link: function (scope, element, attr) {
            if (scope.$last == true) {
                scope.scroll(1);
            }
        }
    }
});





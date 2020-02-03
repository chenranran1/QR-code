var common = {

    /** 获取项目根路径*/
    getPath : function () {
        var pathName = window.document.location.pathname;
        var index = pathName.substr(1).indexOf("/");
        var result = pathName.substr(0, index + 1);
        return result.startWith("/bigdata") ? result : "";
    },

    /** 获取项目中websocket根路径*/
    getWsPath : function() {
        return 'ws://' + window.document.location.host + common.getPath();
    },

    /**常用正则表达式*/
    regex : {
        number : /^[0-9]*$/,
        words : /^[a-zA-Z]*$/,
        phone : /((^(\d{3,4}(-)?)?\d{8})$)|(^1[3|4|5|7|8][0-9]\d{8}$)/,
        mobilephone : /^1[3|4|5|7|8][0-9]\d{8}$/,
        telephone : /(^(\d{3,4}(-)?)?\d{8})$/,
        chinese : /^[\u4e00-\u9fa5]*$/,
        email :  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        url : /^http(s?):\/\/(?:[A-za-z0-9-]+\.)+[A-za-z]{2,4}(?:[\/\?#][\/=\?%\-&~`@[\]\':+!\.#\w]*)?$/,
        idcard : /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
        carnumRegex : /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[警京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{0,1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
    },


    /** 身份证号精确校验 */
    province : {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "},
    idcardValid : function(idcard){
        if(!idcard)	return false;
        idcard = idcard.toUpperCase();
        //校验正则表达式和省份
        if(!common.regex.idcard.test(idcard) || !this.province[idcard.substr(0,2)]){
            return false;
        }
        //18位身份证需要验证最后一位校验位, index = ∑(ai×Wi)(mod 11)
        if(idcard.length == 18){
            idcard = idcard.split('');
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];  	//加权因子
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];  					//校验位
            var sum = 0, ai = 0, wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = idcard[i];
                wi = factor[i];
                sum += ai * wi;
            }
            if(parity[sum % 11] != idcard[17]) {
                return false;
            }
        }
        return true;
    },

    /**
     * 设置模态框大小
     * @param widthRatio   模态框宽度与窗口宽度比率
     * @param heightRatio  模态框高度与窗口高度比率 (高度不固定时为最大高度)
     * @param heightFixed  高度是否固定(默认不固定)
     */
    setModalSize: function (widthRatio, heightRatio, heightFixed) {
        this.setModalWidth(widthRatio);
        this.setModalHeight(heightRatio, heightFixed);
    },


    /**
     * 设置模态框的宽度
     * @param widthRatio 模态框宽度与窗口宽度比率
     */
    setModalWidth: function (widthRatio) {
        if (!widthRatio || isNaN(widthRatio)) widthRatio = 0.75;
        $(".modal-dialog").width($(window).width() * widthRatio);
    },

    /**
     * 设置模态框的高度
     * @param heightRatio  模态框高度与窗口高度比率 (高度不固定时为最大高度)
     * @param heightFixed  高度是否固定(默认不固定)
     */
    setModalHeight: function (heightRatio, heightFixed) {
        if (!heightRatio || isNaN(heightRatio)) heightRatio = 0.67;
        var csstype = heightFixed ? "height" : "max-height";
        var cssOption = {};
        cssOption[csstype] = $(window).height() * heightRatio;
        $(".modal-body").css(cssOption);
    },
    /**
     * 显示正在加载
     */
    showLoading: function () {
        $("#loading-info").show();
        this.lockSrc();
    },

    /**
     * 隐藏正在加载
     */
    hideLoading: function () {
        $("#loading-info").hide();
        this.unlockSrc();
    },

    //锁屏方法
    lockSrc : function(){
        $("#lockDiv").css({"opacity":"0.5"}).fadeIn('normal');
        var scrollWidth = document.documentElement.clientWidth;
        var scrollHeight =document.documentElement.clientHeight;
        var pWidth = $("#lockDivInfo").width();
        var pHeight = $("#lockDivInfo").height();
        var pLeft = scrollWidth/2-pWidth/2;
        var pTop = scrollHeight/2-pHeight/2;
        $("#lockDivInfo").css({"position":"absolute","top":pTop,"left":pLeft}).fadeIn('normal');
    },
    //解屏方法
    unlockSrc : function() {
        $("#lockDivInfo").fadeOut('normal');
        $("#lockDiv").fadeOut('normal');
    }
};//common end

/**js扩展方法*/
String.prototype.startWith=function(str){
    return new RegExp("^"+str).test(this);
};
String.prototype.endWith=function(str){
    return new RegExp(str+"$").test(this);
};

/**
 * 获取初始化照片
 * @param e
 * @param type
 */
function imageDO(e,type){
    var img=e;
    if(!type){
        type = 200;
    }
    if(type == 40){
        img.src="../../images/default/default_img40.jpg";
    }else if(type == 105){
        img.src="../../images/default/default_img105.jpg";
    }else if(type == 145){
        img.src="../../images/default/default_img145.jpg";
    }else if(type == 180){
        img.src="../../images/default/default_img180.jpg";
    }else if(type == 200){
        img.src="../../images/default/default_img200.jpg";
    }
    img.onerror=null;
}
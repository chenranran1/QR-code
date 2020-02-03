/**
 * 日期处理工具
 */
var dateUtil = {
	
	/**
	 * 判断时间字符串是否合法
	 * @param dateStr
	 * @returns
	 */
	isDate : function(dateStr){
		var date = new Date(dateStr);
		return !isNaN(date.getTime());
	},
	
	/**
	 * 日期+天
	 * @param d	日期
	 * @param n	天数
	 * @returns {Date}
	 */
	addDays : function (d, n) {
	    var t = new Date(d);
	    t.setDate(t.getDate() + n);
	    return t;
	},
	
	/**
	 * 日期+周
	 * @param d	日期
	 * @param n	周数
	 * @returns {Date}
	 */
	addWeeks : function(d, n) {
		return this.addDays(d, n * 7);
	},
	
	/**
	 * 日期+月。日对日，若目标月份不存在该日期，则置为最后一日
	 * @param d	日期
	 * @param n	月数
	 * @returns {Date}
	 */
	addMonths : function (d, n) {
	    var t = new Date(d);
	    t.setMonth(t.getMonth() + n);
	    if (t.getDate() != d.getDate()) {t.setDate(0);}
	    return t;
	},
	
	/**
	 * 日期+季度
	 * @param d	日期
	 * @param n	季度数
	 * @returns {Date}
	 */
	addQuarters : function(d, n) {
		return this.addMonths(d, n * 3);
	},
	
	 
	/**
	 * 日期+年。月对月日对日，若目标年月不存在该日期，则置为最后一日
	 * @param d	日期
	 * @param n 年数
	 * @returns {Date}
	 */
	addYears : function (d, n) {
	    var t = new Date(d);
	    t.setFullYear(t.getFullYear() + n);
	    if (t.getDate() != d.getDate()) {t.setDate(0);}
	    return t;
	},
	
	
	/**
	 * 计算两个日期间隔的天数
	 * @param d1	日期1
	 * @param d2	日期2
	 * @returns 
	 */
	countDays : function(d1, d2) {
		
		return Math.round(parseFloat(Math.abs(d1.getTime() - d2.getTime())) / (1000*60*60*24));
	},
	
	/**
	 * 计算两个日期间隔的周数
	 * @param d1	日期1
	 * @param d2	日期2
	 * @returns 
	 */
	countWeeks : function(d1, d2) {
		
		return  Math.round(parseFloat(this.countDays(d1, d2)) / 7);
	},
	
	/**
	 * 计算两个日期间隔的月数
	 * @param d1	日期1
	 * @param d2	日期2
	 * @returns 
	 */
	countMonths : function(d1, d2) {
		
		return  Math.round(parseFloat(this.countDays(d1, d2)) / 30.5);
	},
	
	/**
	 * 计算两个日期间隔的季度数
	 * @param d1	日期1
	 * @param d2	日期2
	 * @returns 
	 */
	countQuarters : function(d1, d2) {
		
		return  Math.round(parseFloat(this.countMonths(d1, d2)) / 3);
	},
	
	
	/**
	 * 计算两个日期间隔的年数
	 * @param d1	日期1
	 * @param d2	日期2
	 * @returns 
	 */
	countYears : function(d1, d2) {
		
		return  Math.round(parseFloat(this.countDays(d1, d2)) / 365.25);
	},
	
	
	
	/**
	 * 获取给定日期所在周数
	 * @param d	日期
	 * @returns {Number} 周数
	 */
	getWeekNum : function(d){ 
		var year = d.getFullYear();
		var month = d.getMonth();
		var days = d.getDate();	//那一天是那一年中的第多少天
		
		var febDays = ((year%400==0) || (year%4==0 && year%100!=0)) ? 29 : 28; //二月天数
		var monthDays = [31, febDays, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		for (var i = 0; i < month; i++) {
		    days += monthDays[i];
		}
		//那一年第一天是星期几
		var yearFirstDay = new Date(year, 0, 1).getDay() || 7;
		var week = null;
		if (yearFirstDay == 1) {
		     week = Math.ceil(days / yearFirstDay);
		} else {
		    days -= (7 - yearFirstDay + 1);
		    week = Math.ceil(days / 7);
		}
		return week;
	},
	
	/**
	 * 获取给定日期所在季度
	 * @param d	日期
	 * @returns {Number} 季度
	 */
	getQuarterNum : function(d){ 
		var month = d.getMonth(); //月份
		if (month <= 2) {return 1;}
		else if (month <= 5) {return 2;}
		else if (month <= 8) {return 3;}
		else {return 4;}
	},
		
	/**
	 * 获取当前日期的指定偏移天数
	 * @param n	天数
	 * @returns {Date}
	 */
	getDateFromNow : function(n) {
		var now = new Date();
		now.setDate(now.getDate() + n);
		return now;
	},
	
	
	/**
	 * 获取指定日期所在周第一天
	 * @param d	日期
	 * @returns {Date}
	 */
	getWeekFirst : function(d){
		//本周一后多少天。周一 为本周一后0 天, 周日为本周一后6天
		var daysAfterMonday = (d.getDay()==0) ? 6 : d.getDay()-1;       
		return this.addDays(d, - daysAfterMonday);
	},
	
	/**
	 * 获取指定日期所在周的最后一天
	 * @param d	日期
	 * @returns {Date}
	 */
	getWeekLast : function(d){
		
		return this.addDays(this.getWeekFirst(d), 6);
	},
	
	
	/**
	 * 获取给定日期所在月份第一天
	 * @param d	日期
	 * @returns {Date}
	 */
	getMonthFirst : function(d){
		var date = new Date(d);
		date.setDate(1);
		return date;
	},
	
	/**
	 * 获取给定日期所在月份最后一天
	 * @param d	日期
	 * @returns {Date}
	 */
	getMonthLast : function(d){
		
		return this.addDays(this.addMonths(this.getMonthFirst(d), 1), -1);
	},
	
	
	/**
	 * 获取给定日期所在季度第一天
	 * @param d	日期
	 * @returns {Date}
	 */
	getQuarterFirst : function(d){ 
		
		var now = new Date(d);
		var nowYear = now.getFullYear(); //当前年
		var nowMonth = now.getMonth(); //当前月 
		
		var startMonth = 0;		//本季度开始月份
		if (nowMonth <= 2) {startMonth = 0;}
	    else if (nowMonth <= 5) {startMonth = 3;}
	    else if (nowMonth <= 8) {startMonth = 6;}
	    else {startMonth = 9;}

		return new Date(nowYear, startMonth, 1); 
	},
	
	/**
	 * 获取给定日期所在季度最后一天
	 * @param d	日期
	 * @returns {Date}
	 */
	getQuarterLast : function(d){
		
		return this.addDays(this.addMonths(this.getQuarterFirst(d), 3), -1);
	},
	
	/**
	 * 根据季度数获取该季度的第一天
	 * @param year		年份
	 * @param quarter	季度数
	 */
	getQuarterFirstByQuarter : function(year, quarter) {
		
		var startMonth = 0;		//本季度开始月份
		if(quarter==1) {startMonth = 0;}
		else if(quarter==2) {startMonth = 3;}
		else if(quarter==3) {startMonth = 6;}
		else if(quarter==4) {startMonth = 9;}
		return new Date(year, startMonth, 1); 
	},
	
	/**
	 * 获取给定日期所在年份第一天
	 * @param d	日期
	 * @returns {Date}
	 */
	getYearFirst : function(d) {
		
		var nowYear = new Date(d).getFullYear(); //当前年
		return new Date(nowYear, 0, 1);
	},
	
	/**
	 * 获取给定日期所在年份最后一天
	 * @param d	日期
	 * @returns {Date}
	 */
	getYearLast : function(d) {
		
		var nowYear = new Date(d).getFullYear(); //当前年
		return new Date(nowYear, 11, 31);
	},
	
	
	
	/**
	 * 获取本周第一天
	 * @returns {Date}
	 */
	getCurWeekFirst : function(){
		
		return this.getWeekFirst(new Date());
	},
	
	/**
	 * 获取本周最后一天
	 * @returns {Date}
	 */
	getCurWeekLast : function(){
		
		return this.addDays(this.getCurWeekFirst(), 6);
	},
	
	
	/**
	 * 获取本月第一天
	 * @returns {Date}
	 */
	getCurMonthFirst : function(){

		return this.getMonthFirst(new Date());
	},
	
	/**
	 * 获取本月最后一天
	 * @returns {Date}
	 */
	getCurMonthLast : function(){
		
		return this.getMonthLast(new Date());
	},
	
	/**
	 * 获取本季度第一天
	 * @returns {Date}
	 */
	getCurQuarterFirst : function(){ 
		
		return this.getQuarterFirst(new Date());
	},
	
	/**
	 * 获取本季度最后一天
	 * @returns {Date}
	 */
	getCurQuarterLast : function(){
		
		return this.getQuarterLast(new Date());
	},
	
	/**
	 * 获取上周第一天
	 * @returns {Date}
	 */
	getLastWeekFirst : function(){
		
		return this.addDays(this.getCurWeekFirst(), -7);
	},
	
	/**
	 * 获取上周最后一天
	 * @returns {Date}
	 */
	getLastWeekLast : function(){
		return this.addDays(this.getCurWeekFirst(), -1);
	},
	
	/**
	 * 获取上月第一天
	 * @returns {Date}
	 */
	getLastMonthFirst : function(){
		return this.addMonths(this.getCurMonthFirst(), -1);
	},
	
	/**
	 * 获取上月最后一天
	 * @returns {Date}
	 */
	getLastMonthLast : function(){
		return this.addDays(this.getCurMonthFirst(), -1);
	},
	
	/**
	 * 获取上季度第一天
	 * @returns
	 */
	getLastQuarterFirst : function(){
		return this.addMonths(this.getCurQuarterFirst(), -3);
	},
	
	/**
	 * 获取上季度最后一天
	 * @returns
	 */
	getLastQuarterLast : function(){
		return this.addDays(this.getCurQuarterFirst(), -1);
	},
	
	
	
	/**
	 * 初始化日期查询选项
	 * @param $scope			angularjs scope
	 */
	initDateOptions : function($scope) {
		
		//时间类型选择列表
		/**
		 *
		 * @type {{inOneMonth: string, curMonth: string, lastMonth: string, curWeek: string, yestoday: string, lastWeek: string, inTwoWeek: string, curQuarter: string, today: string, lastQuarter: string, inOneWeek: string, inThreeDay: string, curYear: string}}

	    $scope.datetypeOption = {
			'inOneMonth' : "一月内",
			'inTwoWeek' : "两周内",
			'inOneWeek' : "一周内",
	        'inThreeDay' : "三天内",
			'yestoday' : "昨日",
	        'today' : "今日",
	        'curWeek' : "本周",
	        'curMonth' : "本月",
	        'curQuarter' : "本季",
			'curYear' : "本年",
	        'lastWeek' : "上周",
	        'lastMonth' : "上月",
	        'lastQuarter' : "上季"
	    };
		 */
		$scope.datetypeOption = {
			'today' : "本日",
			'curWeek' : "本周",
			'curMonth' : "本月"
		};

		/**
		 * 获取开始和结束时间
		 * @param param 参数对象
		 * @param interval 时间间隔对象
		 */
		$scope.getStartAndEndByInterval = function(param, interval){

			if (!interval){
				interval = 'today';
			}
			var startdate = null;
			var enddate = new Date();
			if(interval == 'inOneMonth'){	//一月内
				startdate = dateUtil.addMonths(new Date(), -1);
			}else if(interval == 'inTwoWeek'){ //两周内
				startdate = dateUtil.getDateFromNow(-14);
			}else if(interval == 'inOneWeek'){	//一周内
				startdate = dateUtil.getDateFromNow(-7);
			}else if(interval == 'inThreeDay'){	//三天内
				startdate = dateUtil.getDateFromNow(-3);
			}else if(interval == 'yestoday'){	//昨天
				startdate = dateUtil.getDateFromNow(-1);
				enddate = dateUtil.getDateFromNow(-1);
			}else if(interval == 'today'){	//今天
				startdate = new Date();
			}else if(interval == 'curWeek'){	//本周
				startdate = dateUtil.getCurWeekFirst();
			}else if(interval == 'curMonth'){	//本月
				startdate = dateUtil.getCurMonthFirst();
			}else if(interval == 'curQuarter'){	//本季
				startdate = dateUtil.getCurQuarterFirst();
			}else if(interval == 'curYear'){	//本年
				startdate = dateUtil.getYearFirst(new Date());
			}else if(interval == 'lastWeek'){	//上周
				startdate = dateUtil.getLastWeekFirst();
				enddate = dateUtil.getLastWeekLast();
			}else if(interval == 'lastMonth'){	//上月
				startdate = dateUtil.getLastMonthFirst();
				enddate = dateUtil.getLastMonthLast();
			}else if(interval == 'lastQuarter'){	//上季
				startdate = dateUtil.getLastQuarterFirst();
				enddate = dateUtil.getLastQuarterLast();
			}else if(interval == 'inTwoMonth'){		//两月内
				startdate = dateUtil.addMonths(new Date(), -2);
			}

			startdate.setHours(0);
			startdate.setMinutes(0);
			startdate.setSeconds(0);
			param.beginTime = Math.floor(startdate.getTime()/1000);
			enddate.setHours(23);
			enddate.setMinutes(59);
			enddate.setSeconds(59);
			param.endTime = Math.floor(enddate.getTime()/1000);

		};
	},
	
};


/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
 * 例子： 
 * (new Date()).format("yyyy-MM-dd hh:mm:ss.S")
 * (new Date()).format("yyyy-M-d h:m:s.S") 
 */
Date.prototype.format = function(fmt){
	 var o = {
	     "M+": this.getMonth() + 1, //月份 
	     "d+": this.getDate(), //日 
	     "h+": this.getHours(), //小时 
	     "m+": this.getMinutes(), //分 
	     "s+": this.getSeconds(), //秒 
	     "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	     "S": this.getMilliseconds() //毫秒 
	 };
	 if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	 for (var k in o)
	 if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	 return fmt;
};

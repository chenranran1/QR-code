package com.chenran.test.code.controller;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chenran.test.code.dao.QRCodeDao;
import com.chenran.test.code.entiry.QRCode;
import com.chenran.test.code.qr.QRCodeUtil;

@RestController
@RequestMapping("/")
public class TestController {

	@Autowired
	private QRCodeDao qrCodeDao;
	
	@RequestMapping("test")
	public Object test() {
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("test", "测试程序的控制层");
		return resultMap;
	}
	
	@RequestMapping("save")
	public Object save() {
		QRCode code = new QRCode("http://www.baidu.com");
		qrCodeDao.save(code);
		System.err.println(code);
		return code;
	}
	
	@RequestMapping("getCode")
	public void getCode(HttpServletResponse response) {
		String text = "http://192.168.0.111:8848/getCodeInfo/";
		QRCode code = new QRCode(text);
		qrCodeDao.save(code);
		// 返回的链接中带上二维码主键
		text += code.getId();
		String imgPath = "D:/test.jpg";
		// 生成二维码
		try {
			QRCodeUtil.encode(text, imgPath, response.getOutputStream(), true);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	// 将二维码主键作为参数
	@RequestMapping("getCodeInfo/{id}")
	public Object getCodeInfo(@PathVariable String id,HttpServletResponse response) throws IOException {
		
		// 根据主键获取二维码信息以判断其有效性
		QRCode code = qrCodeDao.findOne(id);
		Date validDate = DateUtils.addSeconds(code.getCrtDate(), Integer.parseInt(code.getValidTime().toString()));
		if (validDate.before(new Date())) {
			return "该二维码已过期，请重新扫描";
		}else {
			response.sendRedirect("http://www.baidu.com");
		}
		return null;
	}
}

package com.chenran.test.code.qr;

public class QRCodeTest {
	public static void main(String[] args) throws Exception {
		// 存放在二维码中的内容
		String text = "https://user.qzone.qq.com/1991626567?source=namecardhoverqzone";
		// String text = "http://192.168.0.111:8848/test";
		// 嵌入二维码的图片路径
		String imgPath = "D:/test1.jpg";
		// 生成的二维码的路径及名称
		String destPath = "D:/qrcode/test5.jpg";
		// 生成二维码并保存到本地
		// QRCodeUtil.encode(text, imgPath, destPath, true);
		// 生成二维码并写入到输出流
		// QRCodeUtil.encode(text, imgPath, new FileOutputStream(new File("")), true);
		System.err.println("生成二维码完成");
		// 解析二维码
		String str = QRCodeUtil.decode(destPath);
		// 打印出解析出的内容
		System.out.println(str);
	}
}

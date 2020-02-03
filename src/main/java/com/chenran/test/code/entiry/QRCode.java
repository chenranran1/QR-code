package com.chenran.test.code.entiry;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "T_CODE")
public class QRCode implements Serializable{

	private static final long serialVersionUID = 1L;
	@Id
	@GenericGenerator(name="uuid",strategy="uuid")
	@GeneratedValue(generator="uuid")
	@Column(length=50)
	private String id;			//主键
	private String content;				// 二维码内容
	private Date crtDate =  new Date();	// 生成时间
	private Long validTime = 60L;		// 有效时间秒数
	private Integer startTime = 0;		// 一天内可访问的开始时间数
	private Integer endTime = 24;		// 一天内可访问的结束时间数
	public QRCode() {
		
	}
	public QRCode(String content) {
		this.content = content;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Date getCrtDate() {
		return crtDate;
	}
	public void setCrtDate(Date crtDate) {
		this.crtDate = crtDate;
	}
	public Long getValidTime() {
		return validTime;
	}
	public void setValidTime(Long validTime) {
		this.validTime = validTime;
	}
	public Integer getStartTime() {
		return startTime;
	}
	public void setStartTime(Integer startTime) {
		this.startTime = startTime;
	}
	public Integer getEndTime() {
		return endTime;
	}
	public void setEndTime(Integer endTime) {
		this.endTime = endTime;
	}
	@Override
	public String toString() {
		return this.content;
	}
}

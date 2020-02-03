package com.chenran;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import com.chenran.test.code.dao.impl.BaseJpaRepositoryFactoryBean;
import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
@EnableJpaRepositories(repositoryFactoryBeanClass = BaseJpaRepositoryFactoryBean.class,basePackages = {"com.chenran"},repositoryImplementationPostfix = "")
@Slf4j
public class Application {

	public static void main(String[] args) {
		log.debug("启动测试程序");
		SpringApplication.run(Application.class, args);
	}
}

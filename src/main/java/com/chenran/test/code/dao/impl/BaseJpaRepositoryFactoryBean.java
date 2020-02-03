package com.chenran.test.code.dao.impl;

import org.springframework.data.jpa.repository.support.JpaRepositoryFactory;
import org.springframework.data.jpa.repository.support.JpaRepositoryFactoryBean;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.core.RepositoryInformation;
import org.springframework.data.repository.core.RepositoryMetadata;
import org.springframework.data.repository.core.support.RepositoryFactorySupport;

import javax.persistence.EntityManager;
import java.io.Serializable;

/**
 * @author yonghuan
 */
public class BaseJpaRepositoryFactoryBean<T extends Repository<S, ID>, S, ID extends Serializable> extends JpaRepositoryFactoryBean<T, S, ID> {

	public BaseJpaRepositoryFactoryBean(Class<? extends T> repositoryInterface) {
		super(repositoryInterface);
	}

	@Override
	protected RepositoryFactorySupport createRepositoryFactory(EntityManager em) {
		return new BaseJpaRepositoryFactory(em);
	}

	// 创建一个内部类，该类不用再外部访问
	private static class BaseJpaRepositoryFactory extends JpaRepositoryFactory {

		public BaseJpaRepositoryFactory(EntityManager entityManager) {
			super(entityManager);
		}

		// 设置具体的实现类是BaseRepositoryImpl
		@SuppressWarnings("unchecked")
		@Override
		protected <T, ID extends Serializable> BaseRepositoryImpl<?, ?> getTargetRepository(RepositoryInformation information, EntityManager em) {
			return new BaseRepositoryImpl<T, ID>((Class<T>) information.getDomainType(), em);
		}

		// 设置具体实现类的class
		@Override
		protected Class<?> getRepositoryBaseClass(RepositoryMetadata metadata) {
			return BaseRepositoryImpl.class;
		}
	}
}

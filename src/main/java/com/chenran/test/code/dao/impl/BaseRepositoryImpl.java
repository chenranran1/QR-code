package com.chenran.test.code.dao.impl;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.hibernate.SQLQuery;
import org.hibernate.transform.Transformers;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import com.chenran.test.code.dao.BaseRepository;

public class BaseRepositoryImpl<T,ID extends Serializable> extends SimpleJpaRepository<T, ID> 
implements BaseRepository<T, ID>{
	
    private final EntityManager em;

    // 父类没有不带参数的构造方法，这里手动构造父类
    public BaseRepositoryImpl(Class<T> domainClass, EntityManager em) {
        super(domainClass, em);
        this.em = em;
    }

    @SuppressWarnings("unchecked")
	@Override
    public Map<String, Object> findForObject(String sql, Object... param) {
        Query query = em.createNativeQuery(sql);
        bindingParameters(query, param);
        query.unwrap(SQLQuery.class).setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
        return (Map<String, Object>) query.getSingleResult();
    }

    @SuppressWarnings("unchecked")
	@Override
    public T findOne(String sql, Object... param) {
        Query query = em.createNativeQuery(sql, getDomainClass());
        bindingParameters(query, param);
        return (T) query.getSingleResult();
    }

    @SuppressWarnings("unchecked")
	@Override
    public List<Map<String, Object>> findForList(String sql, Object... param) {
        Query query = em.createNativeQuery(sql);
        bindingParameters(query, param);
        query.unwrap(SQLQuery.class).setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		return query.getResultList();
    }

    @Override
    @SuppressWarnings("unchecked")
	public List<T> findAll(String sql, Object... param) {
        Query query = em.createNativeQuery(sql, getDomainClass());
        bindingParameters(query, param);
        return (List<T>) query.getResultList();
    }

    @Override
    public long count(String sql, Object... param) {
        Query query = em.createNativeQuery(sql);
        bindingParameters(query, param);
        Number totals = (Number) query.getSingleResult();
        return totals.longValue();
    }


    @Override
    public int update(String sql, Object... param) {
        Query query = em.createNativeQuery(sql);
        bindingParameters(query, param);
        return query.executeUpdate();
    }

    private void bindingParameters(Query query, Object... parameters) {
        if (parameters != null && parameters.length > 0) {
            for (int i = 0; i < parameters.length; i++) {
                query.setParameter(i + 1, parameters[i]);
            }
        }
    }

	@Override
	public List<T> findAllbyit(Iterable<ID> ids) {
		
		//findAll(ids);
		return null;
	}

}

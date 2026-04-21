package com.jdc.portal.domains;

import java.util.List;
import java.util.function.Function;

import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

import com.jdc.portal.domains.utils.dto.PageResult;

import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;

public class BaseRepositoryImpl<T, ID> extends SimpleJpaRepository<T, ID> 
	implements BaseRepository<T, ID>{

	private EntityManager em;
	
	public BaseRepositoryImpl(JpaEntityInformation<T, ?> entityInformation, EntityManager entityManager) {
		super(entityInformation, entityManager);
		this.em = entityManager;
	}

	@Override
	public <D> List<D> search(Function<CriteriaBuilder, CriteriaQuery<D>> queryFunc) {
		return em.createQuery(queryFunc.apply(em.getCriteriaBuilder())).getResultList();

	}

	@Override
	public <D> PageResult<D> search(Function<CriteriaBuilder, CriteriaQuery<D>> queryFunc,
			Function<CriteriaBuilder, CriteriaQuery<Long>> countFunc, int page, int size) {
		
		var count = em.createQuery(countFunc.apply(em.getCriteriaBuilder())).getSingleResult();
		var query = em.createQuery(queryFunc.apply(em.getCriteriaBuilder()));

		query.setMaxResults(size);
		query.setFirstResult(size * page);
		
		var list = query.getResultList();
		
		return new PageResult<>(list, page, size, count);
	}

}

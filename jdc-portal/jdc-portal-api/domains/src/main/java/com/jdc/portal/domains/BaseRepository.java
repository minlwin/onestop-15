package com.jdc.portal.domains;

import java.util.List;
import java.util.function.Function;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import com.jdc.portal.dto.PageResult;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;

@NoRepositoryBean
public interface BaseRepository<T, ID> extends JpaRepository<T, ID>{

	<D> List<D> search(Function<CriteriaBuilder, CriteriaQuery<D>> queryFunc);
	
	<D> PageResult<D> search(
			Function<CriteriaBuilder, CriteriaQuery<D>> queryFunc, 
			Function<CriteriaBuilder, CriteriaQuery<Long>> countFunc,
			int page, int size);
	
}

package com.jdc.portal.office.input;

import java.util.ArrayList;

import org.springframework.util.StringUtils;

import com.jdc.portal.domains.account.Account_;
import com.jdc.portal.domains.account.Employee;
import com.jdc.portal.domains.account.Employee_;
import com.jdc.portal.dto.consts.Position;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record EmployeeSearch(
		Position position,
		String keyword) {

	public Predicate[] where(CriteriaBuilder cb, Root<Employee> root) {
		var params = new ArrayList<Predicate>();
		
		if(null != position) {
			params.add(cb.equal(root.get(Employee_.position), position));
		}
		
		if(StringUtils.hasLength(keyword)) {
			var value = keyword.toString().concat("%");
			params.add(cb.or(
				cb.like(cb.lower(root.get(Employee_.account).get(Account_.name)), value),
				cb.like(cb.lower(root.get(Employee_.account).get(Account_.email)), value),
				cb.like(cb.lower(root.get(Employee_.phone)), value)
			));
		}
		
		return params.toArray(size -> new Predicate[size]);
	}
}

package com.jdc.portal.office.input;

import java.util.ArrayList;

import org.springframework.util.StringUtils;

import com.jdc.portal.domains.master.Course;
import com.jdc.portal.domains.master.Course_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record CourseSearch(
		String keyword) {

	public Predicate[] where(CriteriaBuilder cb, Root<Course> root) {
		var params = new ArrayList<Predicate>();
		
		if(StringUtils.hasLength(keyword)) {
			var value = keyword.toString().concat("%");
			params.add(cb.or(
				cb.like(cb.lower(root.get(Course_.name)), value),
				cb.like(cb.lower(root.get(Course_.description)), value)
			));
		}
		
		return params.toArray(size -> new Predicate[size]);
	}

}

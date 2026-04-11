package com.jdc.portal.office.input;

import java.time.LocalDate;
import java.util.ArrayList;

import org.springframework.util.StringUtils;

import com.jdc.portal.domains.account.Student;
import com.jdc.portal.domains.account.Student_;
import com.jdc.portal.domains.master.Classes;
import com.jdc.portal.domains.master.Classes_;
import com.jdc.portal.domains.master.Course_;
import com.jdc.portal.domains.transaction.Registration;
import com.jdc.portal.dto.consts.ClassType;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record ClassSearch(
	    Integer studentId,
	    Integer course,
	    ClassType type,
	    LocalDate startFrom,
	    LocalDate startTo,
	    String keyword) {

	public Predicate[] where(CriteriaBuilder cb, Root<Classes> root, Join<Registration, Student> students) {
		
		var params = new ArrayList<Predicate>();
		
		if(null != studentId) {
			params.add(cb.equal(students.get(Student_.id), studentId));
		}
		
		if(null != course) {
			params.add(cb.equal(root.get(Classes_.course).get(Course_.id), course));
		}
		
		if(null != type) {
			params.add(cb.equal(root.get(Classes_.type), type));
		}
		
		if(null != startFrom) {
			params.add(cb.greaterThanOrEqualTo(root.get(Classes_.startDate), startFrom));
		}
		
		if(null != startTo) {
			params.add(cb.lessThanOrEqualTo(root.get(Classes_.startDate), startTo));
		}
		
		if(StringUtils.hasLength(keyword)) {
			var value = keyword.toString().concat("%");
			params.add(cb.or(
				cb.like(cb.lower(root.get(Classes_.course).get(Course_.name)), value),
				cb.like(cb.lower(root.get(Classes_.course).get(Course_.description)), value)
			));
		}
		
		return params.toArray(size -> new Predicate[size]);
	}

}

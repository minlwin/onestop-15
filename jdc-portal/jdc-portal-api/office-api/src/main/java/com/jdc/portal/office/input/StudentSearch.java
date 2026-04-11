package com.jdc.portal.office.input;

import java.time.LocalDate;
import java.util.ArrayList;

import org.springframework.util.StringUtils;

import com.jdc.portal.domains.account.Account;
import com.jdc.portal.domains.account.Account_;
import com.jdc.portal.domains.account.Student;
import com.jdc.portal.domains.account.StudentActivation;
import com.jdc.portal.domains.account.StudentActivation_;
import com.jdc.portal.domains.account.Student_;
import com.jdc.portal.domains.master.Classes;
import com.jdc.portal.domains.master.Classes_;
import com.jdc.portal.domains.transaction.Registration;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record StudentSearch(
		Integer classId,
		LocalDate entryFrom,
		LocalDate entryTo,
		String keyword
		) {

	public Predicate[] where(CriteriaBuilder cb, 
			Root<Student> root, 
			Join<Student, Account> account,
			Join<Student, StudentActivation> activation, 
			Join<Registration, Classes> classes) {
		
		var params = new ArrayList<Predicate>();
		
		if(null != classId) {
			params.add(cb.equal(classes.get(Classes_.id), classId));
		}
		
		if(null != entryFrom) {
			params.add(cb.greaterThanOrEqualTo(root.get(Student_.entryAt), entryFrom.atStartOfDay()));
		}
		
		if(null != entryTo) {
			params.add(cb.lessThanOrEqualTo(root.get(Student_.entryAt), entryTo.atTime(23, 59, 59)));
		}
		
		
		if(StringUtils.hasLength(keyword)) {
			var value = keyword.toString().concat("%");
			params.add(cb.or(
				cb.like(cb.lower(account.get(Account_.name)), value),
				cb.like(cb.lower(account.get(Account_.email)), value),
				cb.like(cb.lower(activation.get(StudentActivation_.name)), value),
				cb.like(cb.lower(activation.get(StudentActivation_.email)), value),
				cb.like(cb.lower(root.get(Student_.phone)), value)
			));
		}
		
		return params.toArray(size -> new Predicate[size]);
	}

}

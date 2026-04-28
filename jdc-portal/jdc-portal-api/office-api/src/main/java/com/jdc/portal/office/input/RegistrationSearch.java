package com.jdc.portal.office.input;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.util.StringUtils;

import com.jdc.portal.domains.account.Account;
import com.jdc.portal.domains.account.Account_;
import com.jdc.portal.domains.account.Student;
import com.jdc.portal.domains.account.StudentActivation;
import com.jdc.portal.domains.account.StudentActivation_;
import com.jdc.portal.domains.account.Student_;
import com.jdc.portal.domains.master.Classes;
import com.jdc.portal.domains.master.Classes_;
import com.jdc.portal.domains.master.Course_;
import com.jdc.portal.domains.transaction.Registration;
import com.jdc.portal.domains.transaction.Registration_;
import com.jdc.portal.domains.utils.consts.ClassType;
import com.jdc.portal.domains.utils.consts.RegistrationStatus;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record RegistrationSearch(
		ClassType classType,
		RegistrationStatus status,
		LocalDate dateFrom,
		LocalDate dateTo,
		String keyword) {

	public List<Predicate> where(CriteriaBuilder cb, Root<Registration> root, Join<Registration, Classes> classes,
			Join<Registration, Student> student, Join<Student, Account> account, Join<Student, StudentActivation> activation) {
		var params = new ArrayList<Predicate>();
		
		if(null != classType) {
			params.add(cb.equal(classes.get(Classes_.type), classType));
		}
		
		if(null != status) {
			params.add(cb.equal(root.get(Registration_.status), status));
		}
		
		if(null != dateFrom) {
			params.add(cb.greaterThanOrEqualTo(root.get(Registration_.registerAt), dateFrom.atStartOfDay()));
		}
		
		if(null != dateTo) {
			params.add(cb.lessThan(root.get(Registration_.registerAt), dateTo.plusDays(1).atStartOfDay()));
		}
		
		if(StringUtils.hasLength(keyword)) {
			var keywordParam = keyword.toLowerCase().concat("%");
			params.add(cb.or(
				cb.like(cb.lower(classes.get(Classes_.course).get(Course_.name)), keywordParam),
				cb.like(cb.lower(student.get(Student_.phone)), keywordParam),
				cb.like(cb.lower(account.get(Account_.name)), keywordParam),
				cb.like(cb.lower(account.get(Account_.email)), keywordParam),
				cb.like(cb.lower(activation.get(StudentActivation_.name)), keywordParam),
				cb.like(cb.lower(activation.get(StudentActivation_.email)), keywordParam)
			));
		}
		
		return params;
	}

}

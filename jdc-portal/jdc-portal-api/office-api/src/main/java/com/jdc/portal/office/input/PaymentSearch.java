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
import com.jdc.portal.domains.transaction.Payment;
import com.jdc.portal.domains.transaction.Payment_;
import com.jdc.portal.domains.transaction.Registration;
import com.jdc.portal.domains.utils.consts.ClassType;
import com.jdc.portal.domains.utils.consts.FeeType;
import com.jdc.portal.domains.utils.consts.PaymentStatus;
import com.jdc.portal.domains.utils.consts.PaymentType;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record PaymentSearch(
    Integer classId,
    Integer studentId,
    ClassType classType,
    FeeType feeType,
    PaymentType paymentType,
    PaymentStatus status,
    LocalDate dateFrom,
    LocalDate dateTo,
    String keyword) {

	public List<Predicate> where(
			CriteriaBuilder cb, 
			Root<Payment> root, 
			Join<Registration, Classes> classes,
			Join<Registration, Student> student, 
			Join<Student, Account> account, 
			Join<Student, StudentActivation> activation) {
		
		var params = new ArrayList<Predicate>();
		
		if(null != classId) {
			params.add(cb.equal(classes.get(Classes_.id), classId));
		}
		
		if(null != studentId) {
			params.add(cb.equal(student.get(Student_.id), studentId));
		}

		if(null != classType) {
			params.add(cb.equal(classes.get(Classes_.type), classType));
		}

		if(null != feeType) {
			params.add(cb.equal(root.get(Payment_.feeType), feeType));
		}
		
		if(null != paymentType) {
			params.add(cb.equal(root.get(Payment_.type), paymentType));
		}
		
		if(null != dateFrom) {
			params.add(cb.greaterThanOrEqualTo(root.get(Payment_.payAt), dateFrom.atStartOfDay()));
		}
		
		if(null != dateTo) {
			params.add(cb.lessThan(root.get(Payment_.payAt), dateTo.plusDays(1).atStartOfDay()));
		}
		
		if(StringUtils.hasLength(keyword)) {
			var value = keyword.toLowerCase().concat("%");
			cb.or(
				cb.like(cb.lower(student.get(Student_.phone)), value),
				cb.like(cb.lower(account.get(Account_.name)), value),
				cb.like(cb.lower(account.get(Account_.email)), value),
				cb.like(cb.lower(activation.get(StudentActivation_.name)), value),
				cb.like(cb.lower(activation.get(StudentActivation_.email)), value)
			);
		}

		return params;
	}

}

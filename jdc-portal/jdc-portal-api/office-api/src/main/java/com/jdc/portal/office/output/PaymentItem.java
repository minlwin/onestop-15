package com.jdc.portal.office.output;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.jdc.portal.domains.account.Account;
import com.jdc.portal.domains.account.Account_;
import com.jdc.portal.domains.account.Student;
import com.jdc.portal.domains.account.StudentActivation;
import com.jdc.portal.domains.account.StudentActivation_;
import com.jdc.portal.domains.account.Student_;
import com.jdc.portal.domains.master.Classes;
import com.jdc.portal.domains.master.Classes_;
import com.jdc.portal.domains.master.Course_;
import com.jdc.portal.domains.transaction.Payment;
import com.jdc.portal.domains.transaction.Payment_;
import com.jdc.portal.domains.transaction.Registration;
import com.jdc.portal.domains.utils.consts.ClassType;
import com.jdc.portal.domains.utils.consts.FeeType;
import com.jdc.portal.domains.utils.consts.PaymentStatus;
import com.jdc.portal.domains.utils.consts.PaymentType;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Root;

public record PaymentItem(
		long id,
		String course,
		LocalDate startDate,
		ClassType classType,
		String studentName,
		String email,
		String phone,
		LocalDateTime paymentDate,
		PaymentType paymentType,
		int amount,
		PaymentStatus status,
		FeeType particular,
		String rejectReason
) {

	public static void select(
			CriteriaQuery<PaymentItem> cq, 
			CriteriaBuilder cb, 
			Root<Payment> root,
			Join<Registration, Classes> classes, 
			Join<Registration, Student> student, 
			Join<Student, Account> account,
			Join<Student, StudentActivation> activation) {
		
		var name = cb.selectCase()
				.when(cb.isNotNull(student.get(Student_.account)), account.get(Account_.name))
				.when(cb.isNotNull(student.get(Student_.activation)), activation.get(StudentActivation_.name))
				.otherwise((String) null);
		
		var email = cb.selectCase()
				.when(cb.isNotNull(student.get(Student_.account)), account.get(Account_.email))
				.when(cb.isNotNull(student.get(Student_.activation)), activation.get(StudentActivation_.email))
				.otherwise((String) null);
		
		cq.select(cb.construct(PaymentItem.class, 
			root.get(Payment_.id),
			classes.get(Classes_.course).get(Course_.name),
			classes.get(Classes_.startDate),
			classes.get(Classes_.type),
			name,
			email,
			student.get(Student_.phone),
			root.get(Payment_.payAt),
			root.get(Payment_.type),
			root.get(Payment_.amount),
			root.get(Payment_.status),
			root.get(Payment_.feeType),
			root.get(Payment_.rejectReason)
		));
		
	}

}

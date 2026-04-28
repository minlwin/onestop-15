package com.jdc.portal.office.output;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.jdc.portal.domains.account.Account_;
import com.jdc.portal.domains.account.StudentActivation_;
import com.jdc.portal.domains.account.Student_;
import com.jdc.portal.domains.master.Classes_;
import com.jdc.portal.domains.master.Course_;
import com.jdc.portal.domains.transaction.Payment;
import com.jdc.portal.domains.transaction.Payment_;
import com.jdc.portal.domains.transaction.Registration;
import com.jdc.portal.domains.transaction.Registration_;
import com.jdc.portal.domains.utils.consts.ClassType;
import com.jdc.portal.domains.utils.consts.PaymentType;
import com.jdc.portal.domains.utils.consts.RegistrationStatus;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.ListJoin;
import jakarta.persistence.criteria.Root;

public record RegistrationDetails(
		long id,
		int studentId,
		int classId,
		String course,
		LocalDate startDate,
		ClassType classType,
		String studentName,
		String email,
		String phone,
		RegistrationStatus status,
		LocalDateTime registerAt,
		String rejectReason,
		PaymentType paymentType,
		LocalDateTime paymentDate,
		int amount,
		String paySlip
) {

	public static void select(
			CriteriaBuilder cb, 
			CriteriaQuery<RegistrationDetails> cq,
			Root<Registration> root,
			ListJoin<Registration, Payment> payments) {
		
		var classes = root.join(Registration_.classes);
		var student = root.join(Registration_.student);
		var account = student.join(Student_.account, JoinType.LEFT);
		var activation = student.join(Student_.activation, JoinType.LEFT);
		
		var name = cb.selectCase()
				.when(cb.isNotNull(account), account.get(Account_.name))
				.when(cb.isNotNull(activation), activation.get(StudentActivation_.name))
				.otherwise((String) null);
		
		var email = cb.selectCase()
				.when(cb.isNotNull(account), account.get(Account_.email))
				.when(cb.isNotNull(activation), activation.get(StudentActivation_.email))
				.otherwise((String) null);
		
		cq.select(cb.construct(RegistrationDetails.class, 
			root.get(Registration_.id),
			student.get(Student_.id),
			classes.get(Classes_.id),
			classes.get(Classes_.course).get(Course_.name),
			classes.get(Classes_.startDate),
			classes.get(Classes_.type),
			name,
			email,
			student.get(Student_.phone),
			root.get(Registration_.status),
			root.get(Registration_.registerAt),
			payments.get(Payment_.rejectReason),
			payments.get(Payment_.type),
			payments.get(Payment_.payAt),
			payments.get(Payment_.amount),
			payments.get(Payment_.slip)
		)).distinct(true);
	}
	

}

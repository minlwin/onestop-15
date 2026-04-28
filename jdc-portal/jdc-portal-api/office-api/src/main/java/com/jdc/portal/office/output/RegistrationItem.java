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
import com.jdc.portal.domains.transaction.Registration;
import com.jdc.portal.domains.transaction.Registration_;
import com.jdc.portal.domains.utils.consts.ClassType;
import com.jdc.portal.domains.utils.consts.RegistrationStatus;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Root;

public record RegistrationItem(
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
		String rejectReason
) {

	public static void select(CriteriaBuilder cb, CriteriaQuery<RegistrationItem> cq, Root<Registration> root, Join<Registration, Classes> classes, Join<Registration, Student> student, Join<Student, Account> account, Join<Student, StudentActivation> activation) {
		
		var name = cb.selectCase()
				.when(cb.isNotNull(account), account.get(Account_.name))
				.when(cb.isNotNull(activation), activation.get(StudentActivation_.name));
		
		var email = cb.selectCase()
				.when(cb.isNotNull(account), account.get(Account_.email))
				.when(cb.isNotNull(activation), activation.get(StudentActivation_.email));
		
		cq.select(cb.construct(RegistrationItem.class, 
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
			root.get(Registration_.rejectedReason)
		));
	
	}

}

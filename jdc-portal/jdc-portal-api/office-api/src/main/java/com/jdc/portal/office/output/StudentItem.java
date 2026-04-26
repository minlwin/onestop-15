package com.jdc.portal.office.output;

import java.time.LocalDateTime;

import com.jdc.portal.domains.account.Account;
import com.jdc.portal.domains.account.Account_;
import com.jdc.portal.domains.account.Student;
import com.jdc.portal.domains.account.StudentActivation;
import com.jdc.portal.domains.account.StudentActivation_;
import com.jdc.portal.domains.account.Student_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Root;

public record StudentItem(
	    Integer id,
	    String name,
	    String phone,
	    String email,
	    LocalDateTime entryAt,
	    LocalDateTime activatedAt
) {
	
	public static void select(
			CriteriaBuilder cb, 
			CriteriaQuery<StudentItem> cq, 
			Root<Student> root, 
			Join<Student, Account> account, 
			Join<Student, StudentActivation> activation) {
		
		var name = cb.selectCase()
				.when(cb.isNotNull(root.get(Student_.account)), account.get(Account_.name))
				.when(cb.isNotNull(root.get(Student_.activation)), activation.get(StudentActivation_.name))
				.otherwise((String) null);
		
		var email = cb.selectCase()
				.when(cb.isNotNull(root.get(Student_.account)), account.get(Account_.email))
				.when(cb.isNotNull(root.get(Student_.activation)), activation.get(StudentActivation_.email))
				.otherwise((String) null);
		
		cq.select(cb.construct(StudentItem.class,
				root.get(Student_.id),
				name,
				root.get(Student_.phone),
				email,
				root.get("entryAt"),
				root.get("activatedAt")
		));		
	}

}

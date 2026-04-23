package com.jdc.portal.office.output;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.jdc.portal.domains.account.Account;
import com.jdc.portal.domains.account.Account_;
import com.jdc.portal.domains.account.Employee;
import com.jdc.portal.domains.account.EmployeeActivation;
import com.jdc.portal.domains.account.EmployeeActivation_;
import com.jdc.portal.domains.account.Employee_;
import com.jdc.portal.domains.utils.consts.Position;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Root;

public record EmployeeItem(
    Integer id,
    String name,
    Position position,
    String phone,
    String email,
    LocalDateTime activatedAt,
    LocalDate entryAt,
    LocalDate resignAt
) {

	public static void select(CriteriaBuilder cb, CriteriaQuery<EmployeeItem> cq, Root<Employee> root, Join<Employee, Account> account, Join<Employee, EmployeeActivation> activation) {
		
		var name = cb.selectCase()
				.when(cb.isNotNull(root.get(Employee_.account)), account.get(Account_.name))
				.when(cb.isNotNull(root.get(Employee_.activation)), activation.get(EmployeeActivation_.name))
				.otherwise((String) null);
		
		var email = cb.selectCase()
				.when(cb.isNotNull(root.get(Employee_.account)), account.get(Account_.email))
				.when(cb.isNotNull(root.get(Employee_.activation)), activation.get(EmployeeActivation_.email))
				.otherwise((String) null);
		
		cq.select(cb.construct(
			EmployeeItem.class, 
			root.get(Employee_.id),
			name,
			root.get(Employee_.position),
			root.get(Employee_.phone),
			email,
			root.get(Employee_.activatedAt),
			root.get(Employee_.entryAt),
			root.get(Employee_.resignAt)
		));		
	}
}

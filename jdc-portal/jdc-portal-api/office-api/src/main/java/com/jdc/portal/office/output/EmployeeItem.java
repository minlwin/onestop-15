package com.jdc.portal.office.output;

import java.time.LocalDate;

import com.jdc.portal.domains.account.Account_;
import com.jdc.portal.domains.account.Employee;
import com.jdc.portal.domains.account.Employee_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public record EmployeeItem(
    Integer id,
    String name,
    String position,
    String phone,
    String email,
    LocalDate entryAt,
    LocalDate resignAt
) {

	public static void select(CriteriaBuilder cb, CriteriaQuery<EmployeeItem> cq, Root<Employee> root) {
		cq.select(cb.construct(
			EmployeeItem.class, 
			root.get(Employee_.id),
			root.get(Employee_.account).get(Account_.name),
			root.get(Employee_.position),
			root.get(Employee_.phone),
			root.get(Employee_.account).get(Account_.email),
			root.get(Employee_.entryAt),
			root.get(Employee_.resignAt)
		));
	}
}

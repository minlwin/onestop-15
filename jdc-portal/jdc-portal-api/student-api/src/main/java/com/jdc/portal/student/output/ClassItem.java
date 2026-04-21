package com.jdc.portal.student.output;

import java.time.LocalDate;

import com.jdc.portal.domains.master.Classes;
import com.jdc.portal.domains.master.Classes_;
import com.jdc.portal.domains.master.Course_;
import com.jdc.portal.domains.utils.consts.ClassType;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public record ClassItem(
		int id,
		ClassType type,
		String course,
		LocalDate startDate,
		String description) {

	public static void select(CriteriaBuilder cb, CriteriaQuery<ClassItem> cq, Root<Classes> root) {
		cq.select(cb.construct(
				ClassItem.class,
				root.get(Classes_.id),
				root.get(Classes_.type),
				root.get(Classes_.course).get(Course_.name),
				root.get(Classes_.startDate),
				root.get(Classes_.course).get(Course_.description)
		));
		
		cq.groupBy(root.get(Classes_.id));
	}

}

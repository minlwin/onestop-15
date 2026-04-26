package com.jdc.portal.office.output;

import java.time.LocalDate;

import com.jdc.portal.domains.master.Classes;
import com.jdc.portal.domains.master.Classes_;
import com.jdc.portal.domains.master.Course_;
import com.jdc.portal.domains.utils.consts.ClassType;
import com.jdc.portal.domains.utils.consts.CourseLevel;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public record ClassItem(
		int id,
		ClassType type,
		String course,
		CourseLevel courseLevel,
		LocalDate startDate,
		int months,
		int registrationFee,
		int monthlyFee
) {

	public static void select(CriteriaBuilder cb, CriteriaQuery<ClassItem> cq, Root<Classes> root) {
		cq.select(cb.construct(ClassItem.class, 
				root.get(Classes_.id),
				root.get(Classes_.type),
				root.get(Classes_.course).get(Course_.name),
				root.get(Classes_.course).get(Course_.level),
				root.get(Classes_.startDate),
				root.get(Classes_.months),
				root.get(Classes_.registrationFee),
				root.get(Classes_.monthlyFee)
		));
	}

}

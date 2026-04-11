package com.jdc.portal.dto;

import com.jdc.portal.domains.master.Course;
import com.jdc.portal.domains.master.Course_;
import com.jdc.portal.dto.consts.CourseLevel;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public record CourseItem(
		int id,
		String name,
		CourseLevel level,
		String description,
		int hours) {

	public static void select(CriteriaBuilder cb, CriteriaQuery<CourseItem> cq, Root<Course> root) {
		cq.select(cb.construct(CourseItem.class,
			root.get(Course_.id),
			root.get(Course_.name),
			root.get(Course_.level),
			root.get(Course_.description),
			root.get(Course_.hours)
		));
	}

}

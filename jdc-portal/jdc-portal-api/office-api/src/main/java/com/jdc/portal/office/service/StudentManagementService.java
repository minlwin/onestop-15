package com.jdc.portal.office.service;


import static com.jdc.portal.commons.utils.NullSafetyUtils.safeCall;

import java.util.function.Function;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.domains.account.Student;
import com.jdc.portal.domains.account.Student_;
import com.jdc.portal.domains.account.repo.StudentRepo;
import com.jdc.portal.domains.transaction.Registration_;
import com.jdc.portal.office.input.StudentSearch;
import com.jdc.portal.office.output.StudentDetails;
import com.jdc.portal.office.output.StudentItem;
import com.jdc.portal.utils.dto.PageResult;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.JoinType;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StudentManagementService {
	
	private final StudentRepo repo;

	public PageResult<StudentItem> search(StudentSearch search, int page, int size) {
		
		Function<CriteriaBuilder, CriteriaQuery<StudentItem>> queryFunc = cb -> {
			var cq = cb.createQuery(StudentItem.class);
			var root = cq.from(Student.class);
			
			var account = root.join(Student_.account, JoinType.LEFT);
			var activation = root.join(Student_.activation, JoinType.LEFT);
			var registrations = root.join(Student_.registrations, JoinType.LEFT);
			var classes = registrations.join(Registration_.classes, JoinType.LEFT);
			
			cq.where(search.where(cb, root, account, activation, classes));
			StudentItem.select(cb, cq, root, account, activation);
			return cq;
		};

		Function<CriteriaBuilder, CriteriaQuery<Long>> countFunc = cb -> {
			var cq = cb.createQuery(Long.class);
			var root = cq.from(Student.class);
			
			var account = root.join(Student_.account, JoinType.LEFT);
			var activation = root.join(Student_.activation, JoinType.LEFT);
			var registrations = root.join(Student_.registrations, JoinType.LEFT);
			var classes = registrations.join(Registration_.classes, JoinType.LEFT);
			
			cq.where(search.where(cb, root, account, activation, classes));
			cq.select(cb.countDistinct(root));
			
			return cq;
		};

		return repo.search(queryFunc, countFunc, page, size);
	}

	public StudentDetails findById(int id) {
		return safeCall(repo.findById(id).map(StudentDetails::from), "Student", "id %s".formatted(id));
	}

}

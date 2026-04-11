package com.jdc.portal.student.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.domains.account.Account_;
import com.jdc.portal.domains.account.Student_;
import com.jdc.portal.domains.master.Classes;
import com.jdc.portal.domains.master.Classes_;
import com.jdc.portal.domains.master.repo.ClassesRepo;
import com.jdc.portal.domains.transaction.Registration_;
import com.jdc.portal.student.output.AttendClassSummary;
import com.jdc.portal.student.output.ClassItem;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StudentClassService {
	
	private final ClassesRepo repo;

	public List<ClassItem> findClass(Authentication auth, boolean attended) {
		
		Function<CriteriaBuilder, CriteriaQuery<ClassItem>> queryFunc = cb -> {
			var cq = cb.createQuery(ClassItem.class);
			var root = cq.from(Classes.class);
			
			var registrations = root.join(Classes_.registrations, JoinType.LEFT);
			var student = registrations.join(Registration_.student, JoinType.LEFT);
			
			var predicates = new ArrayList<Predicate>();
			if(attended) {
				predicates.add(cb.equal(student.get(Student_.account).get(Account_.email), auth.getName()));
			} else {
				predicates.add(cb.notEqual(student.get(Student_.account).get(Account_.email), auth.getName()));
				predicates.add(cb.lessThanOrEqualTo(root.get(Classes_.startDate), LocalDate.now().plusMonths(1)));
			}
			
			cq.where(predicates);
			
			ClassItem.select(cb, cq, root);
			return cq;
		};
		
		return repo.search(queryFunc);
	}

	public AttendClassSummary findSummary(int classId, Authentication auth) {
		// TODO Auto-generated method stub
		return null;
	}

}

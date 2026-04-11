package com.jdc.portal.anonymous.service;

import static com.jdc.portal.utils.NullSafetyUtils.safeCall;

import java.time.LocalDate;
import java.util.List;
import java.util.function.Function;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.anonymous.output.ClassDetails;
import com.jdc.portal.anonymous.output.ClassInfo;
import com.jdc.portal.domains.master.Classes;
import com.jdc.portal.domains.master.Classes_;
import com.jdc.portal.domains.master.Course_;
import com.jdc.portal.domains.master.repo.ClassesRepo;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ClassInfoService {
	
	private final ClassesRepo repo;
	
	public List<ClassInfo> findForCourse(int courseId) {
		
		Function<CriteriaBuilder, CriteriaQuery<Classes>> queryFunc = cb -> {
			var cq = cb.createQuery(Classes.class);
			var root = cq.from(Classes.class);
			
			cq.where(
				cb.equal(root.get(Classes_.course).get(Course_.id), courseId),
				cb.lessThanOrEqualTo(root.get(Classes_.startDate), LocalDate.now())
			);
			
			cq.select(root);
			
			return cq;
		};
		
		return repo.search(queryFunc).stream().map(ClassInfo::new).toList();
	}

	public ClassDetails findById(int id) {
		return safeCall(repo.findById(id).map(ClassDetails::new), "Class", "id %s".formatted(id));
	}

}

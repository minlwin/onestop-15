package com.jdc.portal.office.service;

import static com.jdc.portal.commons.utils.NullSafetyUtils.safeCall;

import java.util.List;
import java.util.function.Function;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.commons.dto.CourseItem;
import com.jdc.portal.commons.dto.DataModificationResult;
import com.jdc.portal.domains.master.Course;
import com.jdc.portal.domains.master.repo.CourseRepo;
import com.jdc.portal.office.input.CourseForm;
import com.jdc.portal.office.input.CourseSearch;
import com.jdc.portal.office.output.CourseDetails;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CourseManagementService {
	
	private final CourseRepo repo;

	public List<CourseItem> search(CourseSearch search) {
		
		Function<CriteriaBuilder, CriteriaQuery<Course>> queryFunc = cb -> {
			var cq = cb.createQuery(Course.class);
			var root = cq.from(Course.class);
			
			cq.where(search.where(cb, root));
			cq.select(root);
			return cq;
		};
		
		return repo.search(queryFunc).stream().map(CourseItem::new).toList();
	}

	public CourseDetails findById(int id) {
		return safeCall(repo.findById(id).map(CourseDetails::from), "Course", "id %s".formatted(id));
	}

	public CourseForm findForm(int id) {
		return safeCall(repo.findById(id).map(CourseForm::from), "Course", "id %s".formatted(id));
	}

	@Transactional
	public DataModificationResult<Integer> create(CourseForm form) {
		var entity = form.toEntity();
		entity = repo.save(entity);
		return new DataModificationResult<>(entity.getId());
	}

	@Transactional
	public DataModificationResult<Integer> update(int id, CourseForm form) {
		var entity = safeCall(repo.findById(id), "Course", "id %s".formatted(id));
		form.updateEntity(entity);
		return new DataModificationResult<>(entity.getId());
	}

}

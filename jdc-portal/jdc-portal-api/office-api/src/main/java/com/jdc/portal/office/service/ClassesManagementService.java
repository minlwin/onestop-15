package com.jdc.portal.office.service;

import static com.jdc.portal.commons.utils.NullSafetyUtils.safeCall;

import java.util.function.Function;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.commons.dto.DataModificationResult;
import com.jdc.portal.domains.master.Classes;
import com.jdc.portal.domains.master.Classes_;
import com.jdc.portal.domains.master.repo.ClassesRepo;
import com.jdc.portal.domains.master.repo.CourseRepo;
import com.jdc.portal.domains.transaction.Registration_;
import com.jdc.portal.domains.utils.dto.PageResult;
import com.jdc.portal.office.input.ClassForm;
import com.jdc.portal.office.input.ClassSearch;
import com.jdc.portal.office.output.ClassDetails;
import com.jdc.portal.office.output.ClassItem;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.JoinType;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ClassesManagementService {

	private final ClassesRepo repo;
	private final CourseRepo courseRepo;

	public PageResult<ClassItem> search(ClassSearch search, int page, int size) {

		Function<CriteriaBuilder, CriteriaQuery<ClassItem>> queryFunc = cb -> {
			var cq = cb.createQuery(ClassItem.class);
			var root = cq.from(Classes.class);

			var registrations = root.join(Classes_.registrations, JoinType.LEFT);
			var students = registrations.join(Registration_.student, JoinType.LEFT);

			cq.where(search.where(cb, root, students));
			ClassItem.select(cb, cq, root);

			return cq;
		};

		Function<CriteriaBuilder, CriteriaQuery<Long>> countFunc = cb -> {
			var cq = cb.createQuery(Long.class);
			var root = cq.from(Classes.class);

			var registrations = root.join(Classes_.registrations, JoinType.LEFT);
			var students = registrations.join(Registration_.student, JoinType.LEFT);

			cq.where(search.where(cb, root, students));
			cq.select(cb.countDistinct(root));

			return cq;
		};

		return repo.search(queryFunc, countFunc, page, size);
	}

	public ClassDetails findById(int id) {
		return safeCall(repo.findById(id).map(ClassDetails::from), "Class", "id %s".formatted(id));
	}

	public ClassForm findForm(int id) {
		return safeCall(repo.findById(id).map(ClassForm::from), "Class", "id %s".formatted(id));
	}

	@Transactional
	public DataModificationResult<Integer> create(ClassForm form) {

		var entity = form.toEntity();
		var course = safeCall(courseRepo.findById(form.course()), "Course", "id %s".formatted(form.course()));
		entity.setCourse(course);
		var saved = repo.save(entity);

		return new DataModificationResult<>(saved.getId());
	}

	@Transactional
	public DataModificationResult<Integer> update(int id, ClassForm form) {

		var entity = safeCall(repo.findById(id), "Class", "id %s".formatted(id));
		if (entity.getCourse().getId() != form.course()) {
			var course = safeCall(courseRepo.findById(form.course()), "Course", "id %s".formatted(form.course()));
			entity.setCourse(course);
		}
		
		form.updateEntity(entity);

		return new DataModificationResult<>(entity.getId());
	}

}

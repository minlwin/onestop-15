package com.jdc.portal.anonymous.service;

import static com.jdc.portal.utils.NullSafetyUtils.safeCall;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.anonymous.output.CourseDetails;
import com.jdc.portal.domains.master.repo.CourseRepo;
import com.jdc.portal.dto.CourseItem;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CourseInfoService {
	
	private final CourseRepo repo;
	
	public List<CourseItem> findAll() {
		return repo.findAll().stream().map(CourseItem::new).toList();
	}

	public CourseDetails findById(int id) {
		return safeCall(repo.findById(id).map(CourseDetails::new), "Course", "id %s".formatted(id));
	}
}

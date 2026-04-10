package com.jdc.portal.office.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.dto.CourseItem;
import com.jdc.portal.dto.DataModificationResult;
import com.jdc.portal.office.input.CourseForm;
import com.jdc.portal.office.input.CourseSearch;
import com.jdc.portal.office.output.CourseDetails;

@Service
@Transactional(readOnly = true)
public class CourseManagementService {

	public List<CourseItem> search(CourseSearch search) {
		// TODO Auto-generated method stub
		return null;
	}

	public CourseDetails findById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	public CourseForm findForm(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Transactional
	public DataModificationResult<Integer> create(CourseForm form) {
		// TODO Auto-generated method stub
		return null;
	}

	@Transactional
	public DataModificationResult<Integer> update(int id, CourseForm form) {
		// TODO Auto-generated method stub
		return null;
	}

}

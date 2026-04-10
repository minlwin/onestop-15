package com.jdc.portal.office.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.dto.PageResult;
import com.jdc.portal.office.input.StudentSearch;
import com.jdc.portal.office.output.StudentDetails;
import com.jdc.portal.office.output.StudentItem;

@Service
@Transactional(readOnly = true)
public class StudentManagementService {

	public PageResult<StudentItem> search(StudentSearch search, int page, int size) {
		// TODO Auto-generated method stub
		return null;
	}

	public StudentDetails findById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

}

package com.jdc.portal.office.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.dto.DataModificationResult;
import com.jdc.portal.dto.PageResult;
import com.jdc.portal.office.input.ClassForm;
import com.jdc.portal.office.input.ClassSearch;
import com.jdc.portal.office.output.ClassDetails;
import com.jdc.portal.office.output.ClassItem;

@Service
@Transactional(readOnly = true)
public class ClassesManagementService {

	public PageResult<ClassItem> search(ClassSearch search, int page, int size) {
		// TODO Auto-generated method stub
		return null;
	}

	public ClassDetails findById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	public ClassForm findForm(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Transactional
	public DataModificationResult<Integer> create(ClassForm form) {
		// TODO Auto-generated method stub
		return null;
	}

	@Transactional
	public DataModificationResult<Integer> update(int id, ClassForm form) {
		// TODO Auto-generated method stub
		return null;
	}

}

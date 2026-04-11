package com.jdc.portal.office.service;

import static com.jdc.portal.utils.NullSafetyUtils.safeCall;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.domains.master.repo.PaymentAccountRepo;
import com.jdc.portal.dto.DataModificationResult;
import com.jdc.portal.office.input.PaymentAccountForm;
import com.jdc.portal.office.output.PaymentAccountDetails;
import com.jdc.portal.office.output.PaymentAccountItem;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PaymentAccountManagementService {
	
	private final PaymentAccountRepo repo;
	
	@Transactional(readOnly = true)
	public List<PaymentAccountItem> getAll() {
		return repo.findAll().stream().map(PaymentAccountItem::new).toList();
	}

	@Transactional(readOnly = true)
	public PaymentAccountDetails findById(int id) {
		return safeCall(repo.findById(id).map(PaymentAccountDetails::new), "PaymentAccount", "id %s".formatted(id));
	}

	public DataModificationResult<Integer> create(PaymentAccountForm form) {
		var entity = form.toEntity();
		entity = repo.save(entity);
		return new DataModificationResult<>(entity.getId());
	}

	public DataModificationResult<Integer> update(int id, PaymentAccountForm form) {
		var entity = safeCall(repo.findById(id), "PaymentAccount", "id %s".formatted(id));
		form.updateEntity(entity);
		return new DataModificationResult<>(entity.getId());
	}

	public DataModificationResult<Integer> toggleStatus(int id) {
		var entity = safeCall(repo.findById(id), "PaymentAccount", "id %s".formatted(id));
		entity.setDeleted(!entity.isDeleted());
		return new DataModificationResult<>(entity.getId());
	}

}

package com.jdc.portal.office.service;

import static com.jdc.portal.commons.utils.NullSafetyUtils.safeCall;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.commons.dto.DataModificationResult;
import com.jdc.portal.domains.transaction.Payment_;
import com.jdc.portal.domains.transaction.Registration;
import com.jdc.portal.domains.transaction.Registration_;
import com.jdc.portal.domains.transaction.repo.RegistrationRepo;
import com.jdc.portal.domains.utils.consts.FeeType;
import com.jdc.portal.domains.utils.consts.PaymentStatus;
import com.jdc.portal.domains.utils.consts.RegistrationStatus;
import com.jdc.portal.office.input.RegistrationForm;
import com.jdc.portal.office.input.RegistrationStatusForm;
import com.jdc.portal.office.output.RegistrationDetails;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RegistrationManagementService {
	
	private final RegistrationRepo registrationRepo;
	
	@Transactional
	public DataModificationResult<Long> create(RegistrationForm form) {

		return null;
	}

	@Transactional
	public DataModificationResult<Long> update(long id, RegistrationStatusForm form) {
		
		var registration = safeCall(registrationRepo.findById(id), 
				"Registration", "id : %s".formatted(id));
		
		registration.setStatus(form.status());
		
		for(var payment : registration.getPayment()) {
			if(payment.getFeeType() == FeeType.Registration) {
				if(form.status() == RegistrationStatus.Approved) {
					payment.setStatus(PaymentStatus.Paid);
				} else if (form.status() == RegistrationStatus.Rejected) {
					payment.setStatus(PaymentStatus.Rejected);
					payment.setRejectReason(form.rejectReason());
				}
			}
		}
		
		return new DataModificationResult<>(id);
	}

	public RegistrationDetails findById(long id) {
		
		var result = registrationRepo.search(cb -> {
			var cq = cb.createQuery(RegistrationDetails.class);
			var root = cq.from(Registration.class);
			var payments = root.join(Registration_.payment);
			
			RegistrationDetails.select(cb, cq, root, payments);
			cq.where(
				cb.equal(root.get(Registration_.id), id),
				cb.equal(payments.get(Payment_.feeType), FeeType.Registration)
			);
			
			return cq;
		});
		
		return safeCall(result.stream().findAny(), 
				"Registration", "id : %s".formatted(id));
	}

}

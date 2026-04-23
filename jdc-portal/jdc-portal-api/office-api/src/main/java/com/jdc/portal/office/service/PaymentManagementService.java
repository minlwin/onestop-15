package com.jdc.portal.office.service;

import static com.jdc.portal.commons.utils.NullSafetyUtils.safeCall;

import java.time.LocalDateTime;
import java.util.function.Function;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.commons.dto.DataModificationResult;
import com.jdc.portal.domains.account.Student_;
import com.jdc.portal.domains.transaction.Payment;
import com.jdc.portal.domains.transaction.Payment_;
import com.jdc.portal.domains.transaction.Registration_;
import com.jdc.portal.domains.transaction.repo.PaymentRepo;
import com.jdc.portal.domains.transaction.repo.RegistrationRepo;
import com.jdc.portal.domains.utils.consts.FeeType;
import com.jdc.portal.domains.utils.consts.PaymentStatus;
import com.jdc.portal.domains.utils.consts.PaymentType;
import com.jdc.portal.domains.utils.dto.PageResult;
import com.jdc.portal.office.input.PaymentForm;
import com.jdc.portal.office.input.PaymentSearch;
import com.jdc.portal.office.input.PaymentStatusForm;
import com.jdc.portal.office.output.PaymentDetails;
import com.jdc.portal.office.output.PaymentItem;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.JoinType;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PaymentManagementService {

	private final PaymentRepo paymentRepo;
	private final RegistrationRepo registrationRepo;

	public PageResult<PaymentItem> search(PaymentSearch search, int page, int size) {
		
		Function<CriteriaBuilder, CriteriaQuery<PaymentItem>> queryFunc = cb -> {
			var cq = cb.createQuery(PaymentItem.class);
			var root = cq.from(Payment.class);
			
			var registration = root.join(Payment_.registration);
			var classes = registration.join(Registration_.classes);
			var student = registration.join(Registration_.student);
			var account = student.join(Student_.account, JoinType.LEFT);
			var activation = student.join(Student_.activation, JoinType.LEFT);
			
			cq.where(search.where(cb, root, classes, student, account, activation));
			PaymentItem.select(cq, cb, root, classes, student, account, activation);
			
			return cq;
		};
		
		Function<CriteriaBuilder, CriteriaQuery<Long>> countFunc = cb -> {
			var cq = cb.createQuery(Long.class);
			var root = cq.from(Payment.class);
			
			var registration = root.join(Payment_.registration);
			var classes = registration.join(Registration_.classes);
			var student = registration.join(Registration_.student);
			var account = student.join(Student_.account, JoinType.LEFT);
			var activation = student.join(Student_.activation, JoinType.LEFT);
			
			cq.where(search.where(cb, root, classes, student, account, activation));
			cq.select(cb.count(root.get(Payment_.id)));
			
			return cq;
		};

		return paymentRepo.search(queryFunc, countFunc, page, size);
	}

	public PaymentDetails findById(long id) {
		var entity = safeCall(paymentRepo.findById(id), "Payment Information", "id : %s".formatted(id));
		return PaymentDetails.from(entity);
	}

	@Transactional
	public DataModificationResult<Long> create(PaymentForm form) {
		
		var registration = safeCall(registrationRepo.searchOne(form.classId(), form.studentId()), "Registration", "Student ID : %s".formatted(form.studentId()));
		
		var entity = new Payment();
		entity.setRegistration(registration);
		entity.setAmount(form.amount());
		entity.setFeeType(FeeType.Monthly);
		entity.setStatus(PaymentStatus.Paid);
		entity.setType(PaymentType.Office);
		entity.setPayAt(LocalDateTime.now());
		
		entity = paymentRepo.save(entity);
		
		return new DataModificationResult<>(entity.getId());
	}

	@Transactional
	public DataModificationResult<Long> update(long id, PaymentStatusForm form) {
		var entity = safeCall(paymentRepo.findById(id), "Payment Information", "id : %s".formatted(id));
		entity.setStatus(form.status());
		entity.setRejectReason(form.rejectReason());
		return new DataModificationResult<>(entity.getId());
	}
}

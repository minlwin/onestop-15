package com.jdc.portal.student.service;


import static com.jdc.portal.commons.utils.NullSafetyUtils.safeCall;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.commons.dto.DataModificationResult;
import com.jdc.portal.domains.account.Account_;
import com.jdc.portal.domains.account.StudentActivation_;
import com.jdc.portal.domains.account.Student_;
import com.jdc.portal.domains.master.Classes_;
import com.jdc.portal.domains.transaction.Payment;
import com.jdc.portal.domains.transaction.Payment_;
import com.jdc.portal.domains.transaction.Registration_;
import com.jdc.portal.domains.transaction.repo.PaymentRepo;
import com.jdc.portal.student.input.PaymentForm;
import com.jdc.portal.student.output.PaymentDetails;
import com.jdc.portal.student.output.PaymentItem;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StudentPaymentService {
	
	private final PaymentRepo repo;

	public List<PaymentItem> search(Integer classId, String email) {
		
		Function<CriteriaBuilder, CriteriaQuery<PaymentItem>> queryFunc = cb -> {
			var cq = cb.createQuery(PaymentItem.class);
			var root = cq.from(Payment.class);
			
			var student = root.join(Payment_.registration).join(Registration_.student);
			var predicates = new ArrayList<Predicate>();
			
			if(null != classId) {
				var classes = root.join(Payment_.registration).join(Registration_.classes);
				predicates.add(cb.equal(classes.get(Classes_.id), classId));
			}

			predicates.add(cb.or(
				cb.equal(student.get(Student_.account).get(Account_.email), email),
				cb.equal(student.get(Student_.activation).get(StudentActivation_.email), email)
			));
			
			return cq;
		};
		
		return repo.search(queryFunc);
	}

	public PaymentDetails findById(long id) {
		return safeCall(repo.findById(id).map(PaymentDetails::from), "Payment", "id %s".formatted(id));
	}

	@Transactional
	public DataModificationResult<Long> paid(PaymentForm form, String name) {
		// TODO Auto-generated method stub
		return null;
	}

}

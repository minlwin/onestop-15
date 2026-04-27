package com.jdc.portal.office.service;

import static com.jdc.portal.commons.utils.NullSafetyUtils.safeCall;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.commons.JdcBusinessException;
import com.jdc.portal.commons.dto.DataModificationResult;
import com.jdc.portal.commons.utils.ActivationCodeGenerator;
import com.jdc.portal.domains.account.Student;
import com.jdc.portal.domains.account.StudentActivation;
import com.jdc.portal.domains.account.repo.StudentActivationRepo;
import com.jdc.portal.domains.account.repo.StudentRepo;
import com.jdc.portal.domains.master.repo.ClassesRepo;
import com.jdc.portal.domains.transaction.Payment;
import com.jdc.portal.domains.transaction.Payment_;
import com.jdc.portal.domains.transaction.Registration;
import com.jdc.portal.domains.transaction.Registration_;
import com.jdc.portal.domains.transaction.repo.PaymentRepo;
import com.jdc.portal.domains.transaction.repo.RegistrationRepo;
import com.jdc.portal.domains.utils.consts.FeeType;
import com.jdc.portal.domains.utils.consts.PaymentStatus;
import com.jdc.portal.domains.utils.consts.PaymentType;
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
	private final ClassesRepo classesRepo;
	private final StudentRepo studentRepo;
	private final StudentActivationRepo activationRepo;
	private final PaymentRepo paymentRepo;
	
	@Transactional
	public Registration create(RegistrationForm form) {
		
		// Check Applied Student
		if(studentRepo.findOneByActivationEmail(form.email()).isPresent()) {
			throw new JdcBusinessException("You already applied to a class. Please check your email and activate your account.");
		}
		
		// Get Class
		var classes = safeCall(classesRepo.findById(form.classId()), 
				"Class", "id : %s".formatted(form.classId()));
		
		// Get Student (Old Students or New Students)
		var student = studentRepo.findOneByAccountEmail(form.email()).orElseGet(() -> {
			var entity = new Student();
			entity.setEntryAt(LocalDateTime.now());
			entity.setPhone(form.phone());
			entity = studentRepo.save(entity);
			
			var activation = new StudentActivation();
			activation.setAccount(entity);
			activation.setEmail(form.email());
			activation.setName(form.name());
			activation.setCode(ActivationCodeGenerator.generateCode());
			activation = activationRepo.save(activation);
			entity.setActivation(activation);

			return entity;
		});
		
		// Create Registration
		var registration = new Registration();
		registration.setStudent(student);
		registration.setClasses(classes);
		registration.setRegisterAt(LocalDateTime.now());
		registration.setStatus(RegistrationStatus.Approved);
		registration = registrationRepo.save(registration);
		
		// Create Payment for Registration Fees
		var payment = new Payment();
		payment.setRegistration(registration);
		payment.setType(PaymentType.Office);
		payment.setAmount(form.registrationFee());
		payment.setFeeType(FeeType.Registration);
		payment.setStatus(PaymentStatus.Paid);
		payment.setPayAt(LocalDateTime.now());
		payment = paymentRepo.save(payment);

		return registration;
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

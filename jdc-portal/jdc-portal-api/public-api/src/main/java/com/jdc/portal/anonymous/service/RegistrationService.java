package com.jdc.portal.anonymous.service;

import static com.jdc.portal.commons.utils.NullSafetyUtils.safeCall;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.anonymous.input.CheckRegistrationForm;
import com.jdc.portal.anonymous.input.RegistrationForm;
import com.jdc.portal.commons.JdcBusinessException;
import com.jdc.portal.commons.dto.MessageResult;
import com.jdc.portal.commons.utils.ActivationCodeGenerator;
import com.jdc.portal.commons.utils.FileStorageUtils;
import com.jdc.portal.domains.account.Student;
import com.jdc.portal.domains.account.StudentActivation;
import com.jdc.portal.domains.account.repo.StudentActivationRepo;
import com.jdc.portal.domains.account.repo.StudentRepo;
import com.jdc.portal.domains.master.repo.ClassesRepo;
import com.jdc.portal.domains.master.repo.PaymentAccountRepo;
import com.jdc.portal.domains.transaction.Payment;
import com.jdc.portal.domains.transaction.Registration;
import com.jdc.portal.domains.transaction.repo.PaymentRepo;
import com.jdc.portal.domains.transaction.repo.RegistrationRepo;
import com.jdc.portal.domains.utils.consts.FeeType;
import com.jdc.portal.domains.utils.consts.PaymentStatus;
import com.jdc.portal.domains.utils.consts.RegistrationStatus;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RegistrationService {

	private final RegistrationRepo registrationRepo;
	private final ClassesRepo classesRepo;
	private final StudentRepo studentRepo;
	private final StudentActivationRepo activationRepo;
	private final PaymentAccountRepo paymentAccountRepo;
	private final PaymentRepo paymentRepo;
	
	private final FileStorageUtils fileStorage;
	
	@Transactional
	public MessageResult apply(RegistrationForm form) {
		
		// Validate
		validate(form);
		
		var paymentAccount = safeCall(paymentAccountRepo.findById(form.payment()), 
				"Payment Account", "id : %s".formatted(form.payment()));
		
		// Create Student
		var student = new Student();
		student.setPhone(form.phone());
		student.setEntryAt(LocalDateTime.now());
		student = studentRepo.save(student);
		
		// Create Student Activation
		var activation = new StudentActivation();
		activation.setAccount(student);
		activation.setEmail(form.email());
		activation.setName(form.name());
		activation.setCode(ActivationCodeGenerator.generateCode());
		activation = activationRepo.save(activation);
							
		// Create Registration
		var classes = safeCall(classesRepo.findById(form.classId()), 
				"Class", "id : %s".formatted(form.classId()));
		
		var registration = new Registration();
		registration.setStudent(student);
		registration.setClasses(classes);
		registration.setRegisterAt(LocalDateTime.now());
		registration.setStatus(RegistrationStatus.Applied);
		registration = registrationRepo.save(registration);

		// Save File in Storage
		var slipId = fileStorage.save(registration.getId(), FeeType.Registration, paymentAccount.getType(), form.paymentSlip());
		
		// Create Payment for Registration Fee
		var payment = new Payment();
		payment.setRegistration(registration);
		payment.setAccount(paymentAccount);
		payment.setType(paymentAccount.getType());
		payment.setAmount(form.amount());
		payment.setSlip(slipId);
		payment.setFeeType(FeeType.Registration);
		payment.setStatus(PaymentStatus.Pending);
		payment.setPayAt(LocalDateTime.now());
		paymentRepo.save(payment);
		
		return new MessageResult("Your application is accepted. After reviewing we will send email to you.");
	}

	private void validate(RegistrationForm form) {
		// Check Valid Class ID
		var classes = safeCall(classesRepo.findById(form.classId()), 
				"Class", "id : %s".formatted(form.classId()));
		
		if(classes.getStartDate().compareTo(LocalDate.now()) <= 0) {
			throw new JdcBusinessException("This class is already start. We can't accept new registration.");
		}
		
		// Check Activated Student
		if(studentRepo.findOneByAccountEmail(form.email()).isPresent()) {
			throw new JdcBusinessException("Your email is already a student. Please login and apply again.");
		}
		
		// Check Applied Student
		if(studentRepo.findOneByActivationEmail(form.email()).isPresent()) {
			throw new JdcBusinessException("You already applied to a class. Please check your email and activate your account.");
		}
	}

	@Transactional(readOnly = true)
	public MessageResult check(CheckRegistrationForm form) {
		var registrations = registrationRepo.searchByEmail(form.email());
		
		if(registrations.isEmpty()) {
			return new MessageResult("There is no registration with email :%s".formatted(form.email()));
		}
		
		var registration = registrations.getFirst();
		var message = switch(registration.getStatus()) {
		case Applied -> "Your application is still reviewing. Please wait.";
		case Approved -> "Your application is approved. Please check your email.";
		case Rejected -> "Your application is rejected. Please check your email.";
		};
		
		return new MessageResult(message);
	}

}

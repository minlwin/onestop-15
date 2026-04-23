package com.jdc.portal.mail;

import java.time.LocalDateTime;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.commons.dto.EmployeeActivationEvent;
import com.jdc.portal.domains.account.repo.EmployeeActivationRepo;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EmployeeActivationEventListener {
	
	private final EmployeeActivationRepo activationRepo;
	private final JavaMailSender mailSender;
	
	private static final String MESSAGE_FMT = """
			<h1>Account Activation</h1>
			<p>Your account is created. You have to activate your account.</p>
			<ul>
			<li>Your Name : %s</li>
			<li>Your Mail : %s</li>
			<li>Activation Code : %s</li>
			</ul>
			""";

	@Async
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void handle(EmployeeActivationEvent event) throws MessagingException {
		// Get Activation Info
		var activation = activationRepo.findById(event.id()).get();
		
		// Send Email
		var message = mailSender.createMimeMessage();
		var helper = new MimeMessageHelper(message);
		helper.setTo(activation.getEmail());
		helper.setSubject("Account Activation");
		helper.setText(MESSAGE_FMT.formatted(
				activation.getName(), activation.getEmail(), activation.getCode()), true);
		
		mailSender.send(message);
		
		// Update Status
		activation.setSendAt(LocalDateTime.now());
	}
}

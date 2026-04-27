package com.jdc.portal.event.listener;

import java.time.LocalDateTime;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.commons.events.MailEvent;
import com.jdc.portal.commons.events.StudentActivationEvent;
import com.jdc.portal.domains.account.repo.StudentActivationRepo;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class StudentActivationEventListener {
	
	private final StudentActivationRepo activationRepo;
	private final ApplicationEventPublisher eventPublisher;

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
	@EventListener
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void handle(StudentActivationEvent event) {
		// Get Activation Info
		var activation = activationRepo.findById(event.id()).get();
		
		var message = MESSAGE_FMT.formatted(
				activation.getName(), activation.getEmail(), activation.getCode());
		
		eventPublisher.publishEvent(MailEvent.builder()
				.sendTo(activation.getEmail())
				.title("Account Activation")
				.message(message)
				.build());
		
		// Update Status
		activation.setSendAt(LocalDateTime.now());
	}

}

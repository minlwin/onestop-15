package com.jdc.portal.event.listener;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.commons.events.MailEvent;
import com.jdc.portal.commons.events.RegistrationEvent;
import com.jdc.portal.commons.events.StudentActivationEvent;
import com.jdc.portal.domains.transaction.repo.RegistrationRepo;
import com.jdc.portal.domains.utils.consts.RegistrationStatus;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RegistrationEventListener {

	private final ApplicationEventPublisher eventPublisher;
	private final RegistrationRepo registrationRepo;
	
	private static final String REJECTED_MESSAGE = """
			<h1>Reject Information</h1>
			<p>Your application is rejected. You can confirm the reason for rejected.</p>
			<ul>
			<li>Your Name : %s</li>
			<li>Your Mail : %s</li>
			<li>Reason    : %s</li>
			</ul>
			""";

	@Async
	@EventListener
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void handle(RegistrationEvent event) {
		
		registrationRepo.findById(event.id()).ifPresent(registration -> {
			if(registration.getStatus() == RegistrationStatus.Approved) {
				eventPublisher.publishEvent(new StudentActivationEvent(registration.getStudent().getId()));
			} else if (registration.getStatus() == RegistrationStatus.Approved) {
				var student = registration.getStudent();
				var message = REJECTED_MESSAGE.formatted(
					student.getActivation().getName(),
					student.getActivation().getEmail(),
					registration.getRejectedReason()
				);

				eventPublisher.publishEvent(MailEvent.builder()
					.sendTo(student.getActivation().getEmail())
					.title("Application Result Information")
					.message(message)
					.build());
			}
		});
		
	}
}

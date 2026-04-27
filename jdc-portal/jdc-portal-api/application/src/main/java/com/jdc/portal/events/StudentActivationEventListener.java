package com.jdc.portal.events;

import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.commons.dto.StudentActivationEvent;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class StudentActivationEventListener {

	@Async
	@EventListener
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void handle(StudentActivationEvent event) {
		
	}

}

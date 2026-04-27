package com.jdc.portal.event.listener;

import org.springframework.context.event.EventListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import com.jdc.portal.commons.events.MailEvent;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MailEventListener {

	private final JavaMailSender mailSender;
	
	@EventListener
	public void handle(MailEvent event) throws MessagingException {
		var message = mailSender.createMimeMessage();
		var helper = new MimeMessageHelper(message);
		helper.setTo(event.sendTo());
		helper.setSubject(event.title());
		helper.setText(event.message());
		mailSender.send(message);
	}
}

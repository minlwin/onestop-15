package com.jdc.portal.anonymous.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.portal.anonymous.output.PaymentInfo;
import com.jdc.portal.domains.master.repo.PaymentAccountRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PaymentInfoService {

	private final PaymentAccountRepo repo;

	public List<PaymentInfo> getPaymentInfo() {
		return repo.findAll().stream().map(PaymentInfo::new).toList();
	}
}

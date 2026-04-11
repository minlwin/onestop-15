package com.jdc.portal.domains.master.repo;

import java.util.List;

import com.jdc.portal.domains.BaseRepository;
import com.jdc.portal.domains.master.PaymentAccount;

public interface PaymentAccountRepo extends BaseRepository<PaymentAccount, Integer>{

	List<PaymentAccount> findAllByDeletedFalse();
}

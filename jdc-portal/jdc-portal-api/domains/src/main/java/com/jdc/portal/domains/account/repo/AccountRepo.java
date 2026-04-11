package com.jdc.portal.domains.account.repo;

import java.util.Optional;

import com.jdc.portal.domains.BaseRepository;
import com.jdc.portal.domains.account.Account;

public interface AccountRepo extends BaseRepository<Account, Integer>{

	Optional<Account> findOneByEmail(String email);
	
	long countByEmail(String email);

}

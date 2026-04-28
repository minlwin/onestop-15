package com.jdc.portal.commons.utils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.jdc.portal.commons.JdcBusinessException;
import com.jdc.portal.domains.utils.consts.FeeType;
import com.jdc.portal.domains.utils.consts.PaymentType;

@Service
public class FileStorageUtils {
	
	@Value("${app.storage.path}")
	private String storage;
	private static final DateTimeFormatter DF = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

	public String save(long registrationId, FeeType feeType, PaymentType type, MultipartFile file) {
		
		try {
			// /storage/feeType/paymentType/yyyyMMddHHmmss_0000.ext
			var fileName = getFileName(registrationId, file);
			
			var storageDirectory = getDirectory(feeType, type);
			
			var imageFile = storageDirectory.resolve(fileName);
			
			Files.copy(
					file.getInputStream(), 
					imageFile, 
					StandardCopyOption.REPLACE_EXISTING);
			
			return imageFile.toString();
		} catch (Exception e) {
			throw new JdcBusinessException("Payment Slip can't be save.", e);
		}
	}

	private Path getDirectory(FeeType feeType, PaymentType type) throws IOException {
		var storageDir = Path.of(
				storage, 
				feeType.name().toLowerCase(),
				type.name().toLowerCase());
		
		if(!Files.exists(storageDir, LinkOption.NOFOLLOW_LINKS)) {
			Files.createDirectories(storageDir); 
		}
		return storageDir;
	}

	private String getFileName(long registrationId, MultipartFile file) {
		var array = file.getOriginalFilename().split("\\.");
		var extension = array[array.length - 1];
		return "%s%04d.%s".formatted(
				LocalDateTime.now().format(DF),
				registrationId, extension);
	}

}

package com.jdc.portal.office.output;

import java.time.LocalDate;

import com.jdc.portal.domains.transaction.Payment;
import com.jdc.portal.domains.utils.consts.ClassType;
import com.jdc.portal.domains.utils.consts.FeeType;
import com.jdc.portal.domains.utils.consts.PaymentStatus;
import com.jdc.portal.domains.utils.consts.PaymentType;

public record PaymentDetails(
		long id,
		String course,
		LocalDate startDate,
		ClassType classType,
		String studentName,
		String email,
		String phone,
		LocalDate paymentDate,
		PaymentType paymentType,
		int amount,
		PaymentStatus status,
		FeeType particular,
		String rejectReason,
		String paySlip
) {
    
	public static Builder builder() {
		return new Builder();
	}

	public static class Builder {

		private long id;
		private String course;
		private LocalDate startDate;
		private ClassType classType;
		private String studentName;
		private String email;
		private String phone;
		private LocalDate paymentDate;
		private PaymentType paymentType;
		private int amount;
		private PaymentStatus status;
		private FeeType particular;
		private String rejectReason;
		private String paySlip;

		public Builder id(long id) {
			this.id = id;
			return this;
		}

		public Builder course(String course) {
			this.course = course;
			return this;
		}

		public Builder startDate(LocalDate startDate) {
			this.startDate = startDate;
			return this;
		}

		public Builder classType(ClassType classType) {
			this.classType = classType;
			return this;
		}

		public Builder studentName(String studentName) {
			this.studentName = studentName;
			return this;
		}

		public Builder email(String email) {
			this.email = email;
			return this;
		}

		public Builder phone(String phone) {
			this.phone = phone;
			return this;
		}

		public Builder paymentDate(LocalDate paymentDate) {
			this.paymentDate = paymentDate;
			return this;
		}

		public Builder paymentType(PaymentType paymentType) {
			this.paymentType = paymentType;
			return this;
		}

		public Builder amount(int amount) {
			this.amount = amount;
			return this;
		}

		public Builder status(PaymentStatus status) {
			this.status = status;
			return this;
		}

		public Builder particular(FeeType particular) {
			this.particular = particular;
			return this;
		}

		public Builder rejectReason(String rejectReason) {
			this.rejectReason = rejectReason;
			return this;
		}

		public Builder paySlip(String paySlip) {
			this.paySlip = paySlip;
			return this;
		}

		public PaymentDetails build() {
			return new PaymentDetails(
					id,
					course,
					startDate,
					classType,
					studentName,
					email,
					phone,
					paymentDate,
					paymentType,
					amount,
					status,
					particular,
					rejectReason,
					paySlip
			);
		}
	}

	public static PaymentDetails from(Payment entity) {
		
		var classes = entity.getRegistration().getClasses();
		var student = entity.getRegistration().getStudent();
		var name = student.getAccount() != null ? student.getAccount().getName() : student.getActivation().getName();
		var email = student.getAccount() != null ? student.getAccount().getEmail() : student.getActivation().getEmail();
		
		return new Builder()
				.id(entity.getId())
				.course(classes.getCourse().getName())
				.startDate(classes.getStartDate())
				.classType(classes.getType())
				.studentName(name)
				.email(email)
				.phone(student.getPhone())
				.paymentDate(entity.getPayAt().toLocalDate())
				.paymentType(entity.getType())
				.amount(entity.getAmount())
				.status(entity.getStatus())
				.particular(entity.getFeeType())
				.rejectReason(entity.getRejectReason())
				.paySlip(entity.getSlip())
				.build();
	}

}

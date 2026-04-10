package com.jdc.portal.office.input;

import java.time.LocalDate;

public record PaymentSearch(
    String classId,
    String studentId,
    String classType,
    String feeType,
    String paymentType,
    String status,
    LocalDate dateFrom,
    LocalDate dateTo,
    String keyword) {

}

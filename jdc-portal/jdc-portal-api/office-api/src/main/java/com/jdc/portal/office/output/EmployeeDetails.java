package com.jdc.portal.office.output;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record EmployeeDetails(
    Integer id,
    String name,
    String position,
    String phone,
    String email,
    LocalDate entryAt,
    LocalDate resignAt,
    String createdBy,
    String modifiedBy,
    LocalDateTime createdAt,
    LocalDateTime modifiedAt
) {

}

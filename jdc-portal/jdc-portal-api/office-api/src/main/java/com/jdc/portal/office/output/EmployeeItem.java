package com.jdc.portal.office.output;

import java.time.LocalDate;

public record EmployeeItem(
    Integer id,
    String name,
    String position,
    String phone,
    String email,
    LocalDate entryAt,
    LocalDate resignAt
) {

}

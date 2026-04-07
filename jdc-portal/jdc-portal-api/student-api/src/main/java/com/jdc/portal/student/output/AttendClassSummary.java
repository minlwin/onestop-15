package com.jdc.portal.student.output;

public record AttendClassSummary(
		long attended,
		long late,
		long earlyOut,
		long leave,
		long absent,
		boolean needToPaid,
		boolean certified) {

}

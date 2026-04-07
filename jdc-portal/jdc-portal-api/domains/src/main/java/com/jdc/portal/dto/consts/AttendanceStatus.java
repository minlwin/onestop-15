package com.jdc.portal.dto.consts;

public enum AttendanceStatus {
	Attend, Absent, Leave, Late, EarlyOut {
		@Override
		public String getDisplayName() {
			return "Early Out";
		}
	};
	
	public String getDisplayName() {
		return name();
	}
}

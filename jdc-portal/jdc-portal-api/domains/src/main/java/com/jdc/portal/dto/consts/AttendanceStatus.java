package com.jdc.portal.dto.consts;

import com.jdc.portal.OptionWrapper;

public enum AttendanceStatus implements OptionWrapper{
	Attend, Absent, Leave, Late, EarlyOut {
		@Override
		public String getDisplayName() {
			return "Early Out";
		}
	};
	
	public String getDisplayName() {
		return name();
	}

	@Override
	public String getLabel() {
		return getDisplayName();
	}

	@Override
	public String getValue() {
		return name();
	}
}

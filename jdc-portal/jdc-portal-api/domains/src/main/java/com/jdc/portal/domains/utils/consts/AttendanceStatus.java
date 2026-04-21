package com.jdc.portal.domains.utils.consts;

import com.jdc.portal.domains.utils.dto.Option;

public enum AttendanceStatus implements Option{
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

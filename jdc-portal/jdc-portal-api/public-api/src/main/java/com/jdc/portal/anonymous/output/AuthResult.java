package com.jdc.portal.anonymous.output;

import java.util.List;

import com.jdc.portal.domains.utils.consts.Role;

public record AuthResult(
        String email,
        String name,
        List<Role> role,
        String accessToken,
        String refreshToken) {
	
	public static Builder withEmail(String email) {
		return new Builder().email(email);
	}

    public static class Builder {
        private String email;
        private String name;
        private List<Role> role;
        private String accessToken;
        private String refreshToken;

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder role(List<Role> role) {
            this.role = role;
            return this;
        }

        public Builder accessToken(String accessToken) {
            this.accessToken = accessToken;
            return this;
        }

        public Builder refreshToken(String refreshToken) {
            this.refreshToken = refreshToken;
            return this;
        }

        public AuthResult build() {
            return new AuthResult(email, name, role, accessToken, refreshToken);
        }
    }
}
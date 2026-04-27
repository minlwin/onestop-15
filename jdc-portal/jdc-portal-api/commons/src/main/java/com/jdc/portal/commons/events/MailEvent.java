package com.jdc.portal.commons.events;

public record MailEvent(
        String sendTo,
        String title,
        String message) {

    public static class Builder {
        private String sendTo;
        private String title;
        private String message;

        public Builder sendTo(String sendTo) {
            this.sendTo = sendTo;
            return this;
        }

        public Builder title(String title) {
            this.title = title;
            return this;
        }

        public Builder message(String message) {
            this.message = message;
            return this;
        }

        public MailEvent build() {
            return new MailEvent(sendTo, title, message);
        }
    }

    public static Builder builder() {
        return new Builder();
    }
}

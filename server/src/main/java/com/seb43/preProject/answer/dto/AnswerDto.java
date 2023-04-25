package com.seb43.preProject.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

    public class AnswerDto {
        @Getter
        @Setter
        public static class Post {
            @NotBlank
            private String content;
            private long questionId;
        }
        @Getter
        @Setter
        public static class Patch {
            @NotBlank
            private String content;
            private long answerId;
            private long questionId;
        }
        @Getter
        @Setter
        @AllArgsConstructor
        public static class Response {
            private long answerId;
            private String content;
            private String userName;
            private long memberId;
            private long questionId;
        }
    }

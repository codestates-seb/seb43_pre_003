package com.seb43.preProject.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
public class CommentDto {
    @Getter
    @Setter
    public static class Post {
        @NotBlank
        private String content;
        private long memberId;
        private long answerId;
        private long questionId;
    }
    @Getter
    @Setter
    public static class Patch {
        private long commentId;
        private String content;
        private long memberId;
        private long questionId;
        private long answerId;
    }
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response {
        private long commentId;
        private String content;
        private String userName;
        private long questionId;
        private long answerId;
    }
}

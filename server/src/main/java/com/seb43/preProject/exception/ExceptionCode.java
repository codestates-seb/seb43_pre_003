package com.seb43.preProject.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND,"회원 정보를 찾을 수 없습니다."),
    MEMBER_EXISTS(HttpStatus.CONFLICT, "이미 존재하는 이메일입니다."),
    POST_NOT_FOUND(HttpStatus.NOT_FOUND,"게시물을 찾을 수 없습니다."),
    NO_PERMESSION(HttpStatus.FORBIDDEN, "동작을 수행할 수 없습니다."),
    ALREADY_VOTED(HttpStatus.FORBIDDEN, "이미 투표했습니다."),
    INVALID_MEMBER_STATUS(HttpStatus.BAD_REQUEST, "사용할 수 없는 멤버 상태"),
    COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND,"답변을 찾을 수 없습니다."),
    ALREADY_COMPLETED(HttpStatus.METHOD_NOT_ALLOWED,"이미 완료한 작업입니다."),
    ANSWER_NOT_FOUND(404, "Answer not found"),
    ANSWER_NOT_MEMBER(402, "Not an Answer written by a Member"),
    COMMENT_NOT_MEMBER(402, "Not an Comment written by a Member"),
    COMMENT_IS_NOT_ANSWER(402, "This AnswerId not Comment");


    @Getter
    private int status;
    @Getter
    private HttpStatus httpStatus;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }

    ExceptionCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }
}

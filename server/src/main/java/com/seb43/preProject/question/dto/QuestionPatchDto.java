package com.seb43.preProject.question.dto;

import lombok.Getter;

import javax.validation.constraints.Positive;

@Getter
public class QuestionPatchDto {
    @Positive
    private long memberId;
    private String title;
    private String content;
}

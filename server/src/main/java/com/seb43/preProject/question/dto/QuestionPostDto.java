package com.seb43.preProject.question.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
public class QuestionPostDto {
    @Positive
    private long memberId;
    @NotBlank
    private String title;
    @NotBlank
    private String content;
}
package com.seb43.preProject.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Positive;

@AllArgsConstructor
@Getter
public class QuestionPatchDto {
    private String title;
    private String content;
}

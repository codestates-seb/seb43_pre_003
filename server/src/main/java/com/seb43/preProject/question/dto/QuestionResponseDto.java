package com.seb43.preProject.question.dto;

import com.seb43.preProject.question.entity.Question;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;

@Getter
@Setter
public class QuestionResponseDto {
    @Positive
    private long questionId;
    private String title;
    private String content;
    private String userName;
    private int answerCount;
    private int views;
    private int votes;
    private Question.QuestionStatus questionStatus;
}

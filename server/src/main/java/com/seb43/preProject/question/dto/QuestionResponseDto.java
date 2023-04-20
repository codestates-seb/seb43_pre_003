package com.seb43.preProject.question.dto;

import com.seb43.preProject.question.entity.Question;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

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
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}

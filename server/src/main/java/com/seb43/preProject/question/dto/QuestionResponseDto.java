package com.seb43.preProject.question.dto;

import com.seb43.preProject.answer.dto.AnswerDto;
import com.seb43.preProject.question.entity.Question;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.time.LocalDateTime;

@Getter
@Setter
public class QuestionResponseDto {
    private long questionId;
    private long memberId;
    private String title;
    private String content;
    private String userName;
    private int answerCount;
    private int views;
    private int votes;
    private Question.QuestionStatus questionStatus;
    private List<AnswerDto.Response> answers;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}

package com.seb43.preProject.answer.controller;

import com.seb43.preProject.answer.dto.AnswerDto;
import com.seb43.preProject.answer.entity.Answer;
import com.seb43.preProject.answer.mapper.AnswerMapper;
import com.seb43.preProject.answer.service.AnswerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/question")
@Validated
public class AnswerController {
    private final AnswerService service;
    private final AnswerMapper mapper;

    public AnswerController(AnswerService service, AnswerMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @PostMapping("/{question-id}")
    public ResponseEntity postAnswer (@PathVariable("question-id") @Positive long questionId,
                                      @RequestBody AnswerDto.Post post) {

        post.setQuestionId(questionId);

        Answer create = mapper.PostDtoToAnswer(post);
        Answer result = service.createAnswer(create);
        return new ResponseEntity(mapper.AnswerToResponse(result), HttpStatus.CREATED);
    }
    @PatchMapping("/{question-id}/{answer-id}")
    public ResponseEntity patchAnswer (@PathVariable("question-id") @Positive long questionId,
                                       @PathVariable("answer-id") @Positive long answerId,
                                       @RequestBody @Valid AnswerDto.Patch patch) {
        patch.setAnswerId(answerId);
        patch.setQuestionId(questionId);
        Answer update = mapper.PatchDtoToAnswer(patch);

        Answer result = service.updateAnswer(update);
        return new ResponseEntity(mapper.AnswerToResponse(result), HttpStatus.OK);
    }
    @GetMapping("/{question-id}/answers")
    public ResponseEntity getAnswers (@PathVariable("question-id") @Positive long questionId) {

        return new ResponseEntity(
                mapper.AnswerToListResponse(service.AllAnswer(questionId)), HttpStatus.OK
        );
    }
    @DeleteMapping("/{question-id}/answer/{answer-id}/{member-id}")
    public ResponseEntity deleteAnswer (@PathVariable("question-id") @Positive long questionId,
                                        @PathVariable("answer-id") @Positive long answerId,
                                        @PathVariable("member-id") @Positive long memberId) {
        service.deleteAnswer(questionId, answerId, memberId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}

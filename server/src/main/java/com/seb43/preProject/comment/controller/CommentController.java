package com.seb43.preProject.comment.controller;

import com.seb43.preProject.comment.dto.CommentDto;
import com.seb43.preProject.comment.entity.Comment;
import com.seb43.preProject.comment.mepper.CommentMapper;
import com.seb43.preProject.comment.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@Validated
@RequestMapping("/comment") // todo : 추후 수정
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper mapper;

    public CommentController(CommentService commentService, CommentMapper mapper) {
        this.commentService = commentService;
        this.mapper = mapper;
    }

    @PostMapping("/question/{question-id}")
    public ResponseEntity postQuestionComment (@PathVariable("question-id") @Positive long questionId,
                                       @RequestBody @Valid CommentDto.Post post) {
        post.setQuestionId(questionId);
        Comment create = commentService.createQuestionComment(mapper.PostDtoToComment(post));

        return new ResponseEntity(mapper.EntityToResponse(create), HttpStatus.CREATED);
    }
    // 답변 부분 댓글
    @PostMapping("/answer/{answer-id}")
    public ResponseEntity postAnswerComment (@PathVariable("answer-id") @Positive long answerId,
                                             @RequestBody @Valid CommentDto.Post post) {
        post.setAnswerId(answerId);
        Comment create = commentService.createAnswerComment(mapper.PostDtoToComment(post));

        return new ResponseEntity(mapper.EntityToResponse(create), HttpStatus.CREATED);
    }
    @PatchMapping("/question/{question-id}/{comment-id}")
    public ResponseEntity patchQuestionComment (@PathVariable("question-id") @Positive long questionId,
                                                @PathVariable("comment-id") @Positive long commentId,
                                                @RequestBody CommentDto.Patch patch) {
        patch.setQuestionId(questionId);
        patch.setCommentId(commentId);
        Comment update = commentService.updateQuestionComment(mapper.PatchDtoToComment(patch));

        return new ResponseEntity(mapper.EntityToResponse(update), HttpStatus.OK);
    }
    @PatchMapping("/answer/{answer-id}/{comment-id}")
    public ResponseEntity patchAnswerComment (@PathVariable("answer-id") @Positive long answerId,
                                              @PathVariable("comment-id") @Positive long commentId,
                                              @RequestBody CommentDto.Patch patch) {
        patch.setCommentId(commentId);
        patch.setAnswerId(answerId);
        Comment update = commentService.updateAnswerComment(mapper.PatchDtoToComment(patch));
        return new ResponseEntity(mapper.EntityToResponse(update), HttpStatus.OK);
    }
    @DeleteMapping("/question/{question-id}/{member-id}/{comment-id}")
    public ResponseEntity deleteQuestionComment (@PathVariable("question-id") @Positive long questionId,
                                                 @PathVariable("member-id") @Positive long memberId,
                                                 @PathVariable("comment-id") @Positive long commentId) {
        commentService.deleteQuestionComment(questionId, memberId, commentId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
    @DeleteMapping("/{question-id}/answer/{answer-id}/{member-id}/{comment-id}")
    public ResponseEntity deleteAnswerComment (@PathVariable("question-id") long questionId,
                                               @PathVariable("answer-id") @Positive long answerId,
                                               @PathVariable("member-id") @Positive long memberId,
                                               @PathVariable("comment-id") @Positive long commentId) {
        commentService.deleteAnswerComment(questionId, answerId, memberId, commentId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}

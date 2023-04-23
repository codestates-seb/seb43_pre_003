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

    @PostMapping("/question/{question_id}")
    public ResponseEntity postQuestionComment (@PathVariable("question_id") @Positive long questionId,
                                       @RequestBody @Valid CommentDto.Post post) {
        post.setQuestionId(questionId);
        Comment create = commentService.createQuestionComment(mapper.PostDtoToComment(post));

        return new ResponseEntity(mapper.EntityToResponse(create), HttpStatus.CREATED);
    }
    // 답변 부분 댓글
    @PostMapping("/answer/{answer_id}")
    public ResponseEntity postAnswerComment (@PathVariable("answer_id") @Positive long answerId,
                                             @RequestBody @Valid CommentDto.Post post) {
        post.setAnswerId(answerId);
        Comment create = commentService.createAnswerComment(mapper.PostDtoToComment(post));

        return new ResponseEntity(mapper.EntityToResponse(create), HttpStatus.CREATED);
    }
    @PatchMapping("/question/{question_id}/{comment_id}")
    public ResponseEntity patchQuestionComment (@PathVariable("question_id") @Positive long questionId,
                                                @PathVariable("comment_id") @Positive long commentId,
                                                @RequestBody CommentDto.Patch patch) {
        patch.setQuestionId(questionId);
        patch.setCommentId(commentId);
        Comment update = commentService.updateQuestionComment(mapper.PatchDtoToComment(patch));

        return new ResponseEntity(mapper.EntityToResponse(update), HttpStatus.OK);
    }
    @PatchMapping("/answer/{answer_id}/{comment_id}")
    public ResponseEntity patchAnswerComment (@PathVariable("answer_id") @Positive long answerId,
                                              @PathVariable("comment_id") @Positive long commentId,
                                              @RequestBody CommentDto.Patch patch) {
        patch.setCommentId(commentId);
        patch.setAnswerId(answerId);
        Comment update = commentService.updateAnswerComment(mapper.PatchDtoToComment(patch));
        return new ResponseEntity(mapper.EntityToResponse(update), HttpStatus.OK);
    }
    @DeleteMapping("/question/{question_id}/{member_id}/{comment_id}")
    public ResponseEntity deleteQuestionComment (@PathVariable("question_id") @Positive long questionId,
                                                 @PathVariable("member_id") @Positive long memberId,
                                                 @PathVariable("comment_id") @Positive long commentId) {
        commentService.deleteQuestionComment(questionId, memberId, commentId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
    @DeleteMapping("/{question_id}/answer/{answer_id}/{member_id}/{comment_id}")
    public ResponseEntity deleteAnswerComment (@PathVariable("question_id") long questionId,
                                               @PathVariable("answer_id") @Positive long answerId,
                                               @PathVariable("member_id") @Positive long memberId,
                                               @PathVariable("comment_id") @Positive long commentId) {
        commentService.deleteAnswerComment(questionId, answerId, memberId, commentId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}

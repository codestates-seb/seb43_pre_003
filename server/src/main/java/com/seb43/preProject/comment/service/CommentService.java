package com.seb43.preProject.comment.service;

import com.seb43.preProject.answer.service.AnswerService;
import com.seb43.preProject.comment.entity.Comment;
import com.seb43.preProject.comment.repository.CommentRepository;
import com.seb43.preProject.exception.BusinessLogicException;
import com.seb43.preProject.exception.ExceptionCode;
import com.seb43.preProject.member.entity.Member;
import com.seb43.preProject.member.service.MemberService;
import com.seb43.preProject.question.entity.Question;
import com.seb43.preProject.question.service.QuestionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
@Slf4j
public class CommentService {
    private final MemberService memberService;
    private final QuestionService questionService;
    private final AnswerService answerService;
    private final CommentRepository repository;

    public CommentService(MemberService memberService, QuestionService questionService,
                          AnswerService answerService, CommentRepository repository) {
        this.memberService = memberService;
        this.questionService = questionService;
        this.answerService = answerService;
        this.repository = repository;
    }
    // todo : (일단 reputation 점수 부분은 없이 진행)
    /*
    평판
    5점부터 댓글 기능 사용 가능
    얻을 수 있는 부분
        - 질문이 좋아요 + 1
        - 답변이 좋아요 + 1
        - 답변이 채택됨 + 1.5 , 수락자에게 + 0.2
    감소 되는 부분
        - 질문이 싫어요를 받으면 - 0.2
        - 답변이 싫어요를 받으면 - 0.2
        - 답변에 싫어요를 누르면 - 0.1
    ⭐평판은 1부터 시작. 1 밑으로는 떨어질 수 없음.
     */
    public Comment createQuestionComment (Comment comment) {

        existsMemberAndQuestion(comment);

        return repository.save(comment);
    }

    public Comment createAnswerComment (Comment comment) {
        Question question = existsMemberAndQuestion(comment);
        answerService.verifyQuestionAnswer(comment.getAnswer().getAnswerId(), question);
        return repository.save(comment);
    }
    public Comment updateQuestionComment (Comment comment) {
        questionService.verifyQuestion(comment.getQuestion().getQuestionId());
        return verifyCommentMember(comment);
    }
    public Comment updateAnswerComment (Comment comment) {
        // 질문 글 확인.
        Question question = questionService.verifyQuestion(comment.getQuestion().getQuestionId());
        answerService.verifyQuestionAnswer(comment.getAnswer().getAnswerId(), question);
        existsComment(comment.getCommentId());
        commentFindAnswer(comment);
        return verifyCommentMember(comment);
    }
    public void deleteQuestionComment (long questionId, long memberId, long commentId) {
        Comment findComment = existsComment(commentId);

        if (findComment.getQuestion().getQuestionId() != questionId) {
            log.error("해당 질문글의 댓글이 아닙니다.");
            throw new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND);
        }
        if (findComment.getMember().getMemberId() != memberId) {
            log.error("해당 멤버가 작성한 댓글이 아닙니다.");
            throw new BusinessLogicException(ExceptionCode.COMMENT_NOT_MEMBER);
        }
        repository.delete(findComment);
    }
    public void deleteAnswerComment (long questionId, long answerId, long memberId, long commentId) {
        // 질문 글이 있는지
        Question question = questionService.verifyQuestion(questionId);
        // 질문에 해당하는 답변 번호인지
        answerService.verifyQuestionAnswer(answerId, question);
        // 해당 답변 글의 댓글이 맞는지
        Comment comment = existsComment(commentId);
        if (comment.getAnswer().getAnswerId() != answerId) {
            log.error("해당 답변의 댓글이 아닙니다.");
        }

        if (comment.getMember().getMemberId() != memberId) {
            log.error("해당 멤버가 작성한 댓글이 아닙니다.");
            throw new BusinessLogicException(ExceptionCode.COMMENT_NOT_MEMBER);
        }
        repository.delete(comment);
    }

    private void commentFindAnswer(Comment comment) {
        Comment answerId = existsComment(comment.getCommentId());

        if (answerId.getAnswer().getAnswerId() != comment.getAnswer().getAnswerId()) {
            log.info("해당 댓글에 맞는 답변 아이디를 찾을 수 없습니다.");
            throw new BusinessLogicException(ExceptionCode.COMMENT_IS_NOT_ANSWER);
        }
    }

    private Comment verifyCommentMember(Comment comment) {
        Comment findId = existsComment(comment.getCommentId());

        if (findId.getMember().getMemberId().equals(comment.getMember().getMemberId())) {
            Optional.ofNullable(comment.getContent()).ifPresent(content -> findId.setContent(content));

            return repository.save(findId);
        }
        else throw new BusinessLogicException(ExceptionCode.COMMENT_NOT_MEMBER);
    }

    private Comment existsComment(long commentId) {
        Optional<Comment> optional = repository.findById(commentId);
        Comment findId = optional.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return findId;
    }

    private Question existsMemberAndQuestion(Comment comment) {  // 존재 exists 확인 verify
        Member fidnMember = memberService.findVerifiedMember(comment.getMember().getMemberId());
        comment.setUserName(fidnMember.getUserName());

        Question question = questionService.verifyQuestion(comment.getQuestion().getQuestionId());
        return question;
    }
}

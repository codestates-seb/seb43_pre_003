package com.seb43.preProject.answer.service;

import com.seb43.preProject.answer.entity.Answer;
import com.seb43.preProject.answer.repository.AnswerRepository;
import com.seb43.preProject.exception.BusinessLogicException;
import com.seb43.preProject.exception.ExceptionCode;
import com.seb43.preProject.member.entity.Member;
import com.seb43.preProject.member.service.MemberService;
import com.seb43.preProject.question.entity.Question;
import com.seb43.preProject.question.service.QuestionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
public class AnswerService {
    private final AnswerRepository repository;
    private final QuestionService questionService;
    private final MemberService memberService;

    public AnswerService(AnswerRepository repository, QuestionService questionService, MemberService memberService) {
        this.repository = repository;
        this.questionService = questionService;
        this.memberService = memberService;
    }

    public Answer createAnswer (Answer answer) {
        Long memberId = memberService.findSecurityContextHolderMemberId();
        Member findMemberId = memberService.findVerifiedMember(memberId);
        answer.setMember(findMemberId);
        answer.setUserName(findMemberId.getUserName());

        Question questionId = questionService.verifyQuestion(answer.getQuestion().getQuestionId());
        questionService.answerCountPlus(questionId);

        return repository.save(answer);
    }

    public Answer updateAnswer (Answer answer) {
        Question question = questionService.verifyQuestion(answer.getQuestion().getQuestionId());
        Long memberId = memberService.findSecurityContextHolderMemberId();
        verifyQuestionAnswer(answer.getAnswerId(), question);

        Answer find = existsAnswer(answer.getAnswerId());
        answer.setUserName(find.getUserName());

        if (memberId.equals(find.getMember().getMemberId())) {
            Optional.ofNullable(answer.getContent()).ifPresent(content -> answer.setContent(content));
            return repository.save(answer);
        }
        else throw new BusinessLogicException(ExceptionCode.ANSWER_NOT_MEMBER);
    }
    // 해당 Question 에 존재하는 답변인가
    public void verifyQuestionAnswer(long answerId, Question question) {
        boolean QuestionAnswer = question.getAnswers()
                .stream()
                .anyMatch(id -> id.getAnswerId() == answerId);
        if (!QuestionAnswer) {
            log.error("This Answer not Question");
            throw new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND);
        }
    }

    @Transactional(readOnly = true)
    public List<Answer> AllAnswer (long questionId) {
        // 해당 질문글에 해당하는 모든 답변 불러오기
        questionService.verifyQuestion(questionId);

        List<Answer> result = repository.findAll(Sort.by(Sort.Direction.ASC, "answerId"))
                .stream()
                .filter(num -> num.getQuestion().getQuestionId().equals(questionId))
                .collect(Collectors.toList());
        return result;
    }

    public void deleteAnswer (long questionId, long answerId) {
        Question question = questionService.verifyQuestion(questionId);
        Long memberId = memberService.findSecurityContextHolderMemberId();
        questionService.answerCountMinus(question);

        Optional<Answer> answer = repository.findById(answerId);

        Answer findId = answer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));

        if (findId.getMember().getMemberId().equals(memberId)) repository.delete(findId);
        else throw new BusinessLogicException(ExceptionCode.ANSWER_NOT_MEMBER);
    }

    public Answer existsAnswer (long answerId) {
        Optional<Answer> optional = repository.findById(answerId);
        Answer findId = optional.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));

        return findId;
    }
}
package com.seb43.preProject.question.service;

import com.seb43.preProject.exception.BusinessLogicException;
import com.seb43.preProject.exception.ExceptionCode;
import com.seb43.preProject.member.entity.Member;
import com.seb43.preProject.member.service.MemberService;
import com.seb43.preProject.question.entity.Question;
import com.seb43.preProject.question.entity.Votes;
import com.seb43.preProject.question.repository.QuestionRepository;
import com.seb43.preProject.question.repository.VotesRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;

@Transactional
@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final MemberService memberService;
    private final VotesRepository votesRepository;

    public QuestionService(QuestionRepository questionRepository, MemberService memberService, VotesRepository votesRepository) {
        this.questionRepository = questionRepository;
        this.memberService = memberService;
        this.votesRepository = votesRepository;
    }

    public Question createQuestion(Question question){
        Long memberId = memberService.findSecurityContextHolderMemberId();
        Member member = memberService.findVerifiedMember(memberId);
        question.setUserName(member.getUserName());
        question.setMember(member);
        question.setQuestionStatus(Question.QuestionStatus.QUESTION_REGISTERED);
        return questionRepository.save(question);
    }

    public Question updateQuestion(Question question) {
        Question findQuestion = verifyQuestion(question.getQuestionId());
        Long memberId = memberService.findSecurityContextHolderMemberId();
        if (memberId == findQuestion.getMember().getMemberId()) {
            Optional.ofNullable(question.getTitle()).ifPresent(title -> findQuestion.setTitle(title));
            Optional.ofNullable(question.getContent()).ifPresent(content -> findQuestion.setContent(content));
            return questionRepository.save(findQuestion);
        } else {
            throw new BusinessLogicException(ExceptionCode.NO_PERMESSION);
        }
    }

    public Question findQuestion(long questionId){
        Question question = verifyQuestion(questionId);
        question.setViews(question.getViews() + 1);
        return question;
    }
    public Page<Question> findQuestions(int page, int size){
        return questionRepository.findAll(PageRequest.of(page, size, Sort.by("questionId").descending()));
    }

    public void removeQuestion(long questionId){
        Question question = verifyQuestion(questionId);
        Long memberId = memberService.findSecurityContextHolderMemberId();
        if (question.getMember().getMemberId() == memberId){
            questionRepository.delete(verifyQuestion(questionId));
        }else{
            throw new BusinessLogicException(ExceptionCode.NO_PERMESSION);
        }

    }

    public Page<Question> searchQuestions(String title,int page,int size){
        return questionRepository.findByTitleContaining(title, PageRequest.of(page, size));
    }

    public Question likeQuestion(long questionId){
        Question question = verifyQuestion(questionId);
        Long memberId = memberService.findSecurityContextHolderMemberId();
        Member member = memberService.findVerifiedMember(memberId);
        Optional<Votes> findVotes = votesRepository.findByQuestionAndMember(question, member);
        if (findVotes.isPresent()){
            throw new BusinessLogicException(ExceptionCode.ALREADY_VOTED);
        }
        Votes votes = new Votes();
        votes.setQuestion(question);
        votes.setMember(member);
        question.setVotes(question.getVotes() + 1);
        votesRepository.save(votes);
        return question;
    }

    public Question unlikeQuestion(long questionId){
        Question question = verifyQuestion(questionId);
        Long memberId = memberService.findSecurityContextHolderMemberId();
        Member member = memberService.findVerifiedMember(memberId);
        Optional<Votes> findVotes = votesRepository.findByQuestionAndMember(question, member);
        if (findVotes.isPresent()){
            throw new BusinessLogicException(ExceptionCode.ALREADY_VOTED);
        }
        Votes votes = new Votes();
        votes.setQuestion(question);
        votes.setMember(member);
        question.setVotes(question.getVotes() - 1);
        votesRepository.save(votes);
        return question;
    }

    public Question verifyQuestion(long questionId) {
        return questionRepository.findById(questionId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
    }
    public void answerCountPlus (Question question) {
        int now = question.getAnswerCount();
        question.setAnswerCount(now + 1);

        questionRepository.save(question);
    }
    public void answerCountMinus (Question question) {
        int count = question.getAnswerCount();
        question.setAnswerCount(count - 1);

        questionRepository.save(question);
    }
}

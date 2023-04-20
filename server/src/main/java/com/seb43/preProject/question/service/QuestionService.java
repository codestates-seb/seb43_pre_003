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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.print.Pageable;
import java.util.List;
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
        Member member = memberService.findVerifiedMember(question.getMember().getMemberId());
        question.setUserName(member.getUserName());
        question.setQuestionStatus(Question.QuestionStatus.QUESTION_REGISTERED);
        return questionRepository.save(question);
    }

    public Question updateQuestion(Question question) {
        Question findQuestion = verifyQuestion(question.getQuestionId());
        if (question.getMember().getMemberId() == findQuestion.getMember().getMemberId()) {
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
        return questionRepository.findAll(PageRequest.of(page, size));
    }

    public void removeQuestion(long questionId, long memberId){
        Question question = verifyQuestion(questionId);
        if (question.getMember().getMemberId() == memberId){
            questionRepository.delete(verifyQuestion(questionId));
        }else{
            throw new BusinessLogicException(ExceptionCode.NO_PERMESSION);
        }

    }

    public Page<Question> searchQuestions(String title,int page,int size){
        return questionRepository.findByTitleContaining(title, PageRequest.of(page, size));
    }

    public void likeQuestion(long questionId, long memberId){
        Question question = verifyQuestion(questionId);
        Member member = memberService.findVerifiedMember(memberId);
        Optional<Votes> findVotes = votesRepository.findByQuestionAndMember(question, member);
        if (findVotes.isPresent()){
            Votes vote = findVotes.get();
            if (vote.getVotesStatus().equals(Votes.VotesStatus.VOTES_UP)){
                throw new BusinessLogicException(ExceptionCode.ALREADY_COMPLETED);
            }
            vote.setVotesStatus(Votes.VotesStatus.VOTES_UP);
            question.setVotes(question.getVotes() + 2);
        }else{
            Votes votes = new Votes();
            votes.setQuestion(question);
            votes.setMember(member);
            votes.setVotesStatus(Votes.VotesStatus.VOTES_UP);
            question.setVotes(question.getVotes() + 1);
            votesRepository.save(votes);
        }
    }

    public void unlikeQuestion(long questionId, long memberId){
        Question question = verifyQuestion(questionId);
        Member member = memberService.findVerifiedMember(memberId);
        Optional<Votes> findVotes = votesRepository.findByQuestionAndMember(question, member);
        if (findVotes.isPresent()){
            Votes vote = findVotes.get();
            if (vote.getVotesStatus().equals(Votes.VotesStatus.VOTES_DOWN)){
                throw new BusinessLogicException(ExceptionCode.ALREADY_COMPLETED);
            }
            vote.setVotesStatus(Votes.VotesStatus.VOTES_DOWN);
            question.setVotes(question.getVotes() - 2);
        }else{
            Votes votes = new Votes();
            votes.setQuestion(question);
            votes.setMember(member);
            votes.setVotesStatus(Votes.VotesStatus.VOTES_DOWN);
            question.setVotes(question.getVotes() - 1);
            votesRepository.save(votes);
        }
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

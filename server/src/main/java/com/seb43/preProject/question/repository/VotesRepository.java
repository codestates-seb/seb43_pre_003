package com.seb43.preProject.question.repository;

import com.seb43.preProject.member.entity.Member;
import com.seb43.preProject.question.entity.Question;
import com.seb43.preProject.question.entity.Votes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VotesRepository extends JpaRepository<Votes, Long> {
    Optional<Votes> findByQuestionAndMember(Question question, Member member);
}

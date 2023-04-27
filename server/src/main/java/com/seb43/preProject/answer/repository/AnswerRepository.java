package com.seb43.preProject.answer.repository;

import com.seb43.preProject.answer.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AnswerRepository extends JpaRepository<Answer, Long> {
}
package com.seb43.preProject.answer.repository;

import com.seb43.preProject.answer.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
}
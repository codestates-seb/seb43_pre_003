package com.seb43.preProject.question.mapper;

import com.seb43.preProject.question.dto.QuestionPatchDto;
import com.seb43.preProject.question.dto.QuestionPostDto;
import com.seb43.preProject.question.dto.QuestionResponseDto;
import com.seb43.preProject.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    Question questionPostToQuestion(QuestionPostDto questionPostDto);
    Question questionPatchToQuestion(QuestionPatchDto questionPatchDto);
    @Mapping(source = "member.userName",target = "userName")
    QuestionResponseDto questionToResponseDto(Question question);
    List<QuestionResponseDto> questionsToQuestionDtos(List<Question> questions);
}

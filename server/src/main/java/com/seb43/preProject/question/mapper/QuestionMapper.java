package com.seb43.preProject.question.mapper;

import com.seb43.preProject.answer.dto.AnswerDto;
import com.seb43.preProject.question.dto.QuestionPatchDto;
import com.seb43.preProject.question.dto.QuestionPostDto;
import com.seb43.preProject.question.dto.QuestionResponseDto;
import com.seb43.preProject.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    Question questionPostToQuestion(QuestionPostDto questionPostDto);
    Question questionPatchToQuestion(QuestionPatchDto questionPatchDto);
    default QuestionResponseDto questionToResponseDto(Question question) {
        QuestionResponseDto responseDto = new QuestionResponseDto();

        responseDto.setQuestionId(question.getQuestionId());
        responseDto.setMemberId(question.getMember().getMemberId());
        responseDto.setTitle(question.getTitle());
        responseDto.setContent(question.getContent());
        responseDto.setUserName(question.getUserName());
        responseDto.setAnswerCount(question.getAnswerCount());
        responseDto.setViews(question.getViews());
        responseDto.setVotes(question.getVotes());
        responseDto.setQuestionStatus(question.getQuestionStatus());
        responseDto.setCreatedAt(question.getCreatedAt());
        responseDto.setModifiedAt(question.getModifiedAt());

        List<AnswerDto.Response> answers = question.getAnswers()
                .stream()
                .map(answer -> new AnswerDto.Response(
                        answer.getAnswerId(),
                        answer.getContent(),
                        answer.getUserName(),
                        answer.getMember().getMemberId(),
                        answer.getQuestion().getQuestionId()
                ))
                .sorted(Comparator.comparing(a -> a.getAnswerId()))
                .collect(Collectors.toList());

        responseDto.setAnswers(answers);

        return responseDto;
    }
    List<QuestionResponseDto> questionsToQuestionDtos(List<Question> questions);
}

package com.seb43.preProject.answer.mapper;

import com.seb43.preProject.answer.dto.AnswerDto;
import com.seb43.preProject.answer.entity.Answer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    @Mapping(source = "memberId", target = "member.memberId")
    @Mapping(source = "questionId", target = "question.questionId")
    Answer PostDtoToAnswer (AnswerDto.Post post);
    @Mapping(source = "memberId", target = "member.memberId")
    @Mapping(source = "questionId", target = "question.questionId")
    Answer PatchDtoToAnswer (AnswerDto.Patch patch);
    @Mapping(source = "userName", target = "memberName")
    @Mapping(source = "question.questionId", target = "questionId")
    @Mapping(source = "member.memberId", target = "memberId")
    AnswerDto.Response AnswerToResponse (Answer answer);
    @Mapping(source = "userName", target = "memberName")
    List<AnswerDto.Response> AnswerToListResponse (List<Answer> answer);
}

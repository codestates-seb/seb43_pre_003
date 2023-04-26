package com.seb43.preProject.answer.mapper;

import com.seb43.preProject.answer.dto.AnswerDto;
import com.seb43.preProject.answer.entity.Answer;
import com.seb43.preProject.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    default Answer PostDtoToAnswer (AnswerDto.Post post) {
        Answer answer = new Answer();
        answer.setContent(post.getContent());

        Question question = new Question();
        question.setQuestionId(post.getQuestionId());
        answer.setQuestion(question);

        return answer;
    }
    @Mapping(source = "questionId", target = "question.questionId")
    Answer PatchDtoToAnswer (AnswerDto.Patch patch);
    default AnswerDto.Response AnswerToResponse (Answer answer) {
        long questionId = answer.getQuestion().getQuestionId();
        long memberId = answer.getMember().getMemberId();
        String content = answer.getContent();
        String userName = answer.getUserName();
        long answerId = answer.getAnswerId();

        AnswerDto.Response response = new AnswerDto.Response(
                answerId, content, userName, memberId, questionId, answer.getCreatedAt(), answer.getModifiedAt()
        );
        return response;
    }
    @Mapping(source = "userName", target = "userName")
    @Mapping(source = "member.memberId", target = "memberId")
    List<AnswerDto.Response> AnswerToListResponse (List<Answer> answer);
}

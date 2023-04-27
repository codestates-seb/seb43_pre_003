package com.seb43.preProject.comment.mepper;

import com.seb43.preProject.answer.entity.Answer;
import com.seb43.preProject.comment.dto.CommentDto;
import com.seb43.preProject.comment.entity.Comment;
import com.seb43.preProject.member.entity.Member;
import com.seb43.preProject.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    default Comment PostDtoToComment (CommentDto.Post post) {
        Comment comment = new Comment();
        comment.setContent(post.getContent());

        Question question = new Question();
        question.setQuestionId(post.getQuestionId());

        comment.setQuestion(question);

        Answer answer = new Answer();

        if (post.getAnswerId() != 0) {
            answer.setAnswerId(post.getAnswerId());
            comment.setAnswer(answer);
        };
        Member member = new Member();
        member.setMemberId(post.getMemberId());
        comment.setMember(member);

        return comment;
    }
    @Mapping(source = "memberId", target = "member.memberId")
    @Mapping(source = "questionId", target = "question.questionId")
    @Mapping(source = "answerId", target = "answer.answerId")
    Comment PatchDtoToComment (CommentDto.Patch patch);
    @Mapping(source = "question.questionId", target = "questionId")
    CommentDto.Response EntityToResponse (Comment comment);
}

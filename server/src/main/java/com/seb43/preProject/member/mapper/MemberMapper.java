package com.seb43.preProject.member.mapper;

import com.seb43.preProject.member.dto.MemberDto;
import com.seb43.preProject.member.dto.MemberPatchDto;
import com.seb43.preProject.member.dto.MemberPostDto;
import com.seb43.preProject.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Service;

@Service
@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostDtoToMember(MemberPostDto memberPostDto);
    @Mapping(target = "questionCount", expression = "java(member.getQuestions().size())")
    @Mapping(target = "answerCount", expression = "java(member.getAnswers().size())")
    MemberDto.response memberToMemberResponse(Member member);
    Member memberPatchToMember(MemberPatchDto memberPatchDto);
}

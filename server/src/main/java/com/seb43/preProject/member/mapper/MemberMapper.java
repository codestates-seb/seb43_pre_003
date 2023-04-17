package com.seb43.preProject.member.mapper;

import com.seb43.preProject.member.dto.MemberPostDto;
import com.seb43.preProject.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostDtoToMember(MemberPostDto memberPostDto);
}

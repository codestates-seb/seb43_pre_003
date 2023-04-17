package com.seb43.preProject.member.dto;

import com.seb43.preProject.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponseDto {

    private long memberId;
    private String email;
    private String userName;
    private String password;
    private Object profileImage;

}

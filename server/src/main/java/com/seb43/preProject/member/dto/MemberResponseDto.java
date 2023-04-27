package com.seb43.preProject.member.dto;

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
//    private Object profileImage;

}

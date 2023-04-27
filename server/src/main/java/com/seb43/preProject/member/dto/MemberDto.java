package com.seb43.preProject.member.dto;

import com.seb43.preProject.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class MemberDto {

    @Getter
    @AllArgsConstructor
    public static class post{
        @NotBlank
        @Email
        private String email;
        @NotBlank
        private String userName;
        @NotBlank
        private String password;
    }

    @Getter
    @AllArgsConstructor
    public static class response{

        private long memberId;
        private String email;
        private String userName;
        private String password;
        private Member.MemberStatus memberStatus;
        private int questionCount;
        private int answerCount;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
//        private Object profileImage;

    }

}

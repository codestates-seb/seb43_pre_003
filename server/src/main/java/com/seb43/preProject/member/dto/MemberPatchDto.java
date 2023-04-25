package com.seb43.preProject.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MemberPatchDto {
    @NotBlank(message = "이름을 입력해주세요.")
    private String userName;
}

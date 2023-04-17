package com.seb43.preProject.member.controller;

import com.seb43.preProject.member.dto.MemberDto;
import com.seb43.preProject.member.dto.MemberPostDto;
import com.seb43.preProject.member.entity.Member;
import com.seb43.preProject.member.mapper.MemberMapper;
import com.seb43.preProject.member.service.MemberService;
import com.seb43.preProject.response.SingleResponseDto;
import com.seb43.preProject.utils.URICreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/members")
@Validated
@Slf4j
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }
    @PostMapping("/join") //회원가입
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto memberPostDto){
        Member member = memberService.createMember(mapper.memberPostDtoToMember(memberPostDto));

        URI location = URICreator.createUri(MEMBER_DEFAULT_URL, member.getMemberId());

        return ResponseEntity.created(location).build();
    }
    @GetMapping("/{member-id}/profile")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId){
        Member member = memberService.findVerifiedMember(memberId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponse(member)),HttpStatus.OK);

    }

}

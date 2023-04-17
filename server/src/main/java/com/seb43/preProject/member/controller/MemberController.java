package com.seb43.preProject.member.controller;

import com.seb43.preProject.member.dto.MemberDto;
import com.seb43.preProject.member.dto.MemberPostDto;
import com.seb43.preProject.member.entity.Member;
import com.seb43.preProject.member.mapper.MemberMapper;
import com.seb43.preProject.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/v1/members")
@Validated
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto memberPostDto){
        Member member = memberService.createMember(mapper.memberPostDtoToMember(memberPostDto));

        return new ResponseEntity<>(member,HttpStatus.CREATED);
    }
}

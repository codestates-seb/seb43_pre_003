package com.seb43.preProject.member.controller;

import com.seb43.preProject.member.dto.MemberPatchDto;
import com.seb43.preProject.member.dto.MemberPostDto;
import com.seb43.preProject.member.entity.Member;
import com.seb43.preProject.member.mapper.MemberMapper;
import com.seb43.preProject.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/members")
@Validated
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper memberMapper;

    public MemberController(MemberService memberService, MemberMapper memberMapper) {
        this.memberService = memberService;
        this.memberMapper = memberMapper;
    }
    @PostMapping("/join") //회원가입
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto memberPostDto){
        Member member = memberService.createMember(memberMapper.memberPostDtoToMember(memberPostDto));
        return new ResponseEntity<>((memberMapper.memberToMemberResponse(member)), HttpStatus.CREATED);
    }
    @GetMapping("/profile")// 프로필 조회
    public ResponseEntity getMember(){
        Long memberId = memberService.findSecurityContextHolderMemberId();
        Member member = memberService.findVerifiedMember(memberId);
        return new ResponseEntity<>((memberMapper.memberToMemberResponse(member)),HttpStatus.OK);

    }
    @PatchMapping("/profile")//프로필 수정
    public ResponseEntity patchMember(@Valid @RequestBody MemberPatchDto memberPatchDto){
        Long memberId = memberService.findSecurityContextHolderMemberId();
        Member member = memberService.updateMember(memberPatchDto,memberId);

        return new ResponseEntity<>((memberMapper.memberToMemberResponse(member)),HttpStatus.OK);
    }
    @DeleteMapping("/profile/delete")// 회원탈퇴 (memberStatus 탈퇴상태로 변경 memberId는 삭제되지않음)
    public ResponseEntity deleteMember(){
        Long memberId = memberService.findSecurityContextHolderMemberId();
        Member member = memberService.deleteMember(memberId);
        SecurityContextHolder.clearContext(); //탈퇴후 로그아웃
        return new ResponseEntity<>((memberMapper.memberToMemberResponse(member)),HttpStatus.OK);
    }

}

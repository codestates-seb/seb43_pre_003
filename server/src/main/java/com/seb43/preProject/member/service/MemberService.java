package com.seb43.preProject.member.service;


import com.seb43.preProject.security.util.CustomAuthorityUtil;
import com.seb43.preProject.exception.BusinessLogicException;
import com.seb43.preProject.exception.ExceptionCode;
import com.seb43.preProject.member.dto.MemberPatchDto;
import com.seb43.preProject.member.entity.Member;
import com.seb43.preProject.member.repository.MemberRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtil authorityUtils;
    PasswordEncoder encoder = new BCryptPasswordEncoder();

    public MemberService(MemberRepository memberRepository,
                         CustomAuthorityUtil authorityUtils) {
        this.memberRepository = memberRepository;
        this.authorityUtils = authorityUtils;
    }
    public Member createMember(Member member) {
    verifyMemberExists(member.getEmail());
    if(member.getPassword()!=null)
    {
    String encryptedPassword = encoder.encode(member.getPassword());
    member.setPassword(encryptedPassword);
    }

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);
    return memberRepository.save(member);
}

    public void verifyMemberExists(String email){
        Optional<Member> findMember = memberRepository.findByEmail(email);
        if(findMember.isPresent()){
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
    }
    public Member findVerifiedMember(long memberId) {
        Optional<Member> findMember = memberRepository.findById(memberId);
        Member member = findMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return member;
    }
    public Member updateMember(MemberPatchDto member,Long memberId) {

        Member findMember = findVerifiedMember(memberId);
        findMember.setUserName(member.getUserName());
        findMember.setModifiedAt(LocalDateTime.now());

        return memberRepository.save(findMember);
    }
    public Member deleteMember(Long memberId){
        Member deletMember = findVerifiedMember(memberId);
        deletMember.setMemberStatus(Member.MemberStatus.MEMBER_QUIT);
        deletMember.setModifiedAt(LocalDateTime.now());
        deletMember.setPassword("");
        deletMember.setUserName("탈퇴한 회원");

        return memberRepository.save(deletMember);
    }

    public Long findSecurityContextHolderMemberId() {
        Map principal = (Map) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return (Long) principal.get("memberId");
    }
}

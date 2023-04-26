package com.seb43.preProject.member.service;


import com.seb43.preProject.security.util.CustomAuthorityUtil;
import com.seb43.preProject.exception.BusinessLogicException;
import com.seb43.preProject.exception.ExceptionCode;
import com.seb43.preProject.member.dto.MemberPatchDto;
import com.seb43.preProject.member.entity.Member;
import com.seb43.preProject.member.repository.MemberRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Transactional
@Service
public class MemberService {
    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtil authorityUtils;

    public MemberService(PasswordEncoder passwordEncoder, MemberRepository memberRepository, CustomAuthorityUtil authorityUtils) {
        this.passwordEncoder = passwordEncoder;
        this.memberRepository = memberRepository;
        this.authorityUtils = authorityUtils;
    }

    //    public Member createMember(Member member){
//        Member creatMember = member;
//        creatMember.setMemberStatus(Member.MemberStatus.MEMBER_ACTIVE);
//        creatMember.setRoles(Member.Roles.ROLE_USER);
//        return memberRepository.save(creatMember);
//    }
    public Member createMember(Member member) {
    verifyMemberExists(member.getEmail());

    String encryptedPassword = passwordEncoder.encode(member.getPassword());
    member.setPassword(encryptedPassword);

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

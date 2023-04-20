package com.seb43.preProject.member.service;


import com.seb43.preProject.exception.BusinessLogicException;
import com.seb43.preProject.exception.ExceptionCode;
import com.seb43.preProject.member.dto.MemberPatchDto;
import com.seb43.preProject.member.entity.Member;
import com.seb43.preProject.member.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member createMember(Member member){
        Member creatMember = member;

        return memberRepository.save(creatMember);
    }

    public Member findVerifiedMember(long memberId) {
        Optional<Member> findMember = memberRepository.findById(memberId);
        Member member = findMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return member;
    }
    public Member updateMember(MemberPatchDto member,Long memberId) {

        Member findMember = findVerifiedMember(memberId);
        findMember.setPassword(member.getPassword());
        findMember.setUserName(member.getUserName());
        findMember.setModifiedAt(LocalDateTime.now());

        return memberRepository.save(findMember);
    }
    public Member deleteMember(Long memberId){
        Member deletMember = findVerifiedMember(memberId);
        deletMember.setMemberStatus(Member.MemberStatus.MEMBER_QUIT);
        deletMember.setModifiedAt(LocalDateTime.now());

        return memberRepository.save(deletMember);
    }
}

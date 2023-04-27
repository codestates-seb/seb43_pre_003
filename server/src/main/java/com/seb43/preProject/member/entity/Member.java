package com.seb43.preProject.member.entity;

import com.seb43.preProject.answer.entity.Answer;
import com.seb43.preProject.question.entity.Question;
import com.seb43.preProject.question.entity.Votes;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member {
    @Id
    @GeneratedValue
    private Long memberId;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;
    @Column(length = 100, nullable = false)
    private String userName;
    @Column(nullable = false)
    private String password;

//    @Column(length = 100, nullable = false)
//    private Object profileImage = null;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();
    @Column
    private LocalDateTime createdAt = LocalDateTime.now();
    @Column
    private LocalDateTime modifiedAt= LocalDateTime.now();
    @Column
    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Question> questions = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Answer> answers = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    private List<Votes> votesList = new ArrayList<>();
    @Enumerated(value = EnumType.STRING)
    @Column
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    public enum MemberStatus {
        MEMBER_ACTIVE("활동중"),
        MEMBER_SLEEP("휴면 상태"),
        MEMBER_QUIT("탈퇴 상태");



        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }

    }
    public enum Roles {
        ROLE_USER,
        ROLE_ADMIN
    }
}
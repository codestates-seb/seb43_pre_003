package com.seb43.preProject.member.entity;

import com.seb43.preProject.question.entity.Question;
import com.seb43.preProject.question.entity.Votes;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
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

    @Column
    private String Roles;
    @Column
    private LocalDateTime createdAt = LocalDateTime.now();
    @Column
    private LocalDateTime modifiedAt= LocalDateTime.now();
    @OneToMany(mappedBy = "member", cascade = CascadeType.PERSIST)
    private List<Question> questions = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.PERSIST)
    private List<Votes> votesList = new ArrayList<>();
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
}
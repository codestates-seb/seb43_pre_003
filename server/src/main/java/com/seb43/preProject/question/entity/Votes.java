package com.seb43.preProject.question.entity;

import com.seb43.preProject.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Votes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long votesId;
    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    @Enumerated(EnumType.STRING)
    private VotesStatus votesStatus;
    public enum VotesStatus{
        VOTES_UP("추천"),
        VOTES_DOWN("비추천"),
        VOTES_NOT("투표전");

        @Getter
        private String votes_status;

        VotesStatus(String votes_status) {
            this.votes_status = votes_status;
        }
    }

}
